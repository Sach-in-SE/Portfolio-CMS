"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Failed to send message");
      }

      setSuccessMessage(result.message ?? "Message sent successfully");
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-6"
    >
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Developer"
          className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-300"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@domain.com"
          className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-300"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project..."
          className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-cyan-300"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex w-fit rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:scale-[1.02]"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {successMessage ? (
        <p className="text-sm text-emerald-300">{successMessage}</p>
      ) : null}

      {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
    </motion.form>
  );
}
