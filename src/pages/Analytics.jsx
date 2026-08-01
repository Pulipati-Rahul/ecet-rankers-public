import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import SectionCard from "../components/SectionCard"
import { useAuth } from "../context/AuthContext"
import { readProgress, subjectAccuracy, syncProgressWithSupabase } from "../services/progressService"

function Analytics() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(() => readProgress())

  useEffect(() => {
    if (!user) return
    syncProgressWithSupabase(user.id).then((synced) => {
      if (synced) setProgress(synced)
    })
  }, [user])

  const trend = progress.attempts.slice().reverse().map((item, index) => {
    const rawDate = item.date || item.created_at
    const dayLabel = rawDate ? new Date(rawDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : `Attempt ${index + 1}`
    return { name: dayLabel, accuracy: item.accuracy || 0, time: Math.round((item.timeSpent || 0) / 60) }
  })
  const subject = subjectAccuracy(progress.attempts).sort((a, b) => a.value - b.value)
  const topicAttempts = progress.attempts.flatMap((attempt) => attempt.topicReport || [])

  return (
    <AppShell title="Analytics" kicker="Weak topic tracking">
      <SEO 
        title="Performance Analytics | ECET Rankers"
        description="Review your recent exam accuracy trends, weak subject areas, time spent practicing, and detailed topic reports."
        robots="noindex, nofollow"
      />
      {progress.attempts.length ? (
        <div className="analytics-grid">
          <SectionCard title="Accuracy trend" subtitle="Recent attempts">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trend}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line dataKey="accuracy" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </SectionCard>
          <SectionCard title="Weak subjects" subtitle="Priority queue">
            <div className="weak-list">{subject.map((item) => <span key={item.name}>{item.name} <strong>{item.value}%</strong></span>)}</div>
          </SectionCard>
          <SectionCard title="Time spent" subtitle="Mock minutes">
            <p className="stat-value">{trend.reduce((sum, item) => sum + item.time, 0)}m</p>
            <p className="stat-hint">Stored from completed mock attempts.</p>
          </SectionCard>
          <SectionCard title="Topic history" subtitle="Question attempt history">
            <div className="weak-list">{topicAttempts.length ? topicAttempts.map((item) => <span key={item.topic}>{item.topic} <strong>{item.accuracy}%</strong></span>) : <span>No topic-level records yet <strong>0%</strong></span>}</div>
          </SectionCard>
        </div>
      ) : (
        <section className="empty-state"><h2>No analytics yet</h2><p>Analytics will appear after real practice sessions or completed verified mocks are saved.</p></section>
      )}
    </AppShell>
  )
}

export default Analytics
