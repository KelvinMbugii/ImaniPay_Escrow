import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" },
];

export function Navbar(){
    const [open, setOpen] = useState(false);

    return (
      <header className="sticky top-0 z-40 border-b border-black/5 bg-surface/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <Logo className="text-xl sm:text-2xl" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-ink/70 transition-colors hover:text-emerald"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-s md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-navy hover:bg-canvas"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-emerald-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-105"
            >
              Create Free Account
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-black/5 bg-surface md:hidden">
            <div className="space-y-1 px-4 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-ink/80 hover:bg-canvas"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  className="rounded-lg border border-navy/15 px-3 py-2 text-center text-sm font-semibold text-navy"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-emerald px-3 py-2 text-center text-sm font-semibold text-emerald-foreground"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    );
}