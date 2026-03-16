import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Footer } from "@/components/Footer";
import { GithubStats } from "@/components/GithubStats";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { VisitorTracker } from "@/components/VisitorTracker";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ResumeSection } from "@/sections/ResumeSection";
import { SkillsSection } from "@/sections/SkillsSection";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Stats", href: "#github-stats" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const githubUsername = "Sach-in-SE";

export default function Home() {
  return (
    <div className="portfolio-root grid-overlay min-h-screen text-slate-100">
      <VisitorTracker />
      <BackgroundParticles />
      <Navbar links={navLinks} />
      <main>
        <Hero
          name="Sachin Kumar"
          role="Full Stack Developer | Android Developer | Builds real-world projects integrating ai and web technologies"
          location="Developer from India • Passionate about Modern Web Apps"
        />
        <AboutSection />
        <SkillsSection />
        <GithubStats username={githubUsername} />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
