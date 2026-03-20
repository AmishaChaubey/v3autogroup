import { useState, useEffect, useRef } from "react";
import {
  Wind, Droplets, Layers, ChevronDown, Phone, Mail, MapPin,
  Shield, Truck, Award, ArrowRight, Menu, X, CheckCircle,
  Wrench, Car, Filter, Star, ChevronRight, Settings
} from "lucide-react";

const useInView = (threshold = 0.12) => {
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
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.75s cubic-bezier(.25,.46,.45,.94) ${delay}s, transform 0.75s cubic-bezier(.25,.46,.45,.94) ${delay}s`
    }}>{children}</div>
  );
};

const products = [
  {
    icon: Droplets,
    name: "Oil Filter",
    tagline: "Engine Protection, Redefined",
    desc: "High-efficiency multi-layer filtration that removes contaminants down to micron level, extending engine life and maintaining optimal lubrication across all conditions.",
    features: ["Multi-layer filtration media", "Anti-drain back valve", "High burst pressure rating", "Fits all major OEM specs"],
    image: "/product/oil-filter.jpeg",
    badge: "Best Seller",
  },
  {
    icon: Wind,
    name: "Air Filter",
    tagline: "Breathe. Perform. Dominate.",
    desc: "Premium electrostatically charged pleated media engineered for superior dust-holding capacity and unrestricted airflow — giving your engine the clean air it deserves.",
    features: ["Electrostatically charged media", "OE-grade sealing gasket", "Extended service intervals", "Improved throttle response"],
    image: "/product/air-filter.jpeg",
    badge: "Top Rated",
  },
  {
    icon: Layers,
    name: "Foam Filter",
    tagline: "Built Tough. Stays Clean.",
    desc: "Open-cell polyurethane foam construction for maximum dirt capture in off-road and heavy-duty environments. Washable, reusable, and engineered to last.",
    features: ["Reusable & washable design", "UV-resistant foam material", "Custom-fit availability", "Ideal for off-road & dusty terrain"],
    image: "/product/foam-filter.jpeg",
    badge: "Heavy Duty",
  }
];

const whyUs = [
  { icon: Shield, title: "OEM-Grade Quality", desc: "Every filter meets or exceeds original equipment manufacturer specifications." },
  { icon: Award, title: "ISO Certified", desc: "ISO-certified manufacturing with rigorous multi-stage quality inspection." },
  { icon: Truck, title: "Fast Fulfillment", desc: "Reliable supply chain ensuring you never face downtime due to stock-outs." },
  { icon: Wrench, title: "Expert Support", desc: "Technical guidance from automotive filtration engineers, 6 days a week." },
  { icon: Settings, title: "Custom Solutions", desc: "Bespoke filtration solutions for fleet operators, OEMs, and specialty segments." },
  { icon: Star, title: "Trusted Brand", desc: "500+ workshops and dealerships trust V3 Auto Group as their preferred partner." },
];

/* ── Logo image component — uses /logo.png ── */
const LogoImg = ({ scrolled = false }) => (
  <a href="#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <img
      src="/logo.png"
      alt="V3 Auto Group"
      style={{
        height: scrolled ? 44 : 48,
        width: "auto",
        objectFit: "contain",
        display: "block",
        transition: "height 0.35s",
      }}
      onError={e => {
        e.currentTarget.style.display = "none";
        e.currentTarget.insertAdjacentHTML("afterend",
          `<span style="font-family:'Playfair Display',serif;font-size:20px;font-weight:800;color:#2d3d8b;letter-spacing:0.3px;">V3 Auto Group</span>`
        );
      }}
    />
  </a>
);

const ProductCard = ({ product, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={index * 0.13}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white", borderRadius: 20, overflow: "hidden",
          boxShadow: hovered ? "0 32px 80px rgba(45,61,139,0.2)" : "0 4px 28px rgba(0,0,0,0.07)",
          border: hovered ? "1px solid rgba(45,61,139,0.15)" : "1px solid #eef0f5",
          transition: "all 0.45s cubic-bezier(.25,.46,.45,.94)",
          transform: hovered ? "translateY(-12px)" : "translateY(0)",
        }}
      >
        {/* Image — 220px height, full image visible, no crop */}
        <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: "center center",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(.25,.46,.45,.94)",
              display: "block",
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: hovered
              ? "linear-gradient(to bottom,rgba(13,21,54,0.1) 0%,rgba(13,21,54,0.78) 100%)"
              : "linear-gradient(to bottom,rgba(13,21,54,0.0) 0%,rgba(13,21,54,0.58) 100%)",
            transition: "all 0.45s"
          }} />
          {/* Badge */}
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)", borderRadius: 100,
            padding: "4px 12px", color: "white", fontSize: 10,
            fontFamily: "'DM Sans',sans-serif", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
          }}>{product.badge}</div>
          {/* Floating icon */}
          <div style={{
            position: "absolute", bottom: -20, right: 20,
            width: 46, height: 46,
            background: "#2d3d8b",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(45,61,139,0.45)",
            border: "3px solid white",
            transform: hovered ? "scale(1.12) rotate(12deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(.25,.46,.45,.94)",
            zIndex: 2,
          }}>
            <product.icon size={19} color="white" strokeWidth={1.8} />
          </div>
          {/* Name overlay */}
          <div style={{ position: "absolute", bottom: 14, left: 16, transform: hovered ? "translateY(-5px)" : "translateY(0)", transition: "transform 0.4s" }}>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 9.5, fontFamily: "'DM Sans',sans-serif", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 3 }}>{product.tagline}</div>
            <div style={{ color: "white", fontSize: 19, fontFamily: "'Playfair Display',serif", fontWeight: 700 }}>{product.name}</div>
          </div>
        </div>

        {/* Body — compact */}
        <div style={{ padding: "26px 22px 22px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#666", lineHeight: 1.72, marginBottom: 16 }}>{product.desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {product.features.map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#e8ecf8,#d5e8f3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckCircle size={11} color="#2d3d8b" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "#555" }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="#contact" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 18px",
            background: hovered ? "#2d3d8b" : "#f4f6fd",
            borderRadius: 10, color: hovered ? "white" : "#2d3d8b",
            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.4px", textDecoration: "none",
            transition: "all 0.4s", border: hovered ? "1px solid #2d3d8b" : "1px solid #dde3f5",
            transform: hovered ? "translateY(-1px)" : "translateY(0)",
          }}>
            <span>Request a Quote</span>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: hovered ? "rgba(255,255,255,0.18)" : "white", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s" }}>
              <ArrowRight size={13} color={hovered ? "white" : "#2d3d8b"} />
            </div>
          </a>
        </div>
      </div>
    </FadeUp>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrolled = scrollY > 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#f7f8fc", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #f0f0f0; } ::-webkit-scrollbar-thumb { background: #2d3d8b; border-radius: 4px; }
        .pf { font-family: 'Playfair Display', serif; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .gt { background: linear-gradient(135deg,#2d3d8b,#4a96b6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

        .nlink { position:relative; color:white; text-decoration:none; font-size:14px; font-weight:500; letter-spacing:0.4px; padding:4px 0; transition:color 0.3s; font-family:'DM Sans',sans-serif; }
        .nlink.scrolled { color:#343434; }
        .nlink::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#2d3d8b; transition:width 0.3s; }
        .nlink:hover::after { width:100%; }
        .nlink:hover { color:#4a96b6 !important; }

        .btn-p {
          display:inline-flex; align-items:center; gap:8px; padding:13px 28px;
          background:#2d3d8b; color:white; font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase;
          border:none; cursor:pointer; border-radius:10px; text-decoration:none;
          transition:background 0.35s, box-shadow 0.35s, transform 0.25s;
          box-shadow:0 4px 18px rgba(45,61,139,0.28);
          position:relative; overflow:hidden;
        }
        .btn-p::after {
          content:''; position:absolute; inset:0;
          background:rgba(255,255,255,0); transition:background 0.35s;
          border-radius:10px;
        }
        .btn-p:hover { background:#1f2d70; transform:translateY(-3px); box-shadow:0 10px 32px rgba(45,61,139,0.38); }
        .btn-p:hover::after { background:rgba(255,255,255,0.06); }
        .btn-p:active { transform:translateY(0px) scale(0.98); box-shadow:0 4px 14px rgba(45,61,139,0.22); }
        .btn-p .btn-arrow { transition:transform 0.3s cubic-bezier(.25,.46,.45,.94); display:inline-flex; }
        .btn-p:hover .btn-arrow { transform:translateX(5px); }

        .btn-o {
          display:inline-flex; align-items:center; gap:8px; padding:12px 26px;
          background:transparent; color:white; font-family:'DM Sans',sans-serif;
          font-size:13px; font-weight:600; letter-spacing:0.8px; text-transform:uppercase;
          border:1.5px solid rgba(255,255,255,0.5); cursor:pointer; border-radius:10px;
          text-decoration:none; transition:all 0.3s; position:relative; overflow:hidden;
        }
        .btn-o::before {
          content:''; position:absolute; inset:0;
          background:white; transform:translateY(100%);
          transition:transform 0.35s cubic-bezier(.25,.46,.45,.94);
          border-radius:8px;
        }
        .btn-o span, .btn-o svg { position:relative; z-index:1; transition:color 0.35s; }
        .btn-o:hover { border-color:white; transform:translateY(-2px); }
        .btn-o:hover::before { transform:translateY(0); }
        .btn-o:hover span, .btn-o:hover svg { color:#2d3d8b !important; stroke:#2d3d8b !important; }

        .fi { width:100%; padding:14px 18px; background:#f8f9fc; border:1.5px solid #e5e7eb; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:14px; color:#343434; transition:all 0.3s; outline:none; }
        .fi:focus { border-color:#2d3d8b; background:white; box-shadow:0 0 0 4px rgba(45,61,139,0.08); }
        .fi::placeholder { color:#b0b7c3; }
        select.fi { appearance:none; cursor:pointer; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; background-size:12px; padding-right:40px; background-color:#f8f9fc; }
        select.fi:focus { background-color:white; }
        textarea.fi { resize:vertical; min-height:120px; }

        .hfloat { animation:hf 7s ease-in-out infinite; }
        @keyframes hf { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }

        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .hero-badge{opacity:0;animation:fadeUp .7s ease .15s forwards;}
        .hero-h1{opacity:0;animation:fadeUp .7s ease .35s forwards;}
        .hero-p{opacity:0;animation:fadeUp .7s ease .55s forwards;}
        .hero-btns{opacity:0;animation:fadeUp .7s ease .75s forwards;}
        .hero-stats{opacity:0;animation:fadeUp .7s ease .95s forwards;}

        .pill { display:inline-block; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#4a96b6; margin-bottom:14px; background:rgba(74,150,182,0.1); padding:6px 18px; border-radius:100px; border:1px solid rgba(74,150,182,0.2); font-family:'DM Sans',sans-serif; }

        /* RESPONSIVE */
        @media (max-width:1024px) {
          .hero-grid{grid-template-columns:1fr!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .about-sticky{position:static!important;}
          .contact-grid{grid-template-columns:1fr!important;}
          .contact-sticky{position:static!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important; gap:36px!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media (max-width:860px) {
          .desktop-nav{display:none!important;}
          .mob-btn{display:flex!important;}
          .products-grid{grid-template-columns:1fr 1fr!important;}
          .why-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media (max-width:640px) {
          .products-grid{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .why-grid{grid-template-columns:1fr 1fr!important;}
          .form-row{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;}
          .trust-strip{flex-direction:column!important; align-items:flex-start!important; gap:12px!important;}
          .hero-btns-row{flex-direction:column!important; align-items:flex-start!important;}
          .hero-stats-inner{gap:20px!important; flex-wrap:wrap!important;}
        }
        @media (max-width:420px) {
          .stats-grid{grid-template-columns:1fr!important;}
          .why-grid{grid-template-columns:1fr!important;}
          .section-px{padding-left:16px!important; padding-right:16px!important;}
          .footer-grid{gap:28px!important;}
        }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow: scrolled ? "0 2px 24px rgba(45,61,139,0.1)" : "0 1px 0 #eef0f5",
        borderBottom: "1px solid #eef0f5",
        padding: scrolled ? "10px 0" : "12px 0",
        transition: "all 0.35s cubic-bezier(.25,.46,.45,.94)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* LOGO */}
          <LogoImg scrolled={scrolled} />

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
            {["Home","Products","About","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nlink scrolled">{item}</a>
            ))}
            <a href="#contact" className="btn-p" style={{ padding: "10px 22px", fontSize: 12 }}>
              <span>Get a Quote</span> <span className="btn-arrow"><ArrowRight size={14} /></span>
            </a>
          </div>

          {/* Hamburger */}
          <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", alignItems: "center", justifyContent: "center",
            width: 40, height: 40, borderRadius: 10, border: "none", cursor: "pointer",
            background: "#f0f3fa",
            color: "#2d3d8b", transition: "all 0.3s",
          }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div style={{ maxHeight: menuOpen ? "420px" : "0", overflow: "hidden", transition: "max-height 0.45s cubic-bezier(.25,.46,.45,.94)", background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          <div style={{ padding: "20px clamp(16px,4vw,40px) 28px", display: "flex", flexDirection: "column", gap: 4 }}>
            {["Home","Products","About","Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 10, color: "#343434", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: 15, textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0f3fa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{item} <ChevronRight size={16} color="#9ca3af" /></a>
            ))}
            <a href="#contact" className="btn-p" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, justifyContent: "center" }}>
              <span>Get a Quote</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#050d1e" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/banner/3.png')", backgroundSize: "cover", backgroundPosition: "center 40%", opacity: 1 }} />
        {/* Overlay: heavy on left for text readability, fades out on right */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.22) 100%)" }} />
        {/* Very subtle dot grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "130px clamp(16px,4vw,40px) 90px", width: "100%" }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60, alignItems: "center", maxWidth: 720 }}>
            <div>
              <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,150,182,0.18)", border: "1px solid rgba(74,150,182,0.4)", padding: "7px 18px", borderRadius: 100, color: "#7ecde8", fontSize: 11, fontFamily: "'DM Sans',sans-serif", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 28 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a96b6" }} />
                Premium Automotive Filtration
              </div>
              <h1 className="hero-h1 pf" style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 900, color: "white", lineHeight: 1.08, marginBottom: 24 }}>
                Precision Filters<br />
                <em style={{ fontStyle: "italic", color: "#4a96b6" }}>Built to Last</em>
              </h1>
              <p className="hero-p dm" style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
                V3 Auto Group delivers precision-engineered oil filters, air filters, and foam filters trusted by workshops, fleets, and dealerships across the region.
              </p>
              <div className="hero-btns hero-btns-row" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 52 }}>
                <a href="#products" className="btn-p">
                  <span>Explore Products</span> <span className="btn-arrow"><ArrowRight size={16} /></span>
                </a>
                <a href="#contact" className="btn-o"><span>Request Quote</span></a>
              </div>
              <div className="hero-stats" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}>
                <div className="hero-stats-inner" style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                  {[["15+","Years"],["50K+","Filters"],["200+","Brands"],["99%","Satisfied"]].map(([v,l]) => (
                    <div key={l}>
                      <div className="pf" style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, color: "white", lineHeight: 1 }}>{v}</div>
                      <div className="dm" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 6 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#products" className="hfloat" style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
          <span className="dm" style={{ fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={18} />
        </a>
      </section>

      {/* ══ PRODUCTS ══ */}
      <section id="products" className="section-px" style={{ padding: "100px clamp(16px,4vw,40px)", background: "#f0f3fa", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.07),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="pill">Our Products</div>
              <h2 className="pf" style={{ fontSize: "clamp(28px,4vw,54px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 18, lineHeight: 1.15 }}>
                Filtration Solutions for<br /><span className="gt">Every Engine</span>
              </h2>
              <p className="dm" style={{ fontSize: "clamp(14px,1.4vw,16px)", color: "#777", maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>
                Three product families engineered for reliability, longevity, and precise compatibility across all major vehicle platforms.
              </p>
            </div>
          </FadeUp>

          <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {products.map((p, i) => <ProductCard key={p.name} product={p} index={i} />)}
          </div>

          <FadeUp delay={0.2}>
            <div className="trust-strip" style={{ marginTop: 52, padding: "22px clamp(16px,3vw,32px)", background: "white", borderRadius: 16, border: "1px solid #eef0f5", display: "flex", alignItems: "center", justifyContent: "space-around", flexWrap: "wrap", gap: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              {["All Major OEM Compatible","ISO Certified Quality","Bulk Orders Welcome","PAN India Delivery","Technical Support Included"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle size={15} color="#4a96b6" />
                  <span className="dm" style={{ fontSize: 13, color: "#555", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background: "#0a0f1e", padding: "64px clamp(16px,4vw,40px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=60')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
        <div style={{ position: "absolute", top: "50%", left: "20%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,61,139,0.3) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", right: "-5%", transform: "translateY(-50%)", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.18) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
            {[
              { value: "15+", label: "Years of Excellence", icon: Star, bar: 80 },
              { value: "50K+", label: "Filters Supplied", icon: Filter, bar: 65 },
              { value: "200+", label: "Vehicle Brands", icon: Car, bar: 90 },
              { value: "99%", label: "Client Satisfaction", icon: Award, bar: 99 },
            ].map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <div style={{
                  padding: "clamp(24px,3vw,36px) clamp(18px,2.5vw,28px) clamp(20px,2.5vw,32px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative", cursor: "default",
                  background: "rgba(255,255,255,0.02)",
                  transition: "background 0.4s",
                  height: "100%",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(74,150,182,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  {/* Top accent bar */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2d3d8b,#4a96b6)", opacity: i % 2 === 0 ? 1 : 0.45 }} />
                  {/* Icon + label row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(74,150,182,0.15)", border: "1px solid rgba(74,150,182,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <s.icon size={16} color="#4a96b6" />
                    </div>
                    <span className="dm" style={{ fontSize: "clamp(9px,1vw,10.5px)", color: "rgba(255,255,255,0.35)", letterSpacing: "1.5px", textTransform: "uppercase", lineHeight: 1.3 }}>{s.label}</span>
                  </div>
                  {/* Big number */}
                  <div className="pf" style={{ fontSize: "clamp(34px,4vw,58px)", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: 14, letterSpacing: "-1px" }}>
                    {s.value}
                  </div>
                  {/* Progress bar */}
                  <div style={{ height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.bar}%`, background: "linear-gradient(90deg,#2d3d8b,#4a96b6)", borderRadius: 2 }} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT / WHY US ══ */}
      <section id="about" className="section-px" style={{ padding: "100px clamp(16px,4vw,40px)", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Header */}
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="pill">Why V3 Auto Group</div>
              <h2 className="pf" style={{ fontSize: "clamp(26px,3.5vw,50px)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.15, marginBottom: 16 }}>
                The Standard Your <span className="gt">Engine Deserves</span>
              </h2>
              <p className="dm" style={{ fontSize: 15, color: "#777", maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>
                15+ years supplying products that professionals trust — rigorous quality control with unmatched technical depth.
              </p>
            </div>
          </FadeUp>

          {/* 2-col layout — equal height both sides */}
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "stretch" }}>

            {/* LEFT — image fills full height of the right column */}
            <FadeUp delay={0.1}>
              <div className="about-sticky" style={{ position: "sticky", top: 100, display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Main image — flex-grow so it fills remaining space */}
                <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", boxShadow: "0 20px 60px rgba(45,61,139,0.13)", flex: 1, minHeight: 260 }}>
                  <img
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80"
                    alt="Workshop"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 260 }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,21,54,0.8) 0%, rgba(13,21,54,0.05) 50%)" }} />
                  {/* Overlay text */}
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 24px 20px" }}>
                    <div className="dm" style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>Our Commitment</div>
                    <div className="pf" style={{ color: "white", fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>Trusted by 500+ workshops & dealerships nationwide</div>
                  </div>
                </div>

                {/* 3 mini badges — always below image */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { val: "ISO", lbl: "Certified" },
                    { val: "OEM", lbl: "Compatible" },
                    { val: "6×", lbl: "Support Days" },
                  ].map(({ val, lbl }) => (
                    <div key={lbl} style={{ background: "#f4f6fd", border: "1.5px solid #e3e8f5", borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                      <div className="pf" style={{ fontSize: 18, fontWeight: 800, color: "#2d3d8b", lineHeight: 1 }}>{val}</div>
                      <div className="dm" style={{ fontSize: 11, color: "#999", marginTop: 5 }}>{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — 2×3 cards, all equal height rows */}
            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(3, 1fr)", gap: 14 }}>
              {whyUs.map((w, i) => {
                const [wHov, setWHov] = useState(false);
                return (
                  <div
                    key={w.title}
                    onMouseEnter={() => setWHov(true)}
                    onMouseLeave={() => setWHov(false)}
                    style={{
                      background: wHov ? "#edf0fb" : "#f8f9fc",
                      border: wHov ? "1.5px solid #b8c6e8" : "1.5px solid #eaecf5",
                      borderRadius: 14,
                      padding: "22px 20px",
                      boxShadow: wHov ? "0 12px 36px rgba(45,61,139,0.1)" : "0 1px 8px rgba(0,0,0,0.04)",
                      transform: wHov ? "translateY(-4px)" : "translateY(0)",
                      transition: "all 0.3s cubic-bezier(.25,.46,.45,.94)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: wHov ? "#2d3d8b" : "#e8ecf8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 14, flexShrink: 0,
                      transition: "background 0.3s",
                      boxShadow: wHov ? "0 4px 14px rgba(45,61,139,0.25)" : "none",
                    }}>
                      <w.icon size={20} color={wHov ? "white" : "#2d3d8b"} strokeWidth={1.8} />
                    </div>
                    <h4 className="pf" style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 7, lineHeight: 1.2 }}>{w.title}</h4>
                    <p className="dm" style={{ fontSize: 12.5, color: "#888", lineHeight: 1.65, flex: 1 }}>{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section style={{ background: "#000", padding: "72px clamp(16px,4vw,40px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(45,61,139,0.4) 0%,transparent 60%,rgba(74,150,182,0.25) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2d3d8b,#4a96b6,#2d3d8b)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2d3d8b,#4a96b6,#2d3d8b)" }} />
        <FadeUp>
          <div style={{ position: "relative", textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
            <div className="dm" style={{ fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "#4a96b6", marginBottom: 16, display: "inline-block", background: "rgba(74,150,182,0.15)", border: "1px solid rgba(74,150,182,0.3)", padding: "5px 16px", borderRadius: 100 }}>Take the Next Step</div>
            <h2 className="pf" style={{ fontSize: "clamp(24px,3.5vw,46px)", fontWeight: 700, color: "white", marginBottom: 16, lineHeight: 1.2 }}>
              Ready to Upgrade Your Filtration?
            </h2>
            <p className="dm" style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 32px" }}>
              Tailored recommendations, competitive bulk pricing, and fast nationwide delivery — all from one trusted partner.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact" className="btn-p" style={{ padding: "14px 34px", fontSize: 13 }}>
                <span>Contact Us Today</span> <span className="btn-arrow"><ArrowRight size={16} /></span>
              </a>
              <a href="#products" className="btn-o" style={{ padding: "13px 30px", fontSize: 13 }}><span>View Products</span></a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="section-px" style={{ padding: "110px clamp(16px,4vw,40px)", background: "#f0f3fa", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.08),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(45,61,139,0.07),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="pill">Get In Touch</div>
              <h2 className="pf" style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>Request a Quote</h2>
              <p className="dm" style={{ fontSize: 15, color: "#777", maxWidth: 500, margin: "0 auto", lineHeight: 1.8 }}>Fill out the form below and our team will respond within 24 hours with pricing and product recommendations.</p>
            </div>
          </FadeUp>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 32, alignItems: "stretch" }}>

            {/* LEFT */}
            <FadeUp>
              <div className="contact-sticky" style={{ position: "sticky", top: 110, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ height: 5, borderRadius: "20px 20px 0 0", background: "linear-gradient(90deg,#2d3d8b,#4a96b6)", flexShrink: 0 }} />
                <div style={{ background: "linear-gradient(170deg,#2d3d8b 0%,#1a2560 100%)", borderRadius: "0 0 20px 20px", padding: "32px 28px", boxShadow: "0 24px 60px rgba(45,61,139,0.22)", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 className="pf" style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 8 }}>Let's Talk</h3>
                  <p className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.52)", lineHeight: 1.7, marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 24 }}>
                    Our team is available 6 days a week to assist you with any enquiry.
                  </p>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      {[
                        { icon: Phone, label: "Phone", value: "+91 99XXXXXXXX" },
                        { icon: Mail, label: "Email", value: "info@v3autogroup.com" },
                        { icon: MapPin, label: "Address", value: "Industrial Area, Phase 2, New Delhi – 110020" }
                      ].map(({ icon: Icon, label, value }, idx) => (
                        <div key={label} style={{ display: "flex", gap: 14, marginBottom: idx < 2 ? 20 : 0, paddingBottom: idx < 2 ? 20 : 0, borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                          <div style={{ width: 42, height: 42, background: "rgba(74,150,182,0.2)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(74,150,182,0.3)" }}>
                            <Icon size={17} color="#7ecde8" />
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div className="dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 3 }}>{label}</div>
                            <div className="dm" style={{ fontSize: 13, color: "white", fontWeight: 500, lineHeight: 1.4 }}>{value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 24, padding: "16px 18px", background: "rgba(255,255,255,0.06)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="dm" style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 10 }}>Business Hours</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                        <span className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Mon – Sat</span>
                        <span className="dm" style={{ fontSize: 13, color: "white", fontWeight: 600 }}>9:00 AM – 6:00 PM</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>Sunday</span>
                        <span className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.38)" }}>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — Form */}
            <FadeUp delay={0.15}>
              <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,0.07)", border: "1px solid #eef0f5", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ background: "#f8f9fc", borderBottom: "1px solid #eef0f5", padding: "22px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                  <div>
                    <div className="pf" style={{ fontSize: 19, fontWeight: 700, color: "#1a1a1a" }}>Send Enquiry</div>
                    <div className="dm" style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>Fields marked * are required</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                  </div>
                </div>
                <div style={{ padding: "32px 36px 36px", flex: 1 }}>
                  {submitted ? (
                    <div style={{ textAlign: "center", padding: "44px 0" }}>
                      <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,#e8ecf8,#d5e8f3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                        <CheckCircle size={38} color="#2d3d8b" />
                      </div>
                      <h3 className="pf" style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>Enquiry Received!</h3>
                      <p className="dm" style={{ color: "#777", fontSize: 15, lineHeight: 1.7 }}>Thank you for reaching out to V3 Auto Group.<br />We'll respond with a detailed quote within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                        <div>
                          <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Full Name *</label>
                          <input required className="fi" placeholder="Your full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Company</label>
                          <input className="fi" placeholder="Company / Workshop name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
                        </div>
                      </div>
                      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                        <div>
                          <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Email Address *</label>
                          <input required type="email" className="fi" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div>
                          <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Phone Number</label>
                          <input type="tel" className="fi" placeholder="+91 00000 00000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                        </div>
                      </div>
                      <div style={{ marginBottom: 18 }}>
                        <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Product Interest *</label>
                        <select required className="fi" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})}>
                          <option value="">— Select a product —</option>
                          <option value="oil-filter">Oil Filter</option>
                          <option value="air-filter">Air Filter</option>
                          <option value="foam-filter">Foam Filter</option>
                          <option value="all">All Products</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: 28 }}>
                        <label className="dm" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                        <textarea className="fi" rows={4} placeholder="Describe your requirements, quantities, vehicle types, or any questions…" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                      </div>
                      <button type="submit" className="btn-p" style={{ width: "100%", justifyContent: "center", padding: "16px 32px", fontSize: 14, borderRadius: 12 }}>
                        <span>Send Enquiry</span> <span className="btn-arrow"><ArrowRight size={18} /></span>
                      </button>
                      <p className="dm" style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 16 }}>🔒 Your information is secure and never shared.</p>
                    </form>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#080f1f", padding: "72px clamp(16px,4vw,40px) 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr", gap: 52, marginBottom: 52, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 52 }}>
            <div>
              <a href="#home" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", marginBottom: 20 }}>
                {/* Footer logo — always white/light version */}
                <img src="/logo3.png" alt="V3 Auto Group" style={{ height: 36, width: "auto", objectFit: "contain", }} onError={e => e.currentTarget.style.display = "none"} />
              </a>
              <p className="dm" style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.85, maxWidth: 280 }}>
                Supplying premium automotive filtration solutions to workshops, dealerships, and fleet operators across India since 2009.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {["IN","TW","FB"].map(s => (
                  <div key={s} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#2d3d8b"; e.currentTarget.style.borderColor = "#2d3d8b"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  >
                    <span style={{ fontSize: 10, color: "white", fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="dm" style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 22 }}>Products</div>
              {["Oil Filter","Air Filter","Foam Filter","Bulk Orders"].map(p => (
                <a key={p} href="#products" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 14, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#4a96b6"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{p}</a>
              ))}
            </div>
            <div>
              <div className="dm" style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 22 }}>Company</div>
              {["About Us","Contact","Privacy Policy","Terms"].map(p => (
                <a key={p} href="#" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 14, textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#4a96b6"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{p}</a>
              ))}
            </div>
            <div>
              <div className="dm" style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 22 }}>Catalogue</div>
              <p className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 18, lineHeight: 1.7 }}>Drop your email and we'll send you our full product catalogue.</p>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="fi" placeholder="your@email.com" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white", borderRadius: 8, flex: 1, fontSize: 13, padding: "11px 14px" }} />
                <button className="btn-p" style={{ padding: "11px 16px", borderRadius: 8, flexShrink: 0 }}>
                  <span className="btn-arrow"><ArrowRight size={15} /></span>
                </button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>© 2025 V3 Auto Group. All rights reserved.</div>
            <div className="dm" style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>Engineered for Excellence.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}