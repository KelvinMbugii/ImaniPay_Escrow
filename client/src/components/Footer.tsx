import { Logo } from "./Logo";

const cols = [
    {
        title: "Product",
        links: ["Features", "How it Works", "Pricing", "Security"],
    },
    {
        title: "Company",
        links: ["About", "careers", "Press", "Contact"],
    },
    {
        title: "Legal",
        links: ["Terms", "Privacy", "Compliance", "Cookies"],
    },
];

export function Footer(){
    return(
        <footer className="bg-navy text-navy-foreground">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
                <div>
                    <Logo className="text-2xl" />
                    <p className="mt-4 max-w-xs text-sm text-white/70">
                        Bank-grade escrow that protects buyers and sellers on every transaction.
                    </p>
                </div>
                {cols.map((c) => (
                    <div key={c.title}>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                            {c.title}
                        </h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            {c.links.map((l) =>(
                                <li key={l}>
                                    <a href="#" className="text-white/85 transition hover:text-gold">
                                        {l}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
                    <span>@ {new Date().getFullYear()} ImaniPay. All rights reserved.</span>
                    <span>Licensed & regulated . Secured by SSL / Bank-Grade Encryption</span>
                </div>
            </div>
        </footer>
    );
}