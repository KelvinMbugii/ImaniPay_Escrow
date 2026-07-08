import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Sparkles,
  Handshake,
  Send,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-canvas text-slate-ink">
      <Navbar />
      <Hero />
      <TrustStrip />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute insert-0-z-10 bg-[radial-gradient(60%_60%_at_50%_0%, color-mix(in_oklab, var(--emerald)_18%, transparent), transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            <Sparkles className="h-3.5 w-3.5" /> Trusted escrow, built for
            Africa
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Pay with <span className="text-emerald">confidence</span>,
            <br />
            Get paid with <span className="text-navy">certainty</span>,
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-ink/70 sm:text-lg">
            ImaniPay holds funds in a secure escrow until both buyer and seller
            are satisfied. No more chargebacks, no more scams - just trust, on
            every deal.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semiold text-emerald-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-105"
            >
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-surface px-5 py-3 text-sm font-semibold text-navy hover:bg-canvas"
            >
              Log In
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-ink/60">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald" /> Bank- grade
                security
              </span>
              <span className="inline-flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald" /> 256-bit SSL
              </span>
            </div>
          </div>
        </div>
        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald/15 via-transparent to-navy/15 blur-2xl"
      />
      <div className="rounded-[2rem] border border-black/5 bg-surface p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-ink/60">
              Total in Escrow
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">
              KSh 248,900
            </p>
          </div>
          <span className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
            FUNDED
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <MetricCard label="Active" value="8" tone="emerald" />
          <MetricCard label="Released" value="42" tone="navy" />
        </div>

        <div className="mt-5 rounded-2xl border border-black/5 bg-canvas p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-ink/50">
            Recent Transactions
          </p>
          <ul className="mt-3 space-y-3">
            {[
              {
                t: "MacBook Pro 14”",
                who: "Buyer · A. Otieno",
                amt: "KSh 189,000",
                s: "FUNDED",
              },
              {
                t: "Website Design",
                who: "Seller · Nia Studio",
                amt: "KSh 42,000",
                s: "PENDING",
              },
              {
                t: "iPhone 15",
                who: "Buyer · J. Mwangi",
                amt: "KSh 132,500",
                s: "RELEASED",
              },
            ].map((r) => (
              <li
                key={r.t}
                className="flex items-center justify-between rounded-xl bg-surface px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.t}</p>
                  <p className="truncate text-xs text-slate-ink/60">{r.who}</p>
                </div>
                <div className="ml-3 flex shrink-0 flex-col items-end">
                  <span className="text-sm font-bold">{r.amt}</span>
                  <StatusBadge status={r.s as never} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "navy";
}) {
  const cls =
    tone === "emerald" ? "bg-emerald/10 text-emerald" : "bg-navy/10 text-navy";
  return (
    <div className="rounded-2xl border border-black/5 bg-surface p-4">
      <div
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${cls}`}
      >
        <Wallet className="h-4 w-4" />
      </div>
      <p className="mt-3 text-xs font-medium text-slate-ink/60">{label}</p>
      <p className="text-xl font-extrabold">{value}</p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: "FUNDED" | "PENDING" | "RELEASED";
}) {
  const map = {
    FUNDED: "bg-emerald/10 text-emerald",
    PENDING: "bg-gold/15 text-gold",
    RELEASED: "bg-navy/10 text-navy",
  } as const;
  return (
    <span
      className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold ${map[status]}`}
    >
      {status}
    </span>
  );
}

function TrustStrip() {
  const items = ["Safaricom", "Equity", "KCB", "Flutterwave", "Stripe", "Visa"];
  return (
    <section className="border-y border-black/5 bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-ink/50">
          Trusted by teams working with
        </span>
        {items.map((i) => (
          <span
            key={i}
            className="text-sm font-bold tracking-tight text-slate-ink/60"
          >
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    {
      icon: ShieldCheck,
      title: "Bank-grade Escrow",
      body: "Funds are held in a segregated, regulated account until conditions are met.",
    },
    {
      icon: Handshake,
      title: "Buyer & Seller Protection",
      body: "Both parties confirm delivery before funds are released — no surprises.",
    },
    {
      icon: Clock,
      title: "Fast Releases",
      body: "Instant settlement to M-Pesa or bank account once approved.",
    },
    {
      icon: Users,
      title: "Built for Teams",
      body: "Invite collaborators, assign roles, and track deals in one dashboard.",
    },
  ];
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything you need to transact safely
        </h2>
        <p className="mt-4 text-slate-ink/70">
          Powerful escrow tools designed for freelancers, marketplaces, and
          businesses.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {feats.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group rounded-2xl border border-black/5 bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald transition group-hover:bg-emerald group-hover:text-emerald-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm text-slate-ink/65">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: "Buyer Funds Escrow",
      body: "The buyer deposits payment into a secure ImaniPay account.",
    },
    {
      icon: Send,
      title: "Seller Delivers",
      body: "The seller ships the item or completes the agreed service.",
    },
    {
      icon: CheckCircle2,
      title: "Funds Released",
      body: "Once the buyer approves, funds are released instantly.",
    },
  ];
  return (
    <section id="how" className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How ImaniPay works
          </h2>
          <p className="mt-4 text-slate-ink/70">
            Three simple steps to a stress-free transaction.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="relative rounded-2xl border border-black/5 bg-canvas p-6"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-navy px-2.5 py-0.5 text-xs font-bold text-navy-foreground">
                Step {i + 1}
              </span>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-slate-ink/65">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "KSh 2.4B+", v: "Processed in escrow" },
    { k: "180k+", v: "Verified users" },
    { k: "99.98%", v: "Uptime SLA" },
    { k: "24/7", v: "Human support" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 rounded-3xl bg-navy p-8 text-navy-foreground sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v}>
            <p className="text-3xl font-extrabold tracking-tight text-gold sm:text-4xl">
              {s.k}
            </p>
            <p className="mt-1 text-sm text-white/70">{s.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
    >
      <div className="overflow-hidden rounded-3xl border border-black/5 bg-surface p-10 text-center shadow-sm sm:p-14">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Start your first escrow — free
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-ink/70">
          No monthly fees. Pay only when a transaction completes. Create an
          account in under a minute.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald px-5 py-3 text-sm font-semibold text-emerald-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:brightness-105"
          >
            Create Free Account <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-navy/15 bg-surface px-5 py-3 text-sm font-semibold text-navy hover:bg-canvas"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </section>
  );
}
