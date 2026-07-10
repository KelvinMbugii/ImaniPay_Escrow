import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Wallet as WalletIcon,
  Smartphone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  RefreshCcw,
  X,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";


type TxStatus = "SUCCESSFUL" | "REFUNDED" | "PENDING" | "DISPUTED";
type TxType = "Deposit" | "Escrow Funding" | "Escrow Payout" | "Withdrawal";

interface PaymentRow {
  id: string;
  type: TxType;
  amount: number;
  destination: string;
  status: TxStatus;
  date: string;
}

const history: PaymentRow[] = [
  {
    id: "TRX-901",
    type: "Deposit",
    amount: 5000,
    destination: "M-Pesa",
    status: "SUCCESSFUL",
    date: "Jul 08, 2026",
  },
  {
    id: "TRX-902",
    type: "Escrow Funding",
    amount: 18000,
    destination: "For MacBook (TRX-001)",
    status: "SUCCESSFUL",
    date: "Jul 06, 2026",
  },
  {
    id: "TRX-903",
    type: "Escrow Payout",
    amount: 4500,
    destination: "For Sneakers (TRX-002)",
    status: "REFUNDED",
    date: "Jul 03, 2026",
  },
  {
    id: "TRX-904",
    type: "Withdrawal",
    amount: 500,
    destination: "M-Pesa",
    status: "SUCCESSFUL",
    date: "Jun 29, 2026",
  },
  {
    id: "TRX-905",
    type: "Deposit",
    amount: 12000,
    destination: "M-Pesa",
    status: "PENDING",
    date: "Jun 28, 2026",
  },
];

const fmt = (n: number) => `KES ${n.toLocaleString()}`;

const statusStyles: Record<TxStatus, string> = {
  SUCCESSFUL: "bg-emerald/10 text-emerald ring-1 ring-emerald/25",
  REFUNDED: "bg-gold/15 text-gold ring-1 ring-gold/30",
  PENDING: "bg-slate-ink/10 text-slate-ink/70 ring-1 ring-slate-ink/15",
  DISPUTED: "bg-red-100 text-red-600 ring-1 ring-red-200",
};

export default function WalletPage() {
  const { user } = useAuth();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-ink sm:text-3xl">
            Welcome back, {user?.firstName ?? "there"} 👋
          </h1>
          <p className="mt-1 text-sm text-slate-ink/60">My Wallet</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDeposit(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95"
          >
            <ArrowDownLeft className="h-4 w-4" /> Deposit Funds
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-ink/15 bg-surface px-4 py-2.5 text-sm font-semibold text-slate-ink hover:bg-canvas"
          >
            <ArrowUpRight className="h-4 w-4" /> Withdrawal
          </button>
        </div>
      </div>

      {/* Balance cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-ink/10 bg-surface p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-ink/70">
              <WalletIcon className="h-4 w-4 text-emerald" />
              Available Balance (Liquid Funds)
            </div>
            <button
              className="rounded-lg p-1.5 text-slate-ink/50 hover:bg-canvas"
              aria-label="Refresh"
            >
              <RefreshCcw className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-6 text-4xl font-bold tracking-tight text-emerald sm:text-5xl">
            KES 12,450
          </p>
          <p className="mt-3 text-sm text-slate-ink/60">
            Can be used to fund new escrows or withdraw.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-navy-foreground shadow-sm">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Lock className="h-4 w-4 text-gold" />
              Funds Held in Escrow (Locked Funds)
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
              2 active
            </span>
          </div>
          <p className="relative mt-6 text-4xl font-bold tracking-tight text-gold sm:text-5xl">
            KES 18,000
          </p>
          <p className="relative mt-3 text-sm text-white/70">
            Protected and locked until transaction completion. References
            MacBook & Sneakers escrows.
          </p>
        </div>
      </div>

      {/* Two-column: deposit initiator + history */}
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Deposit via M-Pesa */}
        <section className="lg:col-span-2 rounded-2xl border border-slate-ink/10 bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-emerald" />
            <h2 className="text-lg font-semibold text-slate-ink">
              Initiate Deposit via M-Pesa
            </h2>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <label className="text-xs font-medium text-slate-ink/70">
                Amount (KES)
              </label>
              <input
                type="number"
                defaultValue={5000}
                className="mt-1.5 w-full rounded-lg border border-slate-ink/15 bg-white px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-ink/70">
                Country
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-slate-ink/15 bg-white px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
                <option>+254 Kenya</option>
                <option>+256 Uganda</option>
                <option>+255 Tanzania</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-ink/70">
                Payment Method
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-slate-ink/15 bg-white px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
                <option>Safaricom M-Pesa</option>
                <option>Airtel Money</option>
              </select>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-gold/40 bg-gold/5 p-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold">
              <Clock className="h-3.5 w-3.5" /> PENDING
            </div>
            <p className="mt-2 text-sm text-slate-ink/70">
              Awaiting M-Pesa PIN input on phone.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95">
              Send M-Pesa STK Push
            </button>
            <div className="hidden text-xs text-slate-ink/50 sm:block">
              Webhook status:{" "}
              <span className="font-medium text-slate-ink/70">
                Awaiting PIN
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-slate-ink/50">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald" /> SSL Secured ·
            Real-time polling
          </div>
        </section>

        {/* Payment history */}
        <section className="lg:col-span-3 rounded-2xl border border-slate-ink/10 bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-ink/10 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-ink">
              Payment History
            </h2>
            <button className="text-xs font-medium text-emerald hover:underline">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-ink/50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-ink/5">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-canvas/60">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-ink">
                      {row.id}
                    </td>
                    <td className="px-4 py-4 text-slate-ink/80">{row.type}</td>
                    <td className="px-4 py-4 text-right font-semibold text-slate-ink">
                      {fmt(row.amount)}
                    </td>
                    <td className="px-4 py-4 text-slate-ink/70">
                      {row.destination}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                      >
                        {row.status === "SUCCESSFUL" && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                        {row.status === "PENDING" && (
                          <Clock className="h-3 w-3" />
                        )}
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-ink/10 px-6 py-3 text-xs text-slate-ink/50">
            <span>
              Showing {history.length} of {history.length}
            </span>
            <div className="flex items-center gap-2">
              <Info className="h-3.5 w-3.5" /> Statuses update in real-time
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showDeposit && (
        <ActionModal
          title="Deposit Funds"
          onClose={() => setShowDeposit(false)}
        >
          <p className="text-sm text-slate-ink/70">
            Add funds to your available balance via M-Pesa or bank transfer.
          </p>
          <div className="mt-4 space-y-3">
            <input
              placeholder="Amount (KES)"
              className="w-full rounded-lg border border-slate-ink/15 px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
            <input
              placeholder="Phone number (+254…)"
              className="w-full rounded-lg border border-slate-ink/15 px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
          </div>
          <button className="mt-5 w-full rounded-lg bg-emerald py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95">
            Initiate Deposit
          </button>
        </ActionModal>
      )}

      {showWithdraw && (
        <ActionModal
          title="Withdraw Funds"
          onClose={() => setShowWithdraw(false)}
        >
          <p className="text-sm text-slate-ink/70">
            Withdraw available balance to your M-Pesa or linked bank account.
          </p>
          <div className="mt-4 space-y-3">
            <input
              placeholder="Amount (KES)"
              className="w-full rounded-lg border border-slate-ink/15 px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            />
            <select className="w-full rounded-lg border border-slate-ink/15 px-3 py-2 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>M-Pesa · +254 7XX XXX XXX</option>
              <option>KCB Bank · **** 4521</option>
            </select>
          </div>
          <button className="mt-5 w-full rounded-lg bg-navy py-2.5 text-sm font-semibold text-navy-foreground hover:opacity-95">
            Confirm Withdrawal
          </button>
        </ActionModal>
      )}
    </div>
  );
}

function ActionModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-ink/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-ink">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-ink/60 hover:bg-canvas"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}