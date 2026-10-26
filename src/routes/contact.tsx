import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Send } from "lucide-react";
import { SectionHeading, btnGold } from "@/components/site/ui";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — A Day in Time" },
      {
        name: "description",
        content: "Questions, archive sources or feedback — write to the A Day in Time team.",
      },
      { property: "og:title", content: "Contact — A Day in Time" },
      { property: "og:description", content: "Write to the A Day in Time team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const inputClass =
  "w-full rounded-md border border-input bg-muted/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/50";
const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-silver";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please write a short message.");
      return;
    }
    setError("");
    // Demo build: no backend is connected yet, so the message is only acknowledged here.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Questions about a record, a source to suggest, or a story from your own birth day — every message is read."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-5">
          <div className="panel-gold rounded-xl p-6">
            <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-3">Email</p>
            <p className="mt-2 text-sm text-silver">hello@adayintime.example</p>
          </div>
          <div className="panel-gold rounded-xl p-6">
            <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-3">Studio</p>
            <p className="mt-2 text-sm text-silver">
              Hyderabad, India
              <br />
              Working across time zones
            </p>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            We usually reply within two working days.
          </p>
        </div>

        <div className="panel-gold rounded-xl p-6 sm:p-8">
          {sent ? (
            <div
              className="flex min-h-[320px] flex-col items-center justify-center text-center"
              role="status"
            >
              <Send className="h-10 w-10 text-gold" aria-hidden="true" />
              <p className="mt-5 font-display text-2xl font-semibold text-foreground">
                Message noted
              </p>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thank you{email ? `, ${name || email}` : ""}. This demo build doesn't send messages
                yet — your note stayed in this window.
              </p>
              <Link to="/" hash="birth-form" className={`${btnGold} mt-6`}>
                Explore a time capsule
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ct-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="ct-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="ct-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ct-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="ct-message"
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (error) setError("");
                  }}
                  aria-describedby="ct-message-error"
                  className={inputClass}
                />
                {error ? (
                  <p id="ct-message-error" role="alert" className="mt-1.5 text-xs text-destructive">
                    {error}
                  </p>
                ) : null}
              </div>
              <button type="submit" className={`${btnGold} w-full py-3.5`}>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
