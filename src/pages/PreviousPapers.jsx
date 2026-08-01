import { AlertCircle, BookOpen, Download, FileText } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import SectionCard from "../components/SectionCard"
import { branches, getBranch, years } from "../config/exam"
import { useAuth } from "../context/AuthContext"

function PreviousPapers() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [params] = useSearchParams()
  const [branchId, setBranchId] = useState(params.get("branch") || "cse")
  const [year, setYear] = useState("2025")
  const branch = getBranch(branchId)

  // Resolve Supabase Storage public PDF path directly from env or fallback project domain
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ldviluqyhhspbwpwhjhu.supabase.co"
  const pdfUrl = `${supabaseUrl}/storage/v1/object/public/papers/${year}/${branchId}.pdf`

  function downloadPaper(event) {
    if (user) return
    event.preventDefault()
    navigate(`/auth?next=/previous-papers?branch=${branchId}`)
  }

  return (
    <AppShell title="Previous Papers" kicker="Official TS ECET PDF portal">
      <SEO 
        title="Download TS ECET Previous Year Question Papers PDF"
        description="Download and solve official TS ECET previous year question papers from 2021 to 2026. Practice offline or attempt them online as mock exams."
        keywords="ts ecet previous year papers, ecet question papers pdf download, ecet core engineering papers, ts ecet cse previous papers"
      />
      <SectionCard title="Select engineering paper" subtitle="Official question sources">
        <div className="filter-grid">
          <div className="select-field">
            <label htmlFor="branch">Branch</label>
            <select id="branch" value={branchId} onChange={(event) => setBranchId(event.target.value)}>
              {branches.map((item) => <option key={item.id} value={item.id}>{item.short} - {item.label}</option>)}
            </select>
          </div>
          <div className="select-field">
            <label htmlFor="year">Year</label>
            <select id="year" value={year} onChange={(event) => setYear(event.target.value)}>
              {years.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </SectionCard>

      <section className="paper-dashboard-container">
        <div className="paper-preview-cover">
          <div className="pdf-badge">PDF</div>
          <FileText size={48} className="doc-icon" />
          <div className="paper-meta-brand">TS ECET</div>
          <div className="paper-meta-year">{year}</div>
          <div className="paper-meta-branch">{branch.short}</div>
        </div>

        <div className="paper-details-panel">
          <div className="detail-header">
            <p className="kicker">Verified document source</p>
            <h2>{year} {branch.label}</h2>
            <p className="paper-desc">Download the official TS ECET CBT question paper. Practice and full mock tests are loaded separately from our verified database question banks.</p>
          </div>

          <div className="paper-structure-grid">
            <div className="structure-metric"><strong>50 Qs</strong><span>Mathematics</span></div>
            <div className="structure-metric"><strong>25 Qs</strong><span>Physics</span></div>
            <div className="structure-metric"><strong>25 Qs</strong><span>Chemistry</span></div>
            <div className="structure-metric"><strong>100 Qs</strong><span>{branch.short} Core</span></div>
          </div>

          <div className="paper-actions-panel">
            <a className="primary-button download-pdf-btn" href={pdfUrl} download target="_blank" rel="noreferrer" onClick={downloadPaper}>
              <Download size={18} /> Download Paper PDF
            </a>
            <Link className="ghost-button solve-online-btn" to={`/practice?branch=${branchId}&year=${year}`}>
              <BookOpen size={18} /> Solve Online
            </Link>
          </div>

          {!user && (
            <div className="auth-alert-banner">
              <AlertCircle size={16} />
              <span>Please <strong>login or sign up</strong> first to download official PDFs.</span>
            </div>
          )}


        </div>
      </section>
    </AppShell>
  )
}

export default PreviousPapers
