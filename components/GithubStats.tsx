"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookBookmark, FaStar, FaUserCheck, FaUsers } from "react-icons/fa6";

type GithubStatsProps = {
  username?: string;
};

type GithubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type StatCard = {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
};

async function fetchTotalStars(username: string): Promise<number> {
  let page = 1;
  let totalStars = 0;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = (await response.json()) as Array<{ stargazers_count?: number }>;

    if (repos.length === 0) {
      break;
    }

    totalStars += repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);

    if (repos.length < 100) {
      break;
    }

    page += 1;
  }

  return totalStars;
}

export function GithubStats({ username = "octocat" }: GithubStatsProps) {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      setError(null);

      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user data");
        }

        const userData = (await userResponse.json()) as GithubUser;
        const totalStars = await fetchTotalStars(username);

        if (!isMounted) {
          return;
        }

        setStats([
          { label: "Total Repositories", value: userData.public_repos, icon: FaBookBookmark },
          { label: "Followers", value: userData.followers, icon: FaUsers },
          { label: "Following", value: userData.following, icon: FaUserCheck },
          { label: "Total Stars", value: totalStars, icon: FaStar },
        ]);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Unable to load GitHub stats right now.");
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <section id="github-stats" className="px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">GitHub</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">GitHub Stats</h2>
          <p className="mt-2 text-sm text-slate-400">
            Live public profile metrics for @{username}
          </p>
        </motion.div>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {(stats ?? Array.from({ length: 4 })).map((stat, index) => {
              const card = stat as StatCard | undefined;
              const Icon = card?.icon;

              return (
                <motion.article
                  key={card?.label ?? `skeleton-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
                >
                  {card && Icon ? (
                    <>
                      <div className="mb-3 inline-flex rounded-lg bg-cyan-300/15 p-2 text-cyan-200">
                        <Icon className="text-lg" />
                      </div>
                      <p className="text-2xl font-bold text-white">{card.value.toLocaleString()}</p>
                      <p className="mt-1 text-xs text-slate-400">{card.label}</p>
                    </>
                  ) : (
                    <>
                      <div className="mb-3 h-9 w-9 animate-pulse rounded-lg bg-slate-700/80" />
                      <div className="h-7 w-20 animate-pulse rounded bg-slate-700/80" />
                      <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-700/70" />
                    </>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
