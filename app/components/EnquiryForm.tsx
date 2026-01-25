"use client";

import { useMemo, useState } from "react";

type AppointmentType =
  | "New Patient Assessment & Treatment"
  | "Routine Foot Care"
  | "Nail Care"
  | "Other / Unsure";

type FormState = {
  fullName: string;
  postcode: string;
  phone: string;
  email: string;
  appointmentType: AppointmentType;
  preferredDays: string[];
  appointmentDetails: string;
  clinicalNotes: string;
  heardAboutUs: string;
};

const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<FormState>({
    fullName: "",
    postcode: "",
    phone: "",
    email: "",
    appointmentType: "Other / Unsure",
    preferredDays: [],
    appointmentDetails: "",
    clinicalNotes: "",
    heardAboutUs: "",
  });

  const missingRequired = useMemo(() => {
    return (
      !data.fullName.trim() ||
      !data.postcode.trim() ||
      !data.phone.trim() ||
      !data.email.trim() ||
      !data.appointmentDetails.trim() ||
      data.preferredDays.length === 0
    );
  }, [data]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDay(day: string) {
    setData((prev) => {
      const exists = prev.preferredDays.includes(day);
      return {
        ...prev,
        preferredDays: exists
          ? prev.preferredDays.filter((d) => d !== day)
          : [...prev.preferredDays, day],
      };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (missingRequired) {
      setError("Please complete all required fields and select at least one preferred day.");
      return;
    }

    setIsSubmitting(true);

    try {
      const messageLines = [
        `Postcode: ${data.postcode}`,
        `Phone: ${data.phone}`,
        `Appointment type: ${data.appointmentType}`,
        `Preferred days: ${data.preferredDays.join(", ")}`,
        `Appointment details: ${data.appointmentDetails}`,
        `Clinical notes: ${data.clinicalNotes || "None provided"}`,
        `Heard about us: ${data.heardAboutUs || "Not provided"}`,
      ];

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          message: messageLines.join("\n"),
        }),
      });

      if (!res.ok) {
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
    return (
      <div className="rounded-2xl border border-brand-sageLight/30 bg-white p-6 text-center">
        <h2 className="font-heading text-xl font-semibold text-brand-sageDark">
          Thank you for your enquiry.
        </h2>
        <p className="mt-2 text-sm text-brand-charcoal/70">
          We aim to respond within <strong>24–48 hours</strong> to arrange your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Name + Postcode */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-charcoal">
            Full name *
          </label>
          <input
            className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-brand-charcoal">
            Postcode *
          </label>
          <input
            className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
            value={data.postcode}
            onChange={(e) => update("postcode", e.target.value)}
          />
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-brand-charcoal">
            Contact number *
          </label>
          <input
            className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-brand-charcoal">
            Email address *
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      {/* Appointment Type */}
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-charcoal">
          Type of appointment *
        </label>

        <select
          className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          value={data.appointmentType}
          onChange={(e) => update("appointmentType", e.target.value as AppointmentType)}
        >
          <option className="text-brand-charcoal bg-white">
            New Patient Assessment & Treatment
          </option>
          <option className="text-brand-charcoal bg-white">
            Routine Foot Care
          </option>
          <option className="text-brand-charcoal bg-white">
            Nail Care
          </option>
          <option className="text-brand-charcoal bg-white">
            Other / Unsure
          </option>
        </select>
      </div>

      {/* Preferred Days */}
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-charcoal">
          Preferred days *
        </label>

        <div className="flex flex-wrap gap-2">
          {dayOptions.map((day) => {
            const active = data.preferredDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark ${
                  active
                    ? "border-brand-sageDark bg-brand-sageDark text-white"
                    : "border-brand-sageLight/40 bg-white text-brand-charcoal hover:bg-brand-offwhite"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        <p className="mt-2 text-xs text-brand-charcoal/60">Select at least one day.</p>
      </div>

      {/* Appointment Details */}
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-charcoal">
          Appointment details *
        </label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          placeholder="Brief description of what you need help with"
          value={data.appointmentDetails}
          onChange={(e) => update("appointmentDetails", e.target.value)}
        />
      </div>

      {/* Clinical Notes */}
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-charcoal">
          Any mobility, access, or medical considerations? *
        </label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          placeholder="e.g. stairs, diabetes, poor circulation, recent surgery"
          value={data.clinicalNotes}
          onChange={(e) => update("clinicalNotes", e.target.value)}
        />
      </div>

      {/* How did you hear */}
      <div>
        <label className="mb-1 block text-sm font-medium text-brand-charcoal">
          How did you hear about us? (optional)
        </label>
        <input
          className="w-full rounded-lg border border-brand-sageLight/40 bg-white p-3 text-sm text-brand-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark"
          value={data.heardAboutUs}
          onChange={(e) => update("heardAboutUs", e.target.value)}
        />
      </div>

      {/* Consent */}
      <p className="text-sm text-brand-charcoal/70">
        By submitting this form, you agree to be contacted regarding your enquiry.
        Appointment times are confirmed directly and are subject to availability.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-sageDark py-3 text-lg font-medium text-white shadow-md shadow-black/10 transition hover:bg-brand-sage focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sageDark disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Request an Appointment"}
      </button>
    </form>
  );
}
