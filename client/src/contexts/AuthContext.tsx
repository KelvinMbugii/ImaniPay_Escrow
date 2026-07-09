import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Role = "buyer" | "seller";

type LoginPayload = {
  emailOrPhone: string;
  password: string;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
};

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
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

interface AuthResponse {
  accessToken: string;
  user: Omit<User, "phone" | "role"> & Partial<Pick<User, "phone" | "role">>;
}

type StoredSession = {
  user: User | null;
  token: string | null;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "imanipay_user";
const TOKEN_KEY = "imanipay_token";
const DEFAULT_API_BASE_URL = "http://localhost:3000/api/v1";
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
).replace(/\/$/, "");

function readStoredSession(): StoredSession {
  const rawUser = window.localStorage.getItem(STORAGE_KEY);
  const token = window.localStorage.getItem(TOKEN_KEY);

  return {
    user: rawUser ? (JSON.parse(rawUser) as User) : null,
    token,
  };
}

function writeStoredSession({ user, token }: StoredSession) {
  if (user && token) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
}

async function readErrorMessage(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await response.json()) as { message?: string | string[] };

    if (Array.isArray(body.message)) return body.message.join(" ");
    if (body.message) return body.message;
  }

  const message = await response.text();
  return message || fallback;
}

async function postAuth(
  path: "login" | "register",
  body: unknown,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const message = await readErrorMessage(response, `Unable to ${path}`);
    throw new Error(message);
  }

  return response.json() as Promise<AuthResponse>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, token }, setSession] = useState<StoredSession>(() => {
    try {
      return readStoredSession();
    } catch {
      return { user: null, token: null };
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const persist = useCallback((nextSession: StoredSession) => {
    setSession(nextSession);
    writeStoredSession(nextSession);
  }, []);

  const login = useCallback<AuthState["login"]>(
    async ({ emailOrPhone, password }) => {
      setIsLoading(true);

      try {
        const data = await postAuth("login", { email: emailOrPhone, password });
        persist({
          user: { ...data.user, role: data.user.role ?? "buyer" },
          token: data.accessToken,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [persist],
  );

  const register = useCallback<AuthState["register"]>(
    async ({ firstName, lastName, email, password, phone, role }) => {
      setIsLoading(true);

      try {
        const data = await postAuth("register", {
          firstName,
          lastName,
          email,
          password,
        });
        persist({
          user: { ...data.user, phone, role },
          token: data.accessToken,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [persist],
  );

  const logout = useCallback(() => {
    persist({ user: null, token: null });
  }, [persist]);

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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
