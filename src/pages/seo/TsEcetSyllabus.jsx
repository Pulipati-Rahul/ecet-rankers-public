import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { List, CheckSquare, Settings } from "lucide-react"

function TsEcetSyllabus() {
  return (
    <AppShell title="TS ECET Syllabus" kicker="Detailed exam weightage & topics">
      <SEO 
        title="TS ECET Syllabus | Detailed Core & Common Subject Breakdown"
        description="Check the official TS ECET exam syllabus. Review chapter-wise mark distributions for Mathematics, Physics, Chemistry, and all engineering branches."
        keywords="ts ecet syllabus, ecet mark distribution, engineering common entrance test syllabus, cse syllabus ecet"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Official TS ECET Exam Syllabus and Mark Distributions</h2>
          <p>
            An organized study plan starts with knowing the exact topics that will be tested. Below is the official marks distribution defined by the Telangana State Council of Higher Education (TSCHE).
          </p>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Common Subjects (100 Marks)</h2>
          <p>Regardless of your engineering stream, all diploma candidates solve these common subjects:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '8px' }}>
            <div style={{ padding: '12px', borderLeft: '3px solid var(--primary)', backgroundColor: 'var(--surface-alt)' }}>
              <strong>Mathematics (50 Marks)</strong>
              <p style={{ fontSize: '0.85rem' }}>Matrices, Analytical Geometry, Calculus, Differential Equations.</p>
            </div>
            <div style={{ padding: '12px', borderLeft: '3px solid var(--accent)', backgroundColor: 'var(--surface-alt)' }}>
              <strong>Physics (25 Marks)</strong>
              <p style={{ fontSize: '0.85rem' }}>Elements of Vectors, Kinematics, Simple Harmonic Motion, Modern Physics.</p>
            </div>
            <div style={{ padding: '12px', borderLeft: '3px solid var(--warm)', backgroundColor: 'var(--surface-alt)' }}>
              <strong>Chemistry (25 Marks)</strong>
              <p style={{ fontSize: '0.85rem' }}>Atomic Structure, Chemical Bonding, Solutions, Electrochemistry, Corrosion.</p>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Core Engineering Branches (100 Marks)</h2>
          <p>Select your specific engineering branch to read detailed chapter-wise syllabus weightages:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '8px' }}>
            <Link to="/cse-ecet" className="card" style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Computer Science (CSE)</Link>
            <Link to="/ece-ecet" className="card" style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Electronics & Comm (ECE)</Link>
            <Link to="/eee-ecet" className="card" style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Electrical & Elect (EEE)</Link>
            <Link to="/civil-ecet" className="card" style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Civil Engineering</Link>
            <Link to="/mechanical-ecet" className="card" style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Mechanical Engineering</Link>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default TsEcetSyllabus
