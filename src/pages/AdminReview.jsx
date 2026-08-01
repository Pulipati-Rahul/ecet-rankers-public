import { AlertTriangle, CheckCircle2, SkipForward, XCircle } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { useAuth } from "../context/AuthContext"
import supabase from "../lib/supabase"

const emptyForm = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  answer: "",
  subject: "",
  topic: ""
}

function AdminReview() {
  const { isAdmin } = useAuth()
  const [record, setRecord] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [queueVersion, setQueueVersion] = useState(0)
  const [skippedIds, setSkippedIds] = useState([])

  const makeForm = useCallback((row) => {
    if (!row) return emptyForm

    const options = normalizeOptions(row.options)

    return {
      question: row.question || row.raw_ocr_text || "",
      optionA: options[0] || "",
      optionB: options[1] || "",
      optionC: options[2] || "",
      optionD: options[3] || "",
      answer: row.correct_answer || row.answer || "",
      subject: row.subject || "",
      topic: row.topic || ""
    }
  }, [])

  const fetchNext = useCallback(async () => {
    if (!isAdmin) {
      return
    }

    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("is_verified", false)
      .order("paper_code", { ascending: true })
      .order("question_no", { ascending: true })
      .limit(50)

    if (error) {
      setMessage(error.message)
      setRecord(null)
      setLoading(false)
      return
    }

    const row = (data || []).find((item) => !skippedIds.includes(item.id)) || null

    setMessage("")
    setRecord(row)
    setForm(makeForm(row))
    setLoading(false)
  }, [isAdmin, makeForm, skippedIds])

  useEffect(() => {
    queueMicrotask(fetchNext)
  }, [fetchNext, queueVersion])

  async function saveAndNext() {
    if (!record || saving) return

    setSaving(true)
    setMessage("")


    const options = [form.optionA, form.optionB, form.optionC, form.optionD].map((value) => value.trim())
    const { error } = await supabase
      .from("questions")
      .update({
        question: form.question.trim(),
        options,
        correct_answer: String(form.answer).trim(),
        subject: form.subject.trim(),
        topic: form.topic.trim() || null,
        needs_review: false,
        is_verified: true
      })
      .eq("id", record.id)

    setSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    loadNext()
  }

  function skip() {
    if (!record || saving) return

    setSkippedIds((current) => [...new Set([...current, record.id])])
    loadNext()
  }

  async function markInvalid() {
    if (!record || saving) return

    setSaving(true)
    setMessage("")

    const { error } = await supabase
      .from("questions")
      .update({
        
        needs_review: false,
        is_verified: true
      })
      .eq("id", record.id)

    setSaving(false)

    if (error) {
      setMessage(error.message)
      return
    }

    loadNext()
  }

  function updateForm(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value
    }))
  }

  function loadNext() {
    setLoading(true)
    setMessage("")
    setQueueVersion((value) => value + 1)
  }

  function imageSrc(row) {
    const source = row?.image_url || row?.image_path || ""

    if (/^https?:\/\//i.test(source) || source.startsWith("/")) {
      return source
    }

    return `/${source.replace(/\\/g, "/")}`
  }

  if (!isAdmin) {
    return (
      <AppShell title="Admin Review" kicker="Restricted">
        <SEO title="Admin Review Queue | ECET Rankers" robots="noindex, nofollow" />
        <section className="empty-state">
          <AlertTriangle />
          <h2>Admin access required</h2>
          <p>Use an admin account to review OCR records and verify final questions.</p>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell title="Admin Review" kicker="Question verification queue">
      <SEO title="Admin Review Queue | ECET Rankers" robots="noindex, nofollow" />
      {loading ? (
        <section className="empty-state">
          <h2>Loading review queue</h2>
          <p>Fetching the next unverified question from Supabase.</p>
        </section>
      ) : !record ? (
        <section className="empty-state">
          <CheckCircle2 />
          <h2>No unverified questions</h2>
          <p>The review queue is empty.</p>
        </section>
      ) : (
        <section className="review-grid">
          <article className="chart-card review-image-panel">
            <p className="kicker">{record.paper_code} Q{record.question_no}</p>
            {record.image_url || record.image_path ? (
              <img src={imageSrc(record)} alt={`Question ${record.question_no}`} loading="lazy" />
            ) : (
              <p className="helper-text">No image path saved for this question.</p>
            )}
            {record.raw_ocr_text && <pre className="raw-ocr-text">{record.raw_ocr_text}</pre>}
          </article>

          <article className="chart-card">
            <p className="kicker">Manual correction</p>
            <div className="review-form">
              <label>
                Question text
                <textarea rows={7} value={form.question} onChange={(event) => updateForm("question", event.target.value)} />
              </label>
              <label>
                Option A
                <input value={form.optionA} onChange={(event) => updateForm("optionA", event.target.value)} />
              </label>
              <label>
                Option B
                <input value={form.optionB} onChange={(event) => updateForm("optionB", event.target.value)} />
              </label>
              <label>
                Option C
                <input value={form.optionC} onChange={(event) => updateForm("optionC", event.target.value)} />
              </label>
              <label>
                Option D
                <input value={form.optionD} onChange={(event) => updateForm("optionD", event.target.value)} />
              </label>
              <label>
                Correct answer
                <input value={form.answer} onChange={(event) => updateForm("answer", event.target.value)} />
              </label>
              <label>
                Subject
                <input value={form.subject} onChange={(event) => updateForm("subject", event.target.value)} />
              </label>
              <label>
                Topic
                <input value={form.topic} onChange={(event) => updateForm("topic", event.target.value)} />
              </label>

              {message && <p className="helper-text">{message}</p>}

              <div className="review-actions">
                <button className="primary-button" disabled={saving} onClick={saveAndNext}>
                  <CheckCircle2 size={18} /> Save & Next
                </button>
                <button className="ghost-button" disabled={saving} onClick={skip}>
                  <SkipForward size={18} /> Skip
                </button>
                <button className="submit-button" disabled={saving} onClick={markInvalid}>
                  <XCircle size={18} /> Mark Invalid
                </button>
              </div>
            </div>
          </article>
        </section>
      )}
    </AppShell>
  )
}

function normalizeOptions(value) {
  if (Array.isArray(value)) return value

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  return []
}

export default AdminReview
