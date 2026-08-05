import {
  HeartPulse,
  Globe,
  Share2,
  Users,
  AtSign,
} from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "Order tracking"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Pharmacist network", "Press"],
  },
  {
    title: "Support",
    links: ["Help center", "Contact us", "Privacy policy", "Terms of service"],
  },
];

const socials = [
  { icon: Globe, label: "Twitter" },
  { icon: Share2, label: "Instagram" },
  { icon: Users, label: "LinkedIn" },
  { icon: AtSign, label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-10">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan shadow-glow">
                <HeartPulse className="h-4.5 w-4.5 text-white" size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold text-ink-primary">
                Vitalis
              </span>
            </a>
            <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
              Secure, verified healthcare from home — medicines, prescriptions,
              and pharmacist consults in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-ink-muted hover:text-ink-primary hover:border-accent-cyan/40 transition-colors duration-200"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink-primary mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-ink-muted hover:text-ink-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Vitalis Health, Inc. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Vitalis is not a substitute for emergency medical care.
          </p>
        </div>
      </div>
    </footer>
  );
}
