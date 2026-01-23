export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Contact</h1>
      <p className="text-gray-700 mb-6">
        Drop a message and we’ll get back to you.
      </p>

      <div className="space-y-2 text-gray-700">
        <div><strong>Email:</strong> your@email.com</div>
        <div><strong>Location:</strong> Bristol</div>
      </div>
    </section>
  );
}
