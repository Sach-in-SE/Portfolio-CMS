"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

type HeroProps = {
  name: string;
  role: string;
  location: string;
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Sach-in-SE",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sachin-kumar-08b390359/",
    icon: FaLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/imsachin_ram",
    icon: FaXTwitter,
  },
  {
    label: "Email",
    href: "codersachin01@gmail.com",
    icon: FaEnvelope,
  },
];

const heroBadges = ["React", "Next.js", "Linux", "Firebase"];

export function Hero({ name, role, location }: HeroProps) {
  const typedRoles = useMemo(
    () => [
      role,
      "Building elegant UIs with Next.js and TypeScript.",
      "Turning product goals into fast, maintainable experiences.",
    ],
    [role],
  );
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activePhrase = typedRoles[phraseIndex];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = activePhrase.slice(0, typedText.length + 1);
          setTypedText(nextText);

          if (nextText === activePhrase) {
            window.setTimeout(() => setIsDeleting(true), 950);
          }
          return;
        }

        const nextText = activePhrase.slice(0, typedText.length - 1);
        setTypedText(nextText);

        if (nextText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typedRoles.length);
        }
      },
      isDeleting ? 28 : 46,
    );

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, typedRoles, typedText]);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 22, 0], x: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.14),transparent_45%)]" />

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex rounded-full border border-cyan-200/20 bg-cyan-300/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-200"
        >
          {location}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 0.08 },
            },
          }}
        >
          <motion.h1
            variants={textVariants}
            className="max-w-3xl bg-gradient-to-br from-white via-cyan-100 to-sky-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl"
          >
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              className="ml-1 inline-block text-cyan-200"
              aria-hidden="true"
            >
              |
            </motion.span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.02]"
          >
            Let&apos;s work together
          </a>
          <a
            href="https://drive.google.com/file/d/1NtiN9kUL8EcD-e5DH9USSSNNdB06-JQD/view?usp=sharing"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-cyan-300 hover:text-cyan-200"
            download
          >
            Download Resume
          </a>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.24 },
            },
          }}
          className="mt-5 flex flex-wrap gap-3"
        >
          {heroBadges.map((badge) => (
            <motion.li
              key={badge}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="rounded-full border border-white/15 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 px-4 py-1.5 text-xs tracking-wide text-slate-200"
            >
              {badge}
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.28 },
            },
          }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.li
                key={social.label}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/70 px-4 py-2 text-sm text-slate-200 transition-colors duration-200 hover:border-cyan-300/70 hover:text-cyan-200"
                  aria-label={social.label}
                >
                  <Icon className="text-base" />
                  {social.label}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
