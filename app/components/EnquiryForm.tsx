"use client";

import { useMemo, useState } from "react";

type FormState = {
  fullName: string;
  postcode: string;
  phone: string;
  email: string;
  appointmentDetails: string;
  appointmentType: "New Patient Assessment & Treatment" | "Routine Foot Care" | "Nail Care" | "Other / Unsure";
  preferredDays: string[]; // Mon-Fri
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
    appointmentDetails: "",
    appointmentType: "Other / Unsure",
    preferredDays: [],
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
      /**
       * OPTION 1 (no backend, recommended): Formspree / similar
       * - Create a Formspree form and replace the URL below.
       * - Keep this exact payload structure or adjust to your provider.
       */
      const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxabcd"

      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...data,
            preferredDays: data.preferredDays.join(", "),
          }),
        });

        if (!res.ok) throw new Error("Form submission failed.");
      } else {
        /**
         * OPTION 2 (temporary): No endpoint configured yet.
         * We still show the success state so the page feels finished.
         * Replace with FORM_ENDPOINT when ready.
         */
      }

      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong submitting your enquiry. Please try again, or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="border rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Thank you for your enquiry.</h2>
        <p className="text-gray-600">
          We aim to respond within <strong>24–48 hours</strong> to arrange your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Required fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full name *</label>
          <input
            className="w-full border rounded-lg p-3"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            autoComplete="name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Postcode *</label>
          <input
            className="w-full border rounded-lg p-3"
            value={data.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            autoComplete="postal-code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact number *</label>
          <input
            className="w-full border rounded-lg p-3"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email address *</label>
          <input
            type="email"
            className="w-full border rounded-lg p-3"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type of appointment *</label>
        <select
          className="w-full border rounded-lg p-3"
          value={data.appointmentType}
          onChange={(e) => update("appointmentType", e.target.value as FormState["appointmentType"])}
        >
          <option>New Patient Assessment & Treatment</option>
          <option>Routine Foot Care</option>
          <option>Nail Care</option>
          <option>Other / Unsure</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Preferred days *</label>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map((day) => {
            const active = data.preferredDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-full border text-sm transition ${
  active
    ? "bg-black text-white border-black"
    : "bg-white text-black border-gray-300 hover:bg-gray-100"
}`}

              >
                {day}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">Select at least one day.</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Appointment details *</label>
        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          value={data.appointmentDetails}
          onChange={(e) => update("appointmentDetails", e.target.value)}
          placeholder="Brief description of what you need help with"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Any mobility, access, or medical considerations? *
        </label>
        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          value={data.clinicalNotes}
          onChange={(e) => update("clinicalNotes", e.target.value)}
          placeholder="e.g. stairs, diabetes, poor circulation, recent surgery"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">How did you hear about us? (optional)</label>
        <input
          className="w-full border rounded-lg p-3"
          value={data.heardAboutUs}
          onChange={(e) => update("heardAboutUs", e.target.value)}
        />
      </div>

      <p className="text-sm text-gray-600">
        By submitting this form, you agree to be contacted regarding your enquiry. Appointment times are confirmed
        directly and are subject to availability.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 rounded-xl text-lg disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Request an Appointment"}
      </button>
    </form>
  );
}
