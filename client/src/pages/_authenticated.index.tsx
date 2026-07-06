import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ImaniPay" },
      {
        name: "description",
        content: "Your escrow overview, balances, and recent activity.",
      },
    ],
  }),
  component: DashboardHome,
});

const metrics = [
  {
    label: "Escrow Balance",
    value: "KSh 248,900",
    delta: "+12.4%",
    up: true,
    icon: Wallet,
    tone: "emerald",
  },
  {
    label: "In Escrow",
    value: "8",
    delta: "2 pending release",
    up: true,
    icon: ShieldCheck,
    tone: "navy",
  },
  {
    label: "Awaiting Action",
    value: "3",
    delta: "Review required",
    up: false,
    icon: Clock,
    tone: "gold",
  },
  {
    label: "Completed",
    value: "42",
    delta: "+6 this month",
    up: true,
    icon: CheckCircle2,
    tone: "emerald",
  },
];

const transactions = [
  {
    id: "TX-10482",
    party: "Acme Suppliers Ltd",
    amount: "KSh 84,000",
    status: "FUNDED",
    date: "Today, 10:24",
  },
  {
    id: "TX-10481",
    party: "Blue Ridge Traders",
    amount: "KSh 22,500",
    status: "PENDING",
    date: "Today, 09:11",
  },
  {
    id: "TX-10476",
    party: "Nia Logistics",
    amount: "KSh 156,200",
    status: "RELEASED",
    date: "Yesterday",
  },
  {
    id: "TX-10470",
    party: "Kilimo Farms",
    amount: "KSh 12,800",
    status: "DISPUTED",
    date: "2 days ago",
  },
];

const statusStyle: Record<string, string> = {
  FUNDED: "bg-emerald/10 text-emerald",
  PENDING: "bg-gold/15 text-[color:oklch(0.55_0.13_70)]",
  RELEASED: "bg-navy/10 text-navy",
  DISPUTED: "bg-red-500/10 text-red-600",
};

function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-ink sm:text-3xl">
            Welcome back, {user?.firstName ?? "there"}
          </h1>
          <p className="mt-1 text-sm text-slate-ink/60">
            Here's what's happening with your escrow activity today.
          </p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground shadow-sm hover:opacity-95"
        >
          <Plus className="h-4 w-4" /> New Escrow
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const toneBg =
            m.tone === "emerald"
              ? "bg-emerald/10 text-emerald"
              : m.tone === "navy"
                ? "bg-navy/10 text-navy"
                : "bg-gold/15 text-[color:oklch(0.55_0.13_70)]";
          return (
            <div
              key={m.label}
              className="rounded-xl border border-slate-ink/8 bg-surface p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-ink/50">
                    {m.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-ink">
                    {m.value}
                  </p>
                </div>
                <div className={`rounded-lg p-2 ${toneBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                {m.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-gold" />
                )}
                <span className="text-slate-ink/60">{m.delta}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent transactions */}
        <div className="rounded-xl border border-slate-ink/8 bg-surface shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-ink/8 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-ink">
              Recent transactions
            </h2>
            <Link
              to="/transactions"
              className="text-sm font-medium text-emerald hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-ink/8">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-canvas"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-ink">
                    {tx.party}
                  </p>
                  <p className="text-xs text-slate-ink/50">
                    {tx.id} · {tx.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-ink">
                    {tx.amount}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${
                      statusStyle[tx.status] ?? "bg-slate-ink/10 text-slate-ink"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust / security card */}
        <div className="space-y-6">
          <div className="rounded-xl bg-navy p-6 text-navy-foreground shadow-sm">
            <ShieldCheck className="h-6 w-6 text-gold" />
            <h3 className="mt-3 text-lg font-semibold">Account verified</h3>
            <p className="mt-1 text-sm text-white/70">
              Your account is fully verified. Enjoy higher limits and instant
              releases.
            </p>
            <Link
              to="/settings"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
            >
              Manage verification <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-slate-ink/8 bg-surface p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-ink">
              Quick actions
            </h3>
            <div className="mt-4 space-y-2">
              <Link
                to="/transactions"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-canvas"
              >
                <span>Create new escrow</span>
                <ArrowUpRight className="h-4 w-4 text-slate-ink/40" />
              </Link>
              <Link
                to="/wallet"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-canvas"
              >
                <span>Top up wallet</span>
                <ArrowUpRight className="h-4 w-4 text-slate-ink/40" />
              </Link>
              <Link
                to="/counterparties"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm hover:bg-canvas"
              >
                <span>Invite a counterparty</span>
                <ArrowUpRight className="h-4 w-4 text-slate-ink/40" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
