import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Calendar, Clipboard, Compass, Award } from "lucide-react"

function TsEcetPreparation() {
  const prepFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best way to prepare for TS ECET?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Allocate 2 hours daily for core engineering subjects and 1.5 hours for Mathematics, Physics, and Chemistry. Solve 30-50 multiple-choice questions per topic to build problem-solving speed."
        }
      },
      {
        "@type": "Question",
        "name": "What is the subject-wise marks distribution in TS ECET?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TS ECET consists of 200 questions: Mathematics (50 marks), Physics (25 marks), Chemistry (25 marks), and your specific Engineering Core subjects (100 marks) to be completed in 180 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Are calculators allowed in the TS ECET CBT exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, physical calculators or scientific calculators are not permitted in the examination hall. Students must solve all numerical questions manually."
        }
      }
    ]
  }

  return (
    <AppShell title="TS ECET Preparation Guide" kicker="Full study strategy and roadmap">
      <SEO 
        title="TS ECET Preparation Strategy | Daily Routine, Study Material & Mock Tests"
        description="Learn the ultimate strategy to rank under 100 in TS ECET. Access structured study schedules, topic-wise practice guidelines, and exam day routines."
        keywords="ts ecet preparation, study plan ecet, ecet rank tips, top colleges ecet"
        schema={prepFaqSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>How to Prepare for TS ECET and Secure a Top Rank</h2>
          <p>
            The Engineering Common Entrance Test (ECET) conducted by TSCHE is the gateway for polytechnic diploma students to enter prestigious engineering colleges in Telangana. With only 10% lateral entry seats available, competition is fierce. Here is a comprehensive preparation roadmap designed by ECET toppers.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--accent)', marginTop: '4px' }}><Calendar size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>1. Establish a Routine</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Allocate 2 hours daily for engineering core subjects and 1.5 hours for Math/Physics/Chemistry. Consistency beats intensity.</p>
            </div>
          </div>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--primary)', marginTop: '4px' }}><Clipboard size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>2. Practice Topic-wise</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Don't just read theory. Solve 30-50 multiple-choice questions per topic to build instant problem-solving skills.</p>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '12px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)' }}>Subject-wise Allocation Guide</h2>
          <p>
            The TS ECET paper has 200 questions to be solved in 180 minutes. This means you have less than a minute per question!
          </p>
          <ul>
            <li style={{ marginBottom: '8px' }}><strong>Mathematics (50 Marks):</strong> The differentiator. Solidify matrices, integration, differential equations.</li>
            <li style={{ marginBottom: '8px' }}><strong>Physics & Chemistry (50 Marks total):</strong> High-yield. Questions are straightforward and conceptual. Do not skip them.</li>
            <li style={{ marginBottom: '8px' }}><strong>Engineering Core (100 Marks):</strong> Holds 50% weightage. Master the basics of your branch.</li>
          </ul>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
            <Link className="button button-glass" to="/ts-ecet-syllabus" style={{ padding: '8px 16px', border: '1px solid var(--border)' }}>View Full Syllabus</Link>
            <Link className="button button-light" to="/practice" style={{ padding: '8px 16px' }}>Start Daily Practice</Link>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default TsEcetPreparation
