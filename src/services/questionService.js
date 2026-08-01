import supabase from "../lib/supabase"
import { getBranch, getSection, years } from "../config/exam"

const COMMON_SUBJECTS = ["mathematics", "physics", "chemistry"]
const QUESTION_COLUMNS =
  "id,paper_code,branch,year,question_no,subject,topic,topic_id,explanation,question,options,correct_answer"

export async function getPracticeQuestions(filters = {}) {
  const {
    branch = "cse",
    branchId,
    year,
    subject = "mathematics",
    topic
  } = filters
  const selectedBranch = branchId || branch
  const branchMeta = getBranch(selectedBranch)

  let query = supabase
    .from("questions")
    .select(QUESTION_COLUMNS)
    .eq("branch", selectedBranch)
    .order("question_no", { ascending: true })

  if (year && year !== "all") {
    query = query.eq("year", Number(year))
  }

  const { data, error } = await query
  if (error) {
    console.error("Practice question fetch failed", error)
    return []
  }

  let normalized = normalizeQuestions(data || [], branchMeta)

  if (subject && subject !== "all") {
    normalized = normalized.filter(q => q.subject === subject)
  }

  if (topic && topic !== "all") {
    normalized = normalized.filter(q => q.topic_id === topic)
  }

  return normalized
}

export async function fetchQuestions({ branchId = "cse", year, subject = "mathematics", count = 25, allYears = false }) {
  const questions = await getPracticeQuestions({
    branch: branchId,
    year: allYears ? null : year,
    subject: subject === "all" ? null : subject
  })

  return count ? questions.slice(0, count) : questions
}

export async function fetchFullPaper({ branchId = "cse", year = years[0] }) {
  const branch = getBranch(branchId)
  const paperCode = `TG_ECET_${branch.short}_${year}`
  let { data, error } = await supabase
    .from("questions")
    .select(QUESTION_COLUMNS)
    .eq("paper_code", paperCode)
    .order("question_no", { ascending: true })
    .limit(200)

  if ((!error && data?.length) || error) {
    if (!error && data?.length) {
      return normalizeQuestions(data, branch).slice(0, 200)
    }
    if (error) console.error("Full paper fetch failed", error)
  }

  const fallbackQuery = supabase
    .from("questions")
    .select(QUESTION_COLUMNS)
    .eq("branch", branchId)
    .eq("year", Number(year))
    .order("question_no", { ascending: true })
    .limit(200)

  const fallbackResult = await fallbackQuery
  if (!fallbackResult.error && fallbackResult.data?.length) {
    return normalizeQuestions(fallbackResult.data, branch).slice(0, 200)
  }

  if (fallbackResult.error) {
    console.error("Fallback full paper fetch failed", fallbackResult.error)
  }

  return []
}

export function normalizeQuestions(rows, branch) {
  return rows.map((row, index) => {
    const questionNo = Number(row.question_no || index + 1)
    const subject = normalizeSubject(row.subject, questionNo)
    const section = getSection(subject)
    const options = normalizeOptions(row.options)

    return {
      id: row.id || `${row.year || "pdf"}-${branch.id}-${questionNo}`,
      paper_id: row.paper_id || null,
      paper_code: row.paper_code || `${branch.short}-${row.year || "PDF"}`,
      year: row.year ? Number(row.year) : null,
      branch: row.branch || branch.id,
      branchLabel: branch.short,
      subject,
      section: section.id,
      sectionLabel: section.id === "engineering" ? `${branch.short} Engineering` : section.label,
      topic: row.topic || getTopicLabel(subject, branch),
      topic_id: row.topic_id || null,
      question_no: questionNo,
      question: row.question || "",
      options,
      answer: normalizeAnswer(row.correct_answer, options),
      explanation: row.explanation || "Explanation not available.",
      difficulty: "Unrated",
      sourcePaper: row.paper_code || `${row.year || "Uploaded"} ${branch.short} TS ECET`
    }
  }).filter((item) => item.question && item.options.length)
}

function normalizeSubject(subject, questionNo) {
  const value = String(subject || "").toLowerCase()
  if (["mathematics", "maths", "math"].includes(value)) return "mathematics"
  if (value === "physics") return "physics"
  if (value === "chemistry") return "chemistry"
  if (["engineering", "core"].includes(value)) return "engineering"
  if (COMMON_SUBJECTS.includes(value)) return value
  if (questionNo >= 1 && questionNo <= 50) return "mathematics"
  if (questionNo >= 51 && questionNo <= 75) return "physics"
  if (questionNo >= 76 && questionNo <= 100) return "chemistry"
  return "engineering"
}

function normalizeOptions(options) {
  if (Array.isArray(options)) return options.filter(Boolean)
  if (options && typeof options === "object") return Object.values(options).filter(Boolean)
  if (typeof options === "string") {
    try {
      return normalizeOptions(JSON.parse(options))
    } catch {
      return options.split(/\n|,/).map((item) => item.trim()).filter(Boolean)
    }
  }
  return []
}

function normalizeAnswer(answer, options) {
  if (answer === null || answer === undefined || answer === "") return null
  if (typeof answer === "number") return options[answer - 1] || String(answer)
  const text = String(answer)
  if (/^[1-4]$/.test(text)) return options[Number(text) - 1] || text
  if (/^[A-D]$/i.test(text)) return options[text.toUpperCase().charCodeAt(0) - 65] || text
  return text
}

function getTopicLabel(subject, branch) {
  if (subject === "mathematics") return "Mathematics"
  if (subject === "physics") return "Physics"
  if (subject === "chemistry") return "Chemistry"
  return `${branch.short} Core`
}

export async function getTopics(branch, subject, year) {
  if (!branch || !subject || subject === "all") return []

  const { data, error } = await supabase
    .from("questions")
    .select("topic, topic_id, subject, question_no")
    .eq("branch", branch)
    .eq("year", Number(year))

  if (error) {
    console.error(error)
    return []
  }

  const unique = new Map()

  data.forEach((item) => {
    if (!item.topic_id) return

    // Normalize subject to match the requested subject filter
    const normalizedSub = normalizeSubject(item.subject, Number(item.question_no))
    if (normalizedSub !== subject) return

    if (!unique.has(item.topic_id)) {
      unique.set(item.topic_id, item)
    }
  })

  return Array.from(unique.values()).sort((a, b) =>
    a.topic.localeCompare(b.topic)
  )
}