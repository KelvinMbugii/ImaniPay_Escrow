import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-8 sm:max-w-lg sm:py-12">
        <div className="mb-8 flex justify-center">
          <Logo className="text-2xl sm:text-3xl" />
        </div>

        <div className="flex-1 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
          <h1 className="text-center text-2xl font-bold text-slate0-ink sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-6">{children}</div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-emerald" />
          <span>Secure by SSL / Bank-Grade Encryption</span>
        </div>

        {footer ? (
          <div className="mt-4 text-center text-sm">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
