export const ECET_SECTIONS = [
  { id: "mathematics", label: "Mathematics", short: "Maths", start: 1, end: 50, count: 50 },
  { id: "physics", label: "Physics", short: "Physics", start: 51, end: 75, count: 25 },
  { id: "chemistry", label: "Chemistry", short: "Chemistry", start: 76, end: 100, count: 25 },
  { id: "engineering", label: "Engineering", short: "Core", start: 101, end: 200, count: 100 }
]

export const EXAM_DURATION_SECONDS = 180 * 60

export const branches = [
  { id: "cse", short: "CSE", label: "Computer Science Engineering", color: "#2563eb" },
  { id: "ece", short: "ECE", label: "Electronics and Communication", color: "#059669" },
  { id: "eee", short: "EEE", label: "Electrical and Electronics", color: "#b45309" },
  { id: "civil", short: "CIVIL", label: "Civil Engineering", color: "#6d7f1f" },
  { id: "mech", short: "MECH", label: "Mechanical Engineering", color: "#dc2626" }
]

export const years = ["2026", "2025", "2024", "2023", "2022", "2021"]

export const subjects = [
  { id: "all", label: "All Subjects", group: "Practice" },
  { id: "mathematics", label: "Mathematics", group: "Common" },
  { id: "physics", label: "Physics", group: "Common" },
  { id: "chemistry", label: "Chemistry", group: "Common" },
  { id: "engineering", label: "Engineering Core", group: "Branch" }
]

export const branchTopics = {
  cse: ["Digital Electronics", "Data Structures", "DBMS", "Operating Systems", "Computer Networks", "Web Technologies"],
  ece: ["Electronic Devices", "Circuit Theory", "Digital Electronics", "Communication Systems", "Microcontrollers"],
  eee: ["Electrical Machines", "Transformers", "Power Systems", "Measurements", "Power Electronics"],
  civil: ["Surveying", "RCC Structures", "Hydraulics", "Transportation", "Building Materials"],
  mech: ["Manufacturing", "Thermodynamics", "Fluid Mechanics", "Strength of Materials", "Machine Design"]
}

export function getBranch(branchId = "cse") {
  return branches.find((branch) => branch.id === branchId) || branches[0]
}

export function getSection(subject) {
  if (subject === "mathematics") return ECET_SECTIONS[0]
  if (subject === "physics") return ECET_SECTIONS[1]
  if (subject === "chemistry") return ECET_SECTIONS[2]
  return ECET_SECTIONS[3]
}
