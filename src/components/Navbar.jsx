import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, ChevronRight, Shield, Zap, Truck, CheckCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     to: "/"         },
  { label: "Products", to: "/product" },
  { label: "About",    to: "/about"    },
  { label: "Contact",  to: "/contact"  },
];

/* ── QUOTE MODAL ── */
function QuoteModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", product: "", message: "" });
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) { setStep(1); setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", product: "", message: "" }); document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(6,13,31,0.72)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", animation: "qmBgIn .22s ease" }}
    >
      <style>{`
        @keyframes qmBgIn { from{opacity:0} to{opacity:1} }
        @keyframes qmIn { from{opacity:0;transform:scale(.94) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes qmCheck { 0%{transform:scale(0)} 75%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .qf { width:100%; padding:11px 14px; border:1.5px solid #e5e9f0; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13.5px; color:#1a1a1a; background:#f8f9fc; outline:none; transition:all .22s; box-sizing:border-box; }
        .qf:focus { border-color:#2d3d8b; background:#fff; box-shadow:0 0 0 4px rgba(45,61,139,0.09); }
        .qf::placeholder { color:#b0b8c4; }
        select.qf { appearance:none; cursor:pointer; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' fill='none' viewBox='0 0 12 7'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M1 1l5 5 5-5'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; background-size:12px; padding-right:36px; }
        textarea.qf { resize:vertical; min-height:84px; }
        .ql { display:block; font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; color:#374151; letter-spacing:1px; text-transform:uppercase; margin-bottom:5px; }
        .qrow { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
        @media(max-width:500px){ .qrow { grid-template-columns:1fr; } }
        .qsub { width:100%; padding:13px; border:none; border-radius:11px; cursor:pointer; background:linear-gradient(135deg,#2d3d8b,#3d52b8); color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; display:flex; align-items:center; justify-content:center; gap:8px; transition:all .28s; box-shadow:0 6px 20px rgba(45,61,139,0.28); }
        .qsub:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(45,61,139,0.38); }
        .qback { background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; color:#9ca3af; display:flex; align-items:center; gap:5px; padding:4px 0; margin-bottom:14px; transition:color .2s; }
        .qback:hover { color:#2d3d8b; }
      `}</style>

      <div style={{ background: "#fff", borderRadius: 22, width: "100%", maxWidth: 520, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 40px 100px rgba(6,13,31,0.45)", animation: "qmIn .32s cubic-bezier(.16,1,.3,1)" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#0d1535,#1a2560)", padding: "20px 24px 18px", position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#2d3d8b,#4a96b6,#7ecde8)" }} />
          <div style={{ position: "absolute", top: -28, right: -28, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle,rgba(74,150,182,0.22),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(74,150,182,0.14)", border: "1px solid rgba(74,150,182,0.3)", padding: "3px 11px", borderRadius: 100, marginBottom: 9 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4a96b6" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, color: "#7ecde8", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>
                  {submitted ? "Done" : step === 1 ? "Step 1 of 2" : "Step 2 of 2"}
                </span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(18px,4vw,21px)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>
                {submitted ? "We'll Be In Touch!" : "Get a Free Quote"}
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 400 }}>
                {submitted ? "Our team responds within 24 hours." : "Fill in details — we respond within 24 hrs."}
              </p>
            </div>
            <button onClick={onClose}
              style={{ width: 33, height: 33, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
            ><X size={14} color="rgba(255,255,255,0.7)" /></button>
          </div>
          {!submitted && (
            <div style={{ marginTop: 14, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#4a96b6,#7ecde8)", width: step === 1 ? "50%" : "100%", transition: "width .4s cubic-bezier(.16,1,.3,1)" }} />
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ overflowY: "auto", padding: "22px 24px 24px", flex: 1 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#e8ecf8,#d5e8f3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", animation: "qmCheck .5s cubic-bezier(.34,1.56,.64,1)" }}>
                <CheckCircle size={32} color="#2d3d8b" />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#0a0f1e", marginBottom: 8 }}>Enquiry Received!</h3>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
                Thank you, <strong style={{ color: "#2d3d8b" }}>{form.name || "there"}</strong>!<br />We'll respond with pricing within 24 hours.
              </p>
              <button onClick={onClose} style={{ padding: "11px 28px", border: "none", borderRadius: 11, cursor: "pointer", background: "linear-gradient(135deg,#2d3d8b,#3d52b8)", color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, boxShadow: "0 6px 18px rgba(45,61,139,0.28)" }}>
                Close
              </button>
            </div>
          ) : step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="qrow">
                <div><label className="ql">Full Name *</label><input required className="qf" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="ql">Company</label><input className="qf" placeholder="Workshop / Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
              </div>
              <div className="qrow">
                <div><label className="ql">Email *</label><input required type="email" className="qf" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="ql">Phone</label><input type="tel" className="qf" placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="ql">Product Interest *</label>
                <select required className="qf" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}>
                  <option value="">— Select a product —</option>
                  <option value="oil-filter">Oil Filter</option>
                  <option value="air-filter">Air Filter</option>
                  <option value="foam-filter">Foam Filter</option>
                  <option value="oil-strainer">Oil Strainer Filter</option>
                  <option value="all">All Products</option>
                </select>
              </div>
              <button type="submit" className="qsub">Continue <ArrowRight size={15} /></button>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <button type="button" className="qback" onClick={() => setStep(1)}>
                <ArrowRight size={12} style={{ transform: "rotate(180deg)" }} /> Back
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, padding: "9px 13px", background: "#f0f4fe", borderRadius: 10, border: "1px solid #c5d0ee" }}>
                <CheckCircle size={13} color="#2d3d8b" />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#2d3d8b", fontWeight: 500 }}>{form.name} · {form.email}</span>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label className="ql">Requirements *</label>
                <textarea required className="qf" rows={4} placeholder="Quantities, vehicle types, part numbers, or any questions…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="ql">Order Type</label>
                <select className="qf">
                  <option value="">— Select order type —</option>
                  <option>Sample / Trial Order</option>
                  <option>Bulk / Wholesale</option>
                  <option>OEM / Contract Manufacturing</option>
                  <option>Regular Supply / AMC</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                {[{ icon: Shield, text: "Secure & Private" }, { icon: Zap, text: "24hr Response" }, { icon: Truck, text: "PAN India" }].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 5, background: "#f4f6fb", border: "1px solid #e5e9f0", borderRadius: 8, padding: "5px 10px" }}>
                    <Icon size={11} color="#4a96b6" /><span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10.5, color: "#6b7280", fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
              <button type="submit" className="qsub">Send Enquiry <ArrowRight size={15} /></button>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "#c4c9d4", textAlign: "center", marginTop: 10 }}>🔒 Your information is secure and never shared.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  :root {
    --nav-h: clamp(56px, 8vw, 70px);
    --nav-h-scrolled: clamp(46px, 6vw, 58px);
    --logo-h: clamp(30px, 5vw, 46px);
    --logo-h-scrolled: clamp(24px, 4vw, 38px);
    --link-fs: clamp(12px, 1.2vw, 14px);
    --cta-fs: clamp(11px, 1.1vw, 13.5px);
    --cta-px: clamp(12px, 1.8vw, 20px);
    --cta-py: clamp(8px, 1vw, 10px);
    --brand: #2d3d8b;
    --brand-light: rgba(45,61,139,0.06);
    --brand-glow: rgba(45,61,139,0.30);
    --border: #eef0f5;
    --text: #343434;
    --muted: #9ca3af;
    --drawer-w: min(320px, 86vw);
  }
  .v3-nav { position:fixed; top:0; left:0; right:0; z-index:1000; background:rgba(255,255,255,0.97); backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%); border-bottom:1px solid var(--border); transition:box-shadow 0.35s ease, padding 0.35s ease; }
  .v3-nav.scrolled { box-shadow:0 2px 24px rgba(45,61,139,0.10); }
  .v3-nav-bar { max-width:1280px; margin:0 auto; padding:0 clamp(14px,4vw,40px); height:var(--nav-h); display:flex; align-items:center; gap:clamp(10px,2vw,24px); transition:height 0.35s ease; }
  .v3-nav.scrolled .v3-nav-bar { height:var(--nav-h-scrolled); }
  .v3-right { display:flex; align-items:center; gap:clamp(2px,0.5vw,4px); margin-left:auto; }
  @media(max-width:768px){ .v3-nav-bar{justify-content:space-between;} .v3-ham{margin-left:auto;} }
  .v3-logo { display:flex; align-items:center; text-decoration:none; flex-shrink:0; }
  .v3-logo img { height:var(--logo-h); width:auto; object-fit:contain; display:block; transition:height 0.35s ease, opacity 0.2s; }
  .v3-nav.scrolled .v3-logo img { height:var(--logo-h-scrolled); }
  .v3-logo:hover img { opacity:0.82; }
  .v3-logo-fallback { font-family:'Playfair Display',serif; font-size:clamp(15px,2vw,20px); font-weight:700; color:var(--brand); letter-spacing:0.3px; white-space:nowrap; }
  .v3-desktop-links { display:flex; align-items:center; gap:clamp(0px,0.3vw,2px); list-style:none; margin:0; padding:0; }
  .v3-nav-link { font-family:'DM Sans',sans-serif; font-size:var(--link-fs); font-weight:500; color:var(--text); text-decoration:none; padding:clamp(6px,0.8vw,8px) clamp(10px,1.2vw,15px); border-radius:8px; position:relative; display:block; white-space:nowrap; transition:color 0.2s ease, background 0.2s ease; }
  .v3-nav-link::after { content:''; position:absolute; bottom:4px; left:clamp(10px,1.2vw,15px); right:clamp(10px,1.2vw,15px); height:2px; background:var(--brand); border-radius:2px; transform:scaleX(0); transform-origin:left center; transition:transform 0.3s cubic-bezier(.25,.46,.45,.94); }
  .v3-nav-link:hover { color:var(--brand); background:var(--brand-light); }
  .v3-nav-link:hover::after { transform:scaleX(1); }
  .v3-sep { width:1px; height:22px; background:#e4e7f0; flex-shrink:0; margin:0 clamp(4px,0.6vw,8px); }
  .v3-cta { display:flex; align-items:center; gap:clamp(5px,0.6vw,7px); font-family:'DM Sans',sans-serif; font-size:var(--cta-fs); font-weight:600; color:#fff; background:var(--brand); border:none; cursor:pointer; padding:var(--cta-py) var(--cta-px); border-radius:10px; flex-shrink:0; white-space:nowrap; position:relative; overflow:hidden; transition:transform 0.25s ease, box-shadow 0.25s ease; }
  .v3-cta::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.1); opacity:0; transition:opacity 0.25s; }
  .v3-cta:hover { transform:translateY(-1px); box-shadow:0 6px 20px var(--brand-glow); }
  .v3-cta:hover::before { opacity:1; }
  .v3-cta:active { transform:translateY(0); box-shadow:none; }
  .v3-cta-icon { transition:transform 0.25s ease; flex-shrink:0; }
  .v3-cta:hover .v3-cta-icon { transform:translateX(3px); }
  .v3-ham { display:none; width:clamp(36px,5vw,40px); height:clamp(36px,5vw,40px); border-radius:10px; border:none; background:#f0f3fa; color:var(--brand); align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:background 0.2s ease, transform 0.2s ease; }
  .v3-ham:hover { background:#e4e9f7; }
  .v3-ham:active { transform:scale(0.94); }
  .v3-scroll-bar { position:absolute; bottom:0; left:0; height:2px; background:linear-gradient(90deg,var(--brand) 0%,#5b70c4 100%); transition:width 0.1s linear; border-radius:0 2px 2px 0; }
  .v3-overlay { position:fixed; inset:0; background:rgba(45,61,139,0.28); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); z-index:998; opacity:0; pointer-events:none; transition:opacity 0.4s ease; }
  .v3-overlay.open { opacity:1; pointer-events:all; }
  .v3-drawer { position:fixed; top:0; right:0; bottom:0; width:var(--drawer-w); background:#fff; z-index:999; box-shadow:-16px 0 60px rgba(45,61,139,0.14); transform:translateX(100%); transition:transform 0.42s cubic-bezier(.25,.46,.45,.94); display:flex; flex-direction:column; }
  .v3-drawer.open { transform:translateX(0); }
  .v3-drawer-head { padding:clamp(14px,3vw,20px) clamp(14px,3vw,20px) clamp(12px,2vw,16px); border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; }
  .v3-drawer-close { width:clamp(32px,5vw,36px); height:clamp(32px,5vw,36px); border-radius:9px; border:1px solid #e4e7f0; background:none; cursor:pointer; color:var(--brand); display:flex; align-items:center; justify-content:center; transition:background 0.2s, color 0.2s, border-color 0.2s; }
  .v3-drawer-close:hover { background:var(--brand); color:#fff; border-color:var(--brand); }
  .v3-drawer-body { flex:1; padding:clamp(8px,2vw,12px); overflow-y:auto; }
  .v3-drawer-link { display:flex; align-items:center; justify-content:space-between; padding:clamp(12px,2.5vw,14px) clamp(12px,2.5vw,14px); border-radius:10px; color:var(--text); font-family:'DM Sans',sans-serif; font-weight:500; font-size:clamp(14px,3.5vw,15px); text-decoration:none; transition:background 0.2s, color 0.2s; opacity:0; transform:translateX(16px); }
  .v3-drawer.open .v3-drawer-link { opacity:1; transform:translateX(0); }
  .v3-drawer.open .v3-drawer-link:nth-child(1){transition:background .2s,color .2s,opacity .35s ease .05s,transform .35s ease .05s;}
  .v3-drawer.open .v3-drawer-link:nth-child(2){transition:background .2s,color .2s,opacity .35s ease .10s,transform .35s ease .10s;}
  .v3-drawer.open .v3-drawer-link:nth-child(3){transition:background .2s,color .2s,opacity .35s ease .15s,transform .35s ease .15s;}
  .v3-drawer.open .v3-drawer-link:nth-child(4){transition:background .2s,color .2s,opacity .35s ease .20s,transform .35s ease .20s;}
  .v3-drawer-link:hover { background:#f0f3fa; color:var(--brand); }
  .v3-drawer-link .v3-chev { color:var(--muted); transition:transform 0.2s, color 0.2s; flex-shrink:0; }
  .v3-drawer-link:hover .v3-chev { transform:translateX(3px); color:var(--brand); }
  .v3-drawer-foot { padding:clamp(12px,2.5vw,16px) clamp(14px,3vw,20px) clamp(20px,5vw,28px); border-top:1px solid var(--border); }
  .v3-drawer-cta { display:flex; align-items:center; justify-content:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:clamp(13px,3.5vw,14px); font-weight:600; color:#fff; background:var(--brand); border:none; cursor:pointer; width:100%; padding:clamp(12px,3vw,14px) 20px; border-radius:10px; transition:background 0.25s, box-shadow 0.25s; }
  .v3-drawer-cta:hover { background:#3a4fa8; box-shadow:0 6px 20px rgba(45,61,139,0.25); }
  @media(min-width:1280px){ :root{--link-fs:14px;--cta-fs:13.5px;} }
  @media(max-width:1279px) and (min-width:1025px){ :root{--link-fs:13px;--cta-fs:12.5px;--cta-px:16px;} .v3-nav-link{padding:7px 11px;} }
  @media(max-width:1024px) and (min-width:769px){ :root{--link-fs:12.5px;--cta-fs:12px;--cta-px:13px;--cta-py:8px;} .v3-nav-link{padding:6px 10px;} .v3-sep{margin:0 4px;} }
  @media(max-width:768px){ .v3-right{display:none !important;} .v3-ham{display:flex;} }
  @media(max-width:480px){ :root{--nav-h:52px;--nav-h-scrolled:44px;--logo-h:28px;--logo-h-scrolled:22px;} .v3-nav-bar{padding:0 14px;gap:8px;} .v3-logo-fallback{font-size:14px;} .v3-ham{width:34px;height:34px;} .v3-drawer-link{font-size:14px;padding:12px;} .v3-drawer-cta{font-size:13px;padding:12px 16px;} }
  @media(max-width:360px){ :root{--nav-h:48px;--logo-h:26px;} .v3-nav-bar{padding:0 12px;} .v3-logo-fallback{font-size:13px;} .v3-ham{width:32px;height:32px;border-radius:8px;} .v3-drawer-link{padding:11px 10px;font-size:13.5px;} .v3-drawer-cta{font-size:12.5px;} }
  @media(min-width:1920px){ :root{--link-fs:15px;--cta-fs:14px;} .v3-nav-bar{max-width:1600px;} .v3-nav-link{padding:9px 17px;} .v3-cta{padding:11px 24px;border-radius:12px;} }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!quoteOpen) {
      document.body.style.overflow = menuOpen ? "hidden" : "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, quoteOpen]);

  const scrolled = scrollY > 50;

  const openQuote = () => { setMenuOpen(false); setQuoteOpen(true); };

  return (
    <>
      <style>{css}</style>

      {/* Quote Modal */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />

      {/* Backdrop overlay */}
      <div className={`v3-overlay${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      {/* Side drawer */}
      <div className={`v3-drawer${menuOpen ? " open" : ""}`}>
        <div className="v3-drawer-head">
          <button className="v3-drawer-close" onClick={() => setMenuOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="v3-drawer-body">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="v3-drawer-link" onClick={() => setMenuOpen(false)}>
              {label}
              <ChevronRight size={16} className="v3-chev" />
            </Link>
          ))}
        </nav>

        <div className="v3-drawer-foot">
          {/* Drawer CTA → popup */}
          <button className="v3-drawer-cta" onClick={openQuote}>
            Get a Quote <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`v3-nav${scrolled ? " scrolled" : ""}`}>
        <div className="v3-nav-bar">

          <Link to="/" className="v3-logo">
            {!imgError ? (
              <img src="/logo4.png" alt="V3 Auto Group" onError={() => setImgError(true)} />
            ) : (
              <span className="v3-logo-fallback">V3 Auto Group</span>
            )}
          </Link>

          <div className="v3-right">
            <ul className="v3-desktop-links">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="v3-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="v3-sep" />
            {/* Desktop CTA → popup */}
            <button className="v3-cta" onClick={openQuote}>
              Get a Quote
              <ArrowRight size={14} className="v3-cta-icon" />
            </button>
          </div>

          <button className="v3-ham" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="v3-scroll-bar" style={{ width: `${scrollPct}%` }} />
      </nav>
    </>
  );
}