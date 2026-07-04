import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

type LoginForm = { emailOrPhone: string; password: string };

export const Route = createFileRoute("/login")({
    head: () => ({
        meta: [
            { title: "Log In - ImaniPay"},
            { name: "description", content: "Log in to your ImaniPay secure escrow account."},
            { property: "og:title", content: "Log In - ImaniPay"},
            { property: "og: description", content: "Log in to your ImaniPay secure escrow account."},
        ],
    }),
    component: LoginPage,
});

function LoginPage() {
    const [showPw, setShowPw] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>();

    const onSubmit = async (values: LoginForm) => {
        try {
            await login(values);
            toast.success("Welcome back!");
            navigate({ to: "/"});
        } catch {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            footer={
                <span className="text-muted-foreground">
                    New to ImaniPay?{" "}
                    <Link to="/register" className="font-semibold text-emerald hover:underline">
                        Sign Up
                    </Link>
                </span>
            }
        >
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
                <Label htmlFor="emailOrPhone" className="text-slate-ink">
                    Email or Phone Number
                </Label>
                <Input
                    id="emailOrPhone"
                    autoComplete="username"
                    placeholder="youe@email.com"
                    className="h-12 bg-surface"
                    {...register("emailOrPhone", {required: "Required"})}
                />
                {errors.emailOrPhone && (
                    <p className="text-xs text-destructive">{errors.emailOrPhone.message}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-ink">
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPw ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="........"
                        className="h-12 bg-surface pr-11"
                        {...register{"password", {required: "Required", minLength: { value:6, message: "Min 6 characters"}}}}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw((s) => !s)}
                        className="absolute insert-y-0 right-3 flex items-center text-muted-foreground hover:text-slate-ink"
                        aria-label={showPw ? "Hide password" : "Show password"}
                    >
                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password && <p className="text-xs text-destructive"> {errors.password.message}</p>}
            </div>

            <div className="flex justify-end">
                <button type="button" className="text-sm font-medium text-emerald hover:underline">
                    Forgot Password?
                </button>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full bg-emerald text-emerald-foreground text-base font-semibold hover:bg-emerald/90">
                {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin"/> : "Log In"}
            </Button>
        </form>
    </AuthLayout>
    );
}