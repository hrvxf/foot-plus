"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type AppointmentType =
  | "New Patient Assessment & Treatment"
  | "Routine Foot Care"
  | "Nail Care"
  | "Other / Unsure";

type ServiceLocation = "Bristol" | "Southampton";

type FormState = {
  location: ServiceLocation;
  fullName: string;
  postcode: string;
  phone: string;
  email: string;
  appointmentType: AppointmentType;
  appointmentDetails: string;
  accessNotes: string;
  heardAboutUs: string;
};

const fieldClass =
  "w-full rounded-xl border border-brand-sageLight/40 bg-brand-offwhite/35 px-4 py-3 text-sm text-brand-charcoal transition focus:border-brand-sage focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark";

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const requestedLocation = searchParams.get("location")?.toLowerCase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<FormState>({
    location: requestedLocation === "southampton" ? "Southampton" : "Bristol",
    fullName: "",
    postcode: "",
    phone: "",
    email: "",
    appointmentType: "Other / Unsure",
    appointmentDetails: "",
    accessNotes: "",
    heardAboutUs: "",
  });

  const missingRequired = useMemo(
    () =>
      !data.fullName.trim() ||
      !data.postcode.trim() ||
      !data.phone.trim() ||
      !data.email.trim() ||
      !data.appointmentDetails.trim(),
    [data]
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (missingRequired) {
      setError("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const messageLines = [
        `Service location: ${data.location}`,
        `Postcode: ${data.postcode}`,
        `Phone: ${data.phone}`,
        `Appointment type: ${data.appointmentType}`,
        `Appointment details: ${data.appointmentDetails}`,
        `Mobility or access requirements: ${data.accessNotes || "None provided"}`,
        `Heard about us: ${data.heardAboutUs || "Not provided"}`,
      ];

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          location: data.location,
          message: messageLines.join("\n"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send enquiry.");
      }

      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    const isSouthampton = data.location === "Southampton";

    return (
      <div className="py-4 sm:py-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/60">
          Enquiry received
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-[-0.025em] text-brand-sageDark">
          Thank you, {data.fullName.split(" ")[0]}.
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-charcoal/70">
          {isSouthampton
            ? "Your Southampton interest has been received. We’ll contact you as the service prepares to launch."
            : "We aim to respond within 24–48 hours to arrange your Bristol appointment."}
        </p>

        <div className="mt-8 border-t border-brand-sageLight/30 pt-7">
          <h3 className="font-heading text-xl font-semibold text-brand-sageDark">
            Complete your patient document
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-charcoal/65">
            New patients can continue to the secure patient-document journey.
          </p>
          <a
            href="/forms"
            className="mt-5 inline-flex rounded-full bg-brand-sageDark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          >
            Complete your patient document
          </a>
        </div>
      </div>
    );
  }

  const isSouthampton = data.location === "Southampton";
  const submitLabel = isSouthampton
    ? "Register Southampton interest"
    : "Request a Bristol appointment";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-sageDark/60">
          Your request
        </p>
        <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.02em] text-brand-sageDark sm:text-3xl">
          Tell us the essentials
        </h2>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="service-location" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
          Service location *
        </label>
        <select
          id="service-location"
          className={fieldClass}
          value={data.location}
          onChange={(event) => update("location", event.target.value as ServiceLocation)}
        >
          <option>Bristol</option>
          <option>Southampton</option>
        </select>
        {isSouthampton ? (
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/60">
            Southampton launches on 20 October 2026. This registers your interest.
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="full-name" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Full name *
          </label>
          <input
            id="full-name"
            className={fieldClass}
            autoComplete="name"
            required
            value={data.fullName}
            onChange={(event) => update("fullName", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postcode" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Postcode *
          </label>
          <input
            id="postcode"
            className={fieldClass}
            autoComplete="postal-code"
            required
            value={data.postcode}
            onChange={(event) => update("postcode", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Contact number *
          </label>
          <input
            id="phone"
            type="tel"
            className={fieldClass}
            autoComplete="tel"
            required
            value={data.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Email address *
          </label>
          <input
            id="email"
            type="email"
            className={fieldClass}
            autoComplete="email"
            required
            value={data.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="appointment-type" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Type of appointment *
          </label>
          <select
            id="appointment-type"
            className={fieldClass}
            required
            value={data.appointmentType}
            onChange={(event) => update("appointmentType", event.target.value as AppointmentType)}
          >
            <option>New Patient Assessment & Treatment</option>
            <option>Routine Foot Care</option>
            <option>Nail Care</option>
            <option>Other / Unsure</option>
          </select>
        </div>
        <div>
          <label htmlFor="heard-about" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            How did you hear about us?
          </label>
          <input
            id="heard-about"
            className={fieldClass}
            value={data.heardAboutUs}
            onChange={(event) => update("heardAboutUs", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="appointment-details" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            How can we help? *
          </label>
          <textarea
            id="appointment-details"
            rows={4}
            className={fieldClass}
            placeholder="Briefly tell us what you need help with"
            required
            value={data.appointmentDetails}
            onChange={(event) => update("appointmentDetails", event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="access-notes" className="mb-1.5 block text-sm font-medium text-brand-charcoal">
            Any mobility or access requirements?
          </label>
          <textarea
            id="access-notes"
            rows={4}
            className={fieldClass}
            placeholder="For example: stairs, parking or help answering the door"
            value={data.accessNotes}
            onChange={(event) => update("accessNotes", event.target.value)}
          />
        </div>
      </div>

      <p className="text-xs leading-relaxed text-brand-charcoal/58">
        By submitting, you agree to be contacted about this enquiry. Appointment times are
        confirmed directly and remain subject to availability.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-brand-sageDark px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_34px_-22px_rgba(24,55,45,0.9)] transition hover:-translate-y-0.5 hover:bg-brand-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark disabled:translate-y-0 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting…" : submitLabel}
      </button>
    </form>
  );
}
