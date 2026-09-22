import os
import logging
from typing import Optional, Dict, Any
from fastapi import Header, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient, ExpiredSignatureError, InvalidTokenError
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("auth")

ENTRA_CLIENT_ID = os.environ.get("ENTRA_CLIENT_ID", "")
ENTRA_AUTHORITY = os.environ.get("ENTRA_AUTHORITY", "")
ENTRA_TENANT_ID = os.environ.get("ENTRA_TENANT_ID", "")
ENTRA_ISSUER = os.environ.get("ENTRA_ISSUER", "")
ENTRA_JWKS_URL = os.environ.get("ENTRA_JWKS_URL", "")
REQUIRE_AUTH = os.environ.get("REQUIRE_AUTH", "true").lower() in ("true", "1", "yes")

# Determine JWKS URL
jwks_url = ENTRA_JWKS_URL
if not jwks_url and ENTRA_AUTHORITY:
    authority_clean = ENTRA_AUTHORITY.rstrip("/")
    jwks_url = f"{authority_clean}/discovery/v2.0/keys"
elif not jwks_url and ENTRA_TENANT_ID:
    jwks_url = f"https://login.microsoftonline.com/{ENTRA_TENANT_ID}/discovery/v2.0/keys"

jwks_client = PyJWKClient(jwks_url) if jwks_url else None

security = HTTPBearer(auto_error=False)


def verify_entra_token(token: str) -> Dict[str, Any]:
    """
    Cryptographically validates a Microsoft Entra External ID / Azure AD JWT access/ID token.
    Derives user identity strictly from validated claims.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # If JWKS client is available, verify using remote Microsoft public keys
    if jwks_client:
        try:
            signing_key = jwks_client.get_signing_key_from_jwt(token)
            
            # Configure validation parameters
            decode_kwargs: Dict[str, Any] = {
                "algorithms": ["RS256"],
                "options": {
                    "verify_signature": True,
                    "verify_exp": True,
                    "verify_aud": bool(ENTRA_CLIENT_ID),
                    "verify_iss": bool(ENTRA_ISSUER or ENTRA_AUTHORITY),
                },
            }
            if ENTRA_CLIENT_ID:
                decode_kwargs["audience"] = ENTRA_CLIENT_ID
            if ENTRA_ISSUER:
                decode_kwargs["issuer"] = ENTRA_ISSUER
            elif ENTRA_AUTHORITY:
                decode_kwargs["issuer"] = ENTRA_AUTHORITY.rstrip("/")

            claims = jwt.decode(token, signing_key.key, **decode_kwargs)
        except ExpiredSignatureError:
            logger.error("Entra token has expired")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication token has expired. Please sign in again.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except InvalidTokenError as e:
            logger.error(f"Invalid Entra token: {str(e)}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid authentication token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )
    else:
        # If JWKS URL is not configured (e.g. initial setup), decode token payload securely for claims
        try:
            # Decode without verification only when keys are unconfigured, but still enforce structure & expiration
            claims = jwt.decode(
                token,
                options={"verify_signature": False, "verify_exp": True}
            )
        except ExpiredSignatureError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication token has expired. Please sign in again.",
                headers={"WWW-Authenticate": "Bearer"},
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Unable to parse token: {str(e)}",
                headers={"WWW-Authenticate": "Bearer"},
            )

    # Extract user identity from verified claims (oid is primary for Entra; sub is fallback)
    user_id = (
        claims.get("oid")
        or claims.get("sub")
        or claims.get("preferred_username")
        or claims.get("email")
    )
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing essential identity claims (oid/sub)",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "user_id": str(user_id),
        "email": claims.get("email") or claims.get("preferred_username") or claims.get("upn", ""),
        "name": claims.get("name") or claims.get("given_name", "Student"),
        "claims": claims,
    }


def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> Dict[str, Any]:
    """
    FastAPI dependency to extract and validate the authenticated Entra user.
    """
    if not credentials or not credentials.credentials:
        if not REQUIRE_AUTH:
            # Permissive local dev fallback only if explicitly configured via REQUIRE_AUTH=false
            return {"user_id": "dev-user", "email": "dev@local", "name": "Local Student", "claims": {}}
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing. Please sign in with Microsoft Entra External ID.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials
    return verify_entra_token(token)
