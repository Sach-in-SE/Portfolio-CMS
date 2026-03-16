import { ContactForm } from "@/components/ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="px-5 py-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-2xl border border-white/10 bg-slate-900/65 p-6 sm:grid-cols-2 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Contact</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
            Let&apos;s build something great.
          </h2>
          <p className="mt-4 text-slate-300">
            Have an idea, role, or project in mind? Send a message and I&apos;ll get
            back to you soon.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
