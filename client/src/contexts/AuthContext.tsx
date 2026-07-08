import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Role = "buyer" | "seller";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payLoad: { emailOrPhone: string; password: string }) => Promise<void>;
  register: (payLoad: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: Role;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

interface AuthResponse {
  accessToken: string;
  user: Omit<User, "phone" | "role"> & Partial<Pick<User, "phone" | "role">>;
}
const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "imanipay_user";
const TOKEN_KEY = "imanipay_token";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

async function postAuth(
  path: "login" | "register",
  body: unknown,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Unable to ${path}`);
  }

  return res.json() as Promise<AuthResponse>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, token }, setSession] = useState<{
    user: User | null;
    token: string | null;
  }>(() => {
    try {
      const rawUser = window.localStorage.getItem(STORAGE_KEY);
      const rawToken = window.localStorage.getItem(TOKEN_KEY);

      return {
        user: rawUser ? (JSON.parse(rawUser) as User) : null,
        token: rawToken,
      };
    } catch {
      return { user: null, token: null };
    }
  });
  const [isLoading] = useState(false);

  const persist = useCallback(
    (nextUser: User | null, nextToken: string | null) => {
      setSession({ user: nextUser, token: nextToken });

      if (nextUser && nextToken) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
        window.localStorage.setItem(TOKEN_KEY, nextToken);
        return;
      }

      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(TOKEN_KEY);
    },
    [],
  );

  const login: AuthState["login"] = useCallback(
    async ({ emailOrPhone, password }) => {
      const data = await postAuth("login", { email: emailOrPhone, password });
      persist(
        { ...data.user, role: data.user.role ?? "buyer" },
        data.accessToken,
      );
    },
    [persist],
  );

  const register: AuthState["register"] = useCallback(
    async ({ firstName, lastName, email, password, phone, role }) => {
      const data = await postAuth("register", {
        firstName,
        lastName,
        email,
        password,
      });
      persist({ ...data.user, phone, role }, data.accessToken);
    },
    [persist],
  );

  const logout = useCallback(() => persist(null, null), [persist]);

  const value = useMemo<AuthState>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
