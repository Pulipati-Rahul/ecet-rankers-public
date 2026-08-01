import { AlertTriangle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { ECET_SECTIONS, EXAM_DURATION_SECONDS, getBranch } from "../config/exam"
import { reportQuestionIssue } from "../services/issueService"
import { fetchFullPaper } from "../services/questionService"
import { writeAttempt } from "../services/progressService"

const issueTypes = ["wrong_answer", "missing_option", "ocr_mistake", "typo"]

function MockExam() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const config = useMemo(() => state || { branchId: "cse", year: "2025", title: "Full Mock" }, [state])
  const branch = getBranch(config.branchId)
  const resumeKey = `ecet-mock-${config.branchId}-${config.year}`
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [draftAnswers, setDraftAnswers] = useState({})
  const [marked, setMarked] = useState({})
  const [visited, setVisited] = useState({})
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS)
  const [activeSection, setActiveSection] = useState("mathematics")
  const [confirming, setConfirming] = useState(false)
  const [issueType, setIssueType] = useState(issueTypes[0])
  const [issueMessage, setIssueMessage] = useState("")
  const question = questions[index]

  useEffect(() => {
    let live = true
    fetchFullPaper(config).then((items) => {
      if (!live) return
      const saved = readResume(resumeKey)
      setQuestions(items)
      if (saved) {
        const savedAnswers = { ...(saved.answers || {}), ...(saved.draftAnswers || {}) }
        setIndex(saved.index || 0)
        setAnswers(savedAnswers)
        setDraftAnswers(savedAnswers)
        setMarked(saved.marked || {})
        setVisited(saved.visited || {})
        setTimeLeft(saved.timeLeft || EXAM_DURATION_SECONDS)
        setActiveSection(saved.activeSection || "mathematics")
      }
      setLoading(false)
    })
    return () => { live = false }
  }, [config, resumeKey])

  useEffect(() => {
    if (loading || !questions.length) return
    localStorage.setItem(resumeKey, JSON.stringify({ index, answers, draftAnswers, marked, visited, timeLeft, activeSection }))
  }, [activeSection, answers, draftAnswers, index, loading, marked, questions.length, resumeKey, timeLeft, visited])

  const sectionQuestions = useMemo(() => questions.filter((item) => item.section === activeSection), [activeSection, questions])
  const report = useMemo(() => ECET_SECTIONS.map((section) => {
    const items = questions.filter((item) => item.section === section.id)
    const statusCounts = countStatuses(items, answers, marked, visited)
    const correct = items.filter((item) => answers[item.id] === item.answer).length
    const attempted = statusCounts.answered + statusCounts.answeredMarked
    return { ...section, ...statusCounts, attempted, correct, total: items.length || section.count }
  }), [answers, marked, questions, visited])

  function go(nextIndex) {
    if (question) setVisited((value) => ({ ...value, [question.id]: true }))
    const bounded = Math.max(0, Math.min(nextIndex, questions.length - 1))
    setIndex(bounded)
    setActiveSection(questions[bounded]?.section || activeSection)
  }

  function jumpToSection(sectionId) {
    const nextIndex = questions.findIndex((item) => item.section === sectionId)
    setActiveSection(sectionId)
    if (nextIndex >= 0) go(nextIndex)
  }

  function saveCurrent() {
    if (!question) return
    setVisited((value) => ({ ...value, [question.id]: true }))
    setMarked((value) => ({ ...value, [question.id]: false }))
    setAnswers((value) => {
      const next = { ...value }
      if (draftAnswers[question.id]) next[question.id] = draftAnswers[question.id]
      return next
    })
  }

  function markCurrent() {
    if (!question) return
    setVisited((value) => ({ ...value, [question.id]: true }))
    setMarked((value) => ({ ...value, [question.id]: true }))
  }

  function saveAndMarkCurrent() {
    saveCurrent()
    markCurrent()
  }

  function clearCurrent() {
    if (!question) return
    setDraftAnswers((value) => removeKey(value, question.id))
    setAnswers((value) => removeKey(value, question.id))
    setMarked((value) => ({ ...value, [question.id]: false }))
    setVisited((value) => ({ ...value, [question.id]: true }))
  }

  function selectAnswer(option) {
    if (!question) return
    setDraftAnswers((value) => ({ ...value, [question.id]: option }))
    setAnswers((value) => ({ ...value, [question.id]: option }))
  }

  const submit = useCallback(async () => {
    const correct = questions.filter((item) => answers[item.id] === item.answer).length
    const attempted = Object.keys(answers).length
    const attempt = {
      type: "mock",
      branch: branch.short,
      year: config.year,
      score: correct,
      correct,
      attempted,
      total: questions.length,
      accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
      timeSpent: EXAM_DURATION_SECONDS - timeLeft,
      answers,
      report,
      date: new Date().toLocaleDateString()
    }
    await writeAttempt(attempt)
    localStorage.removeItem(resumeKey)
    navigate("/results", { state: attempt })
  }, [answers, branch.short, config.year, navigate, questions, report, resumeKey, timeLeft])

  useEffect(() => {
    if (loading || confirming || !questions.length) return undefined
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer)
          submit()
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [loading, confirming, questions.length, submit])

  async function submitIssue() {
    if (!question) return
    try {
      await reportQuestionIssue({ question, issueType, notes: issueMessage })
      setIssueMessage("Reported for admin review.")
    } catch {
      setIssueMessage("Could not submit report. Check Supabase issue_reports table/RLS.")
    }
  }

  if (loading) {
    return (
      <AppShell title="Mock Exam" kicker="Preparing your exam">
        <SEO title="Mock Exam | ECET Rankers" robots="noindex, nofollow" />
        <section className="mock-loading">
          <div className="mock-loading-inner">
            <Loader2 className="spin" size={32} />
            <h2>Preparing your exam…</h2>
            <p>Loading questions, generating the question palette, and syncing the timer.</p>
            <div className="progress-bar"><div /></div>
          </div>
        </section>
      </AppShell>
    )
  }

  if (questions.length !== 200) {
    return (
      <AppShell title="Mock unavailable" kicker={`${branch.short} ${config.year}`}>
        <SEO title="Mock Exam | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state"><AlertTriangle /><h2>Exact 200-question paper not ready</h2><p>Found {questions.length} questions. Import and verify the full {config.year} {branch.short} paper before starting this mock.</p></section>
      </AppShell>
    )
  }

  if (confirming) {
    return (
      <AppShell title="Submit Mock" kicker={`${branch.short} ${config.year}`}>
        <SEO title="Submit Mock Exam | ECET Rankers" robots="noindex, nofollow" />
        <section className="section-block submit-review">
          <div className="section-title">
            <p className="kicker">Submission summary</p>
            <h2>Review your section status</h2>
            <p>Final submit will save this mock attempt to analytics and remove your saved resume state.</p>
          </div>

          <div className="exam-summary-card">
            <table className="exam-summary-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Questions</th>
                  <th>Answered</th>
                  <th>Not Answered</th>
                  <th>Marked</th>
                  <th>Answered & Marked</th>
                  <th>Not Visited</th>
                </tr>
              </thead>
              <tbody>
                {report.map((item) => (
                  <tr key={item.id}>
                    <td>{item.label}</td>
                    <td>{item.total}</td>
                    <td>{item.answered}</td>
                    <td>{item.notAnswered}</td>
                    <td>{item.marked}</td>
                    <td>{item.answeredMarked}</td>
                    <td>{item.notVisited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="result-actions">
            <button className="ghost-button" onClick={() => setConfirming(false)}>Back to test</button>
            <button className="submit-button" onClick={submit}>Final Submit</button>
          </div>
        </section>
      </AppShell>
    )
  }

  const activeReport = report.find((item) => item.id === activeSection) || {}

  return (
    <AppShell title={config.title || "Mock Exam"} kicker={`${branch.short} | ${config.year}`} action={<span className="timer-pill">{formatTime(timeLeft)}</span>}>
      <SEO title="Mock Exam CBT | ECET Rankers" robots="noindex, nofollow" />
      <section className="exam-overview">
        <div className="section-title">
          <p className="kicker">TS ECET full mock</p>
          <h2>{config.year} {branch.short} complete exam</h2>
          <p>Navigate sections, mark questions for review, and submit when you are ready. Your progress is saved automatically.</p>
        </div>

        <div className="exam-meta-panels">
          <div className="stats-strip">
            <div><span>Answered</span><strong>{Object.keys(answers).length}</strong></div>
            <div><span>Pending</span><strong>{questions.length - Object.keys(answers).length}</strong></div>
            <div><span>Review</span><strong>{Object.values(marked).filter(Boolean).length}</strong></div>
            <div><span>Total</span><strong>{questions.length}</strong></div>
          </div>
        </div>
      </section>

      <div className="exam-runner">
        <main className="exam-content">
          <section className="exam-subjects">
            {report.map((section) => (
              <button
                key={section.id}
                className={activeSection === section.id ? "subject-tab active" : "subject-tab"}
                onClick={() => jumpToSection(section.id)}
                title={`${section.answered} answered, ${section.notAnswered} not answered, ${section.notVisited} not visited, ${section.marked} review, ${section.answeredMarked} answered and review`}
              >
                <span>{section.id === "engineering" ? `${branch.short} Engineering` : section.label}</span>
                <small>{section.start}-{section.end}</small>
              </button>
            ))}
          </section>

          <section className="subject-status-panel">
            {statusRows(activeReport).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </section>

          <section className="question-card exam-question">
            <div className="question-meta"><span>Q{question.question_no}</span><span>{question.sectionLabel}</span><span>{question.topic}</span></div>
            <h2>{question.question}</h2>
            <div className="option-list">
              {question.options.map((option) => (
                <button key={option} className={draftAnswers[question.id] === option ? "option selected" : "option"} onClick={() => selectAnswer(option)}>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="exam-actions exam-action-group">
            <button className="ghost-button" onClick={saveCurrent}>Save Answer</button>
            <button className="ghost-button" onClick={markCurrent}>Mark for Review</button>
            <button className="ghost-button" onClick={saveAndMarkCurrent}>Save & Mark</button>
            <button className="ghost-button" onClick={clearCurrent}>Clear Response</button>
          </section>

          <section className="exam-actions exam-navigation-actions">
            <button className="ghost-button" disabled={index === 0} onClick={() => go(index - 1)}><ChevronLeft size={18} /> Previous</button>
            <button className="primary-button" disabled={index >= questions.length - 1} onClick={() => go(index + 1)}>Next <ChevronRight size={18} /></button>
            <button className="submit-button" onClick={() => setConfirming(true)}>Submit Test</button>
          </section>
        </main>

        <aside className="exam-sidebar">
          <div className="candidate-card"><div className="avatar">EC</div><div><strong>{branch.short} Candidate</strong><small>TS ECET simulation</small></div></div>

          <div className="legend-grid">
            <span><i className="legend answered" /> Answered</span>
            <span><i className="legend not-answered" /> Not Answered</span>
            <span><i className="legend marked" /> Review</span>
            <span><i className="legend answered-marked" /> Answered Review</span>
            <span><i className="legend current" /> Current</span>
            <span><i className="legend not-visited" /> Not Visited</span>
          </div>

          <div className="question-palette">
            {sectionQuestions.map((item) => {
              const itemIndex = questions.findIndex((q) => q.id === item.id)
              return (
                <button key={item.id} className={paletteClass(item, itemIndex, index, answers, marked, visited)} onClick={() => go(itemIndex)}>
                  {item.question_no}
                </button>
              )
            })}
          </div>

          <section className="issue-panel mock-issue">
            <div><AlertTriangle size={18} /><strong>Report issue</strong></div>
            <select value={issueType} onChange={(event) => setIssueType(event.target.value)}>{issueTypes.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}</select>
            <input value={issueMessage} onChange={(event) => setIssueMessage(event.target.value)} placeholder="Optional note" />
            <button className="ghost-button" onClick={submitIssue}>Submit report</button>
          </section>
        </aside>
      </div>
    </AppShell>
  )
}

function countStatuses(items, answers, marked, visited) {
  return items.reduce((counts, item) => {
    const hasAnswer = Boolean(answers[item.id])
    const isMarked = Boolean(marked[item.id])
    if (hasAnswer && isMarked) counts.answeredMarked += 1
    else if (hasAnswer) counts.answered += 1
    else if (isMarked) counts.marked += 1
    else if (visited[item.id]) counts.notAnswered += 1
    else counts.notVisited += 1
    return counts
  }, { answered: 0, notAnswered: 0, notVisited: 0, marked: 0, answeredMarked: 0 })
}

function statusRows(section) {
  const item = section || {}
  return [
    ["Answered", item.answered || 0],
    ["Not Answered", item.notAnswered || 0],
    ["Not Visited", item.notVisited || 0],
    ["Marked for Review", item.marked || 0],
    ["Answered & Marked", item.answeredMarked || 0]
  ]
}

function paletteClass(item, itemIndex, index, answers, marked, visited) {
  const current = itemIndex === index ? " current" : ""
  const hasAnswer = Boolean(answers[item.id])
  const isMarked = Boolean(marked[item.id])
  if (hasAnswer && isMarked) return `palette-button answered-marked${current}`
  if (isMarked) return `palette-button marked${current}`
  if (hasAnswer) return `palette-button answered${current}`
  if (visited[item.id]) return `palette-button not-answered${current}`
  return `palette-button not-visited${current}`
}

function removeKey(object, key) {
  const next = { ...object }
  delete next[key]
  return next
}

function readResume(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return null
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export default MockExam

