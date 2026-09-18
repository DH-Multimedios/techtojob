"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { ArrowIcon } from "@/components/ui/ArrowIcon";

type NewsletterDemoFormProps = {
  emailLabel: string;
  emailHelp: string;
  frequencyLegend: string;
  frequencyOptions: ReadonlyArray<{ value: string; label: string }>;
  interestsLegend: string;
  interestsHelp: string;
  interestOptions: ReadonlyArray<{ value: string; label: string }>;
  submitLabel: string;
  emptyError: string;
  formatError: string;
  successMessage: string;
  resetLabel: string;
};

export function NewsletterDemoForm({
  emailLabel,
  emailHelp,
  frequencyLegend,
  frequencyOptions,
  interestsLegend,
  interestsHelp,
  interestOptions,
  submitLabel,
  emptyError,
  formatError,
  successMessage,
  resetLabel,
}: NewsletterDemoFormProps) {
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isComplete) {
      successRef.current?.focus();
    }
  }, [isComplete]);

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
    setFrequency("monthly");
    setInterests([]);
    setError("");
    setIsComplete(false);
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  if (isComplete) {
    return (
      <div
        ref={successRef}
        className="newsletter-success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
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
    <div className="newsletter-form" data-newsletter-demo="true">
      <label
        id="newsletter-email-label"
        className="newsletter-form__email-label"
        htmlFor="newsletter-email"
      >
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
      <fieldset
        className="newsletter-preferences"
        aria-labelledby="newsletter-frequency-legend"
      >
        <legend id="newsletter-frequency-legend">{frequencyLegend}</legend>
        <div className="newsletter-options newsletter-options--frequency">
          {frequencyOptions.map((option) => (
            <label className="newsletter-option" key={option.value}>
              <input
                type="radio"
                name="newsletter-frequency"
                value={option.value}
                checked={frequency === option.value}
                onChange={() => setFrequency(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset
        className="newsletter-preferences"
        aria-labelledby="newsletter-interests-legend"
        aria-describedby="newsletter-interests-help"
      >
        <legend id="newsletter-interests-legend">{interestsLegend}</legend>
        <p id="newsletter-interests-help" className="newsletter-preferences__help">
          {interestsHelp}
        </p>
        <div className="newsletter-options newsletter-options--interests">
          {interestOptions.map((option) => (
            <label className="newsletter-option" key={option.value}>
              <input
                type="checkbox"
                value={option.value}
                checked={interests.includes(option.value)}
                onChange={(event) => {
                  setInterests((currentInterests) =>
                    event.target.checked
                      ? [...currentInterests, option.value]
                      : currentInterests.filter(
                          (interest) => interest !== option.value,
                        ),
                  );
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="newsletter-form__actions">
        <button
          className="button button--dark newsletter-form__submit"
          type="button"
          onClick={activateDemo}
        >
          {submitLabel}
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
