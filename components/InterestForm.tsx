"use client";

import { useState } from "react";

const mailToAddress = "hello@entazis.dev";
const subject = "Blog updates interest";

export default function InterestForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    const body = [
      "Hi,",
      "",
      "Someone is interested in content updates.",
      "",
      `Email: ${email.trim()}`,
      `Page: ${window.location.href}`,
      "",
      "--",
      "Sent from entazis.dev"
    ].join("\n");

    const params = new URLSearchParams({
      subject,
      body
    });

    window.location.href = `mailto:${mailToAddress}?${params.toString()}`;
  };

  return (
    <>
      <form
        className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
          required
          className="focus-ring w-full max-w-sm rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
        />
        <button
          type="submit"
          className="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Notify me
        </button>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">
        No emails yet. Just collecting interest.
      </p>
    </>
  );
}
