"use client";

import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa6";
import {
  SiAndroidstudio,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

import { SkillCard } from "@/components/SkillCard";
import { DiAws, DiFirebase } from "react-icons/di";

const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Firebase", icon: DiFirebase },
      { name: "REST APIs", icon: SiExpress },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "AWS", icon: DiAws },
      { name: "VS Code", icon: FaCode },
      { name: "Android Studio", icon: SiAndroidstudio },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "CI/CD Basics", icon: SiGithubactions },
    ],
  },
];

export function SkillsSection() {
  return (
    <motion.section
      id="skills"
      className="px-5 py-16 sm:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Skills</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Skills</h2>

        <div className="mt-8 space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: groupIndex * 0.06 }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-white">{group.category}</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {group.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={`${group.category}-${skill.name}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: skillIndex * 0.05 }}
                  >
                    <SkillCard name={skill.name} icon={skill.icon} />
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
