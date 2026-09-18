import { useState } from "react";
import {
  CoffeeIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowRightIcon,
  HeartIcon,
} from "./icons";

const cols = [
  {
    title: "Explore",
    links: ["Home", "Menu", "Our Story", "Reviews", "Visit Us"],
  },
  {
    title: "Treats",
    links: ["Cakes & Slices", "Cupcakes", "Donuts", "Turkish Sweets", "Drinks"],
  },
  {
    title: "Company",
    links: ["About Lisha", "Careers", "Catering", "Gift Cards", "Contact"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-plum-800 via-blush-900 to-plum-800 text-blush-100">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-blush-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {/* Newsletter */}
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Join the Sweet Club
            </h3>
            <p className="mt-2 text-sm text-blush-100/75">
              Get a free cupcake on your birthday plus first dibs on seasonal
              treats and secret menu drops.
            </p>
          </div>
          {done ? (
            <p className="font-display text-xl font-bold text-white">
              🎀 Welcome to the Sweet Club! Check your inbox.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none transition-all placeholder:text-blush-100/50 focus:border-blush-300 focus:ring-4 focus:ring-blush-500/30"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-400 to-blush-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Subscribe <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blush-400 to-blush-600 text-white shadow-lg">
                <CoffeeIcon className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-script text-3xl text-white">Lisha</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-blush-100/70">
                  Turkish Pâtisserie
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blush-100/70">
              A blush-pink corner of Türkiye serving hand-rolled baklava, playful
              cupcakes, fresh donuts and slow-brewed Turkish coffee — made with
              love since day one.
            </p>
            <div className="mt-5 space-y-2 text-sm text-blush-100/70">
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-blush-300" /> 14 Gül Sokak, Beyoğlu, Istanbul
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-blush-300" /> +90 212 555 0 142
              </p>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-base font-bold uppercase tracking-wider text-white">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-blush-100/70 transition-colors hover:text-blush-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-blush-100/60">
            © {new Date().getFullYear()} Lisha Café. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-blush-100 transition-colors hover:bg-blush-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="flex items-center gap-1.5 text-xs text-blush-100/60">
            Crafted with <HeartIcon className="h-3.5 w-3.5 text-blush-400" /> &amp; a lot of sugar
          </p>
        </div>
      </div>
    </footer>
  );
}
