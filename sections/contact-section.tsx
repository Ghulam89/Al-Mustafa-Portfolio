"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/section-shell";

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setToast(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Unable to send");
      setToast({ type: "success", message: "Message sent successfully." });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setToast({ type: "error", message: "Message failed. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let us build your next product."
      description="Tell me what you are building and I will reply with the right technical direction."
    >
      <form
        onSubmit={submit}
        className="rounded-2xl border border-white/20 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-200">
            Name
            <input
              required
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-blue-400/40 transition focus:ring"
              placeholder="Your name"
            />
          </label>
          <label className="text-sm text-slate-200">
            Email
            <input
              required
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-blue-400/40 transition focus:ring"
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm text-slate-200">
          Message
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none ring-blue-400/40 transition focus:ring"
            placeholder="Project goals, timeline, budget..."
          />
        </label>
        <button
          disabled={sending}
          type="submit"
          className="mt-5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-65"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-lg px-4 py-3 text-sm ${
            toast.type === "success"
              ? "border border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
              : "border border-red-400/40 bg-red-500/10 text-red-200"
          }`}
        >
          {toast.message}
        </motion.div>
      ) : null}
    </SectionShell>
  );
}
