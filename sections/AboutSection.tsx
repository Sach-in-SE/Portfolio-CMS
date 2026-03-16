"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="px-5 py-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-2xl border border-white/10 bg-slate-900/65 p-6 sm:grid-cols-2 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">About</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Engineer focused on product impact.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-slate-300"
        >
         I&apos;m Sachin Kumar, a passionate developer currently pursuing B.Tech in Electronics and Computer Science.
I build modern web and Android applications using technologies like React, TypeScript, Kotlin, and Firebase, focusing on clean UI, performance, and real-world problem solving.
        </motion.p>
      </div>
    </section>
  );
}
