export function Logo({ className = ""}: { className?: string }) {
    return (
        <div className={`inline-flex items-baseline font-extrabold tracking-tight ${className}`}>
            <span className="text-emerald">IMANI</span>
            <span className="ml-1 rounded-md bg-navy px-2 py-o.5 text-navy-foreground">PAY</span>
        </div>
    );
}