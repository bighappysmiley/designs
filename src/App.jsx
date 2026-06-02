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
function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
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
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`.trim()} {...rest}>
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

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <img src="/logo.png" alt="BigHappySmiley Designs" className="hero-logo" />
        <p className="eyebrow">BigHappySmiley Designs</p>
        <h1>
          Design that<br />speaks for itself.
        </h1>
        <p className="hero-sub">
          An online graphic design studio specializing in custom logo design — plus print,
          presentations, and websites. Professional quality, delivered at a price that makes sense.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">Get Started</a>
          <a href="#services" className="btn btn-ghost">Explore Services ↓</a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section divider-top" id="services">
      <Reveal className="section-head">
        <p className="eyebrow">Our Services</p>
        <h2>Everything you need to look the part.</h2>
      </Reveal>

      <div className="cards">
        {SERVICES.map((s) => (
          <Reveal as="article" className="card" key={s.num}>
            <div className="card-num">{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </Reveal>
        ))}

        <Reveal as="article" className="card card-cta">
          <h3>Have something else in mind?</h3>
          <p>Tell us about your project and we'll make it real.</p>
          <a href="#contact" className="btn btn-primary">Contact Us</a>
        </Reveal>
      </div>
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
            "They were surprisingly affordable, costing significantly less than similar products
            on the market. Even more impressively, they arrived at my doorstep in less than two
            days, thanks to the efficient shipping service."
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
    <section className="section" id="faq">
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
  return (
    <section className="contact" id="contact">
      <Reveal className="contact-inner">
        <p className="eyebrow eyebrow-light">Contact</p>
        <h2>Let's build something great.</h2>
        <div className="contact-grid">
          <a className="contact-item" href="mailto:designs@bighappysmiley.com">
            <span className="contact-label">Email</span>
            <span className="contact-value">designs@bighappysmiley.com</span>
          </a>
          <a className="contact-item" href="tel:+18452132071">
            <span className="contact-label">Phone</span>
            <span className="contact-value">(845) 213-2071</span>
          </a>
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
        <p>© {new Date().getFullYear()} BigHappySmiley Designs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <span className="o1" />
        <span className="o2" />
        <span className="o3" />
        <span className="o4" />
      </div>
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
