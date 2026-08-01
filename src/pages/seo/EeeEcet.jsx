import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, Clock } from "lucide-react"

function EeeEcet() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Electrical & Electronics Engineering (EEE) ECET Preparation Course",
    "description": "Master the TS ECET EEE exam. Detailed electrical engineering core subjects, machines, power systems, circuits, weightage, and online mocks.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECET Rankers",
      "url": "https://ecetrankers.in"
    }
  }

  return (
    <AppShell title="EEE ECET Preparation" kicker="Electrical & Electronics Guide">
      <SEO 
        title="EEE ECET Preparation Guide | Syllabus, Weightage & Practice Tests"
        description="Master the TS ECET EEE exam. Detailed electrical engineering core subjects, machines, power systems, circuits, weightage, and online mocks."
        keywords="eee ecet, ts ecet electrical, electrical diploma machines, power systems ecet, transformers ecet"
        schema={courseSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        <section className="hero-banner launch-hero" style={{ padding: '24px', textAlign: 'left' }}>
          <div className="hero-copy">
            <span className="hero-pill"><Award size={15} /> EEE Core (100 Marks)</span>
            <h2>Top TS ECET Study Guide for Electrical & Electronics (EEE)</h2>
            <p>Master Electrical Machines, Transformers, Power Systems, Transmission lines, AC/DC distribution, and Measurements with interactive quizzes.</p>
            <div className="hero-actions" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Link className="button button-light" to="/practice">Practice EEE Qs</Link>
              <Link className="button button-glass" to="/mock-tests">Take EEE Mock</Link>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TS ECET Electrical & Electronics (EEE) Syllabus & Weightage</h2>
          <p>
            Electrical core syllabus covers deep mathematical analysis of circuits, rotating electrical machines, and distribution system networks. EEE branch contains <strong>100 core marks</strong> which holds the highest priority in securing a good state rank.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>EEE Core Subject Weightage Table</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '8px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-alt)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Core Topic</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Estimated Questions</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Key Sub-topics</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Basic Electrical Engineering</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>10</td>
                  <td style={{ padding: '10px' }}>Ohm's Law, Kirchhoff's Laws, Magnetic Circuits, Electrostatics</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>D.C. Machines & Transformers</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>DC Generators, Motors, Characteristics, EMF Equation, single/three-phase Transformers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>A.C. Machines</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Alternators, Synchronous Motors, Induction Motors, Single Phase Motors</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Power Systems</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Generation (Thermal, Hydro, Nuclear), Transmission lines, Sag, Insulators, Faults</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Electrical Measurements</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>10</td>
                  <td style={{ padding: '10px' }}>Ammeter, Voltmeter, Wattmeter, Energy Meter, Bridges, Transducers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Power Electronics & Drives</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Thyristors, Rectifiers, Choppers, Inverters, AC & DC Motor Speed Control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <Clock size={18} style={{ color: 'var(--warm)' }} /> Focus on Machine Diagrams
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Transformers and induction motor slip calculations are heavily featured. Practice speed-torque characteristic graphs as questions often test qualitative statements on these.
            </p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> High-Scoring Measurements
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Measurement instrument extension of range (using shunts/multipliers) is easy and highly recurring. Learn measurement equations to gain immediate advantage.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default EeeEcet
