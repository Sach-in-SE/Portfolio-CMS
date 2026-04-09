"use client";

import { motion } from "framer-motion";
import { FaFileArrowDown, FaFileLines } from "react-icons/fa6";

const resumeLastUpdated = "March 2026";

export function ResumeSection() {
  return (
    <section id="resume" className="px-5 py-16 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex w-full max-w-4xl justify-center"
      >
        <article className="group w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Resume</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Sachin Kumar</h2>

          <div className="mt-6 inline-flex rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 text-cyan-200 transition-colors duration-300 group-hover:bg-cyan-300/20">
            <FaFileLines className="text-3xl" />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Download my latest resume to review experience, projects, and technical
            expertise across frontend architecture, product engineering, and
            performance-focused development.
          </p>

          <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">
            Last updated: {resumeLastUpdated}
          </p>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="https://drive.google.com/file/d/1NtiN9kUL8EcD-e5DH9USSSNNdB06-JQD/view?usp=sharing"
            download
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-300/15 px-6 py-3 text-sm font-semibold text-cyan-100 transition-colors duration-200 hover:border-cyan-200 hover:bg-cyan-300/25"
          >
            <FaFileArrowDown className="text-sm" />
            Download Resume
          </motion.a>
        </article>
      </motion.div>
    </section>
  );
}
