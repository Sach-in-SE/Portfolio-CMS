"use client";

import { motion } from "framer-motion";

type Particle = {
  id: number;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
};

const particles: Particle[] = [
  { id: 1, size: 8, x: "8%", y: "20%", duration: 12, delay: 0.5 },
  { id: 2, size: 5, x: "18%", y: "76%", duration: 16, delay: 1.4 },
  { id: 3, size: 6, x: "30%", y: "35%", duration: 14, delay: 0.2 },
  { id: 4, size: 10, x: "44%", y: "15%", duration: 18, delay: 0.8 },
  { id: 5, size: 7, x: "57%", y: "72%", duration: 15, delay: 1.1 },
  { id: 6, size: 9, x: "68%", y: "42%", duration: 13, delay: 1.8 },
  { id: 7, size: 6, x: "78%", y: "24%", duration: 17, delay: 0.3 },
  { id: 8, size: 8, x: "90%", y: "64%", duration: 19, delay: 0.9 },
  { id: 9, size: 4, x: "38%", y: "88%", duration: 11, delay: 1.6 },
  { id: 10, size: 5, x: "60%", y: "8%", duration: 14, delay: 0.6 },
];

export function BackgroundParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0.15, 0.48, 0.15],
            y: [0, -24, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-cyan-200/45 blur-[1px]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
        />
      ))}
    </div>
  );
}
