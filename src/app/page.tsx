"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ─── Stat Counter — counts up on scroll ─── */
function StatCounter({ target, suffix = "" }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  const animate = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const duration = 1600;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) animate(); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return <span ref={ref} className="stat-counter">{count}{suffix}</span>;
}

/* ─── Feather SVG divider ─── */
function FeatherDivider({ light = false }: { light?: boolean }) {
  return (
    <div className="feather-divider py-2" style={{ background: light ? '#2D2D2D' : '#FFF8F0' }}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        style={{ opacity: light ? 0.2 : 0.1 }}
      >
        <path
          d="M24 4C24 4 18 14 18 24C18 34 24 44 24 44C24 44 30 34 30 24C30 14 24 4 24 4Z"
          stroke={light ? "#F0E6D6" : "#8B2500"}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M24 12C20 16 16 22 18 28"
          stroke={light ? "#F0E6D6" : "#8B2500"}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M24 12C28 16 32 22 30 28"
          stroke={light ? "#F0E6D6" : "#8B2500"}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

/* ─── Navigation ─── */
const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Packages", href: "#packages" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-2/95 backdrop-blur-sm shadow-lg py-2" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center">
          <Image
            src="/images/logo-esc-cream.webp"
            alt="Emotional Support Chicken"
            width={420}
            height={229}
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-10" : "h-16 md:h-[120px]"
            }`}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-light/80 hover:text-white text-sm font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#packages"
            className="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:brightness-110 hover:shadow-md transition-all duration-200"
          >
            Get Your Chicken
          </a>
        </div>

        {/* Hamburger button */}
        <button
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        } bg-dark-2/95 backdrop-blur-sm`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-text-light/80 hover:text-white text-base font-medium transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#packages"
            onClick={closeMenu}
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-primary rounded-full hover:brightness-110 transition-all duration-200 mt-1"
          >
            Get Your Chicken
          </a>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">
      <Nav />

      {/* ═══ HERO — Dark, asymmetric, text-left ═══ */}
      <section className="texture-dark bg-gradient-to-br from-dark to-dark-2 min-h-svh lg:min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 pt-40 pb-20 lg:pt-44 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="eyebrow text-secondary mb-4">
              Certified Poultry Comfort Since 2026
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6">
              You Deserve a Companion<br className="md:hidden" />{" "}
              <span className="font-accent text-secondary">Who Clucks Back</span>
            </h1>
            <p className="text-text-muted-dark text-lg md:text-xl leading-relaxed max-w-lg mb-10">
              Certified emotional support poultry for the modern, overwhelmed
              adult. Because sometimes the best therapy comes with feathers.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#packages" className="btn-primary text-base">Get Your Chicken</a>
              <a href="#how-it-works" className="btn-ghost text-base">Take the Cluck Assessment</a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="img-zoom-wrap shadow-2xl">
                <Image
                  src="/images/hero-chicken.webp"
                  alt="A dignified white Silkie chicken wearing a tiny embroidered vest, perched on a rustic wooden bench"
                  width={560}
                  height={306}
                  priority
                  className="ken-burns w-full h-auto"
                  style={{ filter: "sepia(0.05) brightness(1.02)" }}
                />
              </div>
              <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8">
                <Image
                  src="/images/logo-esc.webp"
                  alt="Certified Emotional Support Chicken seal"
                  width={140}
                  height={76}
                  className="w-[100px] lg:w-[140px] h-auto drop-shadow-lg"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 bg-secondary text-dark-2 font-accent text-base lg:text-lg font-bold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full rotate-6 shadow-lg">
                Tiny Vests Included
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF STRIP ═══ */}
      <section className="bg-cream border-y border-cream-dark">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-muted text-sm font-semibold tracking-wide uppercase">
          <span><StatCounter target={200} suffix="+" /> Chickens Placed</span>
          <span className="hidden sm:inline" aria-hidden="true">&bull;</span>
          <span>Licensed Poultry Comfort Specialists</span>
          <span className="hidden sm:inline" aria-hidden="true">&bull;</span>
          <span>Calhoun County, AL</span>
        </div>
      </section>

      {/* ═══ PROBLEM / STAKES — Cream ═══ */}
      <section className="texture-light bg-cream py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <p className="eyebrow text-primary mb-3 animate-in">Sound Familiar?</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-16 animate-in">
            Life Is Hard. Your Companion Shouldn&apos;t Be.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "😰", text: "You're overwhelmed, stressed, and scrolling at 2am looking for answers that never come.", delay: "stagger-1" },
              { emoji: "🐕", text: "You're allergic to dogs. Cats are indifferent. Goldfish provide zero emotional feedback.", delay: "stagger-2" },
              { emoji: "😤", text: 'Your neighbor got a chicken first and won\'t stop talking about how "centered" they feel now.', delay: "stagger-3" },
            ].map((item, i) => (
              <div key={i} className={`animate-in ${item.delay} bg-white rounded-2xl p-8 border border-cream-dark shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                <p className="text-4xl mb-4">{item.emoji}</p>
                <p className="text-body leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatherDivider />

      {/* ═══ HOW IT WORKS — Dark ═══ */}
      <section id="how-it-works" className="texture-dark bg-gradient-to-br from-dark to-dark-2 py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <p className="eyebrow text-secondary mb-3 animate-in">How It Works</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-16 animate-in">
            Three Steps to Inner Peace
          </h2>
          <div className="mb-16 animate-in max-w-2xl mx-auto img-zoom-wrap shadow-2xl">
            <Image
              src="/images/bonding-session.webp"
              alt="A woman sitting on a farmhouse porch holding a white Silkie chicken in a tiny vest during a supervised bonding session"
              width={704}
              height={384}
              loading="lazy"
              className="ken-burns w-full h-auto"
              style={{ filter: "sepia(0.05) brightness(1.02)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "1", title: "Take the Cluck Assessment", desc: "A 2-minute quiz to match you with your ideal emotional support breed. Rhode Island Reds for anxiety. Silkies for existential dread.", delay: "stagger-1" },
              { num: "2", title: "Meet Your Match", desc: "We introduce you to your chicken via a supervised bonding session. Eye contact is encouraged. Tiny vest fitting included.", delay: "stagger-2" },
              { num: "3", title: "Live Your Best Life", desc: "Take your certified companion home and experience the calm only a chicken can provide. Breakfast eggs are a bonus.", delay: "stagger-3" },
            ].map((step, i) => (
              <div key={i} className={`animate-in ${step.delay} text-center`}>
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-5 font-heading">
                  {step.num}
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-text-muted-dark leading-relaxed text-[15px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatherDivider light />

      {/* ═══ PACKAGES — Cream ═══ */}
      <section id="packages" className="texture-light bg-cream py-28 md:py-36">
        <div className="max-w-5xl mx-auto px-6">
          <p className="eyebrow text-primary mb-3 animate-in">Certification Packages</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-16 animate-in">
            Find Your Flock
          </h2>
          <div className="mb-16 animate-in max-w-xl mx-auto img-zoom-wrap shadow-lg">
            <Image
              src="/images/vest-flatlay.webp"
              alt="A tiny hand-embroidered barn red vest with gold detailing laid flat on cream linen next to a framed Certified ESC certificate"
              width={560}
              height={306}
              loading="lazy"
              className="ken-burns w-full h-auto"
              style={{ filter: "sepia(0.03) brightness(1.01)" }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Starter Coop */}
            <div className="animate-in stagger-1 pricing-card bg-white rounded-2xl p-6 md:p-8 border border-cream-dark shadow-sm">
              <h3 className="font-heading text-xl font-bold text-dark mb-1">The Starter Coop</h3>
              <p className="font-heading text-4xl font-extrabold text-primary mb-6">$149</p>
              <ul className="space-y-3 text-body text-[15px]">
                {["One certified ESC", "Basic comfort vest", "Welcome cluck kit", "Digital certificate"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-sage">&#10003;</span> {item}</li>
                ))}
              </ul>
              <a href="#" className="btn-primary w-full mt-8 text-center text-sm">Get Started</a>
            </div>

            {/* Comfort Flock — Featured */}
            <div className="animate-in stagger-2 pricing-card pricing-card-featured bg-white rounded-2xl p-6 md:p-8 border-2 border-primary shadow-lg relative mt-4 md:-mt-4">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-dark-2 font-accent text-xl font-bold px-5 py-1.5 rounded-full -rotate-2 shadow-md">
                Most Popular
              </span>
              <h3 className="font-heading text-xl font-bold text-dark mb-1 mt-2">The Comfort Flock</h3>
              <p className="font-heading text-4xl font-extrabold text-primary mb-6">$349</p>
              <ul className="space-y-3 text-body text-[15px]">
                {["Two matched chickens", "Premium embroidered vests", "Supervised bonding session", "30-day cluck guarantee", "Framed certificate"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-sage">&#10003;</span> {item}</li>
                ))}
              </ul>
              <a href="#" className="btn-primary w-full mt-8 text-center text-sm">Get Your Flock</a>
            </div>

            {/* Full Henhouse */}
            <div className="animate-in stagger-3 pricing-card bg-white rounded-2xl p-6 md:p-8 border border-cream-dark shadow-sm">
              <h3 className="font-heading text-xl font-bold text-dark mb-1">The Full Henhouse</h3>
              <p className="font-heading text-4xl font-extrabold text-primary mb-6">$749</p>
              <ul className="space-y-3 text-body text-[15px]">
                {["Three certified chickens", "Luxury designer vests", "Monthly wellness check-ins", "Emergency cluck hotline", "Wall-mounted certification", "Lifetime re-matching"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-sage">&#10003;</span> {item}</li>
                ))}
              </ul>
              <a href="#" className="btn-primary w-full mt-8 text-center text-sm">Go Full Henhouse</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Dark, editorial ═══ */}
      <section className="texture-dark bg-gradient-to-br from-dark to-dark-2 py-28 md:py-36">
        <div className="max-w-3xl mx-auto px-6">
          <p className="eyebrow text-secondary mb-3 text-center animate-in">Success Stories</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-20 text-center animate-in">
            What Our Chicken Parents Say
          </h2>

          <div className="mb-20 animate-in grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 items-center">
            <div className="img-zoom-wrap shadow-lg">
              <Image
                src="/images/testimonial-patricia.webp"
                alt="Patricia M. laughing with her emotional support chicken Henrietta on her shoulder"
                width={280}
                height={280}
                loading="lazy"
                className="ken-burns w-full aspect-auto md:aspect-square object-cover"
                style={{ filter: "sepia(0.05) brightness(1.02)" }}
              />
            </div>
            <div>
              <span className="quote-mark">&ldquo;</span>
              <blockquote className="font-heading text-xl md:text-2xl text-text-light italic leading-relaxed -mt-8 ml-2">
                I was skeptical. My therapist was skeptical. But Henrietta has done more for my anxiety than three years of cognitive behavioral therapy. She just sits on my lap and clucks and suddenly the world makes sense again.
              </blockquote>
              <p className="mt-6 ml-2 text-secondary font-semibold text-sm tracking-wide">— Patricia M., Anniston AL</p>
            </div>
          </div>

          <div className="animate-in">
            <span className="quote-mark">&ldquo;</span>
            <blockquote className="font-heading text-xl md:text-2xl text-text-light italic leading-relaxed -mt-8 ml-2">
              My husband said I was crazy. Then he met Gerald. Now he has his own chicken and a matching vest. We&apos;ve never been happier.
            </blockquote>
            <p className="mt-6 ml-2 text-secondary font-semibold text-sm tracking-wide">— Deborah K., Oxford AL</p>
          </div>
        </div>
      </section>

      <FeatherDivider />

      {/* ═══ FAQ — Cream ═══ */}
      <section id="faq" className="texture-light bg-cream py-28 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-16 text-center animate-in">
            Frequently Asked Questions
          </h2>
          {[
            { q: "Are chickens actually comforting?", a: 'Science says yes. Chickens produce a low-frequency purr when content that has been shown to reduce cortisol levels in nearby humans. We didn\'t make that up. (We did make that up.)' },
            { q: "What about the smell?", a: "Our chickens are professionally groomed and lightly scented with lavender. They smell better than most emotional support dogs, and significantly better than your coworker Dave." },
            { q: "Can I take my chicken on a plane?", a: "Our certification is recognized by approximately zero airlines. But we provide a very official-looking certificate that might work if you act confident enough." },
            { q: "What's the return policy?", a: "You may return your chicken within 30 days, but we've never had a return. Once you hold a warm chicken in a tiny vest, it's over. You're a chicken person now." },
            { q: "Is this real?", a: "HEADLEY_WEB" },
          ].map((faq, i) => (
            <details key={i} className={`animate-in faq-item group ${i < 4 ? "border-b border-cream-dark" : ""}`}>
              <summary className="py-6 flex items-center justify-between cursor-pointer list-none font-heading text-lg font-bold text-dark">
                {faq.q}
                <span className="faq-icon text-primary text-2xl font-light ml-4 shrink-0">+</span>
              </summary>
              <div className="faq-answer">
                {faq.a === "HEADLEY_WEB" ? (
                  <p className="text-body leading-relaxed pb-6">
                    This website was built by{" "}
                    <a href="https://headleyweb.com" className="text-primary font-semibold underline underline-offset-4 hover:text-primary-hover transition-colors" target="_blank" rel="noopener noreferrer">
                      Headley Web &amp; SEO
                    </a>{" "}
                    to demonstrate that a great website can make anything look legitimate. If your actual business deserves a site this good, let&apos;s talk.
                  </p>
                ) : (
                  <p className="text-body leading-relaxed pb-6">{faq.a}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ FINAL CTA — Dark ═══ */}
      <section className="texture-dark bg-gradient-to-br from-dark to-dark-2 py-28 md:py-36">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Image
            src="/images/logo-esc-cream.webp"
            alt="Emotional Support Chicken"
            width={420}
            height={229}
            loading="lazy"
            className="w-auto h-20 mx-auto mb-8 opacity-50 animate-in"
          />
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-6 animate-in">
            Ready to Meet <span className="font-accent text-secondary">Your Chicken</span>?
          </h2>
          <p className="text-text-muted-dark text-lg leading-relaxed mb-10 animate-in">
            Don&apos;t let another stressful day go by without a feathered companion who truly clucks about you.
          </p>
          <div className="animate-in">
            <a href="#packages" className="btn-primary text-lg px-12 py-5">Get Your Chicken</a>
          </div>
          <p className="text-text-muted-dark text-sm mt-8 tracking-wide animate-in">
            Certified comfort. Freshly hatched.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-dark-2 py-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Image
            src="/images/logo-esc-cream.webp"
            alt="Emotional Support Chicken"
            width={420}
            height={229}
            loading="lazy"
            className="w-auto h-16 mx-auto mb-5 opacity-60"
          />
          <p className="text-white/70 text-sm mb-2">
            Emotional Support Chicken &bull; Calhoun County, AL &bull; Not a licensed therapy provider
          </p>
          <p className="text-white/70 text-sm">
            Built by{" "}
            <a href="https://headleyweb.com" className="text-secondary font-semibold hover:text-secondary/80 transition-colors" target="_blank" rel="noopener noreferrer">
              Headley Web &amp; SEO
            </a>{" "}
            — <span className="font-accent text-lg text-white/80">websites that make anything look legit</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
