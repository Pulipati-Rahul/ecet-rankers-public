import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"

function Privacy() {
  return (
    <AppShell title="Privacy Policy" kicker="Last updated: July 2026">
      <SEO 
        title="Privacy Policy | ECET Rankers"
        description="Learn how ECET Rankers collects, uses, protects, and manages student account profiles, practice history, and browser analytics data."
        keywords="privacy policy, data protection, ecet rankers user data"
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto', padding: '12px' }}>
        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '8px' }}>Privacy Policy</h2>
          <p>
            At <strong>ECET Rankers</strong>, accessible from https://ecetrankers.in, one of our main priorities is the privacy of our visitors and students. This Privacy Policy document contains types of information that is collected and recorded by ECET Rankers and how we use it.
          </p>
          
          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>1. Information We Collect</h2>
          <p>
            When you register for a student account, we may collect basic credentials including your email address, phone number, name, engineering branch, and college name. This is utilized to sync your practice history and display analytics streaks.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>2. Log Files and Analytics</h2>
          <p>
            ECET Rankers follows a standard procedure of using log files. We use analytics partners, including <strong>Google Analytics 4 (GA4)</strong> and <strong>Microsoft Clarity</strong>, to understand how visitors interact with our platform. These tools collect standard internet log info and visitor behavior patterns (like click tracks, sessions, and screen paths) in an anonymous form to improve application performance.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>3. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our web application.</li>
            <li>Improve, personalize, and expand our prep materials.</li>
            <li>Understand and analyze how you use our practice tests.</li>
            <li>Develop new practice tools, questions, and features.</li>
            <li>Record and calculate study streaks and mock exam scores.</li>
          </ul>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>4. Data Security</h2>
          <p>
            We use industry-standard security protocols and rely on <strong>Supabase</strong> (an enterprise-grade Postgres backend) to secure database schemas, user authentication details, and progress records. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 style={{ fontSize: '1.3rem', marginTop: '12px' }}>5. Contact Us</h2>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at support@ecetrankers.com.
          </p>
        </section>
      </div>
    </AppShell>
  )
}

export default Privacy
