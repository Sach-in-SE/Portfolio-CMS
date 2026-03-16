"use client";

import { motion } from "framer-motion";

type NavbarProps = {
  links: Array<{ label: string; href: string }>;
};

export function Navbar({ links }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl theme-nav"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="text-base font-bold tracking-tight text-white theme-text-main">
          Sachin Kumar
        </a>

        <div className="flex items-center gap-3">
          <ul className="hidden items-center gap-5 text-sm text-slate-300 md:flex theme-text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-200 hover:text-cyan-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}
