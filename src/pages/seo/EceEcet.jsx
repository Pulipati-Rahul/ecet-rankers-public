import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, Clock } from "lucide-react"

function EceEcet() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Electronics & Communication Engineering (ECE) ECET Preparation Course",
    "description": "Prepare for the TS ECET ECE exam. Detailed electronics and communication core syllabus, subject weightages, formulas, and timed mock tests.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECET Rankers",
      "url": "https://ecetrankers.in"
    }
  }

  return (
    <AppShell title="ECE ECET Preparation" kicker="Electronics & Communication Guide">
      <SEO 
        title="ECE ECET Preparation Guide | Syllabus, Weightage & Practice Questions"
        description="Prepare for the TS ECET ECE exam. Detailed electronics and communication core syllabus, subject weightages, formulas, and timed mock tests."
        keywords="ece ecet, ts ecet electronics, electronic devices ecet, circuit theory ecet, communication systems ecet"
        schema={courseSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        <section className="hero-banner launch-hero" style={{ padding: '24px', textAlign: 'left' }}>
          <div className="hero-copy">
            <span className="hero-pill"><Award size={15} /> ECE Core (100 Marks)</span>
            <h2>Top TS ECET Study Guide for Electronics & Communication (ECE)</h2>
            <p>Master Electronic Devices, Circuit Theory, Digital Systems, Microcontrollers, and Communication channels with timed simulations.</p>
            <div className="hero-actions" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Link className="button button-light" to="/practice">Practice ECE Qs</Link>
              <Link className="button button-glass" to="/mock-tests">Take ECE Mock</Link>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TS ECET Electronics & Communication (ECE) Syllabus & Weightage</h2>
          <p>
            ECE students require a strong grip on both analog and digital concepts. The core engineering section comprises <strong>100 marks out of 200</strong>, featuring conceptual logic gates, electronic networks, circuit analysis, and microcontrollers.
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>ECE Core Subject Weightage Table</h3>
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
                  <td style={{ padding: '10px', fontWeight: '600' }}>Electronic Devices & Circuits</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Semiconductor Physics, Diodes, BJT, FET, Biasing Circuits, Amplifiers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Circuit Theory</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Mesh & Node Analysis, Network Theorems (Thevenin, Norton), AC Circuits</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Digital Electronics</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Number Systems, Logic Simplification, Combinational and Sequential Circuits</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Communication Systems</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Analog Modulation (AM, FM), Digital Modulation (PCM, ASK, FSK), Antennas</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Microprocessors & MCs</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>8085 Architecture, 8051 Microcontroller Registers, Memory Interfacing</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Industrial Electronics</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>SCR, TRIAC, DIAC, Converters, Inverters, Transducers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <Clock size={18} style={{ color: 'var(--warm)' }} /> Focus on Circuit Theorems
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Network theorems (Thevenin's and Superposition) always carry 5-7 direct numerical questions. Practice quick formula shortcuts to solve these within 1 minute.
            </p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> High-Scoring Logic Gates
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Digital logic gate representations, multiplexers, and flip-flop excitation tables are highly scoring and take very little time. Ensure these are consolidated.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default EceEcet
