import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { ShieldCheck, CheckCircle, RefreshCw } from "lucide-react"

function TsEcetMockTest() {
  return (
    <AppShell title="TS ECET Mock Tests" kicker="Full-length exam simulations">
      <SEO 
        title="TS ECET Mock Test | Timed Online Exam Practice (200 Questions)"
        description="Take free online TS ECET mock tests. Practice under real exam conditions: 200 questions, 180 minutes, section-wise navigation, and performance analysis."
        keywords="ts ecet mock test, free ecet online exam, ecet test series, full length ecet mock"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Prepare with Real-time TS ECET Online Mock Exams</h2>
          <p>
            Practicing in a timed environment is the key to building confidence. Our mock test series matches the exact interface and timing constraints of the state-level TS ECET computer-based test (CBT).
          </p>
          <div style={{ marginTop: '8px' }}>
            <Link className="button button-light" to="/mock-tests">Go to Mock Tests</Link>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Features of our Mock Exams</h2>
          <div style={{ display: 'grid', gap: '16px', marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--primary)' }}><ShieldCheck size={20} /></span>
              <p><strong>Exact Pattern:</strong> 200 multiple-choice questions split into Math (50), Physics (25), Chemistry (25), and Engineering Core (100).</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)' }}><CheckCircle size={20} /></span>
              <p><strong>Review Flagging:</strong> Bookmark tricky questions for review so you can return to them later without losing your responses.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--warm)' }}><RefreshCw size={20} /></span>
              <p><strong>Instant Analysis:</strong> Receive immediate results indicating accuracy percentage, section scores, and detailed solution manuals.</p>
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '0.95rem', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            Prefer practicing with official offline papers? <Link to="/ts-ecet-previous-papers" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>Download TS ECET Previous Year Papers</Link>
          </p>
        </section>
      </div>
    </AppShell>
  )
}

export default TsEcetMockTest
