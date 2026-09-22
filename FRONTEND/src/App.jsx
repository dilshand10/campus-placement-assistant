import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth, AuthLoadingScreen } from "./auth/AuthProvider";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./pages/LandingPage";
import { ChatPage } from "./pages/ChatPage";
import "./App.css";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Detect MSAL redirect processing (code in URL hash)
  const isRedirect = typeof window !== "undefined" && window.location.hash && window.location.hash.includes("code=");

  // Redirect based on authentication state after MSAL processing
  useEffect(() => {
    if (!loading && !isRedirect) {
      if (isAuthenticated) {
        // After successful authentication, if we are on the landing page, go to chat
        if (location.pathname === "/") {
          navigate("/chat", { replace: true });
        }
      } else {
        // If not authenticated and trying to access a protected route, send to landing
        if (location.pathname !== "/") {
          navigate("/", { replace: true });
        }
      }
    }
  }, [isAuthenticated, loading, isRedirect, navigate, location.pathname]);

  // Show loading screen while MSAL processes
  if (loading || isRedirect) {
    return (
      <AuthLoadingScreen
        message="Signing you in..."
        submessage="Please wait while we securely sign you in."
      />
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main-content">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/chat" replace /> : <LandingPage />}
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute fallback={<Navigate to="/" replace />}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/chat" : "/"} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}