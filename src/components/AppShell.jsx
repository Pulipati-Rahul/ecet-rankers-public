import { BarChart3, FileText, GraduationCap, Home, LayoutDashboard, LogOut, Menu, Moon, Shield, Sun, Trophy, UserRound, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/practice", icon: Trophy, label: "Practice" },
  { to: "/mock-tests", icon: Shield, label: "Mock" },
  { to: "/previous-papers", icon: FileText, label: "Papers" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }
]

const pathLabels = {
  "": "Home",
  "practice": "Practice",
  "mock-tests": "Mock Tests",
  "previous-papers": "Previous Papers",
  "ts-ecet-preparation": "TS ECET Preparation",
  "ts-ecet-mock-test": "TS ECET Mock Test",
  "ts-ecet-practice-questions": "Practice Questions",
  "ts-ecet-previous-papers": "Previous Year Papers",
  "ts-ecet-syllabus": "Official Syllabus",
  "cse-ecet": "CSE ECET",
  "ece-ecet": "ECE ECET",
  "eee-ecet": "EEE ECET",
  "civil-ecet": "Civil ECET",
  "mechanical-ecet": "Mechanical ECET",
  "about": "About Us",
  "contact": "Contact Support",
  "privacy": "Privacy Policy",
  "terms": "Terms of Service",
  "dashboard": "Dashboard",
  "analytics": "Analytics",
  "admin": "Admin",
  "admin-review": "Admin Review",
  "results": "Results",
  "mock-exam": "Mock Exam",
  "question": "Question Practice",
  "auth": "Authentication",
  "premium": "Premium"
}

function AppShell({ title, kicker, children, action }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, signOut, isAdmin } = useAuth()
  const isHome = location.pathname === "/"
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("ecet-theme") === "dark"
  })
  const [menuOpen, setMenuOpen] = useState(false)

  const pathSegments = location.pathname.split("/").filter(Boolean)
  const showBreadcrumbs = pathSegments.length > 0

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("ecet-theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!showBreadcrumbs) {
      const el = document.getElementById("jsonld-breadcrumb-schema")
      if (el) el.remove()
      return
    }

    const siteUrl = "https://ecetrankers.in"
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/`
      }
    ]

    pathSegments.forEach((segment, idx) => {
      const path = `/${pathSegments.slice(0, idx + 1).join("/")}`
      const label = pathLabels[segment] || segment.replace(/-/g, " ")
      itemListElement.push({
        "@type": "ListItem",
        "position": idx + 2,
        "name": label,
        "item": `${siteUrl}${path}`
      })
    })

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    }

    const scriptId = "jsonld-breadcrumb-schema"
    let scriptEl = document.getElementById(scriptId)
    if (scriptEl) {
      scriptEl.textContent = JSON.stringify(schema)
    } else {
      scriptEl = document.createElement("script")
      scriptEl.id = scriptId
      scriptEl.type = "application/ld+json"
      scriptEl.textContent = JSON.stringify(schema)
      document.head.appendChild(scriptEl)
    }

    return () => {
      const el = document.getElementById(scriptId)
      if (el) el.remove()
    }
  }, [location.pathname, showBreadcrumbs])

  const activeNavItems = isAdmin
    ? [...navItems, { to: "/admin", icon: Shield, label: "Admin Panel" }]
    : navItems

  const bottomNav = activeNavItems.slice(0, 4)

  const showFooter = [
    "/",
    "/ts-ecet-preparation",
    "/ts-ecet-mock-test",
    "/ts-ecet-practice-questions",
    "/ts-ecet-previous-papers",
    "/ts-ecet-syllabus",
    "/cse-ecet",
    "/ece-ecet",
    "/eee-ecet",
    "/civil-ecet",
    "/mechanical-ecet",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ].includes(location.pathname)

  const hideBottomNav = location.pathname === "/mock-exam"

  const renderBreadcrumbs = () => {
    if (!showBreadcrumbs) return null
    return (
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          {pathSegments.map((segment, idx) => {
            const path = `/${pathSegments.slice(0, idx + 1).join("/")}`
            const isLast = idx === pathSegments.length - 1
            const label = pathLabels[segment] || segment.replace(/-/g, " ")
            return (
              <li key={path}>
                <span className="separator">&rsaquo;</span>
                {isLast ? (
                  <span aria-current="page" className="current">{label}</span>
                ) : (
                  <Link to={path}>{label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={22} /></div>
          <div>
            <div className="brand-label">ECET Rankers</div>
            <p className="brand-slogan">TS ECET prep made simple</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {activeNavItems.map((item) => (
            <NavLink key={item.to} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to={item.to} end={item.to === "/"}>
              <span className="nav-icon"><item.icon size={18} /></span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="premium-pill">{user ? "Student account" : "Free preview"}</span>
          {user ? (
            <button className="user-pill" onClick={signOut} type="button" title="Sign out">
              <span>{profile?.name?.slice(0, 1).toUpperCase() || "E"}</span>
              <LogOut size={15} />
            </button>
          ) : (
            <Link className="auth-link" to="/auth"><UserRound size={16} /> Login / Signup</Link>
          )}
        </div>
      </aside>

      <div className="page-shell">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">
              <button className="icon-button mobile-only" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                <Menu size={18} />
              </button>
              {!isHome && (
                <button className="link-button" type="button" onClick={() => navigate(-1)} aria-label="Go back">
                  Back
                </button>
              )}
              
              <div className="header-branding-wrapper">
                <div className="header-brand-logo">
                  <div className="brand-logo-emblem">
                    <GraduationCap size={18} />
                  </div>
                  <span className="brand-logo-text">ECET <span className="brand-logo-text-highlight">Rankers</span></span>
                </div>
                <div className="header-page-title-group">
                  {renderBreadcrumbs()}
                  <p className="kicker">{kicker}</p>
                  <h1>{title}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="topbar-actions">
            <button className="icon-button" type="button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {action}
          </div>
        </header>

        <main className="main-content">{children}</main>

        {showFooter && (
          <footer className="site-footer">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="brand-logo-emblem">
                  <GraduationCap size={20} />
                </div>
                <h4 className="footer-title">ECET Rankers</h4>
                <p className="footer-desc">TS ECET preparation made simple, interactive, and structured for engineering diploma students.</p>
              </div>
              <div className="footer-links-col">
                <h5>Study Resources</h5>
                <Link to="/ts-ecet-preparation">Preparation Guide</Link>
                <Link to="/ts-ecet-mock-test">Mock Exams</Link>
                <Link to="/ts-ecet-practice-questions">Practice MCQs</Link>
                <Link to="/ts-ecet-previous-papers">Previous Year Papers</Link>
                <Link to="/ts-ecet-syllabus">Official Syllabus</Link>
              </div>
              <div className="footer-links-col">
                <h5>Engineering Branches</h5>
                <Link to="/cse-ecet">Computer Science (CSE)</Link>
                <Link to="/ece-ecet">Electronics & Comm (ECE)</Link>
                <Link to="/eee-ecet">Electrical & Elect (EEE)</Link>
                <Link to="/civil-ecet">Civil Engineering</Link>
                <Link to="/mechanical-ecet">Mechanical Engineering</Link>
              </div>
              <div className="footer-links-col">
                <h5>Company</h5>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Support</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} ECET Rankers. All rights reserved.</p>
            </div>
          </footer>
        )}

        {!hideBottomNav && (
          <nav className="bottom-nav" aria-label="Bottom navigation">
            {bottomNav.map((item) => (
              <NavLink key={item.to} className={({ isActive }) => isActive ? "active" : ""} to={item.to} end={item.to === "/"}>
                <span className="nav-icon"><item.icon size={18} /></span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </div>

      <div className={`mobile-drawer${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-drawer__panel" onClick={(event) => event.stopPropagation()}>
          <div className="mobile-drawer__top">
            <div className="header-brand-logo">
              <div className="brand-logo-emblem">
                <GraduationCap size={18} />
              </div>
              <span className="brand-logo-text">ECET <span className="brand-logo-text-highlight">Rankers</span></span>
            </div>
            <button className="icon-button" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X size={18} />
            </button>
          </div>
          <nav className="drawer-nav">
            {activeNavItems.map((item) => (
              <NavLink key={item.to} className={({ isActive }) => `drawer-link${isActive ? " active" : ""}`} to={item.to} end={item.to === "/"}>
                <span className="nav-icon"><item.icon size={18} /></span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer__footer">
            {user ? (
              <div className="mobile-user-row">
                <div className="mobile-user-badge">
                  <span className="avatar">{profile?.name?.slice(0, 1).toUpperCase() || "E"}</span>
                  <div className="mobile-user-info">
                    <strong>{profile?.name || "Student"}</strong>
                    <span className="user-email-tag">{user.email}</span>
                  </div>
                </div>
                <button className="mobile-signout-btn" onClick={() => { signOut(); setMenuOpen(false); }} type="button">
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <Link className="mobile-auth-link" to="/auth" onClick={() => setMenuOpen(false)}>
                <UserRound size={16} /> Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppShell
