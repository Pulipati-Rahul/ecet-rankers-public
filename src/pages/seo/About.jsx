import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Shield, Target, Users } from "lucide-react"

function About() {
  return (
    <AppShell title="About Us" kicker="Learn more about ECET Rankers">
      <SEO 
        title="About Us | ECET Rankers"
        description="Learn more about ECET Rankers, our mission to support engineering diploma students, and our team dedicated to providing best-in-class preparation material for TS ECET."
        keywords="about ecet rankers, diploma exam preparation, engineering common entrance test, ts ecet prep"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Empowering Diploma Students to Ace TS ECET</h2>
          <p>
            Welcome to <strong>ECET Rankers</strong>, India's leading online exam preparation platform designed exclusively for engineering diploma students aspiring to transition into Bachelor of Engineering (B.E./B.Tech) courses via the <strong>Engineering Common Entrance Test (ECET)</strong>.
          </p>
          <p>
            We understand the unique challenges faced by polytechnic students. Balancing college curriculum with competitive entrance preparation requires focused, high-quality, and easily accessible resources. That's why we built ECET Rankers—to provide a structured, phone-first prep app with zero clutter and maximum efficiency.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--accent)', marginTop: '4px' }}><Target size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Our Mission</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>To democratize exam preparation by providing free and premium high-yield practice materials, timed mocks, and previous papers to every diploma student.</p>
            </div>
          </div>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--primary)', marginTop: '4px' }}><Users size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Student Centric</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Built for mobile-first students. Take quick tests during commutes, filter topics instantly, and track accuracy streaks easily.</p>
            </div>
          </div>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--warm)', marginTop: '4px' }}><Shield size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>Quality Guaranteed</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Our question banks are curated by experienced educators and top rankers, ensuring high alignment with actual TS ECET patterns.</p>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Why Choose ECET Rankers?</h2>
          <ul>
            <li style={{ marginBottom: '8px' }}><strong>Exhaustive Question Pool:</strong> Over 6000+ topic-wise practice questions covering Mathematics, Physics, Chemistry, and core branch engineering.</li>
            <li style={{ marginBottom: '8px' }}><strong>Real-time Exam Simulations:</strong> Full-length 200-question mock tests under exact TS ECET timing (180 minutes) to practice speed and accuracy.</li>
            <li style={{ marginBottom: '8px' }}><strong>Advanced Analytics Dashboard:</strong> Track your streaks, analyze your weak and strong areas, and view detailed explanations for wrong answers.</li>
          </ul>
          <p style={{ marginTop: '16px', fontSize: '0.95rem', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            Have questions, feedback, or need help? Visit our <Link to="/contact" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}>Contact Support Page</Link>.
          </p>
        </section>
      </div>
    </AppShell>
  )
}

export default About
