import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { msalConfig, loginRequest, isEntraConfigured } from "./authConfig";

const AuthContext = createContext(null);

// Initialize MSAL PublicClientApplication instance
let msalInstance = null;
if (typeof window !== "undefined") {
  msalInstance = new PublicClientApplication(msalConfig);
}

export function AuthLoadingScreen({
  message = "Signing you in...",
  submessage = "Please wait while we securely sign you in.",
}) {
  return (
    <div className="auth-fullpage-loader">
      <div className="auth-loader-card">
        <div className="auth-loader-brand">
          <span className="auth-loader-icon">🎓</span>
          <span className="auth-loader-title">Campus Placement Assistant</span>
        </div>
        <div className="auth-loader-spinner-wrapper">
          <div className="auth-spinner-ring"></div>
        </div>
        <h2 className="auth-loader-heading">{message}</h2>
        <p className="auth-loader-subtext">{submessage}</p>
        <div className="auth-loader-badge">
          <span className="auth-loader-dot"></span>
          <span>Microsoft Entra ID</span>
        </div>
      </div>
    </div>
  );
}

function EntraConfigModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const sampleEnv = `VITE_API_URL=http://127.0.0.1:8000
VITE_ENTRA_CLIENT_ID=your-entra-application-client-id
VITE_ENTRA_AUTHORITY=https://your-tenant-name.ciamlogin.com/your-tenant-id/v2.0
VITE_ENTRA_REDIRECT_URI=http://localhost:5173
VITE_ENTRA_SCOPES=openid,profile,email`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-icon">🔐</span>
            <h3>Microsoft Entra ID Setup</h3>
          </div>
          <button type="button" className="btn-close-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-notice">
            To enable real authentication, your Microsoft Entra ID application credentials need to be added to <code>FRONTEND/.env</code>.
          </p>

          <div className="steps-guide">
            <h4>Quick Azure Portal Steps:</h4>
            <ol>
              <li>Go to <strong>Microsoft Entra Admin Center</strong> (<a href="https://entra.microsoft.com" target="_blank" rel="noreferrer">entra.microsoft.com</a>).</li>
              <li>Under <strong>App registrations</strong>, select your Single-Page Application (SPA).</li>
              <li>Copy the <strong>Application (client) ID</strong> and <strong>Authority URL</strong>.</li>
              <li>Create or edit <code>FRONTEND/.env</code> with the variables below:</li>
            </ol>
          </div>

          <div className="code-box-wrapper">
            <div className="code-box-header">
              <span>FRONTEND/.env</span>
              <button type="button" className="btn-copy-code" onClick={copyToClipboard}>
                {copied ? "✓ Copied!" : "📋 Copy"}
              </button>
            </div>
            <pre className="code-box"><code>{sampleEnv}</code></pre>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-modal-done" onClick={onClose}>
            Got it, I'll configure FRONTEND/.env
          </button>
        </div>
      </div>
    </div>
  );
}

function InnerAuthProvider({ children }) {
  const { instance, accounts, inProgress } = useMsal();
  const isMsalAuth = useIsAuthenticated();
  const [authError, setAuthError] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Derive active account synchronously from instance or accounts
  const activeAccount = useMemo(() => {
    const current = instance.getActiveAccount();
    if (current) return current;
    if (accounts.length > 0) {
      return accounts[0];
    }
    return null;
  }, [accounts, instance]);

  // Keep active account registered in MSAL instance
  useEffect(() => {
    if (accounts.length > 0 && !instance.getActiveAccount()) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
        event.eventType === EventType.SSO_SILENT_SUCCESS ||
        event.eventType === EventType.HANDLE_REDIRECT_END
      ) {
        if (event.payload && event.payload.account) {
          instance.setActiveAccount(event.payload.account);
        } else {
          const current = instance.getActiveAccount() || instance.getAllAccounts()[0];
          if (current) {
            instance.setActiveAccount(current);
          }
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  const user = useMemo(() => {
    if (!activeAccount) return null;
    const claims = activeAccount.idTokenClaims || {};
    return {
      id: activeAccount.homeAccountId || activeAccount.localAccountId || claims.oid || claims.sub,
      name: activeAccount.name || claims.name || claims.given_name || "Student",
      email: activeAccount.username || claims.email || claims.preferred_username || "",
      username: activeAccount.username || claims.preferred_username || "",
      claims: claims,
    };
  }, [activeAccount]);

  const login = async () => {
    setAuthError(null);
    if (!isEntraConfigured()) {
      setShowConfigModal(true);
      return;
    }
    try {
      // Use redirect for single-window authentication flow
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      console.error("Entra Login failed:", err);
      setAuthError(err.message || "Authentication failed");
    }
  };
  const signUp = async () => {
    await login();
  };

  const logout = async () => {
    setAuthError(null);
    try {
      if (activeAccount) {
        await instance.logoutRedirect({
          account: activeAccount,
          postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
        });
      } else {
        await instance.logoutRedirect();
      }
    } catch (err) {
      console.error("Logout redirect failed:", err);
      setAuthError(err.message || "Logout failed");
    }
  };
  const getToken = async () => {
    const account = instance.getActiveAccount() || (accounts.length > 0 ? accounts[0] : null);
    if (!account) {
      throw new Error("No active authenticated account found. Please log in.");
    }

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
      return response.accessToken || response.idToken;
    } catch (silentErr) {
      console.warn("Silent token acquisition failed, requesting interactive token:", silentErr);
      try {
        const response = await instance.acquireTokenPopup({
          ...loginRequest,
          account: account,
        });
        return response.accessToken || response.idToken;
      } catch (interactiveErr) {
        console.error("Interactive token acquisition failed:", interactiveErr);
        throw interactiveErr;
      }
    }
  };

  const isAuth = Boolean(activeAccount) || (isMsalAuth && accounts.length > 0);
  const isLoading = inProgress !== "none";

  const value = {
    isAuthenticated: isAuth,
    user: user,
    activeAccount: activeAccount,
    loading: isLoading,
    inProgress: inProgress,
    authError: authError,
    isConfigured: isEntraConfigured(),
    login: login,
    signUp: signUp,
    logout: logout,
    getToken: getToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {showConfigModal && (
        <EntraConfigModal onClose={() => setShowConfigModal(false)} />
      )}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  const [msalReady, setMsalReady] = useState(() => !msalInstance);

  useEffect(() => {
    let isMounted = true;

    if (msalInstance) {
      msalInstance
        .initialize()
        .then(() => {
          if (isMounted) setMsalReady(true);
        })
        .catch((err) => {
          console.error("MSAL initialization failed:", err);
          if (isMounted) setMsalReady(true);
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (!msalReady) {
    return (
      <AuthLoadingScreen
        message="Signing you in..."
        submessage="Please wait while we securely connect and sign you in."
      />
    );
  }

  return (
    <MsalProvider instance={msalInstance}>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </MsalProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
