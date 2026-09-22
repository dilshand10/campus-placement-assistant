/**
 * Microsoft Entra External ID MSAL Configuration
 * Configures PublicClientApplication for single-page application (SPA) authentication with PKCE.
 */

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID || "";
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID || "";
let authority = import.meta.env.VITE_ENTRA_AUTHORITY || "";

if (!authority && tenantId) {
  authority = `https://login.microsoftonline.com/${tenantId}`;
}

const redirectUri =
  import.meta.env.VITE_ENTRA_REDIRECT_URI ||
  (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173");

let knownAuthorities = [];
if (authority) {
  try {
    const url = new URL(authority);
    // Add custom domain / CIAM domain to knownAuthorities
    if (!url.hostname.includes("login.microsoftonline.com")) {
      knownAuthorities = [url.hostname];
    }
  } catch (e) {
    console.warn("Could not parse ENTRA_AUTHORITY hostname:", e);
  }
}

export const msalConfig = {
  auth: {
    clientId: clientId,
    authority: authority,
    knownAuthorities: knownAuthorities,
    redirectUri: redirectUri,
    postLogoutRedirectUri: redirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage", // "sessionStorage" or "localStorage"
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (import.meta.env.DEV && level <= 2) {
          console.debug(`[MSAL] ${message}`);
        }
      },
      logLevel: 2, // 0: Error, 1: Warning, 2: Info, 3: Verbose
    },
  },
};

// Default scopes for user authentication
const customScopes = import.meta.env.VITE_ENTRA_SCOPES;
export const loginRequest = {
  scopes: customScopes
    ? customScopes.split(",").map((s) => s.trim())
    : ["openid", "profile", "email"],
};

export const isEntraConfigured = () => {
  return Boolean(
    import.meta.env.VITE_ENTRA_CLIENT_ID &&
    (import.meta.env.VITE_ENTRA_AUTHORITY || import.meta.env.VITE_ENTRA_TENANT_ID)
  );
};
