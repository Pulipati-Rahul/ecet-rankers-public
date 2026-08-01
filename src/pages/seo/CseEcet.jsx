import AppShell from "../../components/AppShell"
import SEO from "../../components/SEO"
import { Link } from "react-router-dom"
import { Award, BookOpen, GraduationCap, Clock } from "lucide-react"

function CseEcet() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Computer Science Engineering (CSE) ECET Preparation Course",
    "description": "Ace the TS ECET CSE exam. Get detailed computer science syllabus, subject weightage, topic-wise practice questions, and full timed mock tests.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "ECET Rankers",
      "url": "https://ecetrankers.in"
    }
  }

  return (
    <AppShell title="CSE ECET Preparation" kicker="Computer Science Engineering Guide">
      <SEO 
        title="CSE ECET Preparation Guide | Syllabus, Weightage & Mock Tests"
        description="Ace the TS ECET CSE exam. Get detailed computer science syllabus, subject weightage, topic-wise practice questions, and full timed mock tests."
        keywords="cse ecet, ts ecet computer science, computer science diploma, digital electronics ecet, operating systems ecet, data structures ecet"
        schema={courseSchema}
      />
      
      <div className="seo-page-container" style={{ display: 'grid', gap: '24px', maxWidth: '900px', margin: '0 auto', padding: '12px' }}>
        <section className="hero-banner launch-hero" style={{ padding: '24px', textAlign: 'left' }}>
          <div className="hero-copy">
            <span className="hero-pill"><Award size={15} /> CSE Core (100 Marks)</span>
            <h2>Top TS ECET Study Guide for Computer Science (CSE)</h2>
            <p>Master core programming, web design, DBMS, network systems, and operating concepts with timed tests designed for diploma students.</p>
            <div className="hero-actions" style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
              <Link className="button button-light" to="/practice">Practice CSE Qs</Link>
              <Link className="button button-glass" to="/mock-tests">Take CSE Mock</Link>
            </div>
          </div>
        </section>

        <section className="card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--primary)', fontWeight: 'bold' }}>TS ECET Computer Science (CSE) Syllabus & Weightage</h2>
          <p>
            For CSE students, the TS ECET question paper consists of 200 multiple-choice questions. Out of these, <strong>100 marks are dedicated to the Core Computer Engineering subjects</strong>. The remaining 100 marks consist of Mathematics (50 marks), Physics (25 marks), and Chemistry (25 marks).
          </p>

          <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>CSE Core Subject Weightage Table</h3>
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
                  <td style={{ padding: '10px', fontWeight: '600' }}>Digital Electronics</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Logic Gates, Boolean Algebra, Flip Flops, Counters, Multiplexers</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Data Structures</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>Arrays, Linked Lists, Stacks, Queues, Binary Trees, Sorting & Searching</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>DBMS</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>ER Diagrams, Normalization (1NF, 2NF, 3NF), SQL Queries, Transactions</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Operating Systems</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>Process Scheduling, Deadlocks, Memory Management, Paging, Disk Scheduling</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Computer Networks</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>15</td>
                  <td style={{ padding: '10px' }}>OSI & TCP/IP Layers, Routing Algorithms, IP Addressing, TCP/UDP</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px', fontWeight: '600' }}>Web Technologies</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>20</td>
                  <td style={{ padding: '10px' }}>HTML5, CSS3, Javascript Core, XML, PHP Server Scripts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <Clock size={18} style={{ color: 'var(--warm)' }} /> Time Management Tips
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Spend 45 minutes on general sections (Math, Physics, Chemistry) and allocate a solid 120 minutes to solve programming, structures, and OS questions. Flag doubtful ones and check them in the last 15 minutes.
            </p>
          </div>
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem', marginBottom: '8px' }}>
              <BookOpen size={18} style={{ color: 'var(--accent)' }} /> High-Yield Subjects
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Web Technologies, Operating Systems, and DBMS are extremely conceptual and high-scoring. Revise memory paging and SQL queries regularly to secure direct marks.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  )
}

export default CseEcet
