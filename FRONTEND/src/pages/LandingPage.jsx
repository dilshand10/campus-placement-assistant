import { useAuth } from "../auth/AuthProvider";

export function LandingPage({ onOpenChat }) {
  const { isAuthenticated, login } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onOpenChat();
    } else {
      login();
    }
  };

  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span>Powered by Microsoft Foundry & Foundry IQ</span>
            </div>

            <h1 className="hero-title">
              Your AI-Powered <br />
              <span className="gradient-text">Campus Placement Companion</span>
            </h1>

            <p className="hero-subtitle">
              Get placement-focused guidance on companies, eligibility, interview preparation, and career roles — powered by Microsoft Foundry.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-primary-hero"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? "Enter Placement Assistant 💬" : "Get Started Now 🚀"}
              </button>
              {!isAuthenticated && (
                <button
                  type="button"
                  className="btn-secondary-hero"
                  onClick={login}
                >
                  Sign In with Entra 🔐
                </button>
              )}
            </div>

            <div className="hero-metrics">
              <div className="metric-item">
                <span className="metric-value">10+</span>
                <span className="metric-label">Sample Companies</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">100%</span>
                <span className="metric-label">RAG Grounded</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-value">Entra</span>
                <span className="metric-label">Secure Authentication</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mockup-window">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="mockup-title">Campus Placement AI Preview</span>
                <span className="mockup-status">● Online</span>
              </div>

              <div className="mockup-body">
                <div className="mockup-bubble user">
                  <span className="bubble-text">
                    Am I eligible for TechNova with CSE, 7.2 CGPA and 0 backlogs?
                  </span>
                </div>

                <div className="mockup-bubble ai">
                  <div className="mockup-avatar">🤖</div>
                  <div className="bubble-text">
                    <strong>Yes, you are sample-eligible for TechNova!</strong>
                    <p>• <strong>Role:</strong> Software Developer</p>
                    <p>• <strong>Required CGPA:</strong> Min 7.0 (You have 7.2 ✅)</p>
                    <p>• <strong>Max Backlogs:</strong> 0 (You have 0 ✅)</p>
                    <p>• <strong>Rounds:</strong> Technical, Coding, HR</p>
                  </div>
                </div>

                <div className="mockup-pills">
                  <span className="mockup-pill">🏢 TechNova</span>
                  <span className="mockup-pill">🎯 Interview Prep</span>
                  <span className="mockup-pill">🤖 ML Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features-section">
        <div className="section-header">
          <span className="section-tag">Key Features</span>
          <h2 className="section-title">Designed for University Campus Placements</h2>
          <p className="section-subtitle">
            Everything you need to navigate company criteria, test your eligibility, and master interview rounds.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper blue">
              <span className="feature-icon">🏢</span>
            </div>
            <h3 className="feature-title">Company Discovery</h3>
            <p className="feature-description">
              Explore placement companies and available roles from the project's knowledge base.
            </p>
            <div className="feature-highlight">
              <span>Includes TechNova, DataSphere, AIWorks, CloudCore & more</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper green">
              <span className="feature-icon">✅</span>
            </div>
            <h3 className="feature-title">Eligibility Check</h3>
            <p className="feature-description">
              Check eligibility using branch, CGPA, and backlog information.
            </p>
            <div className="feature-highlight">
              <span>Interactive follow-up context remembers your profile inputs</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper purple">
              <span className="feature-icon">🎯</span>
            </div>
            <h3 className="feature-title">Interview Preparation</h3>
            <p className="feature-description">
              Get placement-focused preparation guidance for interview rounds.
            </p>
            <div className="feature-highlight">
              <span>Coding, Technical, HR, and Scenario rounds strategy</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper amber">
              <span className="feature-icon">🤖</span>
            </div>
            <h3 className="feature-title">Role Preparation</h3>
            <p className="feature-description">
              Prepare for software development, data, cloud, machine learning, and other placement roles supported by the knowledge base.
            </p>
            <div className="feature-highlight">
              <span>Curated roadmaps for Software, Data, ML, Cloud, and QA roles</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <span className="section-tag">Workflow</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Seamless 4-step journey from authentication to grounded placement insights.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">📝</div>
            <h3 className="step-title">Create Account</h3>
            <p className="step-desc">
              Register securely through Microsoft Entra ID with your student email.
            </p>
          </div>

          <div className="step-arrow">➔</div>

          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">🔐</div>
            <h3 className="step-title">Sign In</h3>
            <p className="step-desc">
              Authenticate using single-sign-on (SSO) with PKCE-backed browser credentials.
            </p>
          </div>

          <div className="step-arrow">➔</div>

          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">💬</div>
            <h3 className="step-title">Ask Placement Question</h3>
            <p className="step-desc">
              Query companies, roles, required skills, or test eligibility with your CGPA & branch.
            </p>
          </div>

          <div className="step-arrow">➔</div>

          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">✨</div>
            <h3 className="step-title">Get Grounded AI Response</h3>
            <p className="step-desc">
              Receive clear, markdown-formatted answers grounded in Foundry IQ placement documents.
            </p>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section id="tech-stack" className="tech-stack-section">
        <div className="section-header">
          <span className="section-tag">Architecture</span>
          <h2 className="section-title">Modern AI & Cloud Tech Stack</h2>
          <p className="section-subtitle">
            Engineered with industry-standard enterprise AI, backend services, and cloud authentication.
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-card">
            <div className="tech-badge-icon">⚛️</div>
            <h4>React & Vite</h4>
            <p>Fast modern single-page application with responsive UI and MSAL integration.</p>
          </div>

          <div className="tech-card">
            <div className="tech-badge-icon">⚡</div>
            <h4>FastAPI</h4>
            <p>High-performance Python backend with JWT verification and per-user conversation isolation.</p>
          </div>

          <div className="tech-card">
            <div className="tech-badge-icon">☁️</div>
            <h4>Microsoft Foundry</h4>
            <p>Host for Prompt Agent <code>Campus-Placement-Assistant</code> with role-specific behavioral boundaries.</p>
          </div>

          <div className="tech-card">
            <div className="tech-badge-icon">🧠</div>
            <h4>Foundry IQ</h4>
            <p>Azure knowledge management with vector search and <code>text-embedding-3-small</code> model.</p>
          </div>

          <div className="tech-card">
            <div className="tech-badge-icon">📚</div>
            <h4>RAG Architecture</h4>
            <p>Retrieval-Augmented Generation grounding responses strictly in verified placement documents.</p>
          </div>

          <div className="tech-card">
            <div className="tech-badge-icon">🛡️</div>
            <h4>Microsoft Entra ID</h4>
            <p>Customer and student identity provider with PKCE token validation on client and server.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-banner-section">
        <div className="cta-card">
          <h2>Ready to Explore Your Placement Path?</h2>
          <p>Sign in with Microsoft Entra ID and get instant guidance on eligible companies and interview prep.</p>
          <button
            type="button"
            className="btn-cta-large"
            onClick={handleGetStarted}
          >
            {isAuthenticated ? "Launch Placement Assistant 🎓" : "Sign In & Get Started 🚀"}
          </button>
        </div>
      </section>
    </div>
  );
}
