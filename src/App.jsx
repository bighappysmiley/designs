import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    num: '01',
    title: 'Logos & Icons',
    body: 'Our designers create an amazing logo tailored to your needs — a mark that defines your brand and scales everywhere.',
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
          <a href="#products">Products</a>
          <a href="#reviews">Reviews</a>
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
          A design studio crafting logos, print, presentations, and websites — built with
          precision, delivered at a price that makes sense.
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
      <Nav />
      <main>
        <Hero />
        <Services />
        <Products />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
