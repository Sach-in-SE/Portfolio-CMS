"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";

type SkillCardProps = {
  name: string;
  icon: IconType;
};

export function SkillCard({ name, icon: Icon }: SkillCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="group rounded-xl border border-white/10 bg-slate-900/70 p-4 transition-colors duration-300 hover:border-cyan-300/35"
    >
      <motion.div
        animate={{ y: [0, -1, 0] }}
        whileHover={{ scale: 1.1 }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="mb-3 inline-flex rounded-lg bg-cyan-300/15 p-2 text-cyan-200 transition-colors duration-300 group-hover:bg-cyan-300/25"
      >
        <Icon className="text-xl" />
      </motion.div>

      <h3 className="text-sm font-semibold text-white transition-colors duration-300 group-hover:text-cyan-100">
        {name}
      </h3>
    </motion.article>
  );
}
