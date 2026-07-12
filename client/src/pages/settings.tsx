import { useState } from "react";
import {
  User as UserIcon,
  Shield,
  Bell,
  CreditCard,
  KeyRound,
  Building2,
  Globe,
  Trash2,
  Check,
  Smartphone,
  Mail,
  Fingerprint,
  Copy,
  BadgeCheck
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type TabKey =
  | "profile"
  | "security"
  | "notifactions"
  | "payments"
  | "api"
  | "business";

const tabs: { key:TabKey; label: string; icon:React.ComponentType<{
  className?: string
}> } [] = [
  { key: "profile", label: "profile", icon: UserIcon},
  { key: "security", label: "Security & KYC", icon: Shield},
  { key: "notifactions", label: "Notifications", icon: Bell},
  { key: "payments", label: "Payment Methods", icon: CreditCard},
  { key: "api", label: "API & Webhooks", icon: KeyRound},
  { key: "business", label: "Business", icon:Building2}
];


export default function SettingsPage() {
  const { user } = useAuth();
  const [active, setActive] = useState<TabKey>
  ("profile");
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-ink">Settings</h1>
        <p className="text-sm text-slate-ink/60">
          Manage your account, security, and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Vertical Tabs*/}
        <nav className="rounded-xl border border-slate-ink/10 bg-surface p-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald text-emerald-foreground"
                    : "text-slate-ink/80 hover:bg-canvas"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-left">{t.label}</span>
              </button>
            )
          })}
        </nav>
        {/* Panel */}
        <div className="space-y-6">
          {active === "profile" && <ProfilePanel user={user} />}
          {active === "security" && <SecurityPanel />}
          {active === "notifactions" && <NotificationsPanel />}
          {active === "payments" && <PaymentsPanel />}
          {active === "api" && <ApiPanel />}
          {active === "business" && <BusinessPanel />}
        </div>
      </div>
    </div>
  );
}

/* -------- Reusable primitives -------- */

function Card ({
  title,
  description,
  children,
  action,
} : {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-ink/10 bg-surface">
      <header className="flex items-start justify-between gap-4 border-b border-slate-ink/10 px-6 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-ink">{title}</h2>
          {description && (
            <p className="mt-0.5 text-sm text-slate-ink/60">{description}</p>
          )}
        </div>
        {action}
      </header>
      <div className="p-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-ink/50">{hint}</span>}
    </label>
  );
}

function Input(props:
  React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink placeholder:text-slate-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20 ${props.className ?? ""}`}
      />
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-slate-ink">{label}</p>
        {description && (
          <p className="text-xs text-slate-ink/60">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition ${
          checked ? "bg-emerald" : "bg-slate-ink/20"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function PrimaryButton(props:
  React.ButtonHTMLAttributes<HTMLButtonElement>
){
  return(
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95 disabled:opacity-50 ${props.className ?? ""}`}
    />
  );
}

function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-slate-ink/15 bg-surface px-4 py-2.5 text-sm font-semibold text-slate-ink hover:bg-canvas ${props.className ?? ""}`}
    />
  );
}

/* ---------- Panels ---------- */

function ProfilePanel({ user }: { user: ReturnType<typeof useAuth>["user"] }) {
  const initials =
    `${user?.firstName?.[0] ?? "K"}${user?.lastName?.[0] ?? "D"}`.toUpperCase();

  return (
    <>
      <Card
        title="Personal information"
        description="This info is shown on your profile and receipts."
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-lg font-bold text-navy-foreground">
            {initials}
          </div>
          <div className="flex gap-2">
            <GhostButton type="button">Upload photo</GhostButton>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-ink/60 hover:text-slate-ink"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated");
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label="First name">
            <Input defaultValue={user?.firstName ?? "Kelvin"} />
          </Field>
          <Field label="Last name">
            <Input defaultValue={user?.lastName ?? "Doe"} />
          </Field>
          <Field label="Email">
            <Input type="email" defaultValue={user?.email ?? ""} />
          </Field>
          <Field label="Phone number">
            <Input defaultValue={user?.phone ?? "+254 712 000 000"} />
          </Field>
          <Field label="Country" hint="Used for currency and compliance.">
            <select className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>Kenya</option>
              <option>Uganda</option>
              <option>Tanzania</option>
              <option>Rwanda</option>
              <option>Nigeria</option>
            </select>
          </Field>
          <Field label="Time zone">
            <select className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>Africa/Nairobi (GMT+3)</option>
              <option>Africa/Lagos (GMT+1)</option>
              <option>UTC</option>
            </select>
          </Field>

          <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-3">
            <GhostButton type="button">Cancel</GhostButton>
            <PrimaryButton type="submit">Save changes</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card
        title="Verification status"
        description="Verified accounts unlock higher escrow limits."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <StatusTile label="Email" verified />
          <StatusTile label="Phone (M-Pesa)" verified />
          <StatusTile label="Identity (KYC)" verified={false} />
        </div>
      </Card>
    </>
  );
}

function StatusTile({ label, verified }: { label: string; verified: boolean }) {
  return (
    <div className="rounded-lg border border-slate-ink/10 bg-canvas p-4">
      <p className="text-xs uppercase tracking-wide text-slate-ink/50">
        {label}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {verified ? (
          <>
            <BadgeCheck className="h-5 w-5 text-gold" />
            <span className="text-sm font-semibold text-slate-ink">
              Verified
            </span>
          </>
        ) : (
          <>
            <span className="h-2.5 w-2.5 rounded-full bg-gold" />
            <span className="text-sm font-semibold text-slate-ink">
              Pending
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function SecurityPanel() {
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

  return (
    <>
      <Card title="Password" description="Use a strong, unique password.">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Password updated");
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label="Current password">
            <Input type="password" placeholder="••••••••" />
          </Field>
          <div />
          <Field label="New password">
            <Input type="password" placeholder="At least 8 characters" />
          </Field>
          <Field label="Confirm new password">
            <Input type="password" placeholder="Repeat password" />
          </Field>
          <div className="sm:col-span-2 flex justify-end">
            <PrimaryButton type="submit">Update password</PrimaryButton>
          </div>
        </form>
      </Card>

      <Card
        title="Two-factor authentication"
        description="Add a second layer of protection to your account."
      >
        <div className="divide-y divide-slate-ink/10">
          <Toggle
            checked={twoFA}
            onChange={setTwoFA}
            label="Authenticator app"
            description="Use Google Authenticator, Authy, or 1Password."
          />
          <Toggle
            checked={biometric}
            onChange={setBiometric}
            label="Biometric sign-in"
            description="Use Face ID or fingerprint on trusted devices."
          />
          <Toggle
            checked={loginAlerts}
            onChange={setLoginAlerts}
            label="New sign-in alerts"
            description="Email me whenever a new device signs in."
          />
        </div>
      </Card>

      <Card
        title="Active sessions"
        description="Devices signed into your account."
      >
        <ul className="divide-y divide-slate-ink/10">
          {[
            {
              icon: Smartphone,
              name: "iPhone 15 · Safari",
              meta: "Nairobi · Active now",
              current: true,
            },
            {
              icon: Fingerprint,
              name: "MacBook Pro · Chrome",
              meta: "Nairobi · 2 hours ago",
            },
          ].map((s, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-canvas text-slate-ink">
                  <s.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-ink">
                    {s.name}
                    {s.current && (
                      <span className="ml-2 rounded-full bg-emerald/10 px-2 py-0.5 text-xs font-semibold text-emerald">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-ink/60">{s.meta}</p>
                </div>
              </div>
              {!s.current && (
                <button className="text-sm font-medium text-slate-ink/60 hover:text-slate-ink">
                  Revoke
                </button>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function NotificationsPanel() {
  const [prefs, setPrefs] = useState({
    escrowFunded: true,
    shipped: true,
    delivered: true,
    disputes: true,
    marketing: false,
    weekly: true,
  });
  const set = (k: keyof typeof prefs) => (v: boolean) =>
    setPrefs((p) => ({ ...p, [k]: v }));

  return (
    <>
      <Card
        title="Transaction notifications"
        description="Stay updated on escrow activity."
      >
        <div className="divide-y divide-slate-ink/10">
          <Toggle
            checked={prefs.escrowFunded}
            onChange={set("escrowFunded")}
            label="Escrow funded"
            description="When a buyer funds an escrow."
          />
          <Toggle
            checked={prefs.shipped}
            onChange={set("shipped")}
            label="Item shipped"
            description="When a seller marks an item shipped."
          />
          <Toggle
            checked={prefs.delivered}
            onChange={set("delivered")}
            label="Delivery confirmed"
            description="When buyer confirms delivery."
          />
          <Toggle
            checked={prefs.disputes}
            onChange={set("disputes")}
            label="Dispute updates"
            description="When a dispute is opened or resolved."
          />
        </div>
      </Card>

      <Card
        title="Product updates"
        description="Occasional emails from ImaniPay."
      >
        <div className="divide-y divide-slate-ink/10">
          <Toggle
            checked={prefs.marketing}
            onChange={set("marketing")}
            label="Product news & tips"
          />
          <Toggle
            checked={prefs.weekly}
            onChange={set("weekly")}
            label="Weekly account summary"
          />
        </div>
      </Card>

      <Card title="Delivery channels">
        <div className="grid gap-3 sm:grid-cols-3">
          <ChannelTile
            icon={Mail}
            label="Email"
            value="kelvin@imanipay.co"
            enabled
          />
          <ChannelTile
            icon={Smartphone}
            label="SMS"
            value="+254 712 000 000"
            enabled
          />
          <ChannelTile
            icon={Bell}
            label="Push"
            value="iPhone 15"
            enabled={false}
          />
        </div>
      </Card>
    </>
  );
}

function ChannelTile({
  icon: Icon,
  label,
  value,
  enabled,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  enabled: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-ink/10 bg-canvas p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-slate-ink/60" />
          <p className="text-sm font-medium text-slate-ink">{label}</p>
        </div>
        <span
          className={`text-xs font-semibold ${enabled ? "text-emerald" : "text-slate-ink/40"}`}
        >
          {enabled ? "ON" : "OFF"}
        </span>
      </div>
      <p className="mt-2 truncate text-xs text-slate-ink/60">{value}</p>
    </div>
  );
}

function PaymentsPanel() {
  return (
    <>
      <Card
        title="Payout methods"
        description="Where we send your released escrow funds."
        action={<PrimaryButton>Add method</PrimaryButton>}
      >
        <ul className="divide-y divide-slate-ink/10">
          <PayoutRow brand="M-PESA" name="M-Pesa · +254 712 ••• 000" primary />
          <PayoutRow brand="KCB" name="KCB Bank · ••• 4421" />
          <PayoutRow brand="EQTY" name="Equity Bank · ••• 8891" />
        </ul>
      </Card>

      <Card title="Billing address">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Billing address saved");
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label="Street address">
            <Input defaultValue="12 Riverside Drive" />
          </Field>
          <Field label="City">
            <Input defaultValue="Nairobi" />
          </Field>
          <Field label="Postal code">
            <Input defaultValue="00100" />
          </Field>
          <Field label="Country">
            <Input defaultValue="Kenya" />
          </Field>
          <div className="sm:col-span-2 flex justify-end">
            <PrimaryButton type="submit">Save address</PrimaryButton>
          </div>
        </form>
      </Card>
    </>
  );
}

function PayoutRow({
  brand,
  name,
  primary,
}: {
  brand: string;
  name: string;
  primary?: boolean;
}) {
  return (
    <li className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-14 items-center justify-center rounded-md bg-navy text-[10px] font-bold tracking-wider text-navy-foreground">
          {brand}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-ink">
            {name}
            {primary && (
              <span className="ml-2 rounded-full bg-emerald/10 px-2 py-0.5 text-xs font-semibold text-emerald">
                Primary
              </span>
            )}
          </p>
          <p className="text-xs text-slate-ink/60">
            Verified payout destination
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm">
        {!primary && (
          <button className="font-medium text-slate-ink/70 hover:text-slate-ink">
            Set primary
          </button>
        )}
        <button className="font-medium text-destructive hover:opacity-80">
          Remove
        </button>
      </div>
    </li>
  );
}

function ApiPanel() {
  const key = "sk_live_ip_2fJk··········8Q3z";

  const copy = () => {
    navigator.clipboard?.writeText(key);
    toast.success("API key copied");
  };

  return (
    <>
      <Card
        title="API keys"
        description="Use these keys to integrate ImaniPay with your app."
        action={<PrimaryButton>Generate new key</PrimaryButton>}
      >
        <div className="rounded-lg border border-slate-ink/10 bg-canvas p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-ink/50">
                Live secret key
              </p>
              <p className="mt-1 truncate font-mono text-sm text-slate-ink">
                {key}
              </p>
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-ink/15 bg-surface px-3 py-2 text-sm font-medium text-slate-ink hover:bg-canvas"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-ink/60">
            Created Jan 12, 2026 · Last used 4 hours ago
          </p>
        </div>
      </Card>

      <Card
        title="Webhooks"
        description="Receive real-time updates for escrow events."
        action={<GhostButton>Add endpoint</GhostButton>}
      >
        <ul className="divide-y divide-slate-ink/10">
          {[
            {
              url: "https://api.mystore.co.ke/webhooks/imanipay",
              status: "Active",
            },
            { url: "https://ops.acme.io/hooks/escrow", status: "Paused" },
          ].map((w) => (
            <li key={w.url} className="flex items-center justify-between py-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-slate-ink">
                  {w.url}
                </p>
                <p className="text-xs text-slate-ink/60">
                  Events: escrow.funded, escrow.released, dispute.opened
                </p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  w.status === "Active"
                    ? "bg-emerald/10 text-emerald"
                    : "bg-slate-ink/10 text-slate-ink/60"
                }`}
              >
                {w.status}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

function BusinessPanel() {
  return (
    <>
      <Card
        title="Business profile"
        description="Shown to counterparties on invoices and escrows."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Business profile saved");
          }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Field label="Legal business name">
            <Input defaultValue="ImaniPay Traders Ltd." />
          </Field>
          <Field label="Trading name">
            <Input defaultValue="ImaniPay" />
          </Field>
          <Field label="Business type">
            <select className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>Limited Company</option>
              <option>Sole Proprietor</option>
              <option>Partnership</option>
            </select>
          </Field>
          <Field label="KRA PIN">
            <Input defaultValue="A00•••••••••X" />
          </Field>
          <Field label="Website">
            <Input defaultValue="https://imanipay.co" />
          </Field>
          <Field label="Support email">
            <Input type="email" defaultValue="support@imanipay.co" />
          </Field>
          <div className="sm:col-span-2 flex justify-end">
            <PrimaryButton type="submit">
              <Check className="h-4 w-4" /> Save profile
            </PrimaryButton>
          </div>
        </form>
      </Card>

      <Card title="Regional preferences">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Default currency">
            <select className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>KES — Kenyan Shilling</option>
              <option>UGX — Ugandan Shilling</option>
              <option>TZS — Tanzanian Shilling</option>
              <option>USD — US Dollar</option>
            </select>
          </Field>
          <Field label="Language">
            <select className="w-full rounded-lg border border-slate-ink/15 bg-surface px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20">
              <option>English</option>
              <option>Swahili</option>
              <option>French</option>
            </select>
          </Field>
        </div>
      </Card>

      <Card title="Danger zone" description="Irreversible account actions.">
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-ink">
                Delete account
              </p>
              <p className="text-xs text-slate-ink/60">
                Permanently remove your account and all associated data.
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              toast.error("Contact support to delete your account")
            }
            className="rounded-lg bg-destructive px-4 py-2.5 text-sm font-semibold text-destructive-foreground hover:opacity-90"
          >
            Delete
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-ink/60">
          <Globe className="h-3.5 w-3.5" />
          Your data will be retained per Kenyan financial regulations for 7
          years.
        </div>
      </Card>
    </>
  );
}


