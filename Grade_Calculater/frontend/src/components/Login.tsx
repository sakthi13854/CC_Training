import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="glass-panel p-8 text-center flex flex-col items-center gap-6 max-w-sm w-full">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.078 2.027-.231 3.021M15.106 15.106L18 18m-2.906-2.906A9.976 9.976 0 0112 15a9.976 9.976 0 01-2.906-.894" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Sign in to access the CGPA Calculator and student chat.</p>
        </div>
        <button 
          onClick={login}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
        
        <div className="relative w-full my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-slate-400">or</span>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = "/?token=guest-test-token"}
          className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl font-medium transition-all"
        >
          Continue as Guest (Test Mode)
        </button>
      </div>
    </div>
  );
};
