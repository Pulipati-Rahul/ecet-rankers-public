import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, Layers } from "lucide-react"

function TsEcetPracticeQuestions() {
  return (
    <AppShell title="TS ECET Practice Questions" kicker="Topic-wise preparation">
      <SEO 
        title="TS ECET Practice Questions | Subject & Chapter-wise MCQ Prep"
        description="Enhance your prep with topic-wise TS ECET practice questions. Practice Mathematics, Physics, Chemistry, and Engineering MCQs with instant answer keys."
        keywords="ts ecet practice questions, ecet topic wise mcq, free ecet practice questions, engineering diploma practice"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Topic-Wise TS ECET Practice Questions and MCQs</h2>
          <p>
            The best way to master complex diploma engineering subjects is through incremental practicing. Our practice engine lets you filter questions by branch, subject, and chapter, giving you instant explanations when you choose an option.
          </p>
          <div style={{ marginTop: '8px' }}>
            <Link className="button button-light" to="/practice">Launch Practice Panel</Link>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Subject Coverage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '8px' }}>
            <div className="card" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--primary)' }}><BookOpen size={20} /></span>
              <div>
                <strong>Mathematics</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Matrices, Integration, ODEs</p>
              </div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)' }}><Award size={20} /></span>
              <div>
                <strong>Physics & Chemistry</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mechanics, Atomic structures</p>
              </div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ color: 'var(--warm)' }}><Layers size={20} /></span>
              <div>
                <strong>Engineering Core</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Branch-specific tech topics</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default TsEcetPracticeQuestions
