import { Navigate, Route, BrowserRouter as Router, Routes,} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./pages/authenticated";
import DashboardHome from "./pages/index";
import CounterpartiesPage from "./pages/counterparties";
import DocumentsPage from "./pages/documents";
import SettingsPage from "./pages/settings";
import SupportPage from "./pages/support";
import TransactionsPage from "./pages/transactions";
import WalletPage from "./pages/wallet";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import WelcomePage from "./pages/welcome";


function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas p-6 text-slate-ink">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />;
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
          <Route path="/welcome" element={<WelcomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<DashboardHome />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="counterparties" element={<CounterpartiesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<SupportPage />} />
          </Route>
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
