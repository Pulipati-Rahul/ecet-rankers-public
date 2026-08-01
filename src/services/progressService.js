import supabase from "../lib/supabase"

const STORAGE_KEY = "ecet-wd-progress"

export function readProgress() {
  const attempts = readAttempts()
  return summarizeAttempts(attempts)
}

export async function writeAttempt(attempt) {
  const storedAttempt = {
    ...attempt,
    id: attempt.id || crypto.randomUUID?.() || `${Date.now()}`,
    created_at: new Date().toISOString()
  }
  const attempts = [storedAttempt, ...readAttempts()].slice(0, 100)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ attempts }))

  try {
    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id
    await supabase.from(attempt.type === "mock" ? "mock_attempts" : "practice_sessions").insert({
      ...toSupabaseAttempt(storedAttempt),
      ...(userId ? { user_id: userId } : {})
    })
  } catch (error) {
    console.warn("Attempt saved locally; Supabase write unavailable", error)
  }

  return summarizeAttempts(attempts)
}

export async function syncProgressWithSupabase(userId) {
  if (!userId) return null
  try {
    const [mockRes, practiceRes] = await Promise.all([
      supabase.from("mock_attempts").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
      supabase.from("practice_sessions").select("*").eq("user_id", userId).order("created_at", { ascending: false })
    ])

    if (mockRes.error) throw mockRes.error
    if (practiceRes.error) throw practiceRes.error

    const mockAttempts = (mockRes.data || []).map(row => ({
      id: row.id,
      type: "mock",
      branch: row.branch,
      year: row.year ? String(row.year) : null,
      score: row.score,
      correct: row.correct,
      attempted: row.attempted,
      total: row.total,
      accuracy: row.accuracy,
      timeSpent: row.time_spent,
      answers: row.answers,
      report: row.report,
      created_at: row.created_at
    }))

    const practiceAttempts = (practiceRes.data || []).map(row => ({
      id: row.id,
      type: "practice",
      branch: row.branch,
      year: row.year ? String(row.year) : null,
      score: row.score,
      correct: row.correct,
      attempted: row.attempted,
      total: row.total,
      accuracy: row.accuracy,
      timeSpent: row.time_spent,
      answers: row.answers,
      report: row.report,
      created_at: row.created_at
    }))

    const attempts = [...mockAttempts, ...practiceAttempts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 100)

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ attempts }))
    return summarizeAttempts(attempts)
  } catch (error) {
    console.error("Failed to sync progress with Supabase", error)
    return null
  }
}

export function readAttempts() {
  try {
    const payload = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(payload?.attempts) ? payload.attempts : []
  } catch {
    return []
  }
}

export function summarizeAttempts(attempts = readAttempts()) {
  const solved = attempts.reduce((sum, item) => sum + Number(item.attempted || 0), 0)
  const correct = attempts.reduce((sum, item) => sum + Number(item.correct || 0), 0)
  const mocks = attempts.filter((item) => item.type === "mock").length
  return {
    solved,
    correct,
    mocks,
    streak: calculateStreak(attempts),
    attempts
  }
}

export function subjectAccuracy(attempts = readAttempts()) {
  const totals = new Map()
  attempts.forEach((attempt) => {
    const report = attempt.report?.length ? attempt.report : [{ label: attempt.subject || "Practice", attempted: attempt.attempted, correct: attempt.correct }]
    report.forEach((item) => {
      const key = item.label || item.subject || "Practice"
      const current = totals.get(key) || { name: key, attempted: 0, correct: 0 }
      current.attempted += Number(item.attempted || 0)
      current.correct += Number(item.correct || 0)
      totals.set(key, current)
    })
  })

  return Array.from(totals.values()).map((item) => ({
    ...item,
    value: item.attempted ? Math.round((item.correct / item.attempted) * 100) : 0
  }))
}

function calculateStreak(attempts) {
  const days = new Set(attempts.map((item) => new Date(item.created_at || item.date).toDateString()))
  let streak = 0
  const cursor = new Date()
  while (days.has(cursor.toDateString())) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

function toSupabaseAttempt(attempt) {
  return {
    branch: attempt.branch,
    year: attempt.year ? Number(attempt.year) : null,
    score: attempt.score,
    correct: attempt.correct,
    attempted: attempt.attempted,
    total: attempt.total,
    accuracy: attempt.accuracy,
    time_spent: attempt.timeSpent || null,
    answers: attempt.answers || null,
    report: attempt.report || null,
    created_at: attempt.created_at
  }
}
