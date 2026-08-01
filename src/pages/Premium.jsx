import { Crown, Shield, Sparkles } from "lucide-react"
import AppShell from "../components/AppShell"
import SEO from "../components/SEO"
import { Link } from "react-router-dom"

function Premium() {
  return (
    <AppShell title="Premium Access" kicker="Unlock the full ECET experience">
      <SEO 
        title="Premium Access Packages | ECET Rankers"
        description="Upgrade your account to unlock unlimited practice questions, full mock exams, historical previous papers, and advanced performance insights."
        robots="noindex, nofollow"
      />
      <section className="premium-hero">
        <div>
          <p className="eyebrow">Premium access</p>
          <h2>Unlimited practice, mocks, analytics, and full exam readiness.</h2>
          <p>Upgrade for unlimited practice, tailored weak-area reports, paper access, and real mock simulations.</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/practice">Start Premium Practice</Link>
            <Link className="ghost-button" to="/mock-tests">Explore Mocks</Link>
          </div>
        </div>
        <div className="premium-banner">
          <div className="premium-badge"><Sparkles size={18} /> 50% OFF Intro Offer</div>
          <div className="pricing-grid">
            <div className="pricing-card featured">
              <span>Monthly</span>
              <strong>₹49</strong>
              <small><del>₹99</del></small>
              <p>Best for trial and short-term practice</p>
            </div>
            <div className="pricing-card">
              <span>Yearly</span>
              <strong>₹499</strong>
              <small><del>₹999</del></small>
              <p>Best value for full prep</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block premium-comparison">
        <div className="section-title">
          <p className="kicker">Compare plans</p>
          <h2>Free vs Premium</h2>
        </div>
        <div className="comparison-table">
          <div className="comparison-column free-plan">
            <span className="plan-label">Free</span>
            <ul>
              <li>2026 paper only</li>
              <li>Limited practice</li>
              <li>Basic analytics</li>
              <li>Limited paper access</li>
              <li>No mocks</li>
            </ul>
          </div>
          <div className="comparison-column premium-plan">
            <div className="premium-highlight"><Crown size={18} /></div>
            <span className="plan-label">Premium</span>
            <ul>
              <li>All years access</li>
              <li>Unlimited practice</li>
              <li>Full analytics</li>
              <li>Full paper access</li>
              <li>Unlimited mocks</li>
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  )
}

export default Premium
