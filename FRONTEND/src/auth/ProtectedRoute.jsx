import { useAuth, AuthLoadingScreen } from "./AuthProvider";

export function ProtectedRoute({ children, fallback }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <AuthLoadingScreen
        message="Verifying Session..."
        submessage="Checking your authentication credentials."
      />
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return fallback;
    }
    return (
      <div className="unauthorized-container">
        <div className="unauthorized-card">
          <div className="lock-icon">🔒</div>
          <h2>Authentication Required</h2>
          <p>
            Please sign in with Microsoft Entra ID to access the Campus Placement Assistant chat interface.
          </p>
          <a href="/" className="btn-primary">
            Return to Home & Sign In
          </a>
        </div>
      </div>
    );
  }

  return children;
}
