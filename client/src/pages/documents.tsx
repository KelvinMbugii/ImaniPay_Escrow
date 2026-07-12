import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  FileArchive,
  FileImage,
  Download,
  Upload,
  ShieldCheck,
  Filter,
  Clock,
} from "lucide-react";

type DocStatus = "SIGNED" | "VERIFIED" | "PENDING SIGNATURE" | "EXPIRED" | "LOCKED";

interface DocItem {
  id: string,
  name: string,
  type: "pdf" | "zip" | "image";
  status: DocStatus;
  escrow: string;
  counterparty: string;
  uploadedAt: string;
  size: string;
  hash: string;
  documentType: string;
  signatures: string;
  description: string;
}

const DOCS: DocItem[] = [
  {
    id: "d1",
    name: "Escrow_Agreement_TRX-902.pdf",
    type: "pdf",
    status: "SIGNED",
    escrow: "TRX-902",
    counterparty: "John Doe Njuguna",
    uploadedAt: "Jul 10, 2026 14:22",
    size: "482 KB",
    hash: "8f3b7c9e4a2d1f6b8e5a3c7d9b2f4e6a1c8d5b3f7e9a2c4d6b8f1e3a5c7d9b2e...9e1a",
    documentType: "Smart Escrow Contract",
    signatures: "2 / 2 Parties",
    description: "Signed to make details minimal documents.",
  },
  {
    id: "d2",
    name: "Milestone_1_Proof.zip",
    type: "zip",
    status: "VERIFIED",
    escrow: "TRX-874",
    counterparty: "Aisha Mwangi",
    uploadedAt: "Jul 08, 2026 09:41",
    size: "12.4 MB",
    hash: "3a1c9e2d7b4f6a8c5e3b1d9f2a7c4e6b8d5f1a3c9e7b2d4f6a8c5e1b3d9f2a7c...42fe",
    documentType: "Delivery Proof Bundle",
    signatures: "1 / 1 Party",
    description:
      "Milestone_1 proof pack including images and signed acceptance.",
  },
  {
    id: "d3",
    name: "National_ID_Verification.jpg",
    type: "image",
    status: "EXPIRED",
    escrow: "TRX-812",
    counterparty: "Kevin Otieno",
    uploadedAt: "Feb 02, 2026 11:12",
    size: "1.1 MB",
    hash: "7d2f8a1c4e9b3d6f5a2c8e1b7d4f9a3c6e2b5d8f1a4c7e9b3d6f2a5c8e1b4d7f...c02a",
    documentType: "KYC Identity Document",
    signatures: "N/A",
    description: "National ID verification. Re-upload required.",
  },
  {
    id: "d4",
    name: "Payment_Release_TRX-889.pdf",
    type: "pdf",
    status: "PENDING SIGNATURE",
    escrow: "TRX-889",
    counterparty: "Grace Wambui",
    uploadedAt: "Jul 09, 2026 16:08",
    size: "221 KB",
    hash: "9b4f2c7e1a3d6f8c5b2e9d1f4a7c3e6b8d5f2a1c4e9b7d3f6a8c5e2b1d4f7a9c...7711",
    documentType: "Release Authorization",
    signatures: "1 / 2 Parties",
    description: "Awaiting seller counter-signature.",
  },
  {
    id: "d5",
    name: "Shipping_Manifest_TRX-902.pdf",
    type: "pdf",
    status: "LOCKED",
    escrow: "TRX-902",
    counterparty: "John Doe Njuguna",
    uploadedAt: "Jul 11, 2026 08:03",
    size: "96 KB",
    hash: "5c8e2b1d4f7a9c3e6b8d5f2a1c4e9b7d3f6a8c5e2b1d4f7a9c3e6b8d5f2a1c4e...c19d",
    documentType: "Shipping Manifest",
    signatures: "N/A",
    description: "Locked by system after fulfillment confirmed.",
  },
];

const STATUS_STYLES: Record<DocStatus, string> = {
  SIGNED: "bg-emerald/10 text-emerald border-emerald/20",
  VERIFIED: "bg-emerald/10 text-emerald border-emerald/20",
  "PENDING SIGNATURE": "bg-gold/10 text-gold border-gold/30",
  EXPIRED: "bg-red-100 text-red-700 border-red-200",
  LOCKED: "bg-navy/10 text-navy border-navy/20",
};

function DocIcon({ type, className = "" }: { type: 
DocItem["type"] ; className?: string }){
  if (type === "zip") return <FileArchive className={className}
  />;
  if (type === "image") return <FileImage className={className}
  />;
  return <FileText className={className}/>;
}

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(DOCS[0].id);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if(!q) return DOCS;
    return DOCS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
      d.escrow.toLowerCase().includes(q) ||
      d.counterparty.toLowerCase().includes(q),
    );
  }, [query]);

  const selected = DOCS.find((d) => d.id === selectedId) ?? DOCS[0];

  {/* Trust directory = unique counterparties */}
  const trustDirectory = useMemo(() => {
    const map = new Map<string, { name: string; count: number }>();
    for (const d of DOCS) {
      const cur = map.get(d.counterparty);
      map.set(d.counterparty, { name: d.counterparty, count: (cur?.count ?? 0) + 1 });
    }
    return Array.from(map.values());
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-ink">
            Welcome back, Kelvin <span className="ml-1">👋</span>
          </h1>
          <p className="mt-1 text-sm text-slate-ink/60">
            Document Vault & Smart Contracts
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95">
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Trust Directory */}
        <aside className="lg:col-span-3">
          <div className="rounded-xl border border-slate-ink/10 bg-surface p-4">
            <h2 className="text-sm font-bold text-slate-ink">
              {" "}
              Trust Directory{" "}
            </h2>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-ink/40" />
              <input
                type="search"
                placeholder="Search by filename, Escrow ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-ink/10 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-slate-ink/40 focus:border-emerald focus-outline-none focus:ring-2 focus:ring-emerald/20"
              />
            </div>

            <div className="mt-4 space-y-1">
              <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-ink/40">
                Counterparties
              </p>
              {trustDirectory.map((t) => (
                <button
                  key={t.name}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-ink hover:bg-canvas"
                >
                  <span className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                      {t.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <span className="truncate">{t.name}</span>
                  </span>
                  <span className="text-xs text-slate-ink/50">{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* All Documents feed */}
        <section className="lg:col-span-4">
          <div className="rounded-xl border border-slate-ink/10 bg-surface p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-ink">
                All Documents
              </h2>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-ink/10 px-2 py-1 text-xs text-slate-ink/70 hover:bg-canvas">
                <Filter className="h-3.5 w-3.5" /> Feed
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {filtered.map((d) => {
                const active = d.id === selected.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedId(d.id)}
                    className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition &{
                      active
                        ? "border-emerald bg-emerald/5"
                        : "border-slate-ink/10 bg-white hover:border-slate-ink/20"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                        d.type === "pdf"
                          ? "bg-red-50 text-red-600"
                          : d.type === "zip"
                            ? "bg-gold/10 text-gold"
                            : "bg-emerald/10 text-emerald"
                      }`}
                    >
                      <DocIcon type={d.type} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-semibold text-slate-ink">
                          {d.name}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[d.status]}`}
                        >
                          {d.status}
                        </span>
                        <span className="text-[11px] text-slate-ink/50">
                          {d.escrow}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs text-slate-ink/60">
                        {d.description}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-ink/40">
                        <Clock className="h-3 w-3" /> Uploaded {d.uploadedAt}
                      </p>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="rounded-lg border border-dashed border-slate-ink/15 p-6 text-center text-sm text-slate-ink/50">
                  No documents match "{query}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Document detail */}
        <section className="lg:col-span-5">
          <div className="rounded-xl border border-slate-ink/10 bg-surface p-6">
            {/* Preview icon */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <DocIcon type={selected.type} className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-ink">
                {selected.name}
              </h3>
              <p className="mt-1 text-sm text-slate-ink/60">
                Linked to:{" "}
                <span className="font-semibold text-slate-ink">
                  {selected.counterparty}
                </span>
              </p>
              <span
                className={`mt-3 inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLES[selected.status]}`}
              >
                {selected.status} {selected.status === "SIGNED" && "& LOCKED"}
              </span>
            </div>

            {/* Integrity & metadata */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-slate-ink">
                Document Integrity & Metadata
              </h4>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <MetaCard label="Document Type" value={selected.documentType} />
                <MetaCard
                  label="SHA-256 Cryptographic Hash"
                  value={selected.hash}
                  mono
                />
                <MetaCard label="Uploaded On" value={selected.uploadedAt} />
                <MetaCard
                  label="E-Signatures Captured"
                  value={selected.signatures}
                />
                <MetaCard label="Linked Escrow" value={selected.escrow} />
                <MetaCard label="File Size" value={selected.size} />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald px-4 py-3 text-sm font-semibold text-emerald-foreground hover:opacity-95">
                <Download className="h-4 w-4" /> Download Original Document
              </button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald">
                <ShieldCheck className="h-3.5 w-3.5" /> SSL Secured •
                Cryptographic hash verified
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MetaCard({
  label,
  value,
  mono = false,
} : {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-ink/10 bg-white p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-ink/50">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-semibold text-slate-ink ${ mono ? "truncate font-mono text-xs" : ""}`}
        title={mono ? value : undefined}
        >
          {value}
        </p>
    </div>
  );
}
