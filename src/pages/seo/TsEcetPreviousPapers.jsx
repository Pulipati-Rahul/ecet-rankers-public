import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { FileText, Download, Calendar } from "lucide-react"

function TsEcetPreviousPapers() {
  return (
    <AppShell title="TS ECET Previous Papers" kicker="Download and attempt past papers">
      <SEO 
        title="TS ECET Previous Year Question Papers | Download PDF & Attempt Online"
        description="Solve TS ECET previous year papers. Download year-wise PDF answer keys or practice them online as dynamic exams for CSE, ECE, EEE, Civil, and Mechanical."
        keywords="ts ecet previous papers, ecet pyq pdf, ecet 2026 paper, download ecet papers"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Attempt and Download TS ECET Previous Year Papers</h2>
          <p>
            Solving past exam question papers is the most effective way to understand weightages, repeated question models, and language styles. Our archive contains papers from 2021 to 2026 for all engineering branches.
          </p>
          <div style={{ marginTop: '8px' }}>
            <Link className="button button-light" to="/previous-papers">Browse Previous Papers</Link>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Why Practice Past Papers?</h2>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>Analyze Trends:</strong> Find out which chapters from Engineering Core are repeated year-on-year.</li>
            <li><strong>Self-Assessment:</strong> Take past papers as timed 3-hour tests to calculate your potential state rank.</li>
            <li><strong>Formulas Alignment:</strong> Most Math and Physics numericals follow the exact same formulas, changing only numbers.</li>
          </ul>
        </section>
      </div>
    </AppShell>
  )
}

export default TsEcetPreviousPapers
