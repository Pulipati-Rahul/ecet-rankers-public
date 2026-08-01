import React, { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

// Lazy-loaded app pages for code splitting and instant initial bundle rendering
const Home = lazy(() => import("./pages/Home"))
const Auth = lazy(() => import("./pages/Auth"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Practice = lazy(() => import("./pages/Practice"))
const Premium = lazy(() => import("./pages/Premium"))
const QuestionPage = lazy(() => import("./pages/QuestionPage"))
const MockExam = lazy(() => import("./pages/MockExam"))
const MockTests = lazy(() => import("./pages/MockTests"))
const PreviousPapers = lazy(() => import("./pages/PreviousPapers"))
const Results = lazy(() => import("./pages/Results"))
const Analytics = lazy(() => import("./pages/Analytics"))
const Admin = lazy(() => import("./pages/Admin"))
const AdminReview = lazy(() => import("./pages/AdminReview"))

// Lazy-loaded SEO landing pages
const TsEcetPreparation = lazy(() => import("./pages/seo/TsEcetPreparation"))
const TsEcetMockTest = lazy(() => import("./pages/seo/TsEcetMockTest"))
const TsEcetPracticeQuestions = lazy(() => import("./pages/seo/TsEcetPracticeQuestions"))
const TsEcetPreviousPapers = lazy(() => import("./pages/seo/TsEcetPreviousPapers"))
const TsEcetSyllabus = lazy(() => import("./pages/seo/TsEcetSyllabus"))
const CseEcet = lazy(() => import("./pages/seo/CseEcet"))
const EceEcet = lazy(() => import("./pages/seo/EceEcet"))
const EeeEcet = lazy(() => import("./pages/seo/EeeEcet"))
const CivilEcet = lazy(() => import("./pages/seo/CivilEcet"))
const MechanicalEcet = lazy(() => import("./pages/seo/MechanicalEcet"))
const About = lazy(() => import("./pages/seo/About"))
const Contact = lazy(() => import("./pages/seo/Contact"))
const Privacy = lazy(() => import("./pages/seo/Privacy"))
const Terms = lazy(() => import("./pages/seo/Terms"))

// High-fidelity performance spinner for async chunk transitions
const LoadingScreen = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    flexDirection: 'column',
    gap: '12px',
    color: 'var(--text-secondary)'
  }}>
    <div className="animate-spin" style={{
      width: '40px',
      height: '40px',
      border: '3px solid var(--border)',
      borderTopColor: 'var(--primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Loading ECET Rankers...</span>
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Core routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/question" element={<QuestionPage />} />
            <Route path="/mock-exam" element={<MockExam />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/previous-papers" element={<PreviousPapers />} />
            <Route path="/results" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-review" element={<AdminReview />} />

            {/* SEO specific content pages */}
            <Route path="/ts-ecet-preparation" element={<TsEcetPreparation />} />
            <Route path="/ts-ecet-mock-test" element={<TsEcetMockTest />} />
            <Route path="/ts-ecet-practice-questions" element={<TsEcetPracticeQuestions />} />
            <Route path="/ts-ecet-previous-papers" element={<TsEcetPreviousPapers />} />
            <Route path="/ts-ecet-syllabus" element={<TsEcetSyllabus />} />
            
            {/* Branch specific SEO landing pages */}
            <Route path="/cse-ecet" element={<CseEcet />} />
            <Route path="/ece-ecet" element={<EceEcet />} />
            <Route path="/eee-ecet" element={<EeeEcet />} />
            <Route path="/civil-ecet" element={<CivilEcet />} />
            <Route path="/mechanical-ecet" element={<MechanicalEcet />} />

            {/* Institutional general SEO pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
