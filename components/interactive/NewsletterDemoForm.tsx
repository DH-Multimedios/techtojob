"use client";

import { useRef, useState, type KeyboardEvent } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

type NewsletterDemoFormProps = {
  emailLabel: string;
  emailHelp: string;
  submitLabel: string;
  emptyError: string;
  formatError: string;
  successMessage: string;
  resetLabel: string;
};

export function NewsletterDemoForm({
  emailLabel,
  emailHelp,
  submitLabel,
  emptyError,
  formatError,
  successMessage,
  resetLabel,
}: NewsletterDemoFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function activateDemo() {
    const input = inputRef.current;

    if (!email.trim()) {
      setError(emptyError);
      input?.focus();
      return;
    }

    if (!input?.validity.valid) {
      setError(formatError);
      input?.focus();
      return;
    }

    setError("");
    setIsComplete(true);
  }

  function resetDemo() {
    setEmail("");
    setError("");
    setIsComplete(false);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  if (isComplete) {
    return (
      <div className="newsletter-success" role="status" aria-live="polite">
        <span aria-hidden="true" className="newsletter-success__mark">
          ✓
        </span>
        <p>{successMessage}</p>
        <button className="text-link" type="button" onClick={resetDemo}>
          {resetLabel}
        </button>
      </div>
    );
  }

  const describedBy = error
    ? "newsletter-email-help newsletter-email-error"
    : "newsletter-email-help";

  return (
    <div
      className="newsletter-form"
      role="group"
      aria-labelledby="newsletter-email-label"
    >
      <label id="newsletter-email-label" htmlFor="newsletter-email">
        {emailLabel}
      </label>
      <div className="newsletter-form__row">
        <input
          ref={inputRef}
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              event.preventDefault();
              activateDemo();
            }
          }}
        />
        <button
          className="button button--dark newsletter-form__submit"
          type="button"
          aria-label={submitLabel}
          title={submitLabel}
          onClick={activateDemo}
        >
          <ArrowIcon />
        </button>
      </div>
      <p id="newsletter-email-help" className="form-help">
        {emailHelp}
      </p>
      <p
        id="newsletter-email-error"
        className="form-error"
        aria-live="polite"
      >
        {error}
      </p>
    </div>
  );
}
