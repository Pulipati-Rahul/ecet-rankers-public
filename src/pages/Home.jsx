import { BarChart3, FileText, ShieldCheck, Sparkles, Trophy } from "lucide-react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { branches, ECET_SECTIONS, years } from "../config/exam"

function Home() {
  const actions = [
    { title: "Practice", copy: "Topic-wise MCQs", icon: Trophy, to: "/practice" },
    { title: "Mock Test", copy: "Full 200Q exam", icon: ShieldCheck, to: "/mock-tests" },
    { title: "Papers", copy: "Year-wise PDFs", icon: FileText, to: "/previous-papers" },
    { title: "Analytics", copy: "Accuracy insights", icon: BarChart3, to: "/analytics" }
  ]

  return (
    <AppShell title="ECET Rankers" kicker="TS ECET prep for diploma students">
      <SEO 
        title="ECET Rankers | TS ECET Previous Papers, Mock Tests & Practice Questions"
        description="Access TS ECET mock tests, previous year papers, and topic-wise practice questions. Prepare for CSE, ECE, EEE, Civil, and Mechanical Engineering ECET exams. Free CBT simulations for diploma students."
        keywords="TS ECET, ECET Rankers, ECET 2026, TS ECET mock tests, previous year papers, ECET CSE, ECE, EEE, Civil, Mechanical, diploma exams, engineering common entrance test, TS ECET preparation"
      />
      <section className="hero-banner launch-hero">
        <div className="hero-copy">
          <span className="hero-pill"><Sparkles size={15} /> ECET prep app</span>
          <h2>Crack TS ECET with fast practice, real mocks, and paper PDFs.</h2>
          <p>Built for phone-first studying: quick filters, readable questions, instant feedback, and progress tracking after login.</p>
          <div className="hero-actions">
            <Link className="button button-light" to="/practice">Start Practice</Link>
            <Link className="button button-glass" to="/mock-tests">Take Mock</Link>
          </div>
        </div>
        <div className="hero-score-card">
          <div><span>Daily target</span><strong>50 Qs</strong></div>
          <div><span>Mock duration</span><strong>180m</strong></div>
          <div><span>Branches</span><strong>{branches.length}</strong></div>
        </div>
      </section>

      <div className="home-section">
        <span className="kicker">Quick access</span>
        <section className="quick-access-grid">
          {actions.map(({ title, copy, icon: Icon, to }) => (
            <Link key={title} className="card quick-card" to={to}>
              <span className="icon"><Icon size={24} /></span>
              <strong>{title}</strong>
              <small>{copy}</small>
            </Link>
          ))}
        </section>
      </div>

      <div className="home-section">
        <span className="kicker">By the numbers</span>
        <section className="stats-row">
          <article className="card stat-card">
            <p className="label">Questions</p>
            <div className="value">6000+</div>
            <p className="hint">Previous years & practice Qs</p>
          </article>
          <article className="card stat-card">
            <p className="label">Sections</p>
            <div className="value">30+</div>
            <p className="hint">Topic sections</p>
          </article>
          <article className="card stat-card">
            <p className="label">Branches</p>
            <div className="value">{branches.length}</div>
            <p className="hint">Engineering streams</p>
          </article>
          <article className="card stat-card">
            <p className="label">Students</p>
            <div className="value">1000+</div>
            <p className="hint">Ready to grow</p>
          </article>
        </section>
      </div>

      <div className="home-section">
        <span className="kicker">What's inside</span>
        <section className="inside-list">
          <Info icon={Trophy} title="Daily Practice" copy="Topic-wise MCQs with instant feedback, explanations, and filters by branch, year, subject, and topic." />
          <Info icon={ShieldCheck} title="Full Mock Exams" copy="A 200-question timed test with section navigation, review flags, and instant result summary." />
          <Info icon={BarChart3} title="Performance Analytics" copy="Accuracy, streaks, attempts, and weak subject insights for logged-in students." />
        </section>
      </div>

      <div className="home-section">
        <span className="kicker">Getting started</span>
        <section className="step-grid">
          {[
            ["Step 1", "Sign up or login", "Email, Google, or mobile OTP"],
            ["Step 2", "Choose your branch", "CSE / ECE / EEE / Civil / Mech"],
            ["Step 3", "Start practicing", "Topic-wise questions or full mocks"],
            ["Step 4", "Track progress", "Use analytics and improve daily"]
          ].map(([num, text, detail]) => (
            <div key={num} className="card step-card">
              <strong>{num}</strong>
              <p>{text}</p>
              <small>{detail}</small>
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  )
}

function Info({ icon: Icon, title, copy }) {
  return (
    <div className="card info-row">
      <span><Icon size={22} /></span>
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </div>
  )
}

export default Home
