import { useState, useEffect, useRef } from "react";
import {
  Wind, Droplets, Layers, Phone, Mail, MapPin,
  Shield, Truck, Award, ArrowRight, CheckCircle,
  Wrench, Car, Filter, Star, Settings, Zap, Menu, X
} from "lucide-react";
import { Link } from "react-router-dom";


const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeUp = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`
    }}>{children}</div>
  );
};

const T = { cinzel: "'Cinzel', serif", poppins: "'Poppins', sans-serif" };

const products = [
  {
    icon: Droplets, name: "Oil Filter", tagline: "Engine Protection, Redefined",
    desc: "High-efficiency multi-layer filtration that removes contaminants down to micron level, extending engine life and maintaining optimal lubrication across all conditions.",
    features: ["Multi-layer filtration media", "Anti-drain back valve", "High burst pressure rating", "Fits all major OEM specs"],
    image: "/product/oil-filter.jpeg", badge: "Best Seller",
    accent: "#2d3d8b", accentLight: "#eef1f9", num: "01",
  },
  {
    icon: Wind, name: "Air Filter", tagline: "Breathe. Perform. Dominate.",
    desc: "Premium electrostatically charged pleated media engineered for superior dust-holding capacity and unrestricted airflow — giving your engine the clean air it deserves.",
    features: ["Electrostatically charged media", "OE-grade sealing gasket", "Extended service intervals", "Improved throttle response"],
    image: "/product/air-filter.jpeg", badge: "Top Rated",
    accent: "#2d3d8b", accentLight: "#eef1f9", num: "02",
  },
  {
    icon: Layers, name: "Foam Filter", tagline: "Built Tough. Stays Clean.",
    desc: "Open-cell polyurethane foam construction for maximum dirt capture in off-road and heavy-duty environments. Washable, reusable, and engineered to last.",
    features: ["Reusable & washable design", "UV-resistant foam material", "Custom-fit availability", "Ideal for off-road & dusty terrain"],
    image: "/product/foam-filter.jpeg", badge: "Heavy Duty",
    accent: "#2d3d8b", accentLight: "#eef1f9", num: "03",
  },
  {
    icon: Filter, name: "Oil Strainer Filter", tagline: "First Defence. Zero Compromise.",
    desc: "Precision-stamped stainless mesh oil strainer designed to capture large particulate debris before it reaches sensitive engine components — the essential first line of defence.",
    features: ["Fine-mesh stainless steel screen", "Corrosion-resistant construction", "Maintains full oil flow rate", "Direct OEM replacement fit"],
    image: "https://i.pinimg.com/1200x/38/2b/ca/382bca77a74cfaecd7d70f10c2aac0f6.jpg", badge: "New",
    accent: "#2d3d8b", accentLight: "#eef1f9", num: "04",
  }
];

const whyUs = [
  { icon: Shield, title: "OEM-Grade Quality", desc: "Every filter meets or exceeds original equipment manufacturer specifications." },
  { icon: Award, title: "ISO Certified", desc: "ISO-certified manufacturing with rigorous multi-stage quality inspection." },
  { icon: Truck, title: "Fast Fulfillment", desc: "Reliable supply chain ensuring you never face downtime due to stock-outs." },
  { icon: Wrench, title: "Expert Support", desc: "Technical guidance from automobile engineers, 6 days a week." },
];

const ProductCard = ({ product, index }) => {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.08);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        background: "white", borderRadius: 20, overflow: "hidden",
        boxShadow: hovered
          ? `0 32px 64px rgba(13,21,53,0.18), 0 0 0 1.5px ${product.accent}40`
          : "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px #ebebeb",
        transform: inView ? (hovered ? "translateY(-10px)" : "translateY(0)") : "translateY(48px)",
        transition: `all .5s cubic-bezier(.16,1,.3,1) ${index * 0.09}s`,
        display: "flex", flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: 220, overflow: "hidden", flexShrink: 0, background: `linear-gradient(160deg,${product.accent}18,${product.accent}40)` }}>
        <img
          src={product.image} alt={product.name}
          onError={e => { e.target.style.display = "none"; }}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform .8s cubic-bezier(.16,1,.3,1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: hovered
            ? "linear-gradient(to bottom,rgba(5,13,30,0.08) 0%,rgba(5,13,30,0.75) 100%)"
            : "linear-gradient(to bottom,rgba(5,13,30,0) 35%,rgba(5,13,30,0.65) 100%)",
          transition: "all .5s",
        }} />
        <div style={{
          position: "absolute", top: 14, left: 14, zIndex: 2,
          background: product.accent, color: "white", borderRadius: 100,
          padding: "4px 13px", fontSize: 9.5,
          fontFamily: T.poppins, fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase",
          boxShadow: `0 3px 12px ${product.accent}55`,
        }}>{product.badge}</div>
        <div style={{
          position: "absolute", top: 14, right: 16, zIndex: 2,
          fontFamily: T.poppins, fontSize: 11, fontWeight: 700,
          color: "rgba(255,255,255,0.4)", letterSpacing: "1px",
        }}>{product.num}</div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
          padding: "18px 18px 16px",
          transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "transform .4s",
        }}>
          <div style={{ fontFamily: T.poppins, fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 5 }}>{product.tagline}</div>
          <div style={{ fontFamily: T.poppins, fontSize: 17, fontWeight: 700, color: "white", lineHeight: 1.2 }}>{product.name}</div>
        </div>
        <div style={{
          position: "absolute", bottom: 7, right: 16, zIndex: 3,
          width: 42, height: 42, borderRadius: "50%",
          background: product.accent, border: "3px solid white",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 5px 18px ${product.accent}55`,
          transition: "transform .4s cubic-bezier(.34,1.56,.64,1)",
        }}>
          <product.icon size={17} color="white" strokeWidth={1.9} />
        </div>
      </div>
      <div style={{ padding: "22px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontFamily: T.poppins, fontSize: 13, color: "#6b7280", lineHeight: 1.75, marginBottom: 18, flex: 1, fontWeight: 400 }}>{product.desc}</p>
        <div style={{ height: 1, background: "#f0f2f5", marginBottom: 14 }} />
        <Link to="/product" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "11px 14px", borderRadius: 11, textDecoration: "none",
          background: hovered ? product.accent : product.accentLight,
          color: hovered ? "white" : product.accent,
          fontFamily: T.poppins, fontSize: 13, fontWeight: 600,
          border: `1.5px solid ${hovered ? product.accent : product.accent + "28"}`,
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
        }}>
          <span>Request a Quote</span>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: hovered ? "rgba(255,255,255,0.18)" : "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: hovered ? "none" : `0 2px 8px ${product.accent}20`,
            transition: "all .4s",
          }}>
            <ArrowRight size={13} color={hovered ? "white" : product.accent} />
          </div>
        </Link>
      </div>
    </div>
  );
};

const WhyCardLight = ({ w }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#f0f4fe" : "#f8f9fc",
        border: `1.5px solid ${hov ? "#c5d0ee" : "#e5e9f0"}`,
        borderRadius: 16, padding: "22px 18px",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "all .4s cubic-bezier(.16,1,.3,1)",
        cursor: "default", position: "relative", overflow: "hidden",
        boxShadow: hov ? "0 12px 32px rgba(45,61,139,0.1)" : "0 1px 6px rgba(0,0,0,0.04)",
      }}
    >
      {hov && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#2d3d8b,#4a96b6)" }} />}
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 14,
        background: hov ? "#e8edf8" : "white",
        border: `1.5px solid ${hov ? "#c5d0ee" : "#e5e9f0"}`,
        display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s",
        boxShadow: hov ? "0 4px 12px rgba(45,61,139,0.15)" : "none",
      }}>
        <w.icon size={19} color={hov ? "#2d3d8b" : "#4a96b6"} strokeWidth={1.7} />
      </div>
      <h4 style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#0a0f1e", marginBottom: 7, lineHeight: 1.3 }}>{w.title}</h4>
      <p style={{ fontFamily: T.poppins, fontSize: 12.5, color: "#6b7280", lineHeight: 1.7, fontWeight: 400 }}>{w.desc}</p>
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: T.poppins, background: "#f4f6fb", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#2d3d8b, #4a96b6); border-radius: 4px; }

        /* NAV LINKS */
        .nlink {
          color: rgba(255,255,255,0.75); text-decoration: none; font-size: 13px; font-weight: 500;
          padding: 6px 0; position: relative; font-family: 'Poppins', sans-serif;
          transition: color .3s; letter-spacing: 0.2px;
        }
        .nlink.sc { color: #444; }
        .nlink::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1.5px; background: currentColor; transition: width .3s; }
        .nlink:hover::after { width: 100%; }
        .nlink:hover { color: white !important; }
        .nlink.sc:hover { color: #2d3d8b !important; }

        /* BUTTONS */
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px;
          background: #2d3d8b; color: white; font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
          border: none; cursor: pointer; border-radius: 11px; text-decoration: none;
          transition: all .35s cubic-bezier(.16,1,.3,1); box-shadow: 0 4px 18px rgba(45,61,139,0.32);
        }
        .btn-p:hover { background: #1f2d70; transform: translateY(-3px); box-shadow: 0 12px 28px rgba(45,61,139,0.42); }
        .btn-p:hover .arr { transform: translateX(5px); }
        .arr { transition: transform .3s; display: inline-flex; }

        .btn-g {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
          background: rgba(255,255,255,0.08); color: white; font-family: 'Poppins', sans-serif;
          font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
          border: 1.5px solid rgba(255,255,255,0.22); cursor: pointer; border-radius: 11px;
          text-decoration: none; transition: all .35s; backdrop-filter: blur(10px);
        }
        .btn-g:hover { background: white; color: #2d3d8b; border-color: white; transform: translateY(-2px); }

        /* FORM FIELDS */
        .fi {
          width: 100%; padding: 12px 14px; background: #f8f9fc; border: 1.5px solid #e5e9f0;
          border-radius: 10px; font-family: 'Poppins', sans-serif; font-size: 13.5px; color: #1a1a1a;
          transition: all .3s; outline: none; font-weight: 400;
        }
        .fi:focus { border-color: #2d3d8b; background: white; box-shadow: 0 0 0 4px rgba(45,61,139,0.08); }
        .fi::placeholder { color: #b0b8c4; }
        select.fi {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none' viewBox='0 0 12 7'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center; background-size: 12px; padding-right: 36px;
        }
        textarea.fi { resize: vertical; min-height: 100px; }

        /* PILL LABEL */
        .pill {
          display: inline-block; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #4a96b6; margin-bottom: 14px; background: rgba(74,150,182,0.1);
          padding: 5px 14px; border-radius: 100px; border: 1px solid rgba(74,150,182,0.25);
          font-family: 'Poppins', sans-serif; font-weight: 500;
        }

        /* ANIMATIONS */
        @keyframes heroIn { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.45; transform:scale(.82) } }
        @keyframes ticker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }

        .hb { opacity: 0; animation: heroIn .7s ease .1s forwards; }
        .hh { opacity: 0; animation: heroIn .75s ease .3s forwards; }
        .hs { opacity: 0; animation: heroIn .75s ease .5s forwards; }
        .hc { opacity: 0; animation: heroIn .7s ease .7s forwards; }
        .hst { opacity: 0; animation: heroIn .7s ease .9s forwards; }

        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker-inner { display: inline-block; animation: ticker 30s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }

        /* NAVBAR */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 clamp(16px, 4vw, 48px);
          transition: all .4s;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
          border-bottom: 1px solid #e5e9f0;
        }
        .navbar-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 68px;
        }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .hamburger { display: none; cursor: pointer; background: none; border: none; padding: 6px; }
        .mobile-nav {
          display: none; position: fixed; inset: 0; z-index: 999;
          background: rgba(6,13,31,0.98); flex-direction: column;
          align-items: center; justify-content: center; gap: 32px;
          backdrop-filter: blur(20px);
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav-link {
          color: white; text-decoration: none; font-family: 'Poppins', sans-serif;
          font-size: 22px; font-weight: 600; letter-spacing: 0.5px;
          transition: color .3s;
        }
        .mobile-nav-link:hover { color: #4a96b6; }
        .mobile-close {
          position: absolute; top: 22px; right: 22px;
          background: none; border: none; cursor: pointer; padding: 8px;
        }

        /* HERO STATS */
        .hero-stats {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 28px;
          display: flex; flex-wrap: wrap; gap: 0;
        }
        .hero-stat-item {
          padding: 0 28px 0 0;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-item:last-child { border-right: none; }

        /* PRODUCTS GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        /* ABOUT GRID */
        .about-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* WHY US GRID */
        .why-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 28px;
          align-items: start;
        }
        .why-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
        }

        /* STATS GRID */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }

        /* CONTACT GRID */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.7fr;
          gap: 26px;
          align-items: start;
        }

        /* FORM GRID */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        /* CTA GRID */
        .cta-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 48px;
          align-items: center;
        }

        /* HIGHLIGHTS GRID */
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 32px;
        }

        /* MINI STATS */
        .mini-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        /* ===================== RESPONSIVE BREAKPOINTS ===================== */

        /* LARGE TABLET / SMALL DESKTOP (max 1100px) */
        @media (max-width: 1100px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
          .about-section-grid { gap: 40px; }
          .why-layout { grid-template-columns: 1fr; gap: 24px; }
          .why-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .cta-inner { grid-template-columns: 1fr; gap: 32px; }
          .cta-stats-row { display: flex; flex-direction: row; gap: 14px; flex-wrap: wrap; }
          .cta-stat-card { flex: 1; min-width: 160px; }
        }

        /* TABLET (max 860px) */
        @media (max-width: 860px) {
          .nav-links { display: none; }
          .nav-cta-btn { display: none; }
          .hamburger { display: flex !important; }

          .about-section-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .about-image-container { max-height: 380px; }
          .about-image-container img { height: 340px !important; }
          .floating-badge { right: -8px !important; bottom: -20px !important; }

          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }

          .contact-grid { grid-template-columns: 1fr; }
          .contact-info-sticky { position: static !important; }

          .stats-grid { grid-template-columns: repeat(2, 1fr); }

          .highlights-grid { grid-template-columns: 1fr 1fr; }

          .hero-btns { flex-direction: column !important; gap: 10px !important; }
          .hero-btns a { width: 100%; justify-content: center; text-align: center; }

          .hero-stats { gap: 8px; }
          .hero-stat-item {
            padding: 12px 16px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            flex: 1 1 45%;
          }
          .hero-stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08); }
          .hero-stat-item:nth-last-child(-n+2) { border-bottom: none; }

          .why-layout { grid-template-columns: 1fr; }
        }

        /* MOBILE (max 620px) */
        @media (max-width: 620px) {
          .products-grid { grid-template-columns: 1fr; gap: 16px; }
          .form-row { grid-template-columns: 1fr; gap: 12px; }
          .why-cards-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .highlights-grid { grid-template-columns: 1fr 1fr; }
          .mini-stats { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
          .cta-stats-row { flex-direction: column; }
          .hero-stat-item { flex: 1 1 100%; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .hero-stat-item:last-child { border-bottom: none; }
        }

        /* SMALL MOBILE (max 420px) */
        @media (max-width: 420px) {
          .why-cards-grid { grid-template-columns: 1fr; }
          .mini-stats { grid-template-columns: 1fr 1fr; }
          .highlights-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#060d1f" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/banner/4.png')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(4,8,22,0.92) 0%,rgba(4,8,22,0.68) 55%,rgba(4,8,22,0.38) 100%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: "min(600px,80vw)", height: "min(600px,80vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(45,61,139,0.38) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "min(400px,60vw)", height: "min(400px,60vw)", borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "clamp(110px,14vw,160px) clamp(16px,4vw,48px) clamp(72px,8vw,100px)", width: "100%" }}>

          <div className="hb" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,150,182,0.1)", border: "1px solid rgba(74,150,182,0.3)", padding: "6px 16px", borderRadius: 100, marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a96b6", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: T.poppins, fontSize: "clamp(9px,1.5vw,10.5px)", color: "#7ecde8", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>Premium Automotive Filtration</span>
          </div>

          <h1 className="hh" style={{ fontFamily: T.cinzel, fontSize: "clamp(30px,7vw,74px)", fontWeight: 800, color: "white", lineHeight: 1.12, marginBottom: 20, letterSpacing: "1px" }}>
            Precision Filters<br />
            <span style={{ background: "linear-gradient(135deg,#4a96b6,#7ecde8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Built to Last.</span>
          </h1>

          <p className="hs" style={{ fontFamily: T.poppins, fontSize: "clamp(13px,2vw,16px)", color: "rgba(255,255,255,0.58)", lineHeight: 1.85, marginBottom: 36, maxWidth: "min(510px,100%)", fontWeight: 400 }}>
            V3 Auto Component India Pvt. Ltd. is a leading manufacturer and exporter of high-performance automotive filters, delivering advanced filtration solutions across all segments of the automotive industry.
          </p>

          <div className="hc hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
            <Link to="/product" className="btn-p" style={{ padding: "13px 26px", fontSize: "clamp(12px,1.5vw,13.5px)" }}>
              Explore Products <span className="arr"><ArrowRight size={16} /></span>
            </Link>
            <Link to="/contact" className="btn-g" style={{ padding: "12px 24px", fontSize: "clamp(12px,1.5vw,13.5px)" }}>
              Request Quote
            </Link>
          </div>

          <div className="hst hero-stats">
            {[["12+", "Years of Excellence"], ["50K+", "Filters Delivered"], ["200+", "Vehicle Brands"], ["99%", "Client Satisfaction"]].map(([v, l]) => (
              <div key={l} className="hero-stat-item">
                <div style={{ fontFamily: T.poppins, fontSize: "clamp(22px,4vw,40px)", fontWeight: 700, color: "white", lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: T.poppins, fontSize: "clamp(9px,1.2vw,10.5px)", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 5, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#2d3d8b", padding: "12px 0", overflow: "hidden" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner" style={{ display: "inline-flex" }}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} style={{ display: "inline-flex" }}>
                {["Oil Filters", "Air Filters", "Foam Filters", "Oil Strainer Filters", "OEM Compatible", "ISO Certified", "PAN India Delivery", "Bulk Orders Welcome", "Expert Support"].map((t, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "0 24px", fontFamily: T.poppins, fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#7ecde8", flexShrink: 0 }} />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT / WELCOME ── */}
      <section id="welcome" style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)", background: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(to right,#f4f6fb,transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.06),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="about-section-grid">

            {/* Right: text */}
            <FadeUp delay={0.18}>
              <div style={{ paddingTop: "clamp(0px,2vw,32px)" }}>
                <div className="pill">Welcome to V3 Auto Group</div>
                <h2 style={{ fontFamily: T.cinzel, fontSize: "clamp(24px,3.5vw,44px)", fontWeight: 800, color: "#0a0f1e", lineHeight: 1.2, letterSpacing: "0.5px", marginBottom: 16 }}>
                  India's Trusted<br />
                  <span style={{ background: "linear-gradient(135deg,#2d3d8b,#4a96b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Filtration Partner</span>
                </h2>
                <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.4vw,15px)", color: "#6b7280", lineHeight: 1.85, marginBottom: 14, fontWeight: 400 }}>
                  Founded in 2013 by Late Mr. Omprakash Dhalwan — who dedicated 33 years to Lucas TVS Group's marketing division — V3 Auto Group was built on a vision to serve India's fast-growing automotive aftermarket with quality products and reliable supply. V3 Auto Component India Pvt. Ltd. is today a leading manufacturer, exporter, and supplier of high-performance automotive filters across all segments of the industry.
                </p>
                <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.4vw,15px)", color: "#6b7280", lineHeight: 1.85, marginBottom: 28, fontWeight: 400 }}>
                  Our team of experienced automobile engineers works on contract manufacturing of automotive parts for both the domestic market and exports, supplying filters and spare parts to leading brands under their respective labels — with a strong emphasis on quality, efficiency, and innovation.
                </p>

                <div className="highlights-grid">
                  {[
                    { icon: Shield, text: "OEM-Grade Standards" },
                    { icon: Award, text: "ISO Certified Process" },
                    { icon: Truck, text: "PAN India Delivery" },
                    { icon: Wrench, text: "Automobile Engineers" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", background: "#f4f6fb", borderRadius: 10, border: "1px solid #e5e9f0" }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: "#eef1f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={14} color="#2d3d8b" strokeWidth={1.8} />
                      </div>
                      <span style={{ fontFamily: T.poppins, fontSize: "clamp(11px,1.2vw,13px)", color: "#374151", fontWeight: 500 }}>{text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/product" className="btn-p" style={{ padding: "12px 24px", fontSize: 13 }}>
                    Our Products <span className="arr"><ArrowRight size={15} /></span>
                  </Link>
                  <Link to="/contact" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "11px 22px", borderRadius: 11, textDecoration: "none",
                    fontFamily: T.poppins, fontSize: 13, fontWeight: 600,
                    color: "#2d3d8b", background: "#eef1f9",
                    border: "1.5px solid #c5d0ee", transition: "all .3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#e0e6f5"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#eef1f9"; }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <div style={{ position: "relative" }} className="about-image-container">
                <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px rgba(45,61,139,0.13)" }}>
                  <img
                    src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&q=80"
                    alt="V3 Auto Group facility"
                    style={{ width: "100%", height: "clamp(280px,40vw,520px)", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div className="floating-badge" style={{
                  position: "absolute", bottom: -24, right: -20,
                  background: "white", borderRadius: 16, padding: "16px 20px",
                  boxShadow: "0 16px 48px rgba(45,61,139,0.14)",
                  border: "1px solid #e5e9f0", minWidth: 150,
                }}>
                  <div style={{ fontFamily: T.poppins, fontSize: 10, color: "#4a96b6", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, marginBottom: 5 }}>Est. Since</div>
                  <div style={{ fontFamily: T.cinzel, fontSize: "clamp(22px,3vw,28px)", fontWeight: 800, color: "#0a0f1e", lineHeight: 1 }}>2013</div>
                  <div style={{ fontFamily: T.poppins, fontSize: 11.5, color: "#999", marginTop: 3, fontWeight: 400 }}>12+ Years of Trust</div>
                </div>
           
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)", background: "#f4f6fb", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.07),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: "clamp(32px,4vw,56px)" }}>
              <div style={{ maxWidth: 500 }}>
                <div className="pill">Our Products</div>
                <h2 style={{ fontFamily: T.cinzel, fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, color: "#0a0f1e", lineHeight: 1.2, letterSpacing: "0.5px" }}>
                  Filtration for<br />
                  <span style={{ background: "linear-gradient(135deg,#2d3d8b,#4a96b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Every Engine</span>
                </h2>
              </div>
              <div style={{ maxWidth: 360 }}>
                <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", lineHeight: 1.8, fontWeight: 400 }}>
                  We deal in multiple ranges of automotive filters, auto spare parts, and accessories for the automotive industry — engineered for reliability, longevity, and compatibility across all major vehicle platforms.
                </p>
                <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, textDecoration: "none", fontFamily: T.poppins, fontSize: 13, fontWeight: 600, color: "#2d3d8b" }}>
                  Get a quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </FadeUp>

          <div className="products-grid">
            {products.map((p, i) => <ProductCard key={p.name} product={p} index={i} />)}
          </div>

          <FadeUp delay={0.2}>
            <div style={{ marginTop: 36, padding: "16px 20px", background: "white", borderRadius: 14, border: "1px solid #e5e9f0", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "10px 22px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              {["All Major OEM Compatible", "ISO Certified Quality", "Bulk Orders Welcome", "PAN India Delivery", "Technical Support Included"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <CheckCircle size={12} color="#4a96b6" />
                  <span style={{ fontFamily: T.poppins, fontSize: "clamp(11px,1.3vw,12.5px)", color: "#555", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#0a0f1e", padding: "clamp(48px,7vw,72px) clamp(16px,4vw,48px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=30')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.04 }} />
        <div style={{ position: "absolute", top: "50%", left: "15%", transform: "translate(-50%,-50%)", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,61,139,0.22),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="stats-grid">
            {[
              { value: "12+", label: "Years of Excellence", icon: Star },
              { value: "50K+", label: "Filters Supplied", icon: Filter },
              { value: "200+", label: "Vehicle Brands", icon: Car },
              { value: "99%", label: "Client Satisfaction", icon: Award },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <div
                  style={{ padding: "clamp(22px,3vw,44px) clamp(14px,2vw,28px)", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", transition: "background .4s", height: "100%", cursor: "default", position: "relative" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.015)")}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#2d3d8b,#4a96b6)", opacity: i % 2 === 0 ? 1 : 0.5 }} />
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(74,150,182,0.14)", border: "1px solid rgba(74,150,182,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <s.icon size={15} color="#4a96b6" />
                  </div>
                  <div style={{ fontFamily: T.poppins, fontSize: "clamp(28px,5vw,60px)", fontWeight: 700, color: "white", lineHeight: 1, marginBottom: 8, letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontFamily: T.poppins, fontSize: "clamp(9px,1.1vw,11px)", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 500 }}>{s.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="about" style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)", background: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,61,139,0.05),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: "clamp(32px,4vw,52px)" }}>
              <div>
                <div className="pill">Why V3 Auto Group</div>
                <h2 style={{ fontFamily: T.cinzel, fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, color: "#0a0f1e", lineHeight: 1.2, letterSpacing: "0.5px" }}>
                  The Standard Your<br />
                  <span style={{ background: "linear-gradient(135deg,#2d3d8b,#4a96b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Engine Deserves</span>
                </h2>
              </div>
              <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.4vw,14.5px)", color: "#6b7280", maxWidth: 360, lineHeight: 1.8, fontWeight: 400 }}>
                Our mission is to supply top-quality filters and spare parts that ensure high vehicle performance, reduce wear and tear, and contribute to improved operational efficiency — for domestic and global markets alike.
              </p>
            </div>
          </FadeUp>

          <div className="why-layout">
            <FadeUp delay={0.1}>
              <div>
                <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", boxShadow: "0 20px 56px rgba(45,61,139,0.12)", marginBottom: 12 }}>
                  <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80" alt="Workshop" style={{ width: "100%", height: "clamp(220px,30vw,340px)", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,21,53,0.82) 0%,rgba(13,21,53,0.04) 55%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
                    <div style={{ fontFamily: T.poppins, fontSize: 9.5, color: "rgba(255,255,255,0.42)", letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 5, fontWeight: 500 }}>Our Vision</div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.5vw,16px)", fontWeight: 600, color: "white", lineHeight: 1.4 }}>Globally recognised as a trusted supplier of innovative filtration solutions</div>
                  </div>
                </div>
                <div className="mini-stats">
                  {[{ val: "ISO", lbl: "Certified" }, { val: "OEM", lbl: "Compatible" }, { val: "6×", lbl: "Support Days" }].map(({ val, lbl }) => (
                    <div key={lbl} style={{ background: "#f4f6fb", border: "1.5px solid #e5e9f0", borderRadius: 11, padding: "12px 8px", textAlign: "center" }}>
                      <div style={{ fontFamily: T.poppins, fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 700, color: "#2d3d8b", lineHeight: 1 }}>{val}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 10, color: "#999", marginTop: 4, fontWeight: 400 }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <div className="why-cards-grid">
              {whyUs.map((w, i) => (
                <FadeUp key={w.title} delay={i * 0.08}>
                  <WhyCardLight w={w} />
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden", background: "#f4f6fb", padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{
              position: "relative", borderRadius: 24, overflow: "hidden",
              background: "linear-gradient(135deg, #0d1535 0%, #1a2560 45%, #0f2040 100%)",
              boxShadow: "0 40px 100px rgba(13,21,53,0.35)",
              padding: "clamp(36px,5vw,80px) clamp(20px,4vw,80px)",
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "-20%", right: "-5%", width: "min(500px,70vw)", height: "min(500px,70vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(74,150,182,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #2d3d8b, #4a96b6, #7ecde8, #4a96b6, #2d3d8b)" }} />

              <div className="cta-inner" style={{ position: "relative" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,150,182,0.12)", border: "1px solid rgba(74,150,182,0.3)", padding: "6px 14px", borderRadius: 100, marginBottom: 20 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4a96b6", animation: "pulse 2s infinite" }} />
                    <span style={{ fontFamily: T.poppins, fontSize: "clamp(9px,1.2vw,10px)", color: "#7ecde8", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>Start Today</span>
                  </div>

                  <h2 style={{ fontFamily: T.cinzel, fontSize: "clamp(22px,3.5vw,46px)", fontWeight: 800, color: "white", lineHeight: 1.18, letterSpacing: "0.5px", marginBottom: 16 }}>
                    Partner With India's<br />
                    <span style={{ background: "linear-gradient(135deg,#4a96b6,#7ecde8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Most Trusted Filter Brand</span>
                  </h2>

                  <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.4vw,15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.82, maxWidth: 520, fontWeight: 400, marginBottom: 28 }}>
                    Join hundreds of workshops, dealerships, and leading automotive brands who rely on V3 Auto Component India Pvt. Ltd. for premium filtration — with competitive pricing, bulk deals, and same-day technical support.
                  </p>

                  <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 32 }}>
                    {["Bulk Pricing", "PAN India Delivery", "ISO Certified", "6-Day Support"].map(tag => (
                      <div key={tag} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "5px 12px" }}>
                        <CheckCircle size={10} color="#4a96b6" />
                        <span style={{ fontFamily: T.poppins, fontSize: "clamp(10px,1.2vw,11.5px)", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{tag}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 13, flexWrap: "wrap", alignItems: "center" }}>
                    <Link to="/contact" className="btn-p" style={{ padding: "14px 30px", fontSize: "clamp(12px,1.4vw,14px)" }}>
                      Get a Free Quote <span className="arr"><ArrowRight size={16} /></span>
                    </Link>
                    <Link to="tel:+919900000000" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.65)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Phone size={14} color="#4a96b6" />
                      </div>
                      +91 99XXXXXXXX
                    </Link>
                  </div>
                </div>

                {/* Right stat cards */}
                <div className="cta-stats-row" style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 210 }}>
                  {[
                    { val: "500+", label: "Active Partners", icon: Star },
                    { val: "50K+", label: "Filters Delivered", icon: Filter },
                    { val: "24hr", label: "Quote Response", icon: Zap },
                  ].map(({ val, label, icon: Icon }) => (
                    <div key={label} className="cta-stat-card" style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "15px 18px", backdropFilter: "blur(10px)" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(74,150,182,0.15)", border: "1px solid rgba(74,150,182,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={17} color="#4a96b6" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div style={{ fontFamily: T.poppins, fontSize: "clamp(18px,2.2vw,22px)", fontWeight: 700, color: "white", lineHeight: 1, letterSpacing: "-0.5px" }}>{val}</div>
                        <div style={{ fontFamily: T.poppins, fontSize: 10.5, color: "rgba(255,255,255,0.35)", marginTop: 3, fontWeight: 400, textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "clamp(60px,8vw,100px) clamp(16px,4vw,48px)", background: "#f4f6fb", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.07),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,68px)" }}>
              <div className="pill">Get In Touch</div>
              <h2 style={{ fontFamily: T.cinzel, fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, color: "#0a0f1e", marginBottom: 12, letterSpacing: "0.5px" }}>Request a Quote</h2>
              <p style={{ fontFamily: T.poppins, fontSize: "clamp(13px,1.5vw,14.5px)", color: "#6b7280", maxWidth: 440, margin: "0 auto", lineHeight: 1.82, fontWeight: 400 }}>
                Fill out the form and our team will respond within 24 hours with pricing and product recommendations.
              </p>
            </div>
          </FadeUp>

          <div className="contact-grid">

            {/* Left info panel */}
            <FadeUp>
              <div className="contact-info-sticky" style={{ position: "sticky", top: 88 }}>
                <div style={{ height: 4, borderRadius: "16px 16px 0 0", background: "linear-gradient(90deg,#2d3d8b,#4a96b6)" }} />
                <div style={{ background: "linear-gradient(160deg,#1a2560,#0d1535)", borderRadius: "0 0 18px 18px", padding: "clamp(22px,3vw,32px) clamp(18px,2.5vw,26px) clamp(20px,2.5vw,28px)", boxShadow: "0 24px 56px rgba(13,21,53,0.22)" }}>
                  <h3 style={{ fontFamily: T.cinzel, fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: "white", marginBottom: 7, letterSpacing: "0.5px" }}>Let's Talk</h3>
                  <p style={{ fontFamily: T.poppins, fontSize: "clamp(12px,1.3vw,13.5px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.72, marginBottom: 22, borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 20, fontWeight: 400 }}>
                    Available 6 days a week to assist with any enquiry.
                  </p>
                  {[
                    { icon: Phone, label: "Phone", value: "+91 99XXXXXXXX" },
                    { icon: Mail, label: "Email", value: "v3auto@gmail.com" },
                    { icon: MapPin, label: "Address", value: "Industrial Area, Phase 2\nNew Delhi – 110020" }
                  ].map(({ icon: Icon, label, value }, idx) => (
                    <div key={label} style={{ display: "flex", gap: 12, marginBottom: idx < 2 ? 16 : 0, paddingBottom: idx < 2 ? 16 : 0, borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div style={{ width: 36, height: 36, background: "rgba(74,150,182,0.14)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(74,150,182,0.22)" }}>
                        <Icon size={14} color="#7ecde8" />
                      </div>
                      <div>
                        <div style={{ fontFamily: T.poppins, fontSize: 9.5, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 3, fontWeight: 500 }}>{label}</div>
                        <div style={{ fontFamily: T.poppins, fontSize: "clamp(12px,1.3vw,13px)", color: "white", fontWeight: 500, lineHeight: 1.45, whiteSpace: "pre-line" }}>{value}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, padding: "14px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 11, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontFamily: T.poppins, fontSize: 9.5, color: "rgba(255,255,255,0.28)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10, fontWeight: 500 }}>Business Hours</div>
                    {[["Mon – Sat", "9:00 AM – 6:00 PM", true], ["Sunday", "Closed", false]].map(([day, hrs, open]) => (
                      <div key={day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: day === "Mon – Sat" ? 6 : 0 }}>
                        <span style={{ fontFamily: T.poppins, fontSize: "clamp(11px,1.3vw,13px)", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{day}</span>
                        <span style={{ fontFamily: T.poppins, fontSize: "clamp(11px,1.3vw,13px)", color: open ? "white" : "rgba(255,255,255,0.25)", fontWeight: open ? 600 : 400 }}>{hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right form */}
            <FadeUp delay={0.12}>
              <div style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 6px 40px rgba(0,0,0,0.06)", border: "1px solid #e5e9f0" }}>
                <div style={{ background: "#f8f9fc", borderBottom: "1px solid #e5e9f0", padding: "16px clamp(18px,2.5vw,30px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 700, color: "#0a0f1e" }}>Send Enquiry</div>
                    <div style={{ fontFamily: T.poppins, fontSize: 11, color: "#aaa", marginTop: 2, fontWeight: 400 }}>Fields marked * are required</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ef4444", "#f59e0b", "#22c55e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                  </div>
                </div>
                <div style={{ padding: "clamp(20px,3vw,28px) clamp(18px,2.5vw,30px) clamp(22px,3vw,30px)" }}>
                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "clamp(28px,4vw,44px) 20px" }}>
                      <div style={{ width: 68, height: 68, background: "linear-gradient(135deg,#e8ecf8,#d5e8f3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                        <CheckCircle size={32} color="#2d3d8b" />
                      </div>
                      <h3 style={{ fontFamily: T.cinzel, fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: "#0a0f1e", marginBottom: 10, letterSpacing: "0.5px" }}>Enquiry Received!</h3>
                      <p style={{ fontFamily: T.poppins, color: "#6b7280", fontSize: "clamp(13px,1.4vw,14.5px)", lineHeight: 1.75, fontWeight: 400 }}>Thank you for reaching out to V3 Auto Group.<br />We'll respond with a detailed quote within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div>
                          <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Full Name *</label>
                          <input required className="fi" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Company</label>
                          <input className="fi" placeholder="Company / Workshop name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div>
                          <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Email Address *</label>
                          <input required type="email" className="fi" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Phone Number</label>
                          <input type="tel" className="fi" placeholder="+91 00000 00000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Product Interest *</label>
                        <select required className="fi" value={formData.product} onChange={e => setFormData({ ...formData, product: e.target.value })}>
                          <option value="">— Select a product —</option>
                          <option value="oil-filter">Oil Filter</option>
                          <option value="air-filter">Air Filter</option>
                          <option value="foam-filter">Foam Filter</option>
                          <option value="oil-strainer">Oil Strainer Filter</option>
                          <option value="all">All Products</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        <label style={{ display: "block", fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: "#374151", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Message</label>
                        <textarea className="fi" rows={4} placeholder="Describe your requirements, quantities, vehicle types, or any questions…" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                      </div>
                      <button type="submit" className="btn-p" style={{ width: "100%", justifyContent: "center", padding: "14px 28px", fontSize: "clamp(13px,1.5vw,14px)", borderRadius: 11 }}>
                        Send Enquiry <span className="arr"><ArrowRight size={16} /></span>
                      </button>
                      <p style={{ fontFamily: T.poppins, fontSize: 11, color: "#c4c9d4", textAlign: "center", marginTop: 12, fontWeight: 400 }}>🔒 Your information is secure and never shared.</p>
                    </form>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

    </div>
  );
}