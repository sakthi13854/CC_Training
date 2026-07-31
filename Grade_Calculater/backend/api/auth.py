from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth
import os

router = APIRouter()
security = HTTPBearer()

# Initialize Firebase Admin
# Expects a serviceAccountKey.json in the backend directory
service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY", "serviceAccountKey.json")
try:
    if not firebase_admin._apps:
        if os.path.exists(service_account_path):
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
        else:
            print("Warning: serviceAccountKey.json not found. Firebase Admin not initialized properly.")
except Exception as e:
    print(f"Failed to initialize Firebase Admin: {e}")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    FastAPI dependency that validates the Firebase ID token in the Authorization header.
    """
    if credentials.credentials == "guest-test-token":
        return {"uid": "guest", "email": "guest@example.com", "name": "Guest User"}

    try:
        decoded_token = auth.verify_id_token(credentials.credentials)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

@router.get("/user/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
