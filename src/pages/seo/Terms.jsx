import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"

function Terms() {
  return (
    <AppShell title="Terms & Conditions" kicker="Last updated: July 2026">
      <SEO 
        title="Terms of Service | ECET Rankers"
        description="Review the terms of service, acceptable usage guidelines, and account requirements when preparing on ECET Rankers."
        keywords="terms of service, terms and conditions, ecet rankers terms"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Terms and Conditions</h2>
          <p>
            By accessing the website at https://ecetrankers.in, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>1. Use License</h2>
          <p>
            Permission is granted to temporarily view and practice questions on ECET Rankers for personal, non-commercial transitory study only. Under this license, you may not:
          </p>
          <ul>
            <li>Modify or copy the proprietary question datasets, explanations, or code.</li>
            <li>Use the materials for any commercial purpose or public display.</li>
            <li>Attempt to decompile or reverse engineer any software contained on the platform.</li>
            <li>Remove any copyright or other proprietary notations from the materials.</li>
          </ul>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>2. Accounts and Subscriptions</h2>
          <p>
            To track streaks, view dashboards, or unlock premium exam modules, you must register for an account. You are responsible for maintaining the confidentiality of your credentials. We reserve the right to suspend accounts that violate preparation integrity.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>3. Disclaimer</h2>
          <p>
            The preparation materials on ECET Rankers are provided on an 'as is' basis. While we strive to maintain complete accuracy, ECET Rankers makes no warranties, expressed or implied, regarding the completeness or accuracy of practice questions, mock tests, or syllabus guidelines.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>4. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Telangana, India.
          </p>
        </section>
      </div>
    </AppShell>
  )
}

export default Terms
