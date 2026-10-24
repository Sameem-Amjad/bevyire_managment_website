"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Send, Check, AlertCircle } from "lucide-react";
import {
  contactSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { demoMode } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-forest-950 placeholder:text-forest-800/35 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/40";

function fieldClasses(hasError: boolean) {
  return cn(
    inputBase,
    hasError
      ? "border-red-400/70 focus:border-red-400"
      : "border-forest-900/15 focus:border-gold-500",
  );
}

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyAddress: "",
      service: undefined,
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerMessage(null);
    const result = await submitContactForm(values);

    if (result.success) {
      setSucceeded(true);
      reset();
      return;
    }

    if (result.fieldErrors) {
      for (const [key, message] of Object.entries(result.fieldErrors)) {
        setError(key as keyof ContactFormValues, { message });
      }
    }
    setServerMessage(result.message);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {succeeded ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[28rem] flex-col items-center justify-center rounded-[1.75rem] border border-forest-900/8 bg-white p-10 text-center shadow-soft"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
              className="grid size-20 place-items-center rounded-full bg-forest-900 text-gold-300"
            >
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 260 }}
              >
                <Check className="size-10" strokeWidth={2.5} />
              </motion.span>
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-medium text-forest-950">
              Message sent — thank you
            </h3>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed text-forest-800/75">
              We&apos;ve received your enquiry and a member of our team will be in
              touch within one business day. Keep an eye on your inbox.
            </p>
            <button
              type="button"
              onClick={() => setSucceeded(false)}
              className="mt-8 text-sm font-medium text-forest-700 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-forest-950"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-[1.75rem] border border-forest-900/8 bg-white p-6 shadow-soft sm:p-8"
          >
            {/* Honeypot */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label htmlFor="website">Leave this field empty</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message} required>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className={fieldClasses(!!errors.name)}
                  {...register("name")}
                />
              </Field>

              <Field label="Email address" error={errors.email?.message} required>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className={fieldClasses(!!errors.email)}
                  {...register("email")}
                />
              </Field>

              <Field label="Phone" error={errors.phone?.message} optional>
                <input
                  type="tel"
                  placeholder="+44 7700 900000"
                  autoComplete="tel"
                  className={fieldClasses(!!errors.phone)}
                  {...register("phone")}
                />
              </Field>

              <Field label="How can we help?" error={errors.service?.message} optional>
                <select
                  className={cn(fieldClasses(!!errors.service), "appearance-none")}
                  defaultValue=""
                  {...register("service", {
                    setValueAs: (v) => (v === "" ? undefined : v),
                  })}
                >
                  <option value="">Select a service…</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Property address"
                  error={errors.propertyAddress?.message}
                  optional
                >
                  <input
                    type="text"
                    placeholder="Street, area, city"
                    autoComplete="street-address"
                    className={fieldClasses(!!errors.propertyAddress)}
                    {...register("propertyAddress")}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Message" error={errors.message?.message} required>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your property and what you're looking for…"
                    className={cn(fieldClasses(!!errors.message), "resize-none")}
                    {...register("message")}
                  />
                </Field>
              </div>
            </div>

            {serverMessage && (
              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm text-red-700">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-forest-900 px-8 font-medium text-ivory shadow-soft transition-all duration-300 hover:bg-forest-800 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>

            <p className="mt-4 text-xs leading-relaxed text-forest-800/55">
              By submitting, you agree to be contacted about your enquiry. We
              never share your details. Read our{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-forest-900">
                Privacy Policy
              </a>
              .
            </p>
            {demoMode && (
              <p className="mt-3 rounded-lg bg-gold-500/10 px-3 py-2 text-xs text-forest-800/75">
                Demo site: enquiries are checked as usual, but not sent anywhere.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-forest-900">
        {label}
        {required && <span className="text-gold-600">*</span>}
        {optional && (
          <span className="text-xs font-normal text-forest-800/45">
            (optional)
          </span>
        )}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
