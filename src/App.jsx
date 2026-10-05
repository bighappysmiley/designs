import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    title: 'Logos & Icons',
    body: 'Custom logo design tailored to your brand — a distinctive, professional mark that scales everywhere, from your website to your business cards.',
  },
  {
    num: '02',
    title: 'Posters & Flyers',
    body: 'Eye-catching print designs that get noticed — bold layouts engineered to communicate your message at a glance.',
  },
  {
    num: '03',
    title: 'Presentations',
    body: 'Polished, persuasive decks that hold attention and make your ideas land with clarity and confidence.',
  },
  {
    num: '04',
    title: 'Wix Websites',
    body: 'Our design team builds a fabulous website tailored to your needs — all at an affordable price.',
  },
  {
    num: '05',
    title: 'Business Cards & Stickers',
    body: 'Our professional print team produces business cards and stickers crafted exactly to your liking.',
  },
];

// Real client work. Each item: { src, title, client }.
// Images live in /public/gallery/. Add entries here as work is added.
const GALLERY = [];

const FAQS = [
  {
    q: 'What services does BigHappySmiley Designs offer?',
    a: "We're an online graphic design studio. Our specialties include custom logo and icon design, posters and flyers, presentations, business cards and stickers, and full websites. If you need something design-related that isn't listed, just ask.",
  },
  {
    q: 'How much does a custom logo cost?',
    a: 'Every project is priced to the scope of the work, and we pride ourselves on being affordable — typically well below comparable studios. Reach out with a short description of what you need and we\'ll send a clear quote, with no obligation.',
  },
  {
    q: 'Do you work with clients remotely?',
    a: "Yes. We're a fully online studio and work with clients anywhere. Everything happens over email, so your location is never a barrier.",
  },
  {
    q: 'How does the design process work?',
    a: 'It starts with a quick conversation about your goals, style, and any references you like. We then design initial concepts, share them with you, and refine based on your feedback until it\'s exactly right.',
  },
  {
    q: 'How many revisions do I get?',
    a: "We work with you until you're happy with the result, refining the design based on your feedback so the final piece truly fits your brand.",
  },
  {
    q: 'What files will I receive for my logo?',
    a: 'You\'ll receive your finished logo in the formats you need for both digital and print use, so it looks sharp everywhere — from your website and social media to business cards and signage.',
  },
  {
    q: 'Can you design and ship physical products?',
    a: 'Yes. Beyond digital files, our print team can produce tangible products like business cards and stickers and ship them to you — premium quality at an affordable price.',
  },
  {
    q: 'How do I get started?',
    a: 'Email us at designs@bighappysmiley.com or call (845) 213-2071 with a bit about your project, and we\'ll reply with next steps and a quote.',
  },
];

/* Wrap content to fade/slide in when it scrolls into view */
function Reveal({ as: Tag = 'div', className = '', children, delay = 0, style, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="brand">
          <img src="/logo.png" alt="" className="brand-logo" />
          BigHappySmiley<span>Designs</span>
        </a>
        <nav className="nav-links">
          <a href="#services">Services</a>
          {GALLERY.length > 0 && <a href="#work">Work</a>}
          <a href="#products">Products</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="nav-cta">Get Started</a>
      </div>
    </header>
  );
}

function HeroHeadline() {
  // Word-by-word blur-in reveal (Zen-style). "speaks for itself" is the coral accent.
  const words = [
    { t: 'Design' }, { t: 'that' }, { br: true },
    { t: 'speaks', accent: true }, { t: 'for', accent: true }, { t: 'itself.', accent: true },
  ];
  let i = 0;
  return (
    <h1 className="hero-title">
      {words.map((w, idx) =>
        w.br ? (
          <br key={idx} className="title-br" />
        ) : (
          <span
            key={idx}
            className={`word ${w.accent ? 'word-accent' : ''}`}
            style={{ animationDelay: `${(i++) * 90}ms` }}
          >
            {w.t}
          </span>
        )
      )}
    </h1>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="eyebrow reveal in">BigHappySmiley Designs</p>
        <HeroHeadline />
        <p className="hero-sub reveal in" style={{ transitionDelay: '520ms' }}>
          An online graphic design studio specializing in custom logo design — plus print,
          presentations, and websites. Professional quality, delivered at a price that makes sense.
        </p>
        <div className="hero-actions reveal in" style={{ transitionDelay: '600ms' }}>
          <a href="#contact" className="btn btn-primary">Get Started</a>
          <a href="#services" className="btn btn-ghost">Explore Services</a>
        </div>
        <p className="hero-meta reveal in" style={{ transitionDelay: '680ms' }}>
          Logos &nbsp;·&nbsp; Brand Identity &nbsp;·&nbsp; Print &nbsp;·&nbsp; Presentations &nbsp;·&nbsp; Websites
        </p>
      </div>
    </section>
  );
}

function DribbbleIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.392-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.816zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
    </svg>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
  return (
    <section className="section band-white" id="services">
      <Reveal className="section-head">
        <p className="eyebrow">Our Services</p>
        <h2>Everything you need to look the part.</h2>
      </Reveal>

      <Reveal className="features">
        <div className="feature-list" role="tablist" aria-label="Services">
          {SERVICES.map((item, i) => (
            <button
              key={item.num}
              role="tab"
              aria-selected={active === i}
              className={`feature-item ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="feature-num">{item.num}</span>
              <span className="feature-name">{item.title}</span>
              <span className="feature-arrow" aria-hidden="true">→</span>
            </button>
          ))}
          <a className="feature-more" href="#contact">Need something else? Contact us →</a>
        </div>

        <div className="feature-preview">
          <div className="preview-window">
            <div className="preview-bar"><span /><span /><span /></div>
            <div className="preview-body" key={active}>
              <div className="preview-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null); // index of open lightbox image

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  if (GALLERY.length === 0) return null;

  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <p className="eyebrow">Our Work</p>
        <h2>Designs we're proud of.</h2>
      </Reveal>

      <div className="gallery">
        {GALLERY.map((item, i) => (
          <Reveal
            as="button"
            type="button"
            className="gallery-item"
            key={item.src}
            onClick={() => setActive(i)}
            aria-label={`View ${item.title}`}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <span className="gallery-caption">
              <strong>{item.title}</strong>
              {item.client && <em>{item.client}</em>}
            </span>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div className="lightbox" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <button className="lightbox-close" aria-label="Close">×</button>
          <img
            src={GALLERY[active].src}
            alt={GALLERY[active].title}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="lightbox-caption">
            {GALLERY[active].title}
            {GALLERY[active].client ? ` — ${GALLERY[active].client}` : ''}
          </p>
        </div>
      )}
    </section>
  );
}

function Products() {
  return (
    <section className="band" id="products">
      <Reveal className="band-inner">
        <p className="eyebrow eyebrow-light">Physical Products</p>
        <h2>From the screen to your hands.</h2>
        <p className="band-sub">
          Beyond digital design, we deliver tangible products — printed, packaged, and shipped
          fast. Premium quality, surprisingly affordable, at your door in days.
        </p>
        <a href="#contact" className="btn btn-light">Get a Quote</a>
      </Reveal>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <Reveal className="section-head">
        <p className="eyebrow">Reviews</p>
        <h2>What our clients say.</h2>
      </Reveal>
      <div className="reviews">
        <Reveal as="figure" className="quote">
          <blockquote>
            They were surprisingly affordable, costing significantly less than similar products
            on the market. Even more impressively, they arrived at my doorstep in less than two
            days, thanks to the efficient shipping service.
          </blockquote>
          <figcaption>— M. Magic</figcaption>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true">+</span>
      </button>
      <div className="faq-a-wrap">
        <p className="faq-a">{a}</p>
      </div>
    </div>
  );
}

function Faq() {
  // FAQPage structured data — single source of truth from FAQS.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="section band-white" id="faq">
      <Reveal className="section-head">
        <p className="eyebrow">FAQ</p>
        <h2>Questions, answered.</h2>
      </Reveal>
      <Reveal className="faq-list">
        {FAQS.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const body = new URLSearchParams(new FormData(e.target)).toString();
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
    } catch {
      /* Netlify records the submission even if the response is opaque */
    }
    setSending(false);
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <Reveal className="contact-inner">
        <p className="eyebrow eyebrow-light">Contact</p>
        <h2>Let's build something great.</h2>
        <p className="contact-lead">
          Have a project in mind? Send us a message below — or see our work and reach out on Dribbble.
        </p>

        <div className="contact-cols">
          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-thanks">
                <h3>Thanks — your message is on its way.</h3>
                <p>We'll get back to you at the email you provided. Talk soon!</p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <input type="hidden" name="form-name" value="contact" />
                <p className="hp" hidden>
                  <label>Don't fill this out: <input name="bot-field" /></label>
                </p>
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input id="cf-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-email">Email</label>
                  <input id="cf-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" name="message" rows="4" required />
                </div>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          <aside className="contact-aside">
            <a
              className="contact-card"
              href="https://dribbble.com/bighappysmiley"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DribbbleIcon size={26} />
              <span><strong>Dribbble</strong><em>See our work</em></span>
            </a>
            <a className="contact-card" href="mailto:designs@bighappysmiley.com">
              <span><strong>Email</strong><em>designs@bighappysmiley.com</em></span>
            </a>
            <a className="contact-card" href="tel:+18452132071">
              <span><strong>Phone</strong><em>(845) 213-2071</em></span>
            </a>
          </aside>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="brand brand-footer">
          <img src="/logo.png" alt="" className="brand-logo" />
          BigHappySmiley<span>Designs</span>
        </span>
        <a
          className="social"
          href="https://dribbble.com/bighappysmiley"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="BigHappySmiley Designs on Dribbble"
        >
          <DribbbleIcon size={22} />
          <span>Dribbble</span>
        </a>
        <p>© {new Date().getFullYear()} BigHappySmiley Designs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Products />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
