import { useState } from "react";
import { 
  Search,
  ShieldCheck,
  AlertTriangle,
  FilePlus2,
  BarChart3,
  Clock,
  Activity,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

interface Counterparty {
  id: string;
  name: string;
  phone: string;
  email: string;
  verified: boolean;
  escrows: number;
  disputes: number;
  activeDispute?: boolean;
  totalVolume: number;
  successRate: number;
  avgReleaseHours: number;
  kycStatus: "KYC VALIDATED" | "UNVERIFIED" | "PENDING";
}

const parties: Counterparty[] = [
  {
    id: "cp-1",
    name: "John Doe Njuguna",
    phone: "+254 722 000 111",
    email: "john.njuguna@domain.ke",
    verified: true,
    escrows: 14,
    disputes: 0,
    totalVolume: 142500,
    successRate: 100,
    avgReleaseHours: 4.2,
    kycStatus: "KYC VALIDATED",
  },
  {
    id: "cp-2",
    name: "Alice Wangari",
    phone: "+254 733 999 888",
    email: "alice.wangari@domain.ke",
    verified: true,
    escrows: 6,
    disputes: 0,
    totalVolume: 58000,
    successRate: 100,
    avgReleaseHours: 5.1,
    kycStatus: "KYC VALIDATED",
  },
  {
    id: "cp-3",
    name: "Peter Kiprop",
    phone: "+254 701 555 444",
    email: "peter.kiprop@domain.ke",
    verified: false,
    escrows: 1,
    disputes: 1,
    activeDispute: true,
    totalVolume: 5000,
    successRate: 0,
    avgReleaseHours: 0,
    kycStatus: "UNVERIFIED",
  },
];

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function CounterpartiesPage() {
  const [ selectedId, setSelectedId ] = useState<string>(parties[0].id);
  const [ query, setQuery ] = useState("");
  const selected = parties.find((p) => p.id === selectedId) ?? parties[0];

  const filtered = parties.filter(
    (p) => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.phone.includes(query),
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-ink sm:text-3xl">
            Counterparties &amp; Trust Directory
          </h1>
          <p className="mt-1 text-sm text-slate-ink/60">Trust Directory Feed</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95">
          <FilePlus2 className="h-4 w-4" /> Draft New Escrow Contract
        </button>
      </div>

      {/* Search bar */}
      <div className="flex flex-col gap-3 sm:flex-row ">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search via name or phone..."
            className="w-full rounded-lg border border-slate-ink/15 bg-surface py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-ink/15 bg-surface px-4 py-2.5 text-sm font-medium text-slate-ink hover:bg-canvas">
          +254 Kenya <ChevronDown className="h-4 w-4 text-slate-ink/50" />
        </button>
      </div>

      {/* Two column layout */}
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Directory feed */}
        <section className="lg:col-span-3 space-y-3">
          {filtered.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-emerald/40 bg-emerald/5 ring-2 ring-emerald/25"
                    : "border-slate-ink/10 bg-surface hover:border-slate-ink/20"
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-base font-bold text-navy-foreground">
                  {initialsOf(p.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-base font-semibold text-slate-ink">
                      {p.name}
                    </p>
                    {p.verified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold">
                        <AlertTriangle className="h-3 w-3" /> Unverified
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-ink/60">{p.phone}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-ink/70">
                    <span className="inline-flex items-center gap-1">
                      <BarChart3 className="h-3.5 w-3.5 text-emerald" />
                      {p.escrows}{" "}
                      {p.escrows === 1 ? "Escrow" : "Escrows Managed"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 ${
                        p.activeDispute ? "font-semibold text-red-600" : ""
                      }`}
                    >
                      <AlertTriangle
                        className={`h-3.5 w-3.5 ${
                          p.activeDispute ? "text-red-500" : "text-slate-ink/40"
                        }`}
                      />
                      {p.disputes}{" "}
                      {p.activeDispute ? "Active Dispute" : "Disputes"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-ink/15 p-8 text-center text-sm text-slate-ink/50">
              No Counterparties match "{query}",
            </div>
          )}
        </section>

        {/* Selected profile + audit */}
        <aside className="lg:col-span-2 space-y-5">
          <div className="rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-ink/50">
              Selected Profile
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-navy-foreground">
                {initialsOf(selected.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-slate-ink">
                  {selected.name}
                </p>
                <p className="truncate text-sm text-slate-ink/60">
                  {selected.email}
                </p>
                <p className="mt-1 text-xs text-slate-ink/60">
                  Badge:{" "}
                  <span
                    className={`font-bold ${
                      selected.kycStatus === "KYC VALIDATED"
                        ? "text-emerald"
                        : "text-gold"
                    }`}
                  >
                    {selected.kycStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-ink">
              Security Audit Context
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <AuditTile
                label="Total Exchanged Volume"
                value={`KES ${selected.totalVolume.toLocaleString()}`}
                icon={<TrendingUp className="h-4 w-4 text-emerald" />}
              />
              <AuditTile
                label="Contract Success Rate"
                value={`${selected.successRate}%`}
                icon={<ShieldCheck className="h-4 w-4 text-emerald" />}
                tone={selected.successRate === 100 ? "positive" : "neutral"}
              />
              <AuditTile
                label="Avg. Release Payout Time"
                value={
                  selected.avgReleaseHours > 0
                    ? `${selected.avgReleaseHours} Hours`
                    : "—"
                }
                icon={<Clock className="h-4 w-4 text-slate-ink/60" />}
              />
              <AuditTile
                label="Conflict Incident Log"
                value={`${selected.disputes} Active`}
                icon={
                  <Activity
                    className={`h-4 w-4 ${
                      selected.disputes > 0 ? "text-red-500" : "text-emerald"
                    }`}
                  />
                }
                tone={selected.disputes > 0 ? "danger" : "positive"}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function AuditTile({
  label,
  value,
  icon,
  tone = "neutral",
} : {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "positive" | "neutral" | "danger";
}) {
  const toneClass =
    tone === "positive"
      ? "text-emerald"
      : tone === "danger"
        ? "text-red-600"
        : "text-slate-ink";
    return (
      <div className="rounded-xl border border-slate-ink/10 bg-canvas/60 p-3">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-ink/55">
          {icon}
          {label}
        </div>
        <p className={`mt-2 text-lg font-bold ${toneClass}`}>{value}</p>
      </div>
    );
}
