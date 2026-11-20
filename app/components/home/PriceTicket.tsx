import { prices } from "../../lib/site";

/** Home prices as a tear-off ticket: first visit and routine, side by side. */
export default function PriceTicket() {
  const [first, routine] = prices;
  const halves = [
    { label: "First visit", price: first.price },
    { label: "Routine", price: routine.price },
  ];
  return (
    <section className="py-14 text-center md:py-20" aria-labelledby="prices-heading">
      <h2 id="prices-heading" className="text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-brand-sageDark">
        Prices
      </h2>
      <dl className="relative mx-auto mt-6 flex max-w-[330px] rounded-[18px] bg-white text-left shadow-[0_18px_34px_-20px_rgba(36,48,40,0.45)]">
        {halves.map((half, index) => (
          <div key={half.label} className="contents">
            {index > 0 && (
              // Perforation, with notches cut out top and bottom.
              <div
                aria-hidden="true"
                className="relative my-3 border-l-2 border-dashed border-brand-line before:absolute before:-left-[9px] before:-top-5 before:h-4 before:w-4 before:rounded-full before:bg-brand-offwhite after:absolute after:-bottom-5 after:-left-[9px] after:h-4 after:w-4 after:rounded-full after:bg-brand-offwhite"
              />
            )}
            <div className="flex-1 px-4 py-[18px]">
              <dt className="text-[0.65625rem] font-semibold uppercase tracking-[0.16em] text-brand-sageDark">{half.label}</dt>
              <dd className="mt-1.5 font-heading text-[2.375rem] font-semibold leading-none text-brand-sageDeep">{half.price}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
