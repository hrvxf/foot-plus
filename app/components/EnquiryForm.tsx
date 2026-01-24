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
      // Hook this up to Formspree / Resend later if needed
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="border rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Thank you for your enquiry.
        </h2>
        <p className="text-gray-600">
          We aim to respond within <strong>24–48 hours</strong> to arrange your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Name + Postcode */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Full name *
          </label>
          <input
            className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
            value={data.fullName}
            onChange={(e) => update("fullName", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Postcode *
          </label>
          <input
            className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
            value={data.postcode}
            onChange={(e) => update("postcode", e.target.value)}
          />
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Contact number *
          </label>
          <input
            className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email address *
          </label>
          <input
            type="email"
            className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>

      {/* Appointment Type */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Type of appointment *
        </label>

        <select
          className="w-full border rounded-lg p-3 bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          value={data.appointmentType}
          onChange={(e) =>
            update("appointmentType", e.target.value as AppointmentType)
          }
        >
          <option className="text-black bg-white">
            New Patient Assessment & Treatment
          </option>
          <option className="text-black bg-white">
            Routine Foot Care
          </option>
          <option className="text-black bg-white">
            Nail Care
          </option>
          <option className="text-black bg-white">
            Other / Unsure
          </option>
        </select>
      </div>

      {/* Preferred Days */}
      <div>
        <label className="block text-sm font-medium mb-2">
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

        <p className="text-xs text-gray-500 mt-2">
          Select at least one day.
        </p>
      </div>

      {/* Appointment Details */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Appointment details *
        </label>
        <textarea
          rows={4}
          className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
          placeholder="Brief description of what you need help with"
          value={data.appointmentDetails}
          onChange={(e) => update("appointmentDetails", e.target.value)}
        />
      </div>

      {/* Clinical Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Any mobility, access, or medical considerations? *
        </label>
        <textarea
          rows={4}
          className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
          placeholder="e.g. stairs, diabetes, poor circulation, recent surgery"
          value={data.clinicalNotes}
          onChange={(e) => update("clinicalNotes", e.target.value)}
        />
      </div>

      {/* How did you hear */}
      <div>
        <label className="block text-sm font-medium mb-1">
          How did you hear about us? (optional)
        </label>
        <input
          className="w-full border rounded-lg p-3 bg-white text-black border-gray-300"
          value={data.heardAboutUs}
          onChange={(e) => update("heardAboutUs", e.target.value)}
        />
      </div>

      {/* Consent */}
      <p className="text-sm text-gray-600">
        By submitting this form, you agree to be contacted regarding your enquiry.
        Appointment times are confirmed directly and are subject to availability.
      </p>

      {/* Submit */}
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
