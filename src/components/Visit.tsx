import { useState, type ReactNode } from "react";
import { Reveal } from "./Reveal";
import {
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  CheckIcon,
} from "./icons";

const hours = [
  { day: "Monday – Thursday", time: "08:00 – 22:00" },
  { day: "Friday – Saturday", time: "08:00 – 24:00" },
  { day: "Sunday", time: "09:00 – 21:00" },
];

export default function Visit() {
  const [sent, setSent] = useState(false);

  return (
    <section id="visit" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-blush-500">bekleriz</p>
          <h2 className="font-display text-4xl font-extrabold text-plum-800 sm:text-5xl">
            Visit Lisha Café
          </h2>
          <p className="mt-4 text-plum-700/75">
            Step into our blush-lit parlour or order ahead for pickup & delivery.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Info */}
          <Reveal className="flex flex-col gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard icon={<MapPinIcon className="h-6 w-6" />} title="Find us">
                <p>14 Gül Sokak, Beyoğlu</p>
                <p>Istanbul, Türkiye</p>
              </InfoCard>
              <InfoCard icon={<PhoneIcon className="h-6 w-6" />} title="Call / WhatsApp">
                <p>+90 212 555 0 142</p>
                <p>hello@lishacafe.com</p>
              </InfoCard>
            </div>

            <div className="rounded-3xl border border-blush-100 bg-white/80 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-blush-600">
                <ClockIcon className="h-6 w-6" />
                <h3 className="font-display text-xl font-bold text-plum-800">
                  Opening Hours
                </h3>
              </div>
              <ul className="space-y-2.5">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between border-b border-dashed border-blush-100 pb-2.5 text-sm last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-plum-700">{h.day}</span>
                    <span className="font-bold text-blush-600">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex gap-3">
                {[InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="grid h-10 w-10 place-items-center rounded-full bg-blush-100 text-blush-600 transition-colors hover:bg-blush-500 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-3xl border border-blush-100 shadow-sm">
              <iframe
                title="Lisha Café location"
                src="https://www.google.com/maps?q=Beyo%C4%9Flu%2C%20Istanbul%2C%20Turkey&output=embed"
                className="h-56 w-full grayscale-[0.2]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-3xl border border-blush-100 bg-gradient-to-br from-white to-blush-50 p-7 shadow-sm sm:p-9">
              <h3 className="font-display text-2xl font-bold text-plum-800">
                Book a table or catering
              </h3>
              <p className="mt-1 text-sm text-plum-700/70">
                Drop us a note and we'll reply within the hour.
              </p>
              {sent ? (
                <div className="mt-8 flex flex-col items-center rounded-2xl bg-emerald-50 py-10 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
                    <CheckIcon className="h-7 w-7" />
                  </span>
                  <p className="mt-3 font-display text-xl font-bold text-plum-800">
                    Teşekkürler! Message sent.
                  </p>
                  <p className="mt-1 text-sm text-plum-700/70">
                    Our team will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Ayşe Yılmaz" />
                    <Field label="Phone" name="phone" placeholder="+90 5xx xxx xx xx" />
                  </div>
                  <Field label="Email" name="email" type="email" placeholder="you@email.com" />
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-plum-700">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="I'd love to order a birthday cake for Saturday…"
                      className="w-full resize-none rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-plum-800 outline-none transition-all placeholder:text-plum-700/40 focus:border-blush-400 focus:ring-4 focus:ring-blush-200"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-blush-500 to-blush-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blush-300 transition-transform hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-blush-100 bg-white/80 p-6 shadow-sm">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush-100 text-blush-600">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-plum-800">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-plum-700/75">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-plum-700">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-sm text-plum-800 outline-none transition-all placeholder:text-plum-700/40 focus:border-blush-400 focus:ring-4 focus:ring-blush-200"
      />
    </div>
  );
}
