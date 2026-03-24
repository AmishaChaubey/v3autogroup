import { useState, useEffect, useRef } from "react";
import {
  Shield, Wrench, Globe, Award, Clock, Users, CheckCircle,
  ArrowRight, Zap, Layers, Droplets, Wind, Factory, MapPin, ChevronRight
} from "lucide-react";

const NAVY = "#203d8b";
const TEAL = "#4a96b6";
const DARK = "#111827";
const GRAY = "#6b7280";



function useReveal(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setV(true), delay);
    }, { threshold: 0.08 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [delay]

);
  return [ref, v];


}


/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 80); }, []);
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ position: "relative", height: "100svh", minHeight: 480, overflow: "hidden" }}>
      <img
        src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=90&fit=crop"
        alt="hero"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(20,30,70,0.96) 0%, rgba(20,30,70,0.75) 60%, rgba(20,30,70,0.3) 100%)" }} />

      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        padding: "0 clamp(20px,5vw,120px)",
        opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(24px)",
        transition: "opacity 1.1s ease, transform 1.1s ease"
      }}>
        <div style={{ maxWidth: 620, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(16px,3vw,28px)" }}>
            <div style={{ width: 28, height: 2, background: TEAL }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.5vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>V3 Auto Group</span>
          </div>
          <h1 style={{
            fontFamily: "'Cinzel',serif", color: "#fff",
            fontSize: "clamp(2.2rem,7vw,5.5rem)",
            fontWeight: 900, letterSpacing: "0.06em", lineHeight: 1.05,
            margin: "0 0 clamp(16px,3vw,24px)"
          }}>
            About<br />Our Story
          </h1>
          <p style={{
            fontFamily: "'Poppins',sans-serif", color: "rgba(210,225,255,0.8)",
            fontSize: "clamp(12px,2vw,17px)", lineHeight: 1.85,
            maxWidth: 480, margin: "0 0 clamp(24px,4vw,44px)"
          }}>
            A decade of precision engineering — delivering quality automotive filtration solutions across India and beyond.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,1.5vw,12px)" }}>
            {[["12+", "Years"], ["10K+", "SKUs"], ["5+", "Countries"]].map(([v, l]) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: "clamp(6px,1vw,10px)",
                background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50,
                padding: "clamp(7px,1.2vw,10px) clamp(12px,2vw,20px)"
              }}>
                <span style={{ fontFamily: "'Cinzel',serif", color: "#fff", fontSize: "clamp(14px,2vw,18px)", fontWeight: 900 }}>{v}</span>
                <span style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.1em" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ABOUT
══════════════════════════════════════════════ */
function About() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#f8faff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .ab-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px,6vw,80px); align-items: center; }
        @media (max-width: 860px) { .ab-grid { grid-template-columns: 1fr !important; } }
        .ab-float-img { position: absolute; bottom: -28px; right: -20px; width: 48%; }
        @media (max-width: 540px) { .ab-float-img { width: 42%; bottom: -16px; right: -10px; } }
        .ab-year-badge { position: absolute; top: 20px; left: -12px; }
        @media (max-width: 400px) { .ab-year-badge { top: 10px; left: 6px; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="ab-grid" style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)", transition: "all 0.9s ease" }}>
          {/* LEFT */}
       

          {/* RIGHT */}
          <div style={{ paddingBottom: "clamp(24px,4vw,36px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Who We Are</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.5rem,3.5vw,2.8rem)", fontWeight: 900, letterSpacing: "0.06em", lineHeight: 1.15, margin: "0 0 clamp(16px,2.5vw,28px)" }}>
              Engineering Trust,<br />One Filter at a Time
            </h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.9, margin: "0 0 16px" }}>
              V3 Auto Group was founded in 2013 by Late Mr. Omprakash Dhalwan, who brought 33 years of marketing expertise from the Lucas TVS Group. His vision was to cater to the aftermarket business in India — riding the revolutionary growth of the automotive industry and supplying quality products across the trade.
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.9, margin: "0 0 clamp(24px,3vw,40px)" }}>
              V3 Auto Component India Pvt. Ltd. is a leading manufacturer and exporter of high-performance automotive filters, serving all segments of the automotive industry with a strong emphasis on quality, efficiency, and innovation.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,1.5vw,16px)" }}>
              {[
                [Shield, "Quality-first manufacturing since 2013"],
                [Globe, "Exporter & supplier to 5+ countries"],
                [Zap, "Automobile engineers on contract manufacturing"],
                [Award, "Trusted by leading brands across India"],
              ].map(([Icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "clamp(10px,1.5vw,14px)" }}>
                  <div style={{ width: "clamp(32px,4vw,40px)", height: "clamp(32px,4vw,40px)", borderRadius: 12, background: `${NAVY}0d`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color={NAVY} />
                  </div>
                  <span style={{ fontFamily: "'Poppins',sans-serif", color: DARK, fontSize: "clamp(12px,1.4vw,14px)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
             <div style={{ position: "relative" }}>
            <div style={{ borderRadius: "clamp(12px,2vw,20px)", overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 40px 100px rgba(32,61,139,0.18)" }}>
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=90&fit=crop" alt="factory"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div className="ab-float-img" style={{ borderRadius: "clamp(10px,1.5vw,16px)", overflow: "hidden", boxShadow: "0 20px 60px rgba(32,61,139,0.22)", border: "4px solid #f8faff" }}>
              <img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=500&q=85&fit=crop" alt="filter"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            </div>
            <div className="ab-year-badge" style={{ background: NAVY, borderRadius: "clamp(10px,1.5vw,16px)", padding: "clamp(14px,2vw,20px) clamp(14px,2vw,22px)", boxShadow: "0 16px 48px rgba(32,61,139,0.35)" }}>
              <p style={{ fontFamily: "'Cinzel',serif", color: "#fff", fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 900, margin: 0, lineHeight: 1 }}>10<span style={{ color: TEAL }}>+</span></p>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "clamp(8px,1vw,10px)", letterSpacing: "0.2em", margin: "6px 0 0", textTransform: "uppercase" }}>Years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   JOURNEY
══════════════════════════════════════════════ */
const MILES = [
  { year: "2013", n: "01", title: "Founded", desc: "V3 Auto Group established by Late Mr. Omprakash Dhalwan in India." },
  { year: "2015", n: "02", title: "Aftermarket Push", desc: "Rapidly expanded aftermarket filter distribution across India." },
  { year: "2017", n: "03", title: "Pan-India Network", desc: "Built a strong dealer and supplier network across Indian states." },
  { year: "2019", n: "04", title: "Global Exports", desc: "First export shipments to South Asia and East Africa." },
  { year: "2021", n: "05", title: "Contract Mfg.", desc: "Launched contract manufacturing of automotive parts for domestic & export markets." },
  { year: "2023", n: "06", title: "5+ Countries", desc: "V3 filters and spare parts now trusted across 5+ countries worldwide." },
];

function Journey() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#fff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)", overflow: "hidden" }}>
      <style>{`
        .jrn-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 0; }
        @media (max-width: 1000px) { .jrn-grid { grid-template-columns: repeat(3,1fr) !important; gap: 36px !important; } }
        @media (max-width: 600px) { .jrn-grid { grid-template-columns: repeat(2,1fr) !important; gap: 28px !important; } }
        @media (max-width: 360px) { .jrn-grid { grid-template-columns: 1fr !important; gap: 20px !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Our Story</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>The Journey</h2>
          </div>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.5vw,14px)", lineHeight: 1.7, maxWidth: 320, margin: 0 }}>
            Six milestones across a decade of filtration excellence.
          </p>
        </div>

        <div ref={ref} className="jrn-grid" style={{ opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          {MILES.map(({ year, n, title, desc }, i) => (
            <div key={year} style={{ position: "relative", paddingTop: 24, transitionDelay: `${i * 80}ms` }}>
              {i < 5 && <div style={{ position: "absolute", top: 50, left: "50%", right: 0, height: 1, background: `linear-gradient(90deg,${NAVY}44,${NAVY}08)` }} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: i < 5 ? "clamp(8px,1.5vw,16px)" : 0 }}>
                <div style={{ width: "clamp(40px,5vw,52px)", height: "clamp(40px,5vw,52px)", borderRadius: "50%", border: `2px solid ${NAVY}33`, display: "flex", alignItems: "center", justifyContent: "center", background: `${NAVY}08`, marginBottom: 20, flexShrink: 0, zIndex: 1, transition: "all 0.25s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.background = NAVY; e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.querySelector("span").style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${NAVY}08`; e.currentTarget.style.borderColor = `${NAVY}33`; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.querySelector("span").style.color = NAVY; }}>
                  <span style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(10px,1.2vw,13px)", fontWeight: 700, transition: "color 0.25s" }}>{n}</span>
                </div>
                <p style={{ fontFamily: "'Cinzel',serif", color: TEAL, fontSize: "clamp(9px,1.1vw,11px)", fontWeight: 700, letterSpacing: "0.1em", margin: "0 0 6px", textAlign: "center" }}>{year}</p>
                <p style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(9px,1.2vw,12px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", margin: "0 0 10px" }}>{title}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(10px,1.1vw,11px)", lineHeight: 1.7, textAlign: "center", margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FOUNDER
══════════════════════════════════════════════ */
function Founder() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#f8faff", padding: "clamp(60px,8vw,80px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .fn-grid { display: grid; grid-template-columns: clamp(240px,35%,380px) 1fr; border-radius: clamp(12px,2vw,24px); overflow: hidden; }
        @media (max-width: 760px) { .fn-grid { grid-template-columns: 1fr !important; } }
        .fn-stats { display: grid; grid-template-columns: repeat(3,1fr); }
        @media (max-width: 360px) { .fn-stats { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} className="fn-grid" style={{ boxShadow: "0 24px 80px rgba(32,61,139,0.13)", opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)", transition: "all 0.9s ease" }}>
          <div style={{ position: "relative", minHeight: "clamp(280px,40vw,420px)" }}>
            <img src="/founder.jpeg"
              alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,30,70,0.92) 0%, rgba(20,30,70,0.05) 45%)" }} />
            <div style={{ position: "absolute", bottom: 0, padding: "clamp(16px,2.5vw,24px) clamp(16px,2.5vw,28px)" }}>
              <p style={{ fontFamily: "'Cinzel',serif", color: "#fff", fontSize: "clamp(14px,2vw,20px)", fontWeight: 900, letterSpacing: "0.08em", margin: 0 }}>Late Mr. Omprakash Dhalwan</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: TEAL, fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "6px 0 0" }}>Founder & Visionary</p>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "clamp(24px,4vw,36px) clamp(20px,4vw,40px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Our Founder</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 900, letterSpacing: "0.06em", lineHeight: 1.2, margin: "0 0 16px" }}>A Legacy of Vision</h2>
            <div style={{ borderLeft: `3px solid ${TEAL}`, paddingLeft: 18, margin: "0 0 20px" }}>
              <p style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(0.85rem,1.5vw,1.05rem)", fontWeight: 700, lineHeight: 1.55, fontStyle: "italic", margin: 0 }}>
                "Supply quality products — and trust will follow."
              </p>
            </div>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.4vw,13.5px)", lineHeight: 1.85, margin: "0 0 24px" }}>
              With 33 years of marketing experience at Lucas TVS Group, Mr. Omprakash Dhalwan founded V3 Auto Group in 2013 with a vision to cater to India's booming aftermarket automotive sector. He built a company rooted in quality, integrity, and service — a legacy that continues to guide V3 to this day.
            </p>
            <div className="fn-stats" style={{ gap: 1, background: "#f0f0f0", borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
              {[["33", "Yrs at Lucas TVS"], ["2013", "Founded V3"], ["5+", "Countries"]].map(([val, lbl]) => (
                <div key={lbl} style={{ background: "#f8faff", padding: "clamp(12px,2vw,16px) clamp(8px,1.5vw,10px)", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(16px,2.5vw,20px)", fontWeight: 900, margin: 0 }}>{val}</p>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(8px,1vw,9.5px)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "4px 0 0" }}>{lbl}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Shield size={15} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Poppins',sans-serif", color: NAVY, fontSize: "clamp(11px,1.3vw,13px)", fontWeight: 500 }}>A founding vision that drives every product we make</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   WHAT WE DO
══════════════════════════════════════════════ */
const SVCS = [
  { Icon: Droplets, title: "Oil Filters", desc: "High-performance oil filters across all engine types, ensuring clean lubrication and reduced wear." },
  { Icon: Wind, title: "Air Filters", desc: "Advanced air filtration solutions improving vehicle performance across all automotive segments." },
  { Icon: Layers, title: "Foam Filters", desc: "Washable, reusable foam elements for motorcycles, ATVs, and performance applications." },
  { Icon: Wrench, title: "Auto Spare Parts", desc: "A wide range of auto spare parts and accessories sourced and supplied for the automotive industry." },
  { Icon: Factory, title: "Contract Manufacturing", desc: "Automobile engineers delivering contract manufacturing of various automotive parts for domestic and export markets." },
  { Icon: Globe, title: "Global Export & Supply", desc: "Trusted supplier to leading brands in India and exporter to 5+ countries across South Asia and Africa." },
];

function WhatWeDo() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#fff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .wwd-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        @media (max-width: 960px) { .wwd-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 540px) { .wwd-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Our Expertise</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>What We Do</h2>
          </div>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.5vw,14px)", lineHeight: 1.7, maxWidth: 340, margin: 0 }}>
            A complete automotive filtration and spare parts ecosystem — engineered for performance and reliability.
          </p>
        </div>

        <div ref={ref} className="wwd-grid" style={{ background: "#f0f4ff", borderRadius: "clamp(12px,2vw,24px)", overflow: "hidden", opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          {SVCS.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: "#fff", padding: "clamp(24px,4vw,44px) clamp(20px,3vw,36px)", transition: "background 0.25s ease", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <div style={{ width: "clamp(44px,5vw,56px)", height: "clamp(44px,5vw,56px)", borderRadius: 16, background: `${NAVY}0c`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(16px,2.5vw,24px)" }}>
                <Icon size={22} color={NAVY} />
              </div>
              <h3 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>{title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.4vw,13.5px)", lineHeight: 1.85, margin: "0 0 20px" }}>{desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", color: TEAL, fontSize: "clamp(10px,1.2vw,12px)", fontWeight: 600 }}>Learn more</span>
                <ChevronRight size={13} color={TEAL} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MECHANIC MEETS
══════════════════════════════════════════════ */
function MechanicMeets() {
  const [r1, v1] = useReveal();
  const [r2, v2] = useReveal(100);
  const panels = [
    {
      img: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1000&q=90&fit=crop",
      tag: "Workshop Partnership", Icon: Wrench,
      title: "Where Expertise\nMeets Precision",
      desc: "Every V3 filter is engineered with the working mechanic in mind. Correct fitment, reliable performance, and packaging that protects until the last moment. When a mechanic chooses V3, they choose zero comebacks and maximum vehicle performance.",
      flip: false,
    },
    {
      img: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1000&q=90&fit=crop",
      tag: "On the Road", Icon: Shield,
      title: "Engineered for\nEvery Climate",
      desc: "From the dust-laden highways of East Africa to the monsoon-soaked roads of South Asia, V3 filters are field-proven in the most demanding environments on earth — keeping engines clean and efficient wherever the road leads.",
      flip: true,
    },
  ];
  const refs = [r1, r2];
  const vis  = [v1, v2];

  return (
    <section style={{ background: "#f8faff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .mc-row { display: grid; grid-template-columns: 1fr 1fr; border-radius: clamp(12px,2vw,24px); overflow: hidden; }
        @media (max-width: 760px) { .mc-row { grid-template-columns: 1fr !important; } .mc-row > * { order: unset !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 2, background: TEAL }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>In the Field</span>
          </div>
          <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>Mechanic Meets V3</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px,3vw,32px)" }}>
          {panels.map(({ img, tag, Icon, title, desc, flip }, i) => (
            <div key={tag} ref={refs[i]} className="mc-row" style={{ boxShadow: "0 24px 80px rgba(32,61,139,0.12)", opacity: vis[i] ? 1 : 0, transform: vis[i] ? "none" : "translateY(32px)", transition: "all 0.9s ease" }}>
              <div style={{ order: flip ? 2 : 1, position: "relative", overflow: "hidden", minHeight: "clamp(240px,35vw,420px)" }}>
                <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: flip ? "linear-gradient(to left, rgba(20,30,70,0.3), transparent)" : "linear-gradient(to right, rgba(20,30,70,0.3), transparent)" }} />
                <div style={{ position: "absolute", top: 20, left: 20, display: "flex", alignItems: "center", gap: 8, background: "rgba(20,30,70,0.65)", backdropFilter: "blur(8px)", borderRadius: 30, padding: "7px 14px", border: `1px solid ${TEAL}44` }}>
                  <Icon size={12} color={TEAL} />
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(8px,1vw,10px)", color: TEAL, letterSpacing: "0.18em", textTransform: "uppercase" }}>{tag}</span>
                </div>
              </div>

              <div style={{ order: flip ? 1 : 2, background: "#fff", padding: "clamp(28px,5vw,72px) clamp(20px,4vw,60px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.3rem,3vw,2.1rem)", fontWeight: 900, letterSpacing: "0.06em", lineHeight: 1.2, margin: "0 0 24px", whiteSpace: "pre-line" }}>{title}</h3>
                <div style={{ width: 40, height: 3, background: `linear-gradient(90deg,${NAVY},${TEAL})`, borderRadius: 2, marginBottom: 24 }} />
                <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(13px,1.6vw,15px)", lineHeight: 1.9, margin: "0 0 32px" }}>{desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ArrowRight size={16} color="#fff" />
                  </div>
                  <span style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(10px,1.2vw,11px)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Learn More</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   MISSION VISION VALUES
══════════════════════════════════════════════ */
const MVV = [
  { Icon: Shield, label: "Mission", title: "Quality in Every Part", desc: "To supply top-quality air filters and automotive spare parts that ensure clean, safe, and healthy environments, while contributing to improved vehicle performance and operational efficiency worldwide." },
  { Icon: Globe, label: "Vision", title: "A Trusted Global Name", desc: "To be recognized globally as a trusted supplier of innovative air filtration solutions, driving sustainable air quality improvements and vehicle performance across all sectors." },
  { Icon: Award, label: "Values", title: "Quality · Integrity · Service", desc: "Honest supply, relentless quality, and customer-first service. Every V3 decision is measured by the performance impact on our customers and the trust we earn with every product." },
];

function MissionVisionValues() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#fff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .mvv-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        @media (max-width: 860px) { .mvv-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 540px) and (min-width: 421px) { .mvv-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(40px,6vw,72px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 28, height: 2, background: TEAL }} />
            <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Our Purpose</span>
          </div>
          <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>Mission, Vision & Values</h2>
        </div>

        <div ref={ref} className="mvv-grid" style={{ background: "#edf2ff", borderRadius: "clamp(12px,2vw,24px)", overflow: "hidden", opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          {MVV.map(({ Icon, label, title, desc }) => (
            <div key={label} style={{ padding: "clamp(28px,5vw,52px) clamp(20px,3.5vw,40px)", background: "#fff", transition: "background 0.25s ease", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <div style={{ width: "clamp(44px,5vw,56px)", height: "clamp(44px,5vw,56px)", borderRadius: 16, background: `${NAVY}0c`, border: `1px solid ${NAVY}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "clamp(18px,2.5vw,28px)" }}>
                <Icon size={22} color={NAVY} />
              </div>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.1vw,10px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase", margin: "0 0 12px" }}>{label}</p>
              <h3 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1rem,2vw,1.4rem)", fontWeight: 800, letterSpacing: "0.06em", lineHeight: 1.3, margin: "0 0 20px" }}>{title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.4vw,14px)", lineHeight: 1.85, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   BRANDS
══════════════════════════════════════════════ */
const BRANDS = [
  { name: "Tata Motors",   logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Tata_Motors_Logo.svg/320px-Tata_Motors_Logo.svg.png" },
  { name: "Mahindra",      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mahindra_Logo.svg/320px-Mahindra_Logo.svg.png" },
  { name: "Maruti Suzuki", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/MarutiSuzukiLogo.svg/320px-MarutiSuzukiLogo.svg.png" },
  { name: "Bajaj Auto",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bajaj_Auto_Logo.svg/320px-Bajaj_Auto_Logo.svg.png" },
  { name: "Hero MotoCorp", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hero_MotoCorp_Logo.svg/320px-Hero_MotoCorp_Logo.svg.png" },
  { name: "Ashok Leyland", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Ashok_Leyland_Logo.svg/320px-Ashok_Leyland_Logo.svg.png" },
];

function Brands() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#fff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .br-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
        @media (max-width: 760px) { .br-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 420px) { .br-grid { grid-template-columns: 1fr !important; } }
        @keyframes mq { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Partners</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>Brands That Trust Us</h2>
          </div>
        </div>

        <div ref={ref} className="br-grid" style={{ background: "#edf2ff", borderRadius: "clamp(12px,2vw,24px)", overflow: "hidden", opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          {BRANDS.map(({ name, logo }) => (
            <div key={name} style={{ background: "#fff", padding: "clamp(28px,4vw,44px) clamp(18px,3vw,32px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "clamp(12px,1.8vw,18px)", transition: "background 0.25s ease", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}>
              <img src={logo} alt={name}
                onError={e => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "block"; }}
                style={{ height: "clamp(32px,4vw,48px)", maxWidth: "clamp(100px,14vw,160px)", objectFit: "contain", filter: "grayscale(60%) opacity(0.7)", transition: "all 0.3s ease" }}
                onMouseEnter={e => e.target.style.filter = "grayscale(0%) opacity(1)"}
                onMouseLeave={e => e.target.style.filter = "grayscale(60%) opacity(0.7)"} />
              <span style={{ display: "none", fontFamily: "'Cinzel',serif", color: NAVY, fontSize: 14, fontWeight: 700 }}>{name}</span>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "#9ca3af", fontSize: "clamp(9px,1.1vw,11px)", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0, textAlign: "center" }}>{name}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, overflow: "hidden", padding: "16px 0", borderTop: "1px solid #e8effe", borderBottom: "1px solid #e8effe" }}>
          <div style={{ display: "flex", animation: "mq 24s linear infinite", whiteSpace: "nowrap" }}>
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(9px,1.2vw,11px)", color: `${NAVY}44`, letterSpacing: "0.2em", textTransform: "uppercase", padding: "0 clamp(16px,3vw,36px)", flexShrink: 0 }}>
                {b.name} <span style={{ color: TEAL }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   COUNTRIES
══════════════════════════════════════════════ */
const COUNTRIES = [
  { name: "Nepal",       region: "South Asia",  img: "/flag/flag1.jpeg" },
  { name: "Bangladesh",  region: "South Asia",  img: "/flag/flag4.jpeg" },
  { name: "Tanzania",    region: "East Africa", img: "/flag/flag5.jpeg" },
  { name: "Zanzibar",    region: "East Africa", img: "/flag/flag3.jpeg" },
  { name: "Nigeria",     region: "West Africa", img: "/flag/flag2.jpeg" },
];

function Countries() {
  const [ref, v] = useReveal();
  return (
    <section style={{ background: "#f8faff", padding: "clamp(60px,10vw,120px) clamp(20px,5vw,100px)" }}>
      <style>{`
        .ct-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: clamp(10px,1.5vw,16px); }
        @media (max-width: 1100px) { .ct-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 640px) { .ct-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 360px) { .ct-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(40px,6vw,72px)", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: TEAL }} />
              <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(9px,1.2vw,11px)", letterSpacing: "0.3em", color: TEAL, textTransform: "uppercase" }}>Global Reach</span>
            </div>
            <h2 style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(1.8rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "0.06em", margin: 0 }}>Countries We Serve</h2>
          </div>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: GRAY, fontSize: "clamp(12px,1.5vw,14px)", lineHeight: 1.7, maxWidth: 300, margin: 0 }}>V3 products power engines across South Asia and Africa.</p>
        </div>

        <div ref={ref} className="ct-grid" style={{ opacity: v ? 1 : 0, transition: "opacity 0.9s ease" }}>
          {COUNTRIES.map(({ name, flag, region, img }, i) => (
            <div key={name} style={{ borderRadius: "clamp(12px,2vw,20px)", overflow: "hidden", position: "relative", boxShadow: "0 12px 48px rgba(32,61,139,0.1)", cursor: "default", transition: "transform 0.28s ease, box-shadow 0.28s ease", transitionDelay: `${i * 70}ms` }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 28px 72px rgba(32,61,139,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 12px 48px rgba(32,61,139,0.1)"; }}>
              <div style={{ position: "relative", height: "clamp(120px,18vw,180px)", overflow: "hidden" }}>
                <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,70,0.2) 0%, rgba(20,30,70,0.55) 100%)" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(28px,5vw,48px)", lineHeight: 1 }}>{flag}</div>
              </div>
              <div style={{ background: "#fff", padding: "clamp(14px,2vw,20px) clamp(12px,1.8vw,18px) clamp(16px,2.5vw,22px)" }}>
                <p style={{ fontFamily: "'Cinzel',serif", color: NAVY, fontSize: "clamp(11px,1.4vw,14px)", fontWeight: 800, letterSpacing: "0.1em", margin: "0 0 6px", textAlign: "center" }}>{name}</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(7px,1vw,9px)", letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", background: TEAL, borderRadius: 20, padding: "3px 8px" }}>{region}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #f8faff; overflow-x: hidden; }
        ::selection { background: rgba(74,150,182,0.28); }
        img { user-select: none; max-width: 100%; }

        /* Global fluid section padding utility */
        @media (max-width: 480px) {
          /* Ensure no horizontal scroll on mobile */
          section { overflow-x: hidden; }
        }
      `}</style>
      <Hero />
      <About />
      <Journey />
      <Founder />
      <WhatWeDo />
      <MechanicMeets />
      <MissionVisionValues />
      <Brands />
      <Countries />
    </>
  );
}