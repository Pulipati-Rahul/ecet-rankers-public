import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Trophy } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import SectionCard from "../components/SectionCard"
import { branches, subjects, years } from "../config/exam"
import { useAuth } from "../context/AuthContext"
import { getPracticeQuestions, getTopics } from "../services/questionService"

const STORAGE_KEY = "ecet-practice-progress"

function Practice() {
  const { user, loading: authLoading } = useAuth()
  const [saved] = useState(() => readSavedProgress())
  const [branch, setBranch] = useState(saved.branch || "cse")
  const [year, setYear] = useState(saved.year || "2025")
  const [subject, setSubject] = useState(saved.subject || "all")
  const [topic, setTopic] = useState("all")
  const [topics, setTopics] = useState([])
  const [currentIndex, setCurrentIndex] = useState(saved.currentIndex || 0)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!user) return
    let live = true

    getPracticeQuestions({ branch, year, subject, topic }).then((items) => {
      if (!live) return

      setQuestions(items)
      setCurrentIndex(0)
      setSelectedOption("")
      setSubmitted(false)
      setCompleted(false)
      setLoading(false)
    }).catch((error) => {
      if (!live) return
      setMessage(error.message || "Could not load questions from Supabase.")
      setQuestions([])
      setCurrentIndex(0)
      setSelectedOption("")
      setSubmitted(false)
      setCompleted(false)
      setLoading(false)
    })

    return () => {
      live = false
    }
  }, [branch, subject, year, topic, user])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ branch, year, subject, currentIndex }))
  }, [branch, currentIndex, subject, year, topic])
 useEffect(() => {
  async function loadTopics() {
    const data = await getTopics(branch, subject, year)
    setTopics(data)
  }

  loadTopics()
}, [branch, subject, year])

  const currentQuestion = questions[currentIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null
  const score = useMemo(() => Object.values(answers).filter((item) => item.isCorrect).length, [answers])
  const attempted = Object.keys(answers).length
  const percentage = attempted ? Math.round((score / attempted) * 100) : 0
  const subjectAnalytics = useMemo(() => getSubjectAnalytics(questions, answers), [answers, questions])

  function updateBranch(value) {
  setLoading(true)
  setMessage("")
  setBranch(value)

  if (subject === "engineering") {
    setTopic("all")
  }

  resetRun()
}
  function updateSubject(value) {
  setLoading(true)
  setMessage("")
  setSubject(value)
  setTopic("all")   // IMPORTANT
  resetRun()
}
  function updateTopic(value) {
    setLoading(true)
    setMessage("")
    setTopic(value)
    resetRun()
  }

  function updateYear(value) {
    setLoading(true)
    setMessage("")
    setYear(value)
    resetRun()
  }

  function selectOption(option) {
    if (submitted) return
    setSelectedOption(option)
  }

  function submitAnswer() {
    if (!currentQuestion || !selectedOption) {
      setMessage("Select one option before submitting.")
      return
    }

    const isCorrect = selectedOption === currentQuestion.answer

    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: {
        selected: selectedOption,
        isCorrect
      }
    }))
    setSubmitted(true)
    setMessage("")
  }

  function goToQuestion(nextIndex) {
    const boundedIndex = Math.max(0, Math.min(nextIndex, questions.length - 1))
    const nextQuestion = questions[boundedIndex]
    const nextAnswer = nextQuestion ? answers[nextQuestion.id] : null

    setCurrentIndex(boundedIndex)
    setSelectedOption(nextAnswer?.selected || "")
    setSubmitted(Boolean(nextAnswer))
    setMessage("")
  }

  function resetRun() {
    setAnswers({})
    setCurrentIndex(0)
    setSelectedOption("")
    setSubmitted(false)
    setCompleted(false)
    setStarted(false)
    setMessage("")
  }

  if (authLoading) {
    return (
      <AppShell title="Practice" kicker="Checking secure access">
        <section className="empty-state"><Loader2 className="spin" /><h2>Checking login</h2><p>Please wait a moment.</p></section>
      </AppShell>
    )
  }

  if (!user) {
    return (
      <AppShell title="Practice" kicker="Login required">
        <section className="locked-panel">
          <div className="lock-icon"><CheckCircle2 size={26} /></div>
          <h2>Login to start practice</h2>
          <p>You can view the app freely, but practice attempts are saved only after signup or login.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/auth?next=/practice">Login / Signup</Link>
            <Link className="button button-secondary" to="/">Back home</Link>
          </div>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Practice" kicker="Verified Supabase questions">
      <SEO 
        title="Online TS ECET Practice Engine | Topic-wise MCQ Quizzes"
        description="Solve topic-wise multiple-choice questions for TS ECET. Filter by year, branch, and subject with instant answers and performance explanations."
        keywords="ts ecet practice, ecet online practice questions, ecet mcq quizzes, study engineering topics"
      />
      <SectionCard title="Choose your practice setup" subtitle="Smart filters">
        <div className="filter-grid">
          <div className="select-field">
            <label htmlFor="branch">Branch</label>
            <select id="branch" value={branch} onChange={(event) => updateBranch(event.target.value)}>
              {branches.map((item) => <option key={item.id} value={item.id}>{item.short} - {item.label}</option>)}
            </select>
          </div>

          <div className="select-field">
            <label htmlFor="year">Year</label>
            <select id="year" value={year} onChange={(event) => updateYear(event.target.value)}>
              {years.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="select-field">
            <label htmlFor="subject">Subject</label>
            <select id="subject" value={subject} onChange={(event) => updateSubject(event.target.value)}>
              {subjects.map((item) => <option key={item.id} value={item.id}>{item.group}: {item.label}</option>)}
            </select>
          </div>

          {topics.length > 0 && (
            <div className="select-field">
              <label htmlFor="topic">Topic</label>
              <select id="topic" value={topic} onChange={(event) => updateTopic(event.target.value)}>
                <option value="all">All Topics</option>
                {topics.map((item) => <option key={item.topic_id} value={item.topic_id}>{item.topic}</option>)}
              </select>
            </div>
          )}
        </div>
        <div style={{ marginTop: '16px', fontSize: '0.9rem', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-secondary)' }}>
          <span>Want a full simulated exam experience?</span>
          <Link to="/mock-tests" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>Try Mock Tests &rarr;</Link>
        </div>
      </SectionCard>

      {loading ? (
        <section className="empty-state"><Loader2 className="spin" /><h2>Loading questions</h2><p>Fetching verified questions from Supabase.</p></section>
      ) : !started ? (
        questions.length > 0 ? (
          <div className="practice-lobby-card">
            <Trophy size={48} className="lobby-icon" />
            <h2>Ready to start?</h2>
            <p>We found <strong>{questions.length} verified questions</strong> matching your selected branch, subject, and topic filters.</p>
            <button className="button button-primary start-practice-btn" onClick={() => setStarted(true)}>Start Practice</button>
          </div>
        ) : (
          <section className="empty-state">
            <h2>No questions found</h2>
            <p>No Supabase questions match this branch, year, and subject yet.</p>
          </section>
        )
      ) : !currentQuestion ? (
        <section className="empty-state"><h2>No questions found</h2><p>No Supabase questions match this branch, year, and subject yet.</p></section>
      ) : completed ? (
        <section className="result-panel">
          <div className="result-hero">
            <div>
              <p className="kicker">Practice complete</p>
              <h2>{score}/{questions.length} correct</h2>
              <p>Total questions: {questions.length}. Attempted: {attempted}. Accuracy: {percentage}%.</p>
            </div>
            <div className="rank-badge"><strong>{percentage}%</strong><span>Accuracy</span></div>
          </div>
          <div className="weak-list">
            {subjectAnalytics.map((item) => <span key={item.subject}>{item.subject} <strong>{item.correct}/{item.attempted}</strong></span>)}
          </div>
          <div className="sticky-actions">
            <button className="button button-secondary" onClick={resetRun}>Restart</button>
            <button className="button button-primary" onClick={resetRun}>Try again</button>
          </div>
        </section>
      ) : (
        <div className="practice-grid">
          <section className="question-card">
            <div className="practice-toolbar">
              <div className="progress-strip">
                <span>Q {currentIndex + 1}/{questions.length}</span>
                <progress value={currentIndex + 1} max={questions.length} />
                <strong>{score}/{attempted || 0}</strong>
              </div>
            </div>
            <div className="question-meta">
              <span>Q{currentQuestion.question_no}</span>
              <span>{currentQuestion.subject}</span>
              <span>{currentQuestion.topic}</span>
            </div>
            <h2>{currentQuestion.question}</h2>
            <div className="option-list">
              {currentQuestion.options.slice(0, 4).map((option) => (
                <button key={`${currentQuestion.id}-${option}`} className={`option-button ${getOptionClass(option, selectedOption, currentQuestion.answer, submitted)}`} type="button" onClick={() => selectOption(option)}>
                  <span>{option}</span>
                  {selectedOption === option && <small>Selected</small>}
                </button>
              ))}
            </div>
            {message && <p className="helper-text">{message}</p>}
            {submitted && (
              <section className={currentAnswer?.isCorrect ? "answer-panel correct" : "answer-panel wrong"}>
                <p className="kicker">Result</p>
                <h3>{currentAnswer?.isCorrect ? "Correct" : "Incorrect"}</h3>
                <p>Correct answer: {currentQuestion.answer || "Pending verification"}</p>
                <p>Explanation: {currentQuestion.explanation || "No explanation available"}</p>
              </section>
            )}
          </section>

          <div className="sticky-actions">
            <button className="button button-ghost" disabled={currentIndex === 0} onClick={() => goToQuestion(currentIndex - 1)}><ChevronLeft size={18} /> Previous</button>
            {!submitted ? (
              <button className="button button-primary" disabled={!selectedOption} onClick={submitAnswer}><CheckCircle2 size={18} /> Submit</button>
            ) : currentIndex >= questions.length - 1 ? (
              <button className="button button-primary" onClick={() => setCompleted(true)}><CheckCircle2 size={18} /> View results</button>
            ) : (
              <button className="button button-primary" onClick={() => goToQuestion(currentIndex + 1)}>Next <ChevronRight size={18} /></button>
            )}
          </div>
        </div>
      )}
    </AppShell>
  )
}

function getOptionClass(option, selected, answer, submitted) {
  if (!submitted) {
    return option === selected ? "selected" : ""
  }

  if (option === answer) return "correct"
  if (option === selected) return "wrong"
  return "muted"
}

function getSubjectAnalytics(questions, answers) {
  const analytics = new Map()

  for (const question of questions) {
    const subject = question.subject || "Unclassified"
    const current = analytics.get(subject) || { subject, attempted: 0, correct: 0 }
    const answer = answers[question.id]

    if (answer) {
      current.attempted += 1
      if (answer.isCorrect) {
        current.correct += 1
      }
    }

    analytics.set(subject, current)
  }

  return [...analytics.values()]
}

function readSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

export default Practice
