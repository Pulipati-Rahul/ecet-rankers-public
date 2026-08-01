const fs = require("fs")
const path = require("path")
require("dotenv").config()

const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

const dataDir = path.join(__dirname, "..", "data")

function normalizeOptions(options) {
  if (Array.isArray(options)) return options
  if (options && typeof options === "object") return Object.values(options)
  return []
}

async function main() {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".json"))

  for (const file of files) {
    try {
      console.log("Importing:", file)

      const raw = fs.readFileSync(path.join(dataDir, file), "utf8")
      const questions = JSON.parse(raw)
   

    const rows = questions.map(q => ({
      paper_code: q.paper_code,
      branch: q.branch,
      year: q.year,
      question_no: q.question_no,
      subject: q.subject,
      topic: q.topic,
      topic_id: q.topic_id,
      question: q.question,
      options: normalizeOptions(q.options),
      correct_answer: q.correct_answer,
      explanation: q.explanation
    }))

  

   const { error } = await supabase
  .from("questions")
  .upsert(rows, {
    onConflict: "paper_code,question_no"
  })

   if (error) {
  console.error("FAILED FILE:", file)
  console.error(error)
  continue
}

    console.log(`${rows.length} inserted`)
  }catch (err) {
    console.error("CRASHED FILE:", file)
    console.error(err)
  }
 }
}
main().catch(console.error)