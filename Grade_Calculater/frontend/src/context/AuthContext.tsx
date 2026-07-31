import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; photoURL?: string } | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; photoURL?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check URL or session storage for mock token (Guest login)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token === 'guest-test-token' || sessionStorage.getItem('isGuest') === 'true') {
      if (token === 'guest-test-token') {
        sessionStorage.setItem('isGuest', 'true');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      setIsAuthenticated(true);
      setUser({ name: "Guest User", email: "guest@example.com" });
      setLoading(false);
      return;
    }

    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser) {
        setIsAuthenticated(true);
        setUser({
          name: currentUser.displayName || 'Unknown User',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || undefined
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Firebase Login Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    } finally {
      // Reset guest token
      sessionStorage.removeItem('isGuest');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-300">Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
