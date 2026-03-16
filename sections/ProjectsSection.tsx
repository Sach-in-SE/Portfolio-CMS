"use client";

import { useEffect, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";

type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveDemo: string;
  image: string;
};

type ProjectsApiResponse = {
  success: boolean;
  data: Project[];
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const result = (await response.json()) as ProjectsApiResponse;
        if (!result.success) {
          throw new Error("API returned unsuccessful response");
        }

        if (isMounted) {
          setProjects(result.data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load projects right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects" className="px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Projects</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
          Selected work
        </h2>

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <article
                key={`project-skeleton-${index}`}
                className="h-80 animate-pulse rounded-2xl border border-white/10 bg-slate-900/50"
              />
            ))}
          </div>
        ) : error ? (
          <p className="mt-8 rounded-xl border border-red-300/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
