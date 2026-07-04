import { createFileRoute, Link, useNavigate} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Loader2, ShoppingBag, Tag } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { cn } from "../lib/utils";

type Role = "buyer" | "seller";
type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
};

export const route = createFileRoute("/register")({
    head: () => ({
        meta: [
            { tittle: "Create Account - ImaniPay"},
            { name: "description", content: "Create your secure ImaniPay escrow account in minutes."},
            { property: "og:title", content: "Create Account - ImaniPay"},
            { property: "og:description", content: "Create your secure ImaniPay escrow account in minutes."},
        ],
    }),
    component: RegisterPage,
});

function RegisterPage() {
    const [showPw, setShowPw] = useState(false);
    const [role, setRole] = useState<Role>("buyer");
    const { register: signup } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterForm>();

    const onSubmit = async (values: RegisterForm) => {
        try {
            await signup({...values, role});
            toast.success("Account created!");
            navigate({ to: "/"});
        } catch {
            toast.error("Registration failed. Try again.");
        }
    };
    return (
      <AuthLayout
        title="Create Secure Account"
        footer={
          <span className="text-muted-foreground">
            Already have an account?{""}
            <Link
              to="/login"
              className="font-semibold text-emerald hover:underline"
            >
              Log In
            </Link>
          </span>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-slate-ink">
                First Name
              </Label>
              <Input
                id="firstName"
                className="h-12 bg-surface"
                placeholder="First Name"
                {...register("firstName", { required: "Required" })}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-slate-ink">
                Last Name
              </Label>
              <Input
                id="lastName"
                className="h-12 bg-surface"
                placeholder="Last Name"
                {...register("lastName", { required: "Required" })}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-slate-ink">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className="h-12 bg-surface"
              placeholder="you@example.com"
              {...register("email", {
                required: "Required",
                pattern: { value: /^\S+@\S+\.\S+S/, message: "Invalid email" },
              })}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-ink">Phone Number</Label>
            <div className="flex gap-2">
              <div className="flex h-12 shrink-0 items-center gap-2 rounded-md border border-input bg-surface px-3 text-sm text-slate-ink">
                <span aria-hidden>KE</span>
                <span className="font-medium">+254</span>
              </div>
              <Input
                className="h-12 flex-1 bg-surface"
                placeholder="712 345 678"
                inputMode="tel"
                {...register("phone", {
                  required: "Required",
                  minLength: { value: 7, message: "Too short" },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-ink">Role</Label>
            <div className="grid grid-cols-2 gap-2 rounded-1g border border-input bg-secondary/50 p-1">
              <RoleOption
                active={role === "buyer"}
                onClick={() => setRole("buyer")}
                icon={<ShoppingBag className="h-4 w-4" />}
                label="Buy Safely"
              />
              <RoleOption
                active={role === "seller"}
                onClick={() => setRole("seller")}
                icon={<Tag className="h-4 w-4" />}
                label="Sell Safelly"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-slate-ink">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-12 bg-surface pr-11"
                {...register("password", {
                  required: "Required",
                  minLength: { value: 8, message: "Min 8 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-slate-ink"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full bg-emerald text-emerald-foreground text-base font-semibold hover:bg-emerald/90"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Create Free Account"
            )}
          </Button>
        </form>
      </AuthLayout>
    );
}

function RoleOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-colors",
        active
          ? "bg-surface text-emerald shadow-sm ring-1 ring-emerald/30"
          : "text-muted-foreground hover:text-slate-ink",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
