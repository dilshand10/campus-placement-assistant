import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated, user, login, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname === "/chat" ? "chat" : "landing";

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentView !== "landing") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <div className="brand-badge">🎓</div>
          <div className="brand-text">
            <span className="brand-title">Campus Placement Assistant</span>
            <span className="brand-tag">AI-103 Prototype</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavClick("hero")}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavClick("features")}
          >
            Features
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavClick("how-it-works")}
          >
            How It Works
          </button>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleNavClick("tech-stack")}
          >
            Tech Stack
          </button>
        </div>

        {/* Auth CTA / User Profile */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-profile-nav">
              <div className="user-avatar-pill">
                <span className="user-avatar-icon">👤</span>
                <div className="user-info-text">
                  <span className="user-name">{user?.name || "Student"}</span>
                  <span className="user-email">{user?.email || "Authenticated"}</span>
                </div>
              </div>

              {currentView === "landing" ? (
                <button
                  type="button"
                  className="btn-chat-nav"
                  onClick={() => navigate("/chat")}
                >
                  Open Chat 💬
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-secondary-nav"
                  onClick={() => navigate("/")}
                >
                  Home 🏠
                </button>
              )}

              <button
                type="button"
                className="btn-logout"
                onClick={logout}
                title="Sign out of Microsoft Entra"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                type="button"
                className="btn-login"
                onClick={login}
              >
                Login
              </button>
              <button
                type="button"
                className="btn-get-started"
                onClick={login}
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button type="button" onClick={() => handleNavClick("hero")}>Home</button>
          <button type="button" onClick={() => handleNavClick("features")}>Features</button>
          <button type="button" onClick={() => handleNavClick("how-it-works")}>How It Works</button>
          <button type="button" onClick={() => handleNavClick("tech-stack")}>Tech Stack</button>
          {isAuthenticated ? (
            <>
              <div className="mobile-user-info">
                Signed in as: <strong>{user?.name || user?.email}</strong>
              </div>
              <button
                type="button"
                className="btn-chat-nav mobile-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/chat");
                }}
              >
                Open Chat Assistant 💬
              </button>
              <button
                type="button"
                className="btn-logout mobile-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="mobile-auth-actions">
              <button
                type="button"
                className="btn-login mobile-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  login();
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="btn-get-started mobile-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  login();
                }}
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
