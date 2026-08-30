import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const feedbackId = useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      // ── Placeholder submit — swap for your real endpoint ──
      // await fetch("/api/waitlist", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: value }),
      // });
      await new Promise((resolve) => setTimeout(resolve, 900));

      setStatus("success");
      setMessage("You're on the list. Check your inbox to confirm.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  const isError = status === "error";
  const isLoading = status === "loading";

  if (status === "success") {
    return (
      <p role="status" className="text-success">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-md"
    >
      <div className="join w-full">
        <label
          className={`input outline-none join-item flex-1 ${isError ? "input-error" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 opacity-50"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="mail@site.com"
            aria-label="Email address"
            aria-invalid={isError}
            aria-describedby={feedbackId}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            disabled={isLoading}
            required
          />
        </label>
        <button
          type="submit"
          className="btn btn-secondary join-item"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Join"
          )}
        </button>
      </div>

      <p
        id={feedbackId}
        role={isError ? "alert" : "status"}
        aria-live="polite"
        className={`mt-2 min-h-5 text-center text-sm ${
          isError ? "text-error" : "text-base-content/50"
        }`}
      >
        {message || "No spam. Unsubscribe anytime."}
      </p>
    </form>
  );
}
