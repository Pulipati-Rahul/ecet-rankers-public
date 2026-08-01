import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, Clock } from "lucide-react"

function MechanicalEcet() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Mechanical Engineering (Mechanical) ECET Preparation Course",
    "description": "Ace the TS ECET Mechanical exam. Detailed thermal engineering, fluid mechanics, workshop technology syllabus, and free mock tests.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECET Rankers",
      "url": "https://ecetrankers.in"
    }
  }

  return (
    <AppShell title="Mechanical ECET Preparation" kicker="Mechanical Engineering Guide">
      <SEO 
        title="Mechanical ECET Prep Guide | Syllabus, Weightage & Mock Exams"
        description="Ace the TS ECET Mechanical exam. Detailed thermal engineering, fluid mechanics, workshop technology syllabus, and free mock tests."
        keywords="mechanical ecet, ts ecet mechanical engineering, thermodynamics ecet, fluid mechanics ecet, strength of materials ecet"
        schema={courseSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        <section className="hero-banner launch-hero" style={{ padding: '24px', textAlign: 'left' }}>
          <div className="hero-copy">
            <span className="hero-pill"><Award size={15} /> Mechanical Core (100 Marks)</span>
            <h2>Top TS ECET Study Guide for Mechanical Engineering</h2>
            <p>Master Workshops, Thermodynamics, Fluid Dynamics, Strength of Materials, Machine Design, and Production technology with custom practices.</p>
            <div className="hero-actions" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Link className="button button-light" to="/practice">Practice Mech Qs</Link>
              <Link className="button button-glass" to="/mock-tests">Take Mech Mock</Link>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TS ECET Mechanical Engineering Syllabus & Weightage</h2>
          <p>
            Mechanical diploma students are assessed on physical laws of heat, fluids, material strengths, and manufacturing tools. The core syllabus contributes <strong>100 out of 200 marks</strong>.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>Mechanical Core Subject Weightage Table</h3>
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
                  <td style={{ padding: '10px', fontWeight: '600' }}>Workshop Technology</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Foundry, Welding, Lathe Machines, Shaping, Milling, Grinding, Metrology</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Thermodynamics & Heat Engines</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Gas Laws, Laws of Thermodynamics, IC Engines, Air Compressors, Gas Turbines</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Fluid Mechanics & Hydraulic Machinery</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Fluid Properties, Bernoulli's, Venturimeter, Pelton Wheel, Kaplan, Centrifugal Pumps</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Strength of Materials</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Tension, Compression, Shear, Beams, Columns, Torsion of Shafts, Springs</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Machine Design</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>10</td>
                  <td style={{ padding: '10px' }}>Bolted joints, Welded joints, Shafts, Keys, Couplings, Bearings</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Production Technology & Management</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Modern Machining, CNC Systems, Estimation & Costing, Industrial Management</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <Clock size={18} style={{ color: 'var(--warm)' }} /> Focus on Fluid Equations
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Bernoulli's equation applications, venturimeter discharge calculations, and turbine specific speed formulas carry high importance. Learn these formulas by heart.
            </p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> High-Scoring Workshop Tools
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Lathe operations, milling cutter directions, and welding joints require plain factual knowledge and carry 15 direct marks. Make summary charts for quick revisions.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default MechanicalEcet
