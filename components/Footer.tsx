import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const links = [
  { label: "GitHub", href: "https://github.com/Sach-in-SE", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sachin-kumar-08b390359/",
    icon: FaLinkedin,
  },
  { label: "X", href: "https://x.com/imsachin_ram", icon: FaXTwitter },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Sachin Kumar. Student today Engineer tomorrow.</p>

        <ul className="flex items-center gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-slate-300 transition-colors hover:border-cyan-300 hover:text-cyan-200"
                >
                  <Icon className="text-sm" />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
