import { ShieldCheck } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { branches, getBranch, years } from "../config/exam"
import { useAuth } from "../context/AuthContext"

function MockTests() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [branchId, setBranchId] = useState("cse")
  const [year, setYear] = useState("2025")
  const branch = getBranch(branchId)
  const summary = useMemo(() => ({ questions: 200, duration: "180 minutes", sections: 4, marks: 1 }), [])

  function startMock() {
    if (!user) {
      navigate("/auth?next=/mock-tests")
      return
    }
    navigate("/mock-exam", { state: { branchId, year, mode: "mock", count: summary.questions, title: `${year} ${branch.short} Mock` } })
  }

  return (
    <AppShell title="Mock Test" kicker="Real TS ECET CBT simulation">
      <SEO 
        title="TS ECET Mock Test Builder | Free Computer Based Test CBT"
        description="Simulate the state-level TS ECET exam with our 200-question timed mocks. Choose your year and engineering stream (CSE, ECE, EEE, Civil, Mech)."
        keywords="ts ecet mock tests, computer based test ecet, cbt simulation, online ecet exam"
      />
      <section className="section-block mock-selection">
        <div className="section-title">
          <p className="kicker">Mock builder</p>
          <h2>Select branch, year, and start your simulated exam</h2>
          <p>Choose your branch and year with a polished pre-start flow before entering the full mock environment.</p>
        </div>

        <div className="mock-builder-grid">
          <div className="mock-panel">
            <p className="kicker">Step 1</p>
            <h3>Select branch</h3>
            <div className="branch-grid">
              {branches.map((item) => (
                <button key={item.id} type="button" className={item.id === branchId ? "branch-card selected" : "branch-card"} onClick={() => setBranchId(item.id)}>
                  <span>{item.short}</span>
                  <small>{item.label}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="mock-panel">
            <p className="kicker">Step 2</p>
            <h3>Choose year</h3>
            <div className="year-chip-grid">
              {years.map((item) => (
                <button key={item} type="button" className={item === year ? "year-chip active" : "year-chip"} onClick={() => setYear(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="mock-panel mock-summary-card">
            <p className="kicker">Step 3</p>
            <h3>Mock summary</h3>
            <div className="summary-list">
              <div><span>Branch</span><strong>{branch.label}</strong></div>
              <div><span>Year</span><strong>{year}</strong></div>
              <div><span>Total questions</span><strong>{summary.questions}</strong></div>
              <div><span>Duration</span><strong>{summary.duration}</strong></div>
              <div><span>Subjects</span><strong>{summary.sections}</strong></div>
              <div><span>Marks per Q</span><strong>{summary.marks}</strong></div>
            </div>
            <button className="primary-button" onClick={startMock}>
              <ShieldCheck size={18} /> Start Mock
            </button>
          </div>
        </div>
      </section>

      <section className="section-block full-paper-card" style={{ "--branch-color": branch.color }}>
        <div>
          <p className="kicker">Exam pattern locked</p>
          <h2>{branch.short} full paper, 180 minutes</h2>
          <p>Simulate the TS ECET CBT flow with authentic section pacing, review flags, and question navigation.</p>
        </div>
        <div className="paper-pattern">
          <div><strong>{summary.questions}</strong><span>Questions</span></div>
          <div><strong>{summary.duration}</strong><span>Duration</span></div>
          <div><strong>{summary.sections}</strong><span>Sections</span></div>
          <div><strong>{summary.marks}</strong><span>Marks each</span></div>
        </div>
      </section>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', padding: '12px' }}>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Looking for past exam questions? Download & attempt <Link to="/previous-papers" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>TS ECET Previous Year Papers</Link>.
        </p>
      </div>
    </AppShell>
  )
}

export default MockTests
