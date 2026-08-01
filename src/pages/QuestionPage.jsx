import { AlertTriangle, Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { getBranch } from "../config/exam"
import { reportQuestionIssue } from "../services/issueService"
import { fetchQuestions } from "../services/questionService"
import { writeAttempt } from "../services/progressService"

const issueTypes = ["wrong_answer", "missing_option", "ocr_mistake", "typo"]

function QuestionPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const config = useMemo(
    () => state || { branchId: "cse", year: "2025", subject: "mathematics", count: 25, allYears: true, title: "Practice" },
    [state]
  )
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [bookmarks, setBookmarks] = useState({})
  const [done, setDone] = useState(false)
  const [issueType, setIssueType] = useState(issueTypes[0])
  const [issueMessage, setIssueMessage] = useState("")

  useEffect(() => {
    let live = true
    fetchQuestions(config).then((items) => {
      if (!live) return
      setQuestions(items)
      setIndex(0)
      setLoading(false)
    })
    return () => { live = false }
  }, [config])

  const question = questions[index]
  const score = useMemo(() => questions.reduce((sum, item) => sum + (answers[item.id] === item.answer ? 1 : 0), 0), [answers, questions])
  const attempted = Object.keys(answers).length
  const branch = getBranch(config.branchId)

  async function finishPractice() {
    const attempt = {
      type: "practice",
      branch: branch.short,
      year: config.allYears ? null : config.year,
      subject: config.subject,
      score,
      correct: score,
      attempted,
      total: questions.length,
      accuracy: attempted ? Math.round((score / attempted) * 100) : 0,
      answers,
      date: new Date().toLocaleDateString()
    }
    await writeAttempt(attempt)
    setDone(true)
  }

  async function submitIssue() {
    if (!question) return
    try {
      await reportQuestionIssue({ question, issueType, notes: issueMessage })
      setIssueMessage("Reported. Faculty/admin can review this question.")
    } catch {
      setIssueMessage("Could not submit report. Check Supabase issue_reports table/RLS.")
    }
  }

  if (loading) {
    return (
      <AppShell title="Practice" kicker="Loading questions">
        <SEO title="Question Practice | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state"><Loader2 className="spin" /><h2>Fetching verified questions</h2><p>Practice uses Supabase question records only.</p></section>
      </AppShell>
    )
  }

  if (!question) {
    return (
      <AppShell title="Practice" kicker="No questions">
        <SEO title="Question Practice | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state"><h2>No verified questions found</h2><p>Try a different branch, subject, topic, or year after importing PDF questions into Supabase.</p></section>
      </AppShell>
    )
  }

  return (
    <AppShell title={config.title || "Practice"} kicker={`${branch.short} | ${config.allYears ? "All years" : config.year}`}>
      <SEO title="Question Practice | ECET Rankers" robots="noindex, nofollow" />
      {done ? (
        <section className="result-panel">
          <div className="result-hero">
            <div><p className="kicker">Practice complete</p><h2>{score}/{questions.length} correct</h2><p>Attempted {attempted} questions with {attempted ? Math.round((score / attempted) * 100) : 0}% accuracy.</p></div>
            <div className="rank-badge"><strong>{score}</strong><span>score</span></div>
          </div>
          <div className="result-actions">
            <button className="primary-button" onClick={() => navigate("/analytics")}>View Analytics</button>
            <button className="ghost-button" onClick={() => navigate("/practice")}>New Practice</button>
          </div>
        </section>
      ) : (
        <div className="practice-runner">
          <section className="progress-strip">
            <span>Question {index + 1} of {questions.length}</span>
            <progress value={index + 1} max={questions.length} />
            <strong>{score} correct</strong>
          </section>
          <section className="question-card">
            <div className="question-meta">
              <span>Q{question.question_no}</span><span>{question.sectionLabel}</span><span>{question.topic}</span><span>{question.difficulty}</span>
            </div>
            <h2>{question.question}</h2>
            <p className="source-line">{question.sourcePaper}</p>
            <div className="option-list">
              {question.options.map((option) => (
                <button key={option} className={getOptionClass(option, answers[question.id], question.answer)} onClick={() => setAnswers((value) => ({ ...value, [question.id]: option }))}>
                  <span>{option}</span>
                  {answers[question.id] === option && <small>Selected</small>}
                </button>
              ))}
            </div>
          </section>
          {answers[question.id] && (
            <section className={answers[question.id] === question.answer ? "answer-panel correct" : "answer-panel wrong"}>
              <p className="kicker">Explanation</p>
              <h3>{answers[question.id] === question.answer ? "Correct" : `Correct answer: ${question.answer || "Pending verification"}`}</h3>
              <p>{question.explanation}</p>
            </section>
          )}
          <section className="issue-panel">
            <div><AlertTriangle size={18} /><strong>Report issue</strong></div>
            <select value={issueType} onChange={(event) => setIssueType(event.target.value)}>
              {issueTypes.map((item) => <option key={item} value={item}>{item.replaceAll("_", " ")}</option>)}
            </select>
            <input value={issueMessage} onChange={(event) => setIssueMessage(event.target.value)} placeholder="Optional note" />
            <button className="ghost-button" onClick={submitIssue}>Submit report</button>
          </section>
          <section className="runner-actions">
            <button className="ghost-button" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}><ChevronLeft size={18} /> Previous</button>
            <button className="ghost-button" onClick={() => setBookmarks((value) => ({ ...value, [question.id]: !value[question.id] }))}><Bookmark size={18} /> {bookmarks[question.id] ? "Saved" : "Bookmark"}</button>
            {index === questions.length - 1 ? (
              <button className="primary-button" onClick={finishPractice}><CheckCircle2 size={18} /> Finish</button>
            ) : (
              <button className="primary-button" onClick={() => setIndex((value) => value + 1)}>Next <ChevronRight size={18} /></button>
            )}
          </section>
        </div>
      )}
    </AppShell>
  )
}

function getOptionClass(option, selected, answer) {
  if (!selected) return "option"
  if (option === answer) return "option correct"
  if (option === selected) return "option wrong"
  return "option muted"
}

export default QuestionPage

