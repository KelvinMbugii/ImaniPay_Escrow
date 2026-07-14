import { useState } from "react";
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  Search,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  Send,
  FileQuestion,
  Shield,
  Wallet,
  ArrowLeftRight,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const supportChannels = [
  {
    id: "chat",
    title: "Live Chat",
    description: "Instant answers from our support team during business hours.",
    icon: MessageCircle,
    cta: "Start Chat",
    badge: "Average wait 2 min",
    tone: "emerald",
  },
  {
    id: "email",
    title: "Email Support",
    description: "Send detailed questions and attach screenshots or documents.",
    icon: Mail,
    cta: "Email Us",
    badge: "help@imanipay.co",
    tone: "navy",
  },
  {
    id: "phone",
    title: "Phone Support",
    description: "Speak directly with an escrow specialist for urgent issues.",
    icon: Phone,
    cta: "Call Now",
    badge: "+254 700 000 000",
    tone: "gold",
  },
];

const categories = [
  { label: "Escrow Basics", icon: Shield, articles: 12 },
  { label: "Payments & Wallet", icon: Wallet, articles: 8 },
  { label: "Transactions", icon: ArrowLeftRight, articles: 15 },
  { label: "Documents & KYC", icon: FileText, articles: 10 },
  { label: "Disputes & Mediation", icon: AlertCircle, articles: 6 },
  { label: "Account & Security", icon: FileQuestion, articles: 9 },
];

const faqs = [
  {
    question: "How does ImaniPay escrow protect my transaction?",
    answer:
      "Funds are held in a secure, independent escrow account until both parties confirm the agreed terms have been met. Neither party can access the funds unilaterally, which removes the risk of non-delivery or non-payment.",
  },
  {
    question: "What happens if a transaction is disputed?",
    answer:
      "Once a dispute is raised, funds remain locked while our mediation team reviews evidence submitted by both parties. You will be guided through a structured resolution process and notified at every step.",
  },
  {
    question: "How long do M-Pesa deposits take to reflect?",
    answer:
      "Most M-Pesa deposits are confirmed within seconds after a successful STK push. If a transaction is pending, ensure the payment prompt was accepted on your phone and check your wallet history for status updates.",
  },
  {
    question: "What documents are required for KYC verification?",
    answer:
      "Individual users typically need a government-issued ID (ID card, passport, or driver’s license) and a recent proof of address. Business accounts may additionally require company registration documents.",
  },
  {
    question: "Can I cancel an escrow contract before delivery?",
    answer:
      "Cancellation depends on the contract stage. Both parties must agree to cancel a funded escrow. If items have already been shipped, the contract usually proceeds to delivery and release instead of cancellation.",
  },
];

const ticketTypes = [
  "General Inquiry",
  "Transaction Dispute",
  "Payment Issue",
  "Account Access",
  "KYC / Verification",
  "Bug Report",
  "Feature Request",
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].question);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    type: ticketTypes[0],
    subject: "",
    message: "",
  });

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill in the subject and message before submitting.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ type: ticketTypes[0], subject: "", message: "" });
      toast.success(
        "Support ticket submitted. We will respond within 24 hours.",
      );
    }, 1200);
};
return (
  <div className="mx-auto max-w-7xl space-y-8">
    {/* Header */}
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight text-slate-ink sm:text-3xl">
        Help & Support
      </h1>
      <p className="text-sm text-slate-ink/60">
        Find answers, contact our team, or open a support ticket.
      </p>
    </div>

    {/* Hero search */}
    <div className="rounded-2xl bg-navy p-6 text-navy-foreground sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <Headphones className="mx-auto h-10 w-10 text-emerald" />
        <h2 className="mt-4 text-xl font-bold sm:text-2xl">
          What can we help you with today?
        </h2>
        <p className="mt-1 text-sm text-white/70">
          Search our knowledge base or reach out directly for personalised
          support.
        </p>
        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-ink/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles, FAQs, and guides..."
            className="w-full rounded-xl border-0 bg-surface py-3 pl-11 pr-4 text-sm text-slate-ink placeholder:text-slate-ink/40 shadow-sm focus:ring-2 focus:ring-emerald/40 focus:outline-none"
          />
        </div>
      </div>
    </div>

    {/* Contact channels */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {supportChannels.map((channel) => {
        const Icon = channel.icon;
        const accentClass =
          channel.tone === "emerald"
            ? "bg-emerald text-emerald-foreground"
            : channel.tone === "navy"
              ? "bg-navy text-navy-foreground"
              : "bg-gold text-slate-ink";
        return (
          <div
            key={channel.id}
            className="flex flex-col rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClass}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-ink">
              {channel.title}
            </h3>
            <p className="mt-1 text-sm text-slate-ink/60">
              {channel.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-ink/70">
              <Clock className="h-3.5 w-3.5" />
              {channel.badge}
            </div>
            <button className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-canvas px-4 py-2.5 text-sm font-semibold text-slate-ink hover:bg-emerald hover:text-emerald-foreground transition">
              {channel.cta}
            </button>
          </div>
        );
      })}
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      {/* Help categories */}
      <section className="lg:col-span-1">
        <div className="rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-ink">
            Popular Topics
          </h3>
          <div className="mt-4 grid gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className="flex items-center gap-3 rounded-xl bg-canvas/60 px-3 py-3 text-left transition hover:bg-canvas"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-navy-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-ink">
                      {cat.label}
                    </p>
                    <p className="text-xs text-slate-ink/50">
                      {cat.articles} articles
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="lg:col-span-2">
        <div className="rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-ink">
              Frequently Asked Questions
            </h3>
            <span className="text-xs text-slate-ink/50">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-ink/10">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const open = openFaq === faq.question;
                return (
                  <div key={faq.question} className="py-3">
                    <button
                      onClick={() => setOpenFaq(open ? null : faq.question)}
                      className="flex w-full items-start justify-between gap-3 text-left"
                    >
                      <span className="text-sm font-medium text-slate-ink">
                        {faq.question}
                      </span>
                      {open ? (
                        <ChevronUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald" />
                      ) : (
                        <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-slate-ink/40" />
                      )}
                    </button>
                    {open && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-ink/70">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-ink/60">
                  No FAQs matched “{search}”.
                </p>
                <p className="mt-1 text-xs text-slate-ink/50">
                  Try a different keyword or open a ticket below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>

    {/* Submit ticket form */}
    <section className="rounded-2xl border border-slate-ink/10 bg-surface p-5 shadow-sm sm:p-8">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-slate-ink">
          Open a Support Ticket
        </h3>
        <p className="text-sm text-slate-ink/60">
          Can’t find what you need? Submit a ticket and we’ll respond within one
          business day.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-ink">
            Issue Type
          </label>
          <div className="relative">
            <select
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full appearance-none rounded-lg border border-slate-ink/15 bg-canvas px-3 py-2.5 text-sm text-slate-ink focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            >
              {ticketTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-ink/40" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-ink">Subject</label>
          <input
            value={form.subject}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, subject: e.target.value }))
            }
            placeholder="Briefly describe the issue"
            className="w-full rounded-lg border border-slate-ink/15 bg-canvas px-3 py-2.5 text-sm text-slate-ink placeholder:text-slate-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
          />
        </div>

        <div className="space-y-1.5 lg:col-span-2">
          <label className="text-sm font-medium text-slate-ink">Message</label>
          <textarea
            value={form.message}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={5}
            placeholder="Tell us what happened, including transaction IDs, amounts, and dates if applicable."
            className="w-full resize-none rounded-lg border border-slate-ink/15 bg-canvas px-3 py-2.5 text-sm text-slate-ink placeholder:text-slate-ink/40 focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
          />
        </div>

        <div className="flex items-center gap-2 lg:col-span-2">
          <CheckCircle2 className="h-4 w-4 text-emerald" />
          <span className="text-xs text-slate-ink/60">
            Your ticket is encrypted and only visible to authorised support
            agents.
          </span>
        </div>

        <div className="lg:col-span-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              setForm({ type: ticketTypes[0], subject: "", message: "" })
            }
            className="rounded-lg border border-slate-ink/15 px-4 py-2.5 text-sm font-medium text-slate-ink hover:bg-canvas"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald px-5 py-2.5 text-sm font-semibold text-emerald-foreground hover:opacity-95 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Submit Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </section>

    {/* Status footer */}
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-ink/10 bg-canvas/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/15 text-emerald">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-ink">
            All systems operational
          </p>
          <p className="text-xs text-slate-ink/60">Last updated: just now</p>
        </div>
      </div>
      <div className="text-xs text-slate-ink/60 sm:text-right">
        <p className="font-medium text-slate-ink">Support Hours</p>
        <p>Mon – Fri: 08:00 – 18:00 EAT</p>
        <p>Sat: 09:00 – 14:00 EAT</p>
      </div>
    </div>
  </div>
);  
}
