import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     to: "/"         },
  { label: "Products", to: "/product" },
  { label: "About",    to: "/about"    },
  { label: "Contact",  to: "/contact"  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');

  /* ─── Reset / base ─────────────────────────────────────────── */
  *, *::before, *::after { box-sizing: border-box; }

  /* ─── CSS custom properties for fluid sizing ────────────────── */
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

  /* ─── Navbar shell ───────────────────────────────────────────── */
  .v3-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.35s ease, padding 0.35s ease;
  }

  .v3-nav.scrolled {
    box-shadow: 0 2px 24px rgba(45,61,139,0.10);
  }

  /* ─── Inner bar ──────────────────────────────────────────────── */
  .v3-nav-bar {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(14px, 4vw, 40px);
    height: var(--nav-h);
    display: flex;
    align-items: center;
    gap: clamp(10px, 2vw, 24px);
    transition: height 0.35s ease;
  }

  .v3-nav.scrolled .v3-nav-bar {
    height: var(--nav-h-scrolled);
  }

  /* ─── Right cluster ──────────────────────────────────────────── */
  .v3-right {
    display: flex;
    align-items: center;
    gap: clamp(2px, 0.5vw, 4px);
    margin-left: auto;
  }

  /* Hamburger always pushed to far right on mobile */
  @media (max-width: 768px) {
    .v3-nav-bar {
      justify-content: space-between;
    }
    .v3-ham {
      margin-left: auto;
    }
  }

  /* ─── Logo ───────────────────────────────────────────────────── */
  .v3-logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
  }

  .v3-logo img {
    height: var(--logo-h);
    width: auto;
    object-fit: contain;
    display: block;
    transition: height 0.35s ease, opacity 0.2s;
  }

  .v3-nav.scrolled .v3-logo img {
    height: var(--logo-h-scrolled);
  }

  .v3-logo:hover img { opacity: 0.82; }

  .v3-logo-fallback {
    font-family: 'Playfair Display', serif;
    font-size: clamp(15px, 2vw, 20px);
    font-weight: 700;
    color: var(--brand);
    letter-spacing: 0.3px;
    white-space: nowrap;
  }

  /* ─── Desktop nav links ──────────────────────────────────────── */
  .v3-desktop-links {
    display: flex;
    align-items: center;
    gap: clamp(0px, 0.3vw, 2px);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .v3-nav-link {
    font-family: 'DM Sans', sans-serif;
    font-size: var(--link-fs);
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    padding: clamp(6px, 0.8vw, 8px) clamp(10px, 1.2vw, 15px);
    border-radius: 8px;
    position: relative;
    display: block;
    white-space: nowrap;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .v3-nav-link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: clamp(10px, 1.2vw, 15px);
    right: clamp(10px, 1.2vw, 15px);
    height: 2px;
    background: var(--brand);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.3s cubic-bezier(.25,.46,.45,.94);
  }

  .v3-nav-link:hover {
    color: var(--brand);
    background: var(--brand-light);
  }

  .v3-nav-link:hover::after { transform: scaleX(1); }

  /* ─── Separator ──────────────────────────────────────────────── */
  .v3-sep {
    width: 1px;
    height: 22px;
    background: #e4e7f0;
    flex-shrink: 0;
    margin: 0 clamp(4px, 0.6vw, 8px);
  }

  /* ─── CTA button ─────────────────────────────────────────────── */
  .v3-cta {
    display: flex;
    align-items: center;
    gap: clamp(5px, 0.6vw, 7px);
    font-family: 'DM Sans', sans-serif;
    font-size: var(--cta-fs);
    font-weight: 600;
    color: #fff;
    background: var(--brand);
    text-decoration: none;
    padding: var(--cta-py) var(--cta-px);
    border-radius: 10px;
    flex-shrink: 0;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .v3-cta::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.1);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .v3-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px var(--brand-glow);
  }

  .v3-cta:hover::before { opacity: 1; }
  .v3-cta:active { transform: translateY(0); box-shadow: none; }

  .v3-cta-icon { transition: transform 0.25s ease; flex-shrink: 0; }
  .v3-cta:hover .v3-cta-icon { transform: translateX(3px); }

  /* ─── Hamburger ──────────────────────────────────────────────── */
  .v3-ham {
    display: none;
    width: clamp(36px, 5vw, 40px);
    height: clamp(36px, 5vw, 40px);
    border-radius: 10px;
    border: none;
    background: #f0f3fa;
    color: var(--brand);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s ease, transform 0.2s ease;
  }

  .v3-ham:hover { background: #e4e9f7; }
  .v3-ham:active { transform: scale(0.94); }

  /* ─── Scroll progress bar ────────────────────────────────────── */
  .v3-scroll-bar {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--brand) 0%, #5b70c4 100%);
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
  }

  /* ─── Overlay ────────────────────────────────────────────────── */
  .v3-overlay {
    position: fixed;
    inset: 0;
    background: rgba(45,61,139,0.28);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .v3-overlay.open { opacity: 1; pointer-events: all; }

  /* ─── Side drawer ────────────────────────────────────────────── */
  .v3-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: var(--drawer-w);
    background: #fff;
    z-index: 999;
    box-shadow: -16px 0 60px rgba(45,61,139,0.14);
    transform: translateX(100%);
    transition: transform 0.42s cubic-bezier(.25,.46,.45,.94);
    display: flex;
    flex-direction: column;
  }

  .v3-drawer.open { transform: translateX(0); }

  .v3-drawer-head {
    padding: clamp(14px, 3vw, 20px) clamp(14px, 3vw, 20px) clamp(12px, 2vw, 16px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .v3-drawer-close {
    width: clamp(32px, 5vw, 36px);
    height: clamp(32px, 5vw, 36px);
    border-radius: 9px;
    border: 1px solid #e4e7f0;
    background: none;
    cursor: pointer;
    color: var(--brand);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }

  .v3-drawer-close:hover {
    background: var(--brand);
    color: #fff;
    border-color: var(--brand);
  }

  .v3-drawer-body {
    flex: 1;
    padding: clamp(8px, 2vw, 12px);
    overflow-y: auto;
  }

  .v3-drawer-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: clamp(12px, 2.5vw, 14px) clamp(12px, 2.5vw, 14px);
    border-radius: 10px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: clamp(14px, 3.5vw, 15px);
    text-decoration: none;
    transition: background 0.2s, color 0.2s;
    opacity: 0;
    transform: translateX(16px);
  }

  .v3-drawer.open .v3-drawer-link {
    opacity: 1;
    transform: translateX(0);
  }

  .v3-drawer.open .v3-drawer-link:nth-child(1) { transition: background 0.2s, color 0.2s, opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s; }
  .v3-drawer.open .v3-drawer-link:nth-child(2) { transition: background 0.2s, color 0.2s, opacity 0.35s ease 0.10s, transform 0.35s ease 0.10s; }
  .v3-drawer.open .v3-drawer-link:nth-child(3) { transition: background 0.2s, color 0.2s, opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s; }
  .v3-drawer.open .v3-drawer-link:nth-child(4) { transition: background 0.2s, color 0.2s, opacity 0.35s ease 0.20s, transform 0.35s ease 0.20s; }

  .v3-drawer-link:hover { background: #f0f3fa; color: var(--brand); }

  .v3-drawer-link .v3-chev {
    color: var(--muted);
    transition: transform 0.2s, color 0.2s;
    flex-shrink: 0;
  }

  .v3-drawer-link:hover .v3-chev { transform: translateX(3px); color: var(--brand); }

  .v3-drawer-foot {
    padding: clamp(12px, 2.5vw, 16px) clamp(14px, 3vw, 20px) clamp(20px, 5vw, 28px);
    border-top: 1px solid var(--border);
  }

  .v3-drawer-cta {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(13px, 3.5vw, 14px);
    font-weight: 600;
    color: #fff;
    background: var(--brand);
    text-decoration: none;
    padding: clamp(12px, 3vw, 14px) 20px;
    border-radius: 10px;
    transition: background 0.25s, box-shadow 0.25s;
  }

  .v3-drawer-cta:hover {
    background: #3a4fa8;
    box-shadow: 0 6px 20px rgba(45,61,139,0.25);
  }

  /* ─── Breakpoints ────────────────────────────────────────────── */

  /* Large desktop (1280px+): full layout, comfortable spacing */
  @media (min-width: 1280px) {
    :root {
      --link-fs: 14px;
      --cta-fs: 13.5px;
    }
  }

  /* Medium desktop / tablet-landscape (1024px – 1279px) */
  @media (max-width: 1279px) and (min-width: 1025px) {
    :root {
      --link-fs: 13px;
      --cta-fs: 12.5px;
      --cta-px: 16px;
    }
    .v3-nav-link { padding: 7px 11px; }
  }

  /* Small desktop / tablet-landscape (769px – 1024px):
     Keep full nav but tighten spacing */
  @media (max-width: 1024px) and (min-width: 769px) {
    :root {
      --link-fs: 12.5px;
      --cta-fs: 12px;
      --cta-px: 13px;
      --cta-py: 8px;
    }
    .v3-nav-link { padding: 6px 10px; }
    .v3-sep { margin: 0 4px; }
  }

  /* Tablet-portrait + mobile (≤768px): hide desktop links, show hamburger */
  @media (max-width: 768px) {
    .v3-right { display: none !important; }
    .v3-ham { display: flex; }
  }

  /* Small mobile (≤480px): tighten nav bar padding */
  @media (max-width: 480px) {
    :root {
      --nav-h: 52px;
      --nav-h-scrolled: 44px;
      --logo-h: 28px;
      --logo-h-scrolled: 22px;
    }
    .v3-nav-bar {
      padding: 0 14px;
      gap: 8px;
    }
    .v3-logo-fallback {
      font-size: 14px;
    }
    .v3-ham {
      width: 34px;
      height: 34px;
    }
    .v3-drawer-link {
      font-size: 14px;
      padding: 12px;
    }
    .v3-drawer-cta {
      font-size: 13px;
      padding: 12px 16px;
    }
  }

  /* Tiny screens (≤360px) */
  @media (max-width: 360px) {
    :root {
      --nav-h: 48px;
      --logo-h: 26px;
    }
    .v3-nav-bar {
      padding: 0 12px;
    }
    .v3-logo-fallback {
      font-size: 13px;
    }
    .v3-ham {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }
    .v3-drawer-link {
      padding: 11px 10px;
      font-size: 13.5px;
    }
    .v3-drawer-cta {
      font-size: 12.5px;
    }
  }

  /* Large screens / 4K (≥1920px) */
  @media (min-width: 1920px) {
    :root {
      --link-fs: 15px;
      --cta-fs: 14px;
    }
    .v3-nav-bar {
      max-width: 1600px;
    }
    .v3-nav-link { padding: 9px 17px; }
    .v3-cta { padding: 11px 24px; border-radius: 12px; }
  }
`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [imgError, setImgError] = useState(false);

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
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrolled = scrollY > 50;

  return (
    <>
      <style>{css}</style>

      {/* Backdrop overlay */}
      <div
        className={`v3-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side drawer */}
      <div className={`v3-drawer${menuOpen ? " open" : ""}`}>
        <div className="v3-drawer-head">
       
            <X size={16} />
        
        </div>

        <nav className="v3-drawer-body">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="v3-drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <ChevronRight size={16} className="v3-chev" />
            </Link>
          ))}
        </nav>

        <div className="v3-drawer-foot">
          <Link to="/contact" className="v3-drawer-cta" onClick={() => setMenuOpen(false)}>
            Get a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`v3-nav${scrolled ? " scrolled" : ""}`}>
        <div className="v3-nav-bar">

          {/* Logo */}
          <Link to="/" className="v3-logo">
            {!imgError ? (
              <img src="/logo4.png" alt="V3 Auto Group" onError={() => setImgError(true)} />
            ) : (
              <span className="v3-logo-fallback">V3 Auto Group</span>
            )}
          </Link>

          {/* Desktop nav links + CTA */}
          <div className="v3-right">
            <ul className="v3-desktop-links">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="v3-nav-link">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="v3-sep" />
            <Link to="/contact" className="v3-cta">
              Get a Quote
              <ArrowRight size={14} className="v3-cta-icon" />
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="v3-ham"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="v3-scroll-bar" style={{ width: `${scrollPct}%` }} />
      </nav>
    </>
  );
}