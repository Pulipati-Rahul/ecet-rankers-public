import { Mail, UserPlus } from "lucide-react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { branches } from "../config/exam"
import supabase from "../lib/supabase"

function Auth() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get("next") || "/dashboard"

  const [mode, setMode] = useState("login")
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    branch: "cse",
    college: ""
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function submitEmail(event) {
    event.preventDefault()
    setLoading(true)
    setMessage("")

    let response

    if (mode === "signup") {
      const nameVal = form.name.trim()
      if (!nameVal || nameVal.length < 2 || /^[^a-zA-Z0-9]+$/.test(nameVal)) {
        setLoading(false)
        setMessage("Please enter a valid name (minimum 2 letters).")
        return
      }

      const emailVal = form.email.toLowerCase().trim()
      const fakeEmails = ["test@test.com", "abc@abc.com", "admin@admin.com", "user@user.com", "tester@tester.com"]
      if (fakeEmails.includes(emailVal)) {
        setLoading(false)
        setMessage("Please register with a real email address.")
        return
      }

      response = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
            branch: form.branch,
            college: form.college
          }
        }
      })
    } else {
      response = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })
    }

    setLoading(false)

    if (response.error) {
      setMessage(response.error.message)
      return
    }

    navigate(next)
  }

  async function resetPassword() {
    if (!form.email) {
      setMessage("Enter your email first.")
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(form.email)

    setMessage(error ? error.message : "Password reset email sent.")
  }

  return (
    <AppShell
      title={mode === "login" ? "Login" : "Create Account"}
      kicker="Secure access for every student"
    >
      <SEO 
        title="Student Login / Sign Up | ECET Rankers"
        description="Access your student profile, practice statistics, analytics, and mock tests on ECET Rankers."
        robots="noindex, nofollow"
      />
      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-copy">
            <p className="eyebrow">
              {mode === "login" ? "Welcome back" : "Join ECET Rankers"}
            </p>

            <h2>
              {mode === "login"
                ? "Continue your prep"
                : "Create your study account"}
            </h2>

            <p>
              Practice, mocks, dashboard and analytics unlock after login.
            </p>
          </div>

          <div className="auth-form">
            <div className="segmented-control">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => setMode("login")}
              >
                Login
              </button>

              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => setMode("signup")}
              >
                Signup
              </button>
            </div>

            <form onSubmit={submitEmail} className="stacked-form">
              {mode === "signup" && (
                <SignupFields form={form} setForm={setForm} />
              )}

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </label>

              <div className="auth-actions">
                <button className="primary-button" disabled={loading}>
                  {mode === "login" ? <Mail size={18} /> : <UserPlus size={18} />}
                  {loading
                    ? " Please wait"
                    : mode === "login"
                    ? " Login"
                    : " Create Account"}
                </button>

                <button
                  type="button"
                  className="text-button"
                  onClick={resetPassword}
                >
                  Forgot password?
                </button>
              </div>
            </form>

            {message && <p className="toast-message">{message}</p>}
          </div>
        </div>
      </section>
    </AppShell>
  )
}

function SignupFields({ form, setForm }) {
  return (
    <>
      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </label>

      <label>
        Branch
        <select
          value={form.branch}
          onChange={(e) => setForm({ ...form, branch: e.target.value })}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.short}
            </option>
          ))}
        </select>
      </label>

      <label>
        College
        <input
          value={form.college}
          onChange={(e) => setForm({ ...form, college: e.target.value })}
        />
      </label>
    </>
  )
}

export default Auth