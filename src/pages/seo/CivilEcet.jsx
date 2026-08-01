import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, Clock } from "lucide-react"

function CivilEcet() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Civil Engineering (Civil) ECET Preparation Course",
    "description": "Crack the TS ECET Civil exam. Get detailed structural engineering syllabus, surveying weightage, concrete technology, and core practice questions.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECET Rankers",
      "url": "https://ecetrankers.in"
    }
  }

  return (
    <AppShell title="Civil ECET Preparation" kicker="Civil Engineering Guide">
      <SEO 
        title="Civil ECET Preparation Guide | Syllabus, Weightage & Online Mocks"
        description="Crack the TS ECET Civil exam. Get detailed structural engineering syllabus, surveying weightage, concrete technology, and core practice questions."
        keywords="civil ecet, ts ecet civil engineering, civil engineering diploma, surveying ecet, hydraulics ecet"
        schema={courseSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        <section className="hero-banner launch-hero" style={{ padding: '24px', textAlign: 'left' }}>
          <div className="hero-copy">
            <span className="hero-pill"><Award size={15} /> Civil Core (100 Marks)</span>
            <h2>Top TS ECET Study Guide for Civil Engineering</h2>
            <p>Master Surveying, RCC Structures, Strength of Materials, Soil Mechanics, Hydraulics, and Building materials with detailed tests.</p>
            <div className="hero-actions" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Link className="button button-light" to="/practice">Practice Civil Qs</Link>
              <Link className="button button-glass" to="/mock-tests">Take Civil Mock</Link>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TS ECET Civil Engineering Syllabus & Weightage</h2>
          <p>
            Civil engineering candidates are evaluated on key mechanics, material structures, and surveying methodologies. The core section makes up <strong>50% of the exam weightage (100 out of 200 marks)</strong>.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>Civil Core Subject Weightage Table</h3>
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
                  <td style={{ padding: '10px', fontWeight: '600' }}>Strength of Materials</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Simple Stresses & Strains, Shear Force & Bending Moment Diagrams, Columns</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Surveying</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Chain Surveying, Compass, Levelling, Theodolite, Curves, Tacheometry</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Theory of Structures & RCC</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Working Stress Method, Limit State Method, Beams, Slabs, Columns, Footings</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Hydraulics & Fluid Mechanics</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Fluid Properties, Pressure, Flow through pipes, Open channels, Pumps, Turbines</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Quantity Surveying (Estimating)</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Detailed & Abstract Estimates, Rate Analysis, Specifications, Contracts</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Transportation & Irrigation</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Highway Alignment, Pavements, Traffic, Canals, Dams, Cross Drainage Works</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <Clock size={18} style={{ color: 'var(--warm)' }} /> SFD & BMD Shortcuts
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              SFD and BMD question types on standard beams (cantilever and simply supported) with point loads carry frequent marks. Remember maximum bending moment values to answer immediately.
            </p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> High-Scoring Surveying
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Levelling definitions (Reduced Levels, Fore Sight, Back Sight) and magnetic declination numericals are direct. Keep these formulas revised to score easily.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default CivilEcet
