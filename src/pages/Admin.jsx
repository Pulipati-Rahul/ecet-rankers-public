import { Activity, AlertTriangle, Database, Inbox, ShieldAlert, ShieldCheck, Trophy, UserCheck, UserPlus, Users } from "lucide-react"
import { useEffect, useState } from "react"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { useAuth } from "../context/AuthContext"
import supabase from "../lib/supabase"

const initialMetrics = {
  registered: 0,
  signupsToday: 0,
  loginsToday: 0,
  activeToday: 0,
  practiceAttempts: 0,
  mockAttempts: 0,
  questions: 0,
  pendingReview: 0,
  reportsOpen: 0
}

function Admin() {
  const { isAdmin, loading } = useAuth()
  const [reports, setReports] = useState([])
  const [usersList, setUsersList] = useState([])
  const [metrics, setMetrics] = useState(initialMetrics)
  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    if (!isAdmin) return
    loadAdminData()
  }, [isAdmin])

  async function loadAdminData() {
    setLoadError("")
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayIso = today.toISOString()

    const [
      profiles,
      signupsToday,
      loginsToday,
      activeToday,
      practiceAttempts,
      mockAttempts,
      totalQuestions,
      pendingReview,
      reportsOpen
    ] = await Promise.all([
      countRows("profiles"),
      countRows("profiles", { column: "created_at", gte: todayIso }),
      countRows("user_activity", { column: "created_at", gte: todayIso, event: "SIGNED_IN" }),
      countDistinctActive(todayIso),
      countRows("practice_sessions"),
      countRows("mock_attempts"),
      countRows("questions"),
      countRows("questions", { column: "is_verified", eq: false }),
      countRows("issue_reports", { column: "status", neq: "closed" })
    ])

    setMetrics({
      registered: profiles.count,
      signupsToday: signupsToday.count,
      loginsToday: loginsToday.count,
      activeToday: activeToday.count,
      practiceAttempts: practiceAttempts.count,
      mockAttempts: mockAttempts.count,
      questions: totalQuestions.count,
      pendingReview: pendingReview.count,
      reportsOpen: reportsOpen.count
    })

    const queryResults = [
      { name: "profiles", result: profiles },
      { name: "signupsToday", result: signupsToday },
      { name: "loginsToday", result: loginsToday },
      { name: "activeToday", result: activeToday },
      { name: "practiceAttempts", result: practiceAttempts },
      { name: "mockAttempts", result: mockAttempts },
      { name: "totalQuestions", result: totalQuestions },
      { name: "pendingReview", result: pendingReview },
      { name: "reportsOpen", result: reportsOpen }
    ]

    const errors = queryResults
      .filter((q) => q.result && q.result.error)
      .map((q) => ({ query: q.name, error: q.result.error }))

    if (errors.length) {
      console.error("Admin dashboard load errors:", errors)
      setLoadError(`Error loading admin metrics [${errors.map((e) => e.query).join(", ")}]: ${errors.map((e) => e.error.message || JSON.stringify(e.error)).join(" | ")}`)
    }

    const [{ data: reportData }, { data: userData }] = await Promise.all([
      supabase.from("issue_reports").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(50)
    ])

    setReports(reportData || [])
    setUsersList(userData || [])
  }

  if (loading) {
    return (
      <AppShell title="Admin" kicker="Checking access">
        <SEO title="Admin Panel | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state"><h2>Checking admin access</h2><p>Please wait a moment.</p></section>
      </AppShell>
    )
  }

  if (!isAdmin) {
    return (
      <AppShell title="Admin" kicker="Restricted">
        <SEO title="Admin Panel | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state"><ShieldAlert /><h2>Admin access required</h2><p>Login with an admin email configured in VITE_ADMIN_EMAILS or a Supabase user role of admin.</p></section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Admin" kicker="Launch control center">
      <SEO title="Admin Panel | ECET Rankers" robots="noindex, nofollow" />
      <section className="admin-hero">
        <div>
          <p className="kicker">Today</p>
          <h2>Users, activity, content, and reports in one place.</h2>
          <p>Use this dashboard before launch and daily after launch to watch growth and catch content issues.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={loadAdminData}>Refresh</button>
      </section>

      {loadError && <p className="toast-message warning">{loadError}</p>}

      <section className="admin-metrics">
        <Metric icon={Users} label="Registered" value={metrics.registered} hint="Total users" />
        <Metric icon={UserPlus} label="Signups today" value={metrics.signupsToday} hint="New accounts" />
        <Metric icon={UserCheck} label="Logins today" value={metrics.loginsToday} hint="Auth events" />
        <Metric icon={Activity} label="Daily active" value={metrics.activeToday} hint="Unique users" />
        <Metric icon={Database} label="Questions" value={metrics.questions} hint="Question bank" />
        <Metric icon={AlertTriangle} label="Review queue" value={metrics.pendingReview} hint="Unverified" />
      </section>

      <section className="admin-grid">
        <article className="chart-card">
          <p className="kicker">Attempts</p>
          <h2>Learning activity</h2>
          <div className="admin-activity-list">
            <div className="activity-item">
              <span className="activity-icon practice"><Trophy size={16} /></span>
              <div className="activity-details">
                <span>Practice attempts</span>
                <strong>{metrics.practiceAttempts}</strong>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon mock"><ShieldCheck size={16} /></span>
              <div className="activity-details">
                <span>Mock attempts</span>
                <strong>{metrics.mockAttempts}</strong>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon issue"><AlertTriangle size={16} /></span>
              <div className="activity-details">
                <span>Open issue reports</span>
                <strong>{metrics.reportsOpen}</strong>
              </div>
            </div>
          </div>
        </article>

        <article className="chart-card">
          <p className="kicker">Issue Reports</p>
          <h2>User reported problems</h2>
          <div className="admin-issues-list">
            {reports.length ? (
              reports.map((item) => (
                <div key={item.id || `${item.question_id}-${item.created_at}`} className="admin-issue-item">
                  <div className="issue-header">
                    <span className="issue-badge">{item.issue_type.replaceAll("_", " ")}</span>
                    <span className="issue-date">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="issue-body">
                    <strong>Q{item.question_no} • {item.branch?.toUpperCase()} {item.year}</strong>
                    {item.notes && <p className="issue-notes">"{item.notes}"</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="admin-empty-state">
                <Inbox size={32} />
                <p>No open issue reports found.</p>
              </div>
            )}
          </div>
        </article>

        <article className="chart-card">
          <p className="kicker">Students</p>
          <h2>Registered students</h2>
          <div className="admin-users-list">
            {usersList.length ? (
              usersList.map((student) => (
                <div key={student.id} className="admin-user-item">
                  <div className="user-initial">{student.name?.slice(0, 1).toUpperCase() || "S"}</div>
                  <div className="user-details">
                    <strong>{student.name}</strong>
                    <span>{student.email}</span>
                  </div>
                  <span className="user-branch-badge">{student.branch?.toUpperCase()}</span>
                </div>
              ))
            ) : (
              <div className="admin-empty-state">
                <Users size={32} />
                <p>No registered students found.</p>
              </div>
            )}
          </div>
        </article>
      </section>
    </AppShell>
  )
}

function Metric({ icon: Icon, label, value, hint }) {
  return (
    <article className="card admin-metric">
      <span><Icon size={20} /></span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{hint}</small>
      </div>
    </article>
  )
}

async function countRows(table, filter = {}) {
  try {
    let query = supabase.from(table).select("*", { count: "exact", head: true })
    if (filter.gte) query = query.gte(filter.column, filter.gte)
    if (filter.eq !== undefined) query = query.eq(filter.column, filter.eq)
    if (filter.neq !== undefined) query = query.neq(filter.column, filter.neq)
    if (filter.event) query = query.eq("event", filter.event)
    const { count, error } = await query
    return { count: count || 0, error }
  } catch (error) {
    return { count: 0, error }
  }
}

async function countDistinctActive(todayIso) {
  try {
    const { data, error } = await supabase.from("user_activity").select("user_id").gte("created_at", todayIso)
    if (error) return { count: 0, error }
    return { count: new Set((data || []).map((item) => item.user_id)).size, error: null }
  } catch (error) {
    return { count: 0, error }
  }
}

export default Admin
