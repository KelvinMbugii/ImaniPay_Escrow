import { useMemo, useState } from "react";
import { 
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Lock,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  DollarSign,
  FileText,
  Download,
  MoreHorizontal,
} from "lucide-react";


  type Status = "FUNDED" | "SHIPPED" | "DISPUTED" | "COMPLETED" | "AWAITING DEPOSIT";

  interface Txn {
    id: string;
    buyer: string;
    seller: string;
    item: string;
    amount: number;
    currency: string;
    status: Status;
    date: string;
  }

  const TXNS: Txn[] =[
    { id: "TRX-001", buyer: "Kelvin", seller: "John", item: "MacBook Pro M2", amount: 18000, currency: "KES", status: "FUNDED", date: "2026-07-15" },
    { id: "TRX-002", buyer: "Alice", seller: "Mike", item: "Designer Sneakers", amount: 4500, currency: "KES", status: "DISPUTED", date: "2026-07-20" },
    { id: "TRX-003", buyer: "Kelvin", seller: "Mike", item: "iPhone 15 Pro", amount: 145000, currency: "KES", status: "SHIPPED", date: "2026-07-18" },
    { id: "TRX-004", buyer: "Kelvin", seller: "John", item: "Sony WH-1000XM5", amount: 42000, currency: "KES", status: "COMPLETED", date: "2026-07-10" },
    { id: "TRX-005", buyer: "Grace", seller: "John", item: "iPad Air", amount: 78000, currency: "KES", status: "COMPLETED", date: "2026-07-09" },
    { id: "TRX-006", buyer: "Kelvin", seller: "John", item: "Gaming Chair", amount: 24000, currency: "KES", status: "AWAITING DEPOSIT", date: "2026-07-22" },
    { id: "TRX-007", buyer: "Kelvin", seller: "John", item: "MacBook Air", amount: 132000, currency: "KES", status: "FUNDED", date: "2026-07-15" },
    { id: "TRX-008", buyer: "Kelvin", seller: "Mike", item: "Designer Sneakers", amount: 4500, currency: "KES", status: "FUNDED", date: "2026-07-20" },
    { id: "TRX-009", buyer: "Kelvin", seller: "John", item: "Camera Lens", amount: 68000, currency: "KES", status: "DISPUTED", date: "2026-07-21" },
  ];

  const STATUS_STYLES: Record<Status, string> = {
    FUNDED: "bg-emerald/10 text-emerald ring-emerald/20",
    SHIPPED: "bg-navy/10 text-navy ring-navy/20",
    DISPUTED: "bg-red-50 text-red-600 ring-red-200",
    COMPLETED: "bg-slate-ink/10 text-slate-ink ring-slate-ink/20",
    "AWAITING DEPOSIT": "bg-gold/15 text-gold ring-gold/30",
  };

  const TABS = ["All", "Active", "Completed", "Disputed"] as const;

  export default function TransactionsPage() {
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState<(typeof TABS)[number]>("All");
    const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
    const [selected, setSelected] = useState<Txn | null>(TXNS[0]);

    const filtered = useMemo(() => {
      return TXNS.filter((t) => {
        if (statusFilter !== "All" && t.status !== statusFilter)
          return false;
        if (tab === "Active" && (t.status === "COMPLETED" || t.status === "DISPUTED"))
          return false;
        if (tab === "Completed" && t.status !== "COMPLETED")
          return false;
        if (tab === "Disputed" && t.status !== "DISPUTED")
          return false;
        if (query) {
          const q = query.toLowerCase();
          return (
            t.id.toLowerCase().includes(q) ||
            t.item.toLowerCase().includes(q) ||
            t.item.toLowerCase().includes(q) ||
            t.seller.toLowerCase().includes(q)
          );
        }
        return true;
      });
    }, [query, tab, statusFilter]);

    const stats = useMemo(() => {
      const total = TXNS.length;
      const funded = TXNS.filter((t) => t.status === "FUNDED").length;
      const disputed = TXNS.filter((t) => t.status === "DISPUTED").length;
      const volume = TXNS.reduce((sum, t) => sum + t.amount, 0);
      return { total, funded, disputed, volume};
    }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-ink">Transactions</h1>
          <p className="mt-1 text-sm text-slate-ink/60">
            Manage every escrow across your account — from deposit to release.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-ink/15 bg-surface px-3.5 py-2 text-sm font-medium text-slate-ink hover:bg-canvas">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-emerald-foreground shadow-sm hover:opacity-95">
            <Plus className="h-4 w-4" /> New Transaction
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Escrows" value={stats.total.toString()} tone="navy" />
        <StatCard label="Funded" value={stats.funded.toString()} tone="emerald" />
        <StatCard label="Disputed" value={stats.disputed.toString()} tone="red" />
        <StatCard label="Total Volume" value={`KES ${stats.volume.toLocaleString()}`} tone="gold" />
      </div>

      {/* Main split */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Table card */}
        <section className="rounded-xl border border-slate-ink/10 bg-surface">
          {/* Toolbar */}
          <div className="border-b border-slate-ink/10 p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-canvas p-1">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                      tab === t
                        ? "bg-surface text-slate-ink shadow-sm"
                        : "text-slate-ink/60 hover:text-slate-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative ml-auto w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-ink/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ID, item, party…"
                  className="w-full rounded-lg border border-slate-ink/10 bg-canvas py-2 pl-9 pr-3 text-sm placeholder:text-slate-ink/40 focus:border-emerald focus:bg-surface focus:outline-none focus:ring-2 focus:ring-emerald/20"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
                  className="appearance-none rounded-lg border border-slate-ink/10 bg-canvas py-2 pl-3 pr-9 text-sm font-medium text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                >
                  <option value="ALL">All statuses</option>
                  <option value="FUNDED">Funded</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DISPUTED">Disputed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="AWAITING DEPOSIT">Awaiting Deposit</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-ink/40" />
              </div>

              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-ink/10 bg-canvas px-3 py-2 text-sm font-medium text-slate-ink hover:bg-surface">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-ink/10 bg-canvas/60 text-left text-xs font-semibold uppercase tracking-wider text-slate-ink/50">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Buyer</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const active = selected?.id === t.id;
                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelected(t)}
                      className={`cursor-pointer border-b border-slate-ink/5 transition ${
                        active ? "bg-emerald/5" : "hover:bg-canvas/60"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{t.id}</td>
                      <td className="px-4 py-3">{t.buyer}</td>
                      <td className="px-4 py-3">{t.seller}</td>
                      <td className="px-4 py-3 text-slate-ink/80">{t.item}</td>
                      <td className="px-4 py-3 font-semibold text-slate-ink">
                        {t.currency} {t.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="px-4 py-3 text-slate-ink/60">{t.date}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          className="rounded-md p-1.5 text-slate-ink/50 hover:bg-canvas hover:text-slate-ink"
                          aria-label="More"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-ink/50">
                      No transactions match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-ink/10 px-4 py-3 text-xs text-slate-ink/60">
            <span>
              Showing <span className="font-semibold text-slate-ink">{filtered.length}</span> of{" "}
              {TXNS.length} transactions
            </span>
            <div className="flex items-center gap-1">
              <button className="rounded-md border border-slate-ink/10 bg-surface px-2.5 py-1.5 font-medium hover:bg-canvas">
                Previous
              </button>
              <button className="rounded-md border border-slate-ink/10 bg-surface px-2.5 py-1.5 font-medium hover:bg-canvas">
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Detail panel */}
        <aside className="rounded-xl border border-slate-ink/10 bg-surface">
          {selected ? (
            <DetailPanel txn={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-10 text-center">
              <FileText className="h-8 w-8 text-slate-ink/30" />
              <p className="mt-3 text-sm text-slate-ink/60">
                Select a transaction to view details.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
} 
function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "navy" | "gold" | "red";
}) {
  const dot = {
    emerald: "bg-emerald",
    navy: "bg-navy",
    gold: "bg-gold",
    red: "bg-red-500",
  }[tone];
  return (
    <div className="rounded-xl border border-slate-ink/10 bg-surface p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-slate-ink/60">
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-2 text-xl font-bold text-slate-ink">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function DetailPanel({ txn, onClose }: { txn: Txn; onClose: () => void }) {
  const steps = [
    { label: "Escrow Created", icon: FileText, done: true },
    {
      label: "Funds Deposited",
      icon: DollarSign,
      done: txn.status !== "AWAITING DEPOSIT",
    },
    {
      label: "ImaniPay Holds Funds",
      icon: Lock,
      done: txn.status !== "AWAITING DEPOSIT",
    },
    {
      label: "Seller Ships Item",
      icon: Truck,
      done: ["SHIPPED", "COMPLETED"].includes(txn.status),
    },
    {
      label: "Buyer Confirms",
      icon: Package,
      done: txn.status === "COMPLETED",
    },
    {
      label: "Funds Released",
      icon: CheckCircle2,
      done: txn.status === "COMPLETED",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between border-b border-slate-ink/10 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-ink/50">
            Transaction
          </p>
          <p className="font-mono text-sm font-bold text-navy">{txn.id}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-md p-1.5 text-slate-ink/50 hover:bg-canvas hover:text-slate-ink"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs text-slate-ink/50">Item</p>
          <p className="font-semibold text-slate-ink">{txn.item}</p>
        </div>

        <div className="rounded-lg bg-canvas p-3">
          <p className="text-xs text-slate-ink/50">Escrow Amount</p>
          <p className="text-2xl font-bold text-emerald">
            {txn.currency} {txn.amount.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-slate-ink/50">Buyer</p>
            <p className="font-medium">{txn.buyer}</p>
          </div>
          <div>
            <p className="text-xs text-slate-ink/50">Seller</p>
            <p className="font-medium">{txn.seller}</p>
          </div>
          <div>
            <p className="text-xs text-slate-ink/50">Status</p>
            <StatusBadge status={txn.status} />
          </div>
          <div>
            <p className="text-xs text-slate-ink/50">Created</p>
            <p className="font-medium">{txn.date}</p>
          </div>
        </div>

        {txn.status === "DISPUTED" && (
          <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <div>
              <p className="font-semibold">Dispute raised</p>
              <p className="mt-0.5">
                Awaiting admin review. Both parties have been notified.
              </p>
            </div>
          </div>
        )}

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-ink/50">
            Timeline
          </p>
          <ol className="relative space-y-3 border-l border-slate-ink/10 pl-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="relative">
                  <span
                    className={`absolute -left-[26px] flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-surface ${
                      s.done
                        ? "bg-emerald text-emerald-foreground"
                        : "bg-slate-ink/15 text-slate-ink/40"
                    }`}
                  >
                    <Icon className="h-2.5 w-2.5" />
                  </span>
                  <p
                    className={`text-sm ${
                      s.done
                        ? "font-medium text-slate-ink"
                        : "text-slate-ink/50"
                    }`}
                  >
                    {s.label}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="space-y-2 border-t border-slate-ink/10 pt-4">
          {txn.status === "SHIPPED" && (
            <button className="w-full rounded-lg bg-emerald px-3 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95">
              Confirm Delivery
            </button>
          )}
          {txn.status === "FUNDED" && (
            <button className="w-full rounded-lg bg-navy px-3 py-2.5 text-sm font-semibold text-navy-foreground hover:opacity-95">
              Mark as Shipped
            </button>
          )}
          {txn.status === "AWAITING DEPOSIT" && (
            <button className="w-full rounded-lg bg-gold px-3 py-2.5 text-sm font-semibold text-slate-ink hover:opacity-95">
              Fund Escrow
            </button>
          )}
          <button className="w-full rounded-lg border border-red-200 bg-surface px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">
            Request Refund
          </button>
          <button className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm font-medium text-slate-ink hover:bg-canvas">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}