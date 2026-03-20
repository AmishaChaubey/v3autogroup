import { useState, useEffect, useRef } from "react";
import { Wind, Droplets, Layers, ChevronDown, Phone, Mail, MapPin, Star, Shield, Truck, Award, ArrowRight, Menu, X, CheckCircle, Wrench, Car, Filter } from "lucide-react";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>{children}</div>
  );
};

const products = [
  {
    icon: Droplets,
    name: "Oil Filter",
    tagline: "Engine Protection, Redefined",
    desc: "High-efficiency filtration that removes contaminants down to micron level, extending engine life and maintaining optimal lubrication across all driving conditions.",
    features: ["Multi-layer filtration media", "Anti-drain back valve", "High burst pressure rating", "Fits all major OEM specs"],
    color: "#2d3d8b",
    accent: "#e8ecf8",
    badge: "Best Seller"
  },
  {
    icon: Wind,
    name: "Air Filter",
    tagline: "Breathe. Perform. Dominate.",
    desc: "Premium pleated media engineered for superior dust-holding capacity and unrestricted airflow — giving your engine the clean air it deserves.",
    features: ["Electrostatically charged media", "OE-grade sealing gasket", "Extended service intervals", "Improved throttle response"],
    color: "#4a96b6",
    accent: "#e6f4f9",
    badge: "Top Rated"
  },
  {
    icon: Layers,
    name: "Foam Filter",
    tagline: "Built Tough. Stays Clean.",
    desc: "Open-cell polyurethane foam construction for maximum dirt capture in off-road and heavy-duty environments. Washable, reusable, and built to last.",
    features: ["Reusable & washable", "UV-resistant foam", "Custom-fit availability", "Ideal for off-road & dusty terrain"],
    color: "#343434",
    accent: "#f0f0f0",
    badge: "Heavy Duty"
  }
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50K+", label: "Filters Supplied" },
  { value: "200+", label: "Vehicle Brands" },
  { value: "99%", label: "Client Satisfaction" }
];

const whyUs = [
  { icon: Shield, title: "OEM-Grade Quality", desc: "Every filter meets or exceeds original equipment specifications." },
  { icon: Award, title: "Certified Products", desc: "ISO-certified manufacturing with rigorous quality control." },
  { icon: Truck, title: "Fast Fulfillment", desc: "Reliable supply chain ensuring you never run out of stock." },
  { icon: Wrench, title: "Expert Support", desc: "Technical guidance from automotive filtration specialists." }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#fafafa", color: "#1a1a1a", overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        .playfair { font-family: 'Playfair Display', serif; }
        .dm-sans { font-family: 'DM Sans', sans-serif; }
        .nav-link { position: relative; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: #343434; text-decoration: none; letter-spacing: 0.5px; transition: color 0.3s; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; width: 0; height: 2px; background: #2d3d8b; transition: width 0.3s; }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #2d3d8b; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; background: #2d3d8b; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.3s; border-radius: 2px; }
        .btn-primary:hover { background: #4a96b6; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(45,61,139,0.25); }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 30px; background: transparent; color: white; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.8px; text-transform: uppercase; border: 2px solid rgba(255,255,255,0.6); cursor: pointer; transition: all 0.3s; border-radius: 2px; }
        .btn-outline:hover { background: white; color: #2d3d8b; border-color: white; }
        .product-card { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); cursor: pointer; }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.12); }
        .form-input { width: 100%; padding: 14px 18px; background: white; border: 1.5px solid #e5e7eb; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #343434; transition: all 0.3s; outline: none; }
        .form-input:focus { border-color: #2d3d8b; box-shadow: 0 0 0 3px rgba(45,61,139,0.08); }
        .form-input::placeholder { color: #9ca3af; }
        .stat-card { transition: transform 0.3s; }
        .stat-card:hover { transform: translateY(-4px); }
        .hero-float { animation: heroFloat 6s ease-in-out infinite; }
        @keyframes heroFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        .pulse-ring { animation: pulseRing 2.5s ease-out infinite; }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
        .scroll-indicator { animation: scrollBounce 2s ease-in-out infinite; }
        @keyframes scrollBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .gradient-text { background: linear-gradient(135deg, #2d3d8b, #4a96b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        select.form-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; cursor: pointer; }
        .feature-check { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #f0f0f0; } ::-webkit-scrollbar-thumb { background: #2d3d8b; border-radius: 3px; }
        .mobile-menu { display: none; } @media (max-width: 768px) { .desktop-nav { display: none; } .mobile-menu { display: block; } }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.4s ease", padding: scrolled ? "14px 0" : "22px 0"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#2d3d8b", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={20} color="white" />
            </div>
            <div>
              <div className="playfair" style={{ fontSize: 18, fontWeight: 700, color: scrolled ? "#2d3d8b" : "white", letterSpacing: "0.5px", lineHeight: 1 }}>V3 Auto Group</div>
              <div className="dm-sans" style={{ fontSize: 10, color: scrolled ? "#4a96b6" : "rgba(255,255,255,0.75)", letterSpacing: "2px", textTransform: "uppercase" }}>Premium Filtration</div>
            </div>
          </div>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {["Home", "Products", "About", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ color: scrolled ? "#343434" : "rgba(255,255,255,0.9)" }}>{item}</a>
            ))}
            <a href="#contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: 12 }}>Get a Quote</a>
          </div>

          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#343434" : "white" }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "white", padding: "20px 32px 24px", borderTop: "1px solid #f0f0f0", display: "flex", flexDirection: "column", gap: 20 }}>
            {["Home", "Products", "About", "Contact"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: "#343434", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{item}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "#0d1526" }}>
        {/* Background image overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.25 }} />
        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45,61,139,0.92) 0%, rgba(13,21,38,0.85) 50%, rgba(74,150,182,0.7) 100%)" }} />
        {/* Geometric accents */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 220, height: 220, border: "1px solid rgba(74,150,182,0.2)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "3%", width: 180, height: 180, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "120px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div className="dm-sans" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,150,182,0.2)", border: "1px solid rgba(74,150,182,0.4)", padding: "6px 16px", borderRadius: 100, color: "#7bc8e0", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 28, opacity: 0, animation: "fadeUp 0.7s ease 0.2s forwards" }}>
              <Filter size={12} /> Premium Automotive Filtration
            </div>
            <h1 className="playfair" style={{ fontSize: "clamp(40px, 5vw, 68px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 24, opacity: 0, animation: "fadeUp 0.7s ease 0.4s forwards" }}>
              Engineered for<br />
              <span style={{ color: "#4a96b6" }}>Peak Performance</span>
            </h1>
            <p className="dm-sans" style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 40, maxWidth: 480, opacity: 0, animation: "fadeUp 0.7s ease 0.6s forwards" }}>
              V3 Auto Group delivers precision-engineered oil filters, air filters, and foam filters trusted by workshops, fleets, and dealerships across the region.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.7s ease 0.8s forwards" }}>
              <a href="#products" className="btn-primary">Explore Products <ArrowRight size={16} /></a>
              <a href="#contact" className="btn-outline">Get a Quote</a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 36, marginTop: 56, opacity: 0, animation: "fadeUp 0.7s ease 1s forwards" }}>
              {[["15+", "Years"], ["50K+", "Filters"], ["99%", "Satisfaction"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: "#4a96b6" }}>{val}</div>
                  <div className="dm-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating product visual */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="hero-float" style={{ position: "relative", width: 340, height: 340 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,150,182,0.15) 0%, transparent 70%)" }} />
              <div className="pulse-ring" style={{ position: "absolute", inset: "10%", border: "2px solid rgba(74,150,182,0.3)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", inset: "20%", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 160, height: 160, background: "linear-gradient(135deg, #2d3d8b, #4a96b6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(45,61,139,0.5)" }}>
                  <Filter size={60} color="white" strokeWidth={1.5} />
                </div>
              </div>
              {/* Orbiting labels */}
              {[
                { label: "Oil Filter", angle: -30, dist: 150 },
                { label: "Air Filter", angle: 100, dist: 150 },
                { label: "Foam Filter", angle: 215, dist: 150 },
              ].map(({ label, angle, dist }) => {
                const rad = (angle * Math.PI) / 180;
                const x = 170 + dist * Math.cos(rad);
                const y = 170 + dist * Math.sin(rad);
                return (
                  <div key={label} style={{ position: "absolute", top: y - 16, left: x - 48, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "4px 14px", color: "white", fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{label}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", cursor: "pointer" }} onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}>
          <span className="dm-sans" style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={20} />
        </div>

        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: "100px 32px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="dm-sans" style={{ fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: "#4a96b6", marginBottom: 12 }}>What We Supply</div>
              <h2 className="playfair" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 16 }}>Our Product Range</h2>
              <p className="dm-sans" style={{ fontSize: 16, color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                Precision-crafted filtration solutions designed for reliability, longevity, and compatibility across all vehicle classes.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {products.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.12}>
                <div className="product-card" style={{ background: "white", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #eef0f5" }}>
                  {/* Card header */}
                  <div style={{ background: p.color, padding: "40px 32px 32px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 100, fontSize: 11, fontFamily: "'DM Sans',sans-serif", fontWeight: 600, color: "white", letterSpacing: "0.5px" }}>{p.badge}</div>
                    <div style={{ width: 60, height: 60, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <p.icon size={28} color="white" />
                    </div>
                    <h3 className="playfair" style={{ fontSize: 26, fontWeight: 700, color: "white", marginBottom: 6 }}>{p.name}</h3>
                    <div className="dm-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", letterSpacing: "0.5px" }}>{p.tagline}</div>
                  </div>
                  {/* Card body */}
                  <div style={{ padding: "28px 32px 32px" }}>
                    <p className="dm-sans" style={{ fontSize: 14, color: "#666", lineHeight: 1.75, marginBottom: 24 }}>{p.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                      {p.features.map(f => (
                        <div key={f} className="feature-check">
                          <CheckCircle size={15} color={p.color} strokeWidth={2.5} />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <a href="#contact" className="btn-primary" style={{ background: p.color, width: "100%", justifyContent: "center", fontSize: 13 }}>
                      Enquire Now <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ background: "#2d3d8b", padding: "72px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, textAlign: "center" }}>
          {stats.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="stat-card">
                <div className="playfair" style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1 }}>{s.value}</div>
                <div className="dm-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "2px", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="about" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <AnimatedSection>
            <div className="dm-sans" style={{ fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: "#4a96b6", marginBottom: 12 }}>Why Choose Us</div>
            <h2 className="playfair" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 20, lineHeight: 1.2 }}>
              The V3 Standard of<br /><span className="gradient-text">Excellence</span>
            </h2>
            <p className="dm-sans" style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 36 }}>
              With over 15 years of experience in the automotive filtration industry, V3 Auto Group has built a reputation for supplying products that professionals trust — combining rigorous quality control with deep technical expertise.
            </p>
            <div style={{ display: "flex", gap: 40 }}>
              <div>
                <div className="playfair" style={{ fontSize: 36, fontWeight: 700, color: "#2d3d8b" }}>200+</div>
                <div className="dm-sans" style={{ fontSize: 13, color: "#888" }}>Vehicle brands covered</div>
              </div>
              <div>
                <div className="playfair" style={{ fontSize: 36, fontWeight: 700, color: "#4a96b6" }}>ISO</div>
                <div className="dm-sans" style={{ fontSize: 13, color: "#888" }}>Certified products</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {whyUs.map((w, i) => (
              <AnimatedSection key={w.title} delay={i * 0.1}>
                <div style={{ background: i % 2 === 0 ? "#f8f9fc" : "white", border: "1px solid #eef0f5", borderRadius: 8, padding: "28px 24px", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4a96b6"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(74,150,182,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#eef0f5"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ width: 48, height: 48, background: "#e8ecf8", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <w.icon size={22} color="#2d3d8b" />
                  </div>
                  <h4 className="playfair" style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{w.title}</h4>
                  <p className="dm-sans" style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" style={{ padding: "100px 32px", background: "#f8f9fc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="dm-sans" style={{ fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: "#4a96b6", marginBottom: 12 }}>Get In Touch</div>
              <h2 className="playfair" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 14 }}>Request a Quote</h2>
              <p className="dm-sans" style={{ fontSize: 16, color: "#666", maxWidth: 480, margin: "0 auto" }}>
                Fill out the form and our team will get back to you with pricing and availability within 24 hours.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>
            {/* Contact info */}
            <AnimatedSection>
              <div style={{ background: "#2d3d8b", borderRadius: 10, padding: "44px 36px", color: "white", position: "sticky", top: 100 }}>
                <h3 className="playfair" style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Contact Details</h3>
                <p className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 40 }}>
                  Reach us through any channel and our team will respond promptly.
                </p>
                {[
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: Mail, label: "Email", value: "info@v3autogroup.com" },
                  { icon: MapPin, label: "Address", value: "Industrial Area, Phase 2, New Delhi" }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                    <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.12)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={18} color="white" />
                    </div>
                    <div>
                      <div className="dm-sans" style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>{label}</div>
                      <div className="dm-sans" style={{ fontSize: 14, color: "white", fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, marginTop: 8 }}>
                  <div className="dm-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Business Hours</div>
                  <div className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Mon – Sat: 9:00 AM – 6:00 PM</div>
                  <div className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Sunday: Closed</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.15}>
              <div style={{ background: "white", borderRadius: 10, padding: "48px 44px", boxShadow: "0 8px 40px rgba(0,0,0,0.06)", border: "1px solid #eef0f5" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ width: 72, height: 72, background: "#e6f4f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <CheckCircle size={36} color="#2d3d8b" />
                    </div>
                    <h3 className="playfair" style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: 12 }}>Request Sent!</h3>
                    <p className="dm-sans" style={{ color: "#666", fontSize: 15 }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                      <div>
                        <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Full Name *</label>
                        <input required className="form-input" placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Company</label>
                        <input className="form-input" placeholder="Company name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                      <div>
                        <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Email Address *</label>
                        <input required type="email" className="form-input" placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                      <div>
                        <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Phone Number</label>
                        <input type="tel" className="form-input" placeholder="+91 00000 00000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Product Interest *</label>
                      <select required className="form-input" value={formData.product} onChange={e => setFormData({ ...formData, product: e.target.value })}>
                        <option value="">Select a product</option>
                        <option value="oil-filter">Oil Filter</option>
                        <option value="air-filter">Air Filter</option>
                        <option value="foam-filter">Foam Filter</option>
                        <option value="all">All Products</option>
                      </select>
                    </div>
                    <div style={{ marginBottom: 32 }}>
                      <label className="dm-sans" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#444", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 8 }}>Message</label>
                      <textarea className="form-input" rows={4} placeholder="Tell us about your requirements, quantities, or any specific queries..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical", minHeight: 110 }} />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 32px", fontSize: 14, borderRadius: 4 }}>
                      Send Enquiry <ArrowRight size={17} />
                    </button>
                    <p className="dm-sans" style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 16 }}>
                      We respect your privacy. Your information is never shared.
                    </p>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a1f36", padding: "60px 32px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 60, marginBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, background: "#2d3d8b", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Car size={18} color="white" />
                </div>
                <div className="playfair" style={{ fontSize: 18, fontWeight: 700, color: "white" }}>V3 Auto Group</div>
              </div>
              <p className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 320 }}>
                Supplying premium automotive filtration solutions to workshops, dealerships, and fleet operators since 2009.
              </p>
            </div>
            <div>
              <div className="dm-sans" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 20 }}>Products</div>
              {["Oil Filter", "Air Filter", "Foam Filter"].map(p => (
                <div key={p} className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#4a96b6"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{p}</div>
              ))}
            </div>
            <div>
              <div className="dm-sans" style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 20 }}>Company</div>
              {["About Us", "Contact", "Privacy Policy"].map(p => (
                <div key={p} className="dm-sans" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#4a96b6"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{p}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div className="dm-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2025 V3 Auto Group. All rights reserved.</div>
            <div className="dm-sans" style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Engineered for Excellence.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}