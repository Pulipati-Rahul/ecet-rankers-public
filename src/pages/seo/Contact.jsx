import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"

function Contact() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I access premium mock tests?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply sign up for a free student account, navigate to the Premium section, and choose a study pack. Premium keys unlock all papers and mock tests immediately."
        }
      },
      {
        "@type": "Question",
        "name": "Are the mock tests designed as per the latest TS ECET pattern?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all full-length mocks contain 200 questions: Mathematics (50 marks), Physics (25 marks), Chemistry (25 marks), and Core Engineering subjects (100 marks), to be completed in 180 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Can I report an error in a question explanation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. While reviewing a practice question, you can click on the \"Report Issue\" button to notify our admin panel. Our review team updates answers daily."
        }
      }
    ]
  }

  return (
    <AppShell title="Contact Us" kicker="Get in touch with our team">
      <SEO 
        title="Contact Us | ECET Rankers Support"
        description="Have questions about TS ECET mock tests, practice questions, or account subscriptions? Contact the ECET Rankers support team for quick assistance."
        keywords="contact ecet rankers, ecet support, customer service ecet, prep questions help"
        schema={faqSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>We'd Love to Hear from You</h2>
          <p>
            Have a question, feedback, or suggestion? Whether you are a student encountering an issue with practice questions, an educator wanting to contribute questions, or interested in institutional partnerships, our team is ready to assist you.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)' }}><Mail size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Email Support</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>support@ecetrankers.com</p>
            </div>
          </div>
          <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--accent)' }}><MessageSquare size={24} /></span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Telegram Channel</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>@ECETRankersPrep</p>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text)', marginBottom: '8px' }}>Frequently Asked Support Questions</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Q: How do I access premium mock tests?</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>A: Simply sign up for a free student account, navigate to the Premium section, and choose a study pack. Premium keys unlock all papers and mock tests immediately.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Q: Are the mock tests designed as per the latest TS ECET pattern?</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>A: Yes, all full-length mocks contain 200 questions: Mathematics (50 marks), Physics (25 marks), Chemistry (25 marks), and Core Engineering subjects (100 marks), to be completed in 180 minutes.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>Q: Can I report an error in a question explanation?</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>A: Absolutely. While reviewing a practice question, you can click on the "Report Issue" button to notify our admin panel. Our review team updates answers daily.</p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default Contact
