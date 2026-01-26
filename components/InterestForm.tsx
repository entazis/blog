"use client";

import { useState } from "react";

export default function InterestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed) {
      return;
    }

    try {
      setStatus("sending");

      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: trimmed,
          pageUrl: window.location.href
        })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setEmail("");
      setStatus("sent");
    } catch (error) {
      console.error("Interest form failed:", error);
      setStatus("error");
    }
  };

  const helperText =
    status === "sent"
      ? "Thanks! I'll reach out when it's ready."
      : status === "error"
        ? "Something went wrong. Please try again later."
        : "No emails yet. Just collecting interest.";

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
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") {
              setStatus("idle");
            }
          }}
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
          required
          disabled={status === "sending"}
          className="focus-ring w-full max-w-sm rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          {status === "sending" ? "Sending..." : "Notify me"}
        </button>
      </form>
      <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
        {helperText}
      </p>
    </>
  );
}
