/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import supabase from "../lib/supabase"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session)
      setProfile(readProfile(data.session))
      recordUserActivity(data.session, "session")
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      setProfile(readProfile(nextSession))
      recordUserActivity(nextSession, event)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    profile,
    loading,
    isAdmin: isAdminUser(session?.user),
    async signOut() {
      await supabase.auth.signOut()
    }
  }), [session, profile, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

function readProfile(session) {
  if (!session?.user) return null
  const meta = session.user.user_metadata || {}
  return {
    name: meta.name || session.user.email?.split("@")[0] || "ECET Student",
    branch: meta.branch || "cse",
    college: meta.college || "Diploma College",
    solved_questions: meta.solved_questions || 0,
    streak: meta.streak || 0
  }
}

function isAdminUser(user) {
  if (!user) return false
  const configuredEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  // Robust fallback admin emails
  configuredEmails.push("pulipatirahul19@gmail.com")

  return user.app_metadata?.role === "admin" ||
    user.user_metadata?.role === "admin" ||
    configuredEmails.includes(user.email?.toLowerCase())
}

async function recordUserActivity(session, event) {
  if (!session?.user) return
  const user = session.user
  const meta = user.user_metadata || {}

  try {
    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: meta.name || meta.full_name || user.email?.split("@")[0] || "ECET Student",
      branch: meta.branch || "cse",
      college: meta.college || null,
      last_seen_at: new Date().toISOString()
    })
  } catch (error) {
    console.warn("Profile sync skipped", error)
  }

  try {
    await supabase.from("user_activity").insert({
      user_id: user.id,
      event: event || "session",
      user_agent: navigator.userAgent
    })
  } catch (error) {
    console.warn("Activity sync skipped", error)
  }
}
