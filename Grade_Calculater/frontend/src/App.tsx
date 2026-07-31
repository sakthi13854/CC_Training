import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './components/Login'
import { Calculator } from './components/Calculator'
import { Notes } from './components/Notes'
import { Chat } from './components/Chat'

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="mb-10 text-center relative max-w-6xl mx-auto">
        <div className="absolute right-0 top-0 text-sm flex items-center gap-4">
          <span className="text-slate-400 font-medium">Hi, {user?.name}</span>
          <button onClick={logout} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors border border-white/10">
            Logout
          </button>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
          Campus Connect
        </h1>
        <p className="mt-4 text-slate-400 text-lg">Calculate your CGPA, take notes, and chat with peers.</p>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Calculator Section */}
        <section className="glass-panel p-6 sm:p-8 w-full lg:w-3/5">
          <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-3">
            <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            CGPA Calculator
          </h2>
          <Calculator />
        </section>

        {/* Chat & Notes Section */}
        <section className="flex flex-col gap-8 w-full lg:w-2/5">
          <div className="glass-panel p-6 sm:p-8">
            <Notes />
          </div>

          <div className="glass-panel p-6 sm:p-8 flex-1 flex flex-col min-h-[500px]">
            <h2 className="text-2xl font-bold mb-6 text-slate-100 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
              </span>
              Live Chat
            </h2>
            <Chat />
          </div>
        </section>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
