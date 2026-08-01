import supabase from "../lib/supabase"

export async function reportQuestionIssue({ question, issueType, notes }) {
  const payload = {
    question_id: question.id,
    paper_id: question.paper_id || null,
    branch: question.branch,
    year: question.year,
    question_no: question.question_no,
    issue_type: issueType,
    notes: notes || null,
    status: "open"
  }

  const { error } = await supabase.from("issue_reports").insert(payload)
  if (error) throw error
  return payload
}
