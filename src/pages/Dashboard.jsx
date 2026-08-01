import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import SectionCard from "../components/SectionCard"
import StatCard from "../components/StatCard"
import { useAuth } from "../context/AuthContext"
import { readProgress, subjectAccuracy, syncProgressWithSupabase } from "../services/progressService"

function Dashboard() {
  const { user, profile } = useAuth()
  const [progress, setProgress] = useState(() => readProgress())

  useEffect(() => {
    if (!user) return
    syncProgressWithSupabase(user.id).then((synced) => {
      if (synced) setProgress(synced)
    })
  }, [user])

  const accuracy = Math.round((progress.correct / Math.max(progress.solved, 1)) * 100)
  const weekly = progress.attempts.slice().reverse().map((item, index) => {
    const rawDate = item.date || item.created_at
    const dayLabel = rawDate ? new Date(rawDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : `A${index + 1}`
    return { day: dayLabel, score: item.score || item.correct || 0, accuracy: item.accuracy || 0 }
  })
  const subject = subjectAccuracy(progress.attempts)
  const strongest = subject.slice().sort((a, b) => b.value - a.value)[0]
  const weakest = subject.filter((item) => item.attempted > 0).slice().sort((a, b) => a.value - b.value)[0]

  return (
    <AppShell title="Dashboard" kicker={profile ? `Welcome, ${profile.name}` : "Student overview"}>
      <SEO 
        title="Student Dashboard | ECET Rankers"
        description="View your practice progress, statistics, and detailed analytics on ECET Rankers."
        robots="noindex, nofollow"
      />
      <section className="hero-card">
        <p className="kicker">Daily prep focus</p>
        <h2>Keep your study plan light, clear, and consistent.</h2>
        <p>Open practice, review your last mock, and jump into the next topic without distraction.</p>
        <div className="hero-actions">
          <a className="button button-secondary" href="/practice">Practice now</a>
          <a className="button button-secondary" href="/analytics">View analytics</a>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard label="Solved" value={progress.solved} hint="Questions completed" />
        <StatCard label="Accuracy" value={`${accuracy}%`} hint="Latest practice score" />
        <StatCard label="Mocks" value={progress.mocks} hint="Completed mock attempts" />
        <StatCard label="Streak" value={`${progress.streak}d`} hint="Study days in a row" />
      </section>

      {progress.attempts.length ? (
        <div className="dashboard-grid">
          <SectionCard title="Recent progress" subtitle="Score trend">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area dataKey="score" stroke="#2563eb" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Subject performance" subtitle="Accuracy by section">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={subject}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Focus areas" subtitle="Your strongest and weakest subjects">
            <div className="weak-list">
              <span><strong>{strongest?.name || "Not enough data"}</strong> • strongest </span>
              <span><strong>{weakest?.name || "Not enough data"}</strong> • needs attention </span>
            </div>
          </SectionCard>
        </div>
      ) : (
        <section className="empty-state">
          <h2>No attempt history yet</h2>
          <p>Start a practice set or mock to fill your dashboard with simple progress insights.</p>
        </section>
      )}
    </AppShell>
  )
}

export default Dashboard
