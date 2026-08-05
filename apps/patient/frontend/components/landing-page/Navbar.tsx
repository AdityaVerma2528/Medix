"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const router = useRouter(); 

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className={cn(
          "container-px mx-auto max-w-7xl transition-all duration-300",
          scrolled ? "pt-3" : "pt-6"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 border",
            scrolled
              ? "bg-base-bg/70 backdrop-blur-xl border-white/[0.08] shadow-card"
              : "bg-transparent border-transparent"
          )}
          aria-label="Primary"
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-cyan shadow-glow">
              <HeartPulse className="h-4.5 w-4.5 text-white" size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-ink-primary">
              Vitalis
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-muted hover:text-ink-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); 
                router.push("/auth/login"); 
              }}
              className="text-sm font-medium text-ink-muted hover:text-ink-primary transition-colors px-4 py-2"
            >
              Login
            </a>
            <a
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                router.push("/auth/signup"); 
              }}
              className="text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-cyan rounded-xl px-4 py-2.5 shadow-glow hover:shadow-glow-cyan transition-shadow duration-300 hover:scale-[1.03] active:scale-[0.98] transform"
            >
              Get Started
            </a>
          </div>

          <button
            className="lg:hidden text-ink-primary p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 rounded-2xl bg-base-bg/95 backdrop-blur-xl border border-white/[0.08] p-4 shadow-card"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm text-ink-muted hover:text-ink-primary py-2.5 px-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-white/[0.08]">
              <a href="#" className="text-sm text-center text-ink-muted py-2.5">
                Login
              </a>
              <a
                href="#"
                className="text-sm font-medium text-center text-white bg-gradient-to-r from-accent-blue to-accent-cyan rounded-xl py-2.5"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
