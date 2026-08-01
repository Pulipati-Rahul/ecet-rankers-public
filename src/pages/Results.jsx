import { useLocation, useNavigate } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"

function Results() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const result = state || { score: 146, total: 200, attempted: 174, accuracy: 84, branch: "CSE", report: [] }
  const percentile = Math.min(99, Math.round(45 + (result.score / result.total) * 54))
  const rank = Math.max(1, Math.round(28000 * (1 - percentile / 100)))

  return (
    <AppShell title="Results" kicker="Performance report">
      <SEO 
        title="Mock Exam Results | ECET Rankers"
        description="Detailed performance analysis, scorecard, subject-wise analysis and rank estimate for your TS ECET mock exam attempt."
        robots="noindex, nofollow"
      />
      <section className="result-panel">
        <div className="result-hero">
          <div><p className="kicker">{result.branch} mock score</p><h2>{result.score}/{result.total} marks</h2><p>{result.attempted} attempted, {result.accuracy}% accuracy, estimated percentile {percentile}.</p></div>
          <div className="rank-badge"><strong>#{rank}</strong><span>rank estimate</span></div>
        </div>
        <div className="report-grid">
          {(result.report || []).map((row) => <article key={row.id} className="report-card"><span>{row.label}</span><strong>{row.correct}/{row.total}</strong><small>{row.attempted} attempted</small></article>)}
          <article className="report-card"><span>Strong subject</span><strong>Mathematics</strong><small>Keep speed practice active.</small></article>
          <article className="report-card"><span>Weak subject</span><strong>Engineering</strong><small>Revise weak topics and retry wrong questions.</small></article>
        </div>
        <div className="result-actions"><button className="primary-button" onClick={() => navigate("/analytics")}>Open Analytics</button><button className="ghost-button" onClick={() => navigate("/mock-tests")}>New Mock</button></div>
      </section>
    </AppShell>
  )
}

export default Results
