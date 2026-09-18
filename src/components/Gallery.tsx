import { menu } from "../data/menu";
import { Reveal } from "./Reveal";

const row1 = [44, 3, 16, 29, 22, 34, 1, 30, 39]
  .map((id) => menu.find((m) => m.id === id)!)
  .filter(Boolean);
const row2 = [2, 21, 7, 47, 18, 26, 45, 11, 50]
  .map((id) => menu.find((m) => m.id === id)!)
  .filter(Boolean);

function GalleryRow({ items, reverse }: { items: typeof menu; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex shrink-0 gap-5 pr-5 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <figure
            key={`${item.id}-${i}`}
            className="relative h-44 w-64 shrink-0 overflow-hidden rounded-3xl shadow-lg shadow-blush-100"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum-800/70 via-plum-800/10 to-transparent" />
            <figcaption className="absolute bottom-3 left-3 right-3">
              <p className="font-script text-lg leading-none text-white">{item.tr}</p>
              <p className="truncate text-xs font-semibold text-white/90">{item.name}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-cream to-blush-50 py-16 sm:py-20">
      <Reveal className="mx-auto mb-10 max-w-2xl px-5 text-center">
        <p className="font-script text-3xl text-blush-500">galeri</p>
        <h2 className="font-display text-4xl font-extrabold text-plum-800 sm:text-5xl">
          A feast for the eyes
        </h2>
        <p className="mt-3 text-plum-700/75">
          Hover to pause — every treat is crafted to be as beautiful as it is
          delicious.
        </p>
      </Reveal>
      <div className="space-y-5">
        <GalleryRow items={row1} />
        <GalleryRow items={row2} reverse />
      </div>
    </section>
  );
}
