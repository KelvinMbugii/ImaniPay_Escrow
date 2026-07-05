import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-canvas px-6 py-10 text-slate-ink">
      <section className="mx-auto max-w-3xl rounded-2xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald">
          ImaniPay Escrow
        </p>
        <h1 className="mt-3 text-3xl font-bold">
          Welcome{user ? `, ${user.firstName}` : ""}.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Your secure escrow dashboard is ready. Start by creating transactions,
          tracking payments, and managing buyer or seller milestones.
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-6 rounded-md bg-emerald px-4 py-2 text-sm font-semibold text-emerald-foreground hover:bg-emerald/90"
        >
          Log out
        </button>
      </section>
    </main>
  );
}

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas p-6 text-slate-ink">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas p-6 text-slate-ink">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
}
