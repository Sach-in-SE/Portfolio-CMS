"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemo: string;
  image: string;
};

export function ProjectCard({
  title,
  description,
  techStack,
  githubLink,
  liveDemo,
  image,
}: ProjectCardProps) {
  const safeImage = image && image.includes(".") ? image : `${image}.png`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-300/0 via-cyan-300/0 to-emerald-300/0 opacity-0 blur-md transition-all duration-500 group-hover:from-cyan-300/30 group-hover:via-sky-300/20 group-hover:to-emerald-300/25 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative overflow-hidden border-b border-white/10">
        <Image
          src={safeImage}
          alt={`${title} preview`}
          width={1200}
          height={600}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative p-6">
        <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-100">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100 transition-all duration-300 group-hover:border-cyan-200/45 group-hover:bg-cyan-300/20"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
          >
            <FaGithub className="text-base" />
            GitHub
          </a>

          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300/25"
          >
            Live Demo
            <FaArrowUpRightFromSquare className="text-xs" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
