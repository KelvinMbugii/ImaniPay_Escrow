import { createContext, useCallback, useContext, useEffect, useMemo, useState type ReactNode} from "react";

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
        password: string ;
    }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "imanipay_user";
const TOKEN_KEY = "imanipay_token";

export function AuthProvider({ children } : { children:ReactNode}){
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            const t = window.localStorage.getItem(TOKEN_KEY);
            if (raw) setUser (JSON.parse(raw));
            if (t) setToken(t);
        } catch {
            /* ignore */
        } finally {
            setIsLoading(false);
        }
    }, []);

    const persist = (u: User | null, t: string | null) => {
        setUser(u);
        setToken(t);
        if (typeof window === "undefined") return;
        if (u && t) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
            window.localStorage.setItem(TOKEN_KEY, t);
        } else {
            window.localStorage.removeItem(STORAGE_KEY);
            window.localStorage.removeItem(TOKEN_KEY);

        }
    };
    
    const login: AuthState["login"] = useCallback(async ({ emailOrPhone }) => {
        // TODO
        await new Promise((r) => setTimeout(r, 600));
        persist(
            {
                id:"demo",
                firstName: "John",
                lastName: "Doe",
                email: emailOrPhone.includes("@") ? emailOrPhone : "john@imanipay.co",
                role: "buyer",
            },
            "demo-token"
        );
    }, []);

    const register: AuthState["register"] = useCallback(async(payload) => {
        await new Promise((r) => setTimeout(r, 700));
        persist(
            {
                id: "demo",
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                phone: payload.phone,
                role: payload.role,
            },
            "demo-token",
        );
    }, []);

    const logout = useCallback(() => persist(null, null), []);

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

    return <AuthContext.Provider value={value}>{children}
    </AuthContext.Provider>
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}