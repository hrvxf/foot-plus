export default function BookPage() {
  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Book an Appointment</h1>
      <p className="text-gray-600 mb-6">
        For now, this can be a simple request form. Later we can connect Calendly
        or a full booking system.
      </p>

      <form className="space-y-4">
        <input className="w-full border p-3 rounded" placeholder="Full name" />
        <input className="w-full border p-3 rounded" placeholder="Email" />
        <input className="w-full border p-3 rounded" placeholder="Phone" />
        <textarea
          className="w-full border p-3 rounded"
          placeholder="What do you need help with?"
          rows={5}
        />
        <button className="w-full bg-black text-white py-3 rounded">
          Request appointment
        </button>
      </form>
    </section>
  );
}
