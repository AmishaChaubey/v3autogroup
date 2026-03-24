import { useState, useMemo, useEffect } from "react";

/* ── useBreakpoint ── */
function useBreakpoint() {
  const getbp = () => {
    if (typeof window === "undefined") return "xl";
    const w = window.innerWidth;
    if (w < 480) return "xs";
    if (w < 640) return "sm";
    if (w < 900) return "md";
    return "xl";
  };
  const [bp, setBp] = useState(getbp);
  useEffect(() => {
    const fn = () => setBp(getbp());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

const CATEGORIES = [
  {
    id: "oil-filter", label: "Oil Filter", sub: "Engine Protection", count: 14,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18"><path d="M12 2C8 2 5 5 5 9c0 3.5 2 6.5 5 8v3h4v-3c3-1.5 5-4.5 5-8 0-4-3-7-7-7z"/><path d="M9 9h6M9 12h6"/></svg>,
  },
  {
    id: "air-filter", label: "Air Filter", sub: "Clean Airflow", count: 13,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18"><path d="M3 8h18M3 12h15a3 3 0 010 6H3M3 16h4"/><circle cx="19" cy="8" r="2"/></svg>,
  },
  
  {
    id: "foam-filter", label: "Foam Filter", sub: "Multi-Stage Media", count: 13,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18"><rect x="3" y="6" width="18" height="12" rx="3"/><circle cx="9" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none"/></svg>,
  },
];

// ── UNIQUE PRODUCTS per category (each has its own image + unique name) ──
const PRODUCTS = {
  "oil-filter": [
    { id: "of-1",  name: "BAJAJ BOXER CT 100 - 7.25	 ",   badge: "Best Seller", img: "/product/OIL-FILTERS/63.png" },
    { id: "of-2",  name: "APACHE/CNG - 5.95	 ",        badge: "",            img: "/product/OIL-FILTERS/64.png" },
    { id: "of-3",  name: "BAJAJ PULSAR NS 200	- 8.95	 ",          badge: "New",         img: "/product/OIL-FILTERS/65.png" },
    { id: "of-4",  name: "SHINE BS6	- 8.85	 ",         badge: "",            img: "/product/OIL-FILTERS/66.png" },
    { id: "of-5",  name: "BULLET - 8.75	 ",            badge: "Sale",        img: "/product/OIL-FILTERS/67.png" },
    { id: "of-6",  name: "YAMAHA FZ	- 7.50	 ",            badge: "",            img: "/product/OIL-FILTERS/68.png" },
    { id: "of-7",  name: "17211-DOL954-O",        badge: "Pro",         img: "/product/OIL-FILTERS/1.png" },
    { id: "of-8",  name: "17211-DOL955-O",         badge: "",            img: "/product/OIL-FILTERS/2.png" },
        { id: "of-8",  name: "17211-DOL955-O",         badge: "",            img: "/product/OIL-FILTERS/3.png" },
            { id: "of-8",  name: "17211-DOL955-O",         badge: "",            img: "/product/OIL-FILTERS/4.png" },
  
  ],
  "air-filter": [
    { id: "af-1",  name: "17211-DOL100-H",    badge: "", img: "/product/AIR-FILTER/1.png" },
    { id: "af-2",  name: "17211-DOL101-H",        badge: "",            img: "/product/AIR-FILTER/2.png" },
    { id: "af-3",  name: "17211-DOL103-H ",        badge: "New",         img: "/product/AIR-FILTER/3.png" },
    { id: "af-4",  name: "17211-DOL104-H",        badge: "",            img: "/product/AIR-FILTER/4.png" },
    { id: "af-5",  name: "17211-DOL105-H",      badge: "Sale",        img: "/product/AIR-FILTER/5.png" },
    { id: "af-6",  name: "17211-DOL106-H",         badge: "",            img: "/product/AIR-FILTER/6.png" },
    { id: "af-7",  name: "17211-DOL107-H",    badge: "Pro",         img: "/product/AIR-FILTER/7.png" },
    { id: "af-8",  name: "17211-DOL110-H",       badge: "",            img: "/product/AIR-FILTER/8.png" },

  ],

  "foam-filter": [
    { id: "ff-1",  name: "17211-DOL900-F",          badge: "Best Seller", img: "/product/FORM-FILTER/23.png" },
    { id: "ff-2",  name: "17211-DOL901-F",         badge: "",            img: "/product/FORM-FILTER/24.png" },
    { id: "ff-3",  name: "17211-DOL902-F",          badge: "New",         img: "/product/FORM-FILTER/25.png" },
    { id: "ff-4",  name: "17211-DOL903-F ",            badge: "",            img: "/product/FORM-FILTER/26.png" },
    { id: "ff-5",  name: "17211-DOL904-F ",            badge: "Sale",        img: "/product/FORM-FILTER/27.png" },
    { id: "ff-6",  name: "17211-DOL905-F",          badge: "",            img: "/product/FORM-FILTER/28.png" },
    { id: "ff-7",  name: "17211-DOL906-F",          badge: "Pro",         img: "/product/FORM-FILTER/29.png" },
    { id: "ff-8",  name: "17211-DOL907-F",          badge: "",            img: "/product/FORM-FILTER/30.png" },
    
  ],
};

const BADGE_COLORS = { "Best Seller":"#f59e0b","New":"#10b981","Sale":"#ef4444","Pro":"#6366f1" };

const PER = 12;

/* ── Card ── */
function Card({ p }) {
  const [h, setH] = useState(false);
  const [w, setW] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        borderRadius: 16, overflow: "hidden", background: "#fff",
        boxShadow: h ? "0 20px 50px rgba(45,61,139,0.15)" : "0 2px 12px rgba(45,61,139,0.07)",
        transform: h ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.32s cubic-bezier(.22,.68,0,1.2)",
        cursor: "pointer",
      }}>
      <div style={{ position:"relative", aspectRatio:"4/3", overflow:"hidden", background:"#eef2fb" }}>
        <img src={p.img} alt={p.name} style={{
          width:"100%", height:"100%", objectFit:"cover", display:"block",
          transform: h ? "scale(1.08)" : "scale(1)", transition:"transform 0.5s ease"
        }}/>
        <div style={{
          position:"absolute", inset:0,
          background: h
            ? "linear-gradient(180deg,rgba(10,18,60,0) 30%,rgba(10,18,60,0.52) 100%)"
            : "linear-gradient(180deg,rgba(10,18,60,0) 60%,rgba(10,18,60,0.25) 100%)",
          transition:"background 0.4s ease"
        }}/>
        {p.badge && (
          <span style={{
            position:"absolute", top:8, left:8,
            fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
            background: BADGE_COLORS[p.badge] || "#6b7280",
            color:"#fff", padding:"3px 8px", borderRadius:99
          }}>{p.badge}</span>
        )}
        <button
          onClick={e => { e.stopPropagation(); setW(!w); }}
          style={{
            position:"absolute", top:8, right:8,
            width:30, height:30, borderRadius:"50%", border:"none", cursor:"pointer",
            background:"rgba(255,255,255,0.9)", backdropFilter:"blur(6px)",
            display:"flex", alignItems:"center", justifyContent:"center",
            opacity: h ? 1 : 0, transform: h ? "scale(1)" : "scale(0.7)",
            transition:"all 0.22s ease",
          }}>
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill={w?"#ef4444":"none"} stroke={w?"#ef4444":"#475569"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
      </div>
      <div style={{ padding:"13px 14px 15px", background: h ? "#f8faff" : "#fff", transition:"background 0.3s" }}>
        <p style={{
          fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600,
          color:"#1e2d6b", lineHeight:1.4, margin:0,
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden"
        }}>{p.name}</p>
        <div style={{
          marginTop:8, height:2, borderRadius:99,
          background:"linear-gradient(90deg,#2d3d8b,#4a96b6)",
          width: h ? "100%" : "24px", transition:"width 0.4s ease"
        }}/>
      </div>
    </div>
  );
}

/* ── Sidebar Content ── */
function SidebarContent({ active, onPick }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 24px rgba(45,61,139,0.08)" }}>
        <div style={{ background:"linear-gradient(135deg,#2d3d8b,#4a96b6)", padding:"13px 18px", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.7)" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
          <span style={{ fontFamily:"'Cinzel',serif", color:"#fff", fontSize:9, fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase" }}>Categories</span>
        </div>
        <div style={{ padding:"10px 8px" }}>
          {CATEGORIES.map(c => {
            const isA = active === c.id;
            return (
              <button key={c.id}
                onClick={() => onPick(c.id)}
                style={{
                  display:"flex", alignItems:"center", gap:10, padding:"10px 10px",
                  borderRadius:12, marginBottom:2, width:"100%", border:"none", cursor:"pointer",
                  background: isA ? "linear-gradient(135deg,#2d3d8b,#4a96b6)" : "transparent",
                  textAlign:"left", transition:"all 0.2s ease",
                }}
                onMouseEnter={e => { if (!isA) e.currentTarget.style.background = "#f0f6ff"; }}
                onMouseLeave={e => { if (!isA) e.currentTarget.style.background = "transparent"; }}>
                <span style={{
                  width:34, height:34, borderRadius:10, display:"flex",
                  alignItems:"center", justifyContent:"center", flexShrink:0,
                  background: isA ? "rgba(255,255,255,0.18)" : "#eef3fb",
                  color: isA ? "#fff" : "#2d3d8b"
                }}>{c.icon}</span>
                <span style={{ flex:1, minWidth:0 }}>
                  <span style={{ display:"block", fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, color: isA?"#fff":"#1e2d6b" }}>{c.label}</span>
                  <span style={{ display:"block", fontFamily:"'Poppins',sans-serif", fontSize:9.5, color: isA?"rgba(255,255,255,0.6)":"#aab4c4", marginTop:1 }}>{c.sub}</span>
                </span>
                <span style={{
                  fontSize:9.5, fontWeight:700, padding:"2px 7px", borderRadius:99, flexShrink:0,
                  background: isA ? "rgba(255,255,255,0.22)" : "#dbeafe",
                  color: isA ? "#fff" : "#2d3d8b", fontFamily:"'Poppins',sans-serif"
                }}>{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ borderRadius:18, position:"relative", background:"linear-gradient(135deg,#111c4e,#2d3d8b)", padding:"20px 18px", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-20, right:-20, width:100, height:100, borderRadius:"50%", background:"rgba(74,150,182,0.2)", pointerEvents:"none" }}/>
        <span style={{ display:"inline-block", fontSize:8, fontWeight:700, letterSpacing:"0.28em", textTransform:"uppercase", background:"rgba(74,150,182,0.22)", color:"#7ecff0", border:"1px solid rgba(74,150,182,0.3)", padding:"3px 10px", borderRadius:99, marginBottom:10 }}>Limited Offer</span>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:36, fontWeight:900, color:"#fff", lineHeight:1, marginBottom:4 }}>20%</div>
        <p style={{ fontSize:11, color:"#b8d8ee", fontWeight:300, marginBottom:12, fontFamily:"'Poppins',sans-serif" }}>Off orders above <b style={{ color:"#fff" }}>$50</b></p>
        <span style={{ display:"inline-block", fontSize:10, fontFamily:"monospace", fontWeight:700, letterSpacing:"0.16em", background:"rgba(255,255,255,0.1)", color:"#fff", padding:"5px 12px", borderRadius:8, marginBottom:14 }}>FILTER20</span>
        <button style={{ display:"block", width:"100%", padding:"10px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#4a96b6,#7ecff0)", fontSize:11, fontWeight:700, color:"#0d1540", fontFamily:"'Poppins',sans-serif" }}>Shop Now →</button>
      </div>

      <div style={{ background:"#fff", borderRadius:18, padding:"20px 18px", textAlign:"center", boxShadow:"0 4px 20px rgba(45,61,139,0.06)", border:"1px solid #edf2fb" }}>
        <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#dbeafe,#e0f0fb)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 10px" }}>
          <svg width="17" height="17" fill="none" stroke="#2d3d8b" viewBox="0 0 24 24" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, color:"#2d3d8b", marginBottom:5 }}>Need Help?</p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#a0aec0", lineHeight:1.65, marginBottom:12 }}>Our engineers will guide you to the right filter.</p>
        <button style={{ width:"100%", padding:"9px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#2d3d8b,#4a96b6)", fontSize:11, fontWeight:600, color:"#fff", fontFamily:"'Poppins',sans-serif" }}>Contact Expert</button>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function FilterPage() {
  const [active, setActive] = useState("oil-filter");
  const [page, setPage]     = useState(1);
  const [gk, setGk]         = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const bp = useBreakpoint();

  const isMobile  = bp === "xs" || bp === "sm";
  const isTablet  = bp === "md";
  const isDesktop = bp === "xl";

  const cat      = CATEGORIES.find(c => c.id === active);
  const rawProds = PRODUCTS[active] || [];

  const prods = useMemo(() => {
    const arr = [...rawProds];
    if (sortBy === "az") arr.sort((a,b) => a.name.localeCompare(b.name));
    else if (sortBy === "za") arr.sort((a,b) => b.name.localeCompare(a.name));
    else if (sortBy === "newest") arr.reverse();
    return arr;
  }, [active, sortBy]);

  const total = Math.ceil(prods.length / PER);
  const slice = prods.slice((page-1)*PER, page*PER);

  const scrollToTop = () => window.scrollTo({ top:0, behavior:"smooth" });
  const pickCat  = id => { setActive(id); setPage(1); setGk(k=>k+1); setDrawerOpen(false); scrollToTop(); };
  const pickPage = n  => { setPage(n); setGk(k=>k+1); scrollToTop(); };
  const handleSort = e => { setSortBy(e.target.value); setPage(1); setGk(k=>k+1); };

  const gridCols = isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const cardGap  = isMobile ? 10 : 18;
  const bodyPad  = isMobile ? "16px 12px 48px" : isTablet ? "20px 16px 56px" : "32px 24px 64px";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Poppins:wght@300;400;500;600;700&display=swap"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        body{margin:0}
        .fp{font-family:'Poppins',sans-serif;background:#e8f0fb;min-height:100vh}

        @keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}
        .shine{
          background:linear-gradient(90deg,#fff 0%,#c2e4f5 35%,#fff 55%,#aad4ed 100%);
          background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
          animation:shimmer 5s linear infinite;
        }

        @keyframes cardUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .grid-wrap>div{opacity:0;animation:cardUp .38s ease forwards}
        .grid-wrap>div:nth-child(1){animation-delay:0ms}
        .grid-wrap>div:nth-child(2){animation-delay:55ms}
        .grid-wrap>div:nth-child(3){animation-delay:110ms}
        .grid-wrap>div:nth-child(4){animation-delay:165ms}
        .grid-wrap>div:nth-child(5){animation-delay:220ms}
        .grid-wrap>div:nth-child(6){animation-delay:275ms}
        .grid-wrap>div:nth-child(7){animation-delay:330ms}
        .grid-wrap>div:nth-child(8){animation-delay:385ms}
        .grid-wrap>div:nth-child(9){animation-delay:440ms}
        .grid-wrap>div:nth-child(10){animation-delay:495ms}
        .grid-wrap>div:nth-child(11){animation-delay:550ms}
        .grid-wrap>div:nth-child(12){animation-delay:605ms}

        .pg-btn{transition:all .16s ease;border:none;cursor:pointer;font-family:'Poppins',sans-serif}
        .pg-btn:hover:not(:disabled){transform:scale(1.1)}
        .pg-btn:disabled{opacity:.3;cursor:not-allowed}

        .drawer-bg{
          position:fixed;inset:0;z-index:200;
          background:rgba(13,21,64,0.5);backdrop-filter:blur(3px);
        }
        .drawer{
          position:fixed;top:0;left:0;bottom:0;z-index:201;
          width:min(280px,82vw);background:#e8f0fb;
          overflow-y:auto;padding:16px 12px 32px;
          box-shadow:6px 0 40px rgba(45,61,139,0.18);
          animation:slideIn .25s cubic-bezier(.22,.68,0,1.2);
        }
        @keyframes slideIn{from{transform:translateX(-100%)}to{transform:translateX(0)}}

        .sidebar-sticky{
          position:sticky;top:24px;
          max-height:calc(100vh - 48px);
          overflow-y:auto;scrollbar-width:none;
        }
        .sidebar-sticky::-webkit-scrollbar{display:none}
      `}</style>

      <div className="fp">

        {/* ══ BANNER ══ */}
        <div style={{ position:"relative", minHeight: isMobile ? 340 : isTablet ? 420 : 500, overflow:"hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1600&q=85"
            alt=""
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%" }}
          />
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.72)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 40%,rgba(13,21,64,0.5) 100%)" }}/>

          <div style={{
            position:"relative", zIndex:2,
            display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", textAlign:"center",
            padding: isMobile ? "70px 20px 50px" : "110px 24px 70px",
            minHeight: "inherit",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
              <div style={{ width:20, height:1, background:"linear-gradient(90deg,transparent,#4a96b6)" }}/>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:"0.4em", textTransform:"uppercase", color:"#7ecff0", fontWeight:700 }}>Precision Engineered</span>
              <div style={{ width:20, height:1, background:"linear-gradient(90deg,#4a96b6,transparent)" }}/>
            </div>

            <h1 className="shine" style={{
              fontFamily:"'Cinzel',serif",
              fontSize: isMobile ? "1.75rem" : isTablet ? "2.8rem" : "3.8rem",
              fontWeight:900, letterSpacing:"0.05em", lineHeight:1.1, marginBottom:14,
            }}>
              Industrial Filter<br/>Solutions
            </h1>

            <p style={{
              color:"#b5d6ec", maxWidth:400,
              fontSize: isMobile ? 11.5 : 13,
              fontWeight:300, lineHeight:1.85, marginBottom:28,
              padding: isMobile ? "0 4px" : 0,
            }}>
              High-performance oil, air, strainer &amp; foam filters built for durability and superior engine protection.
            </p>

            <div style={{ display:"flex", gap: isMobile ? 20 : 32, flexWrap:"wrap", justifyContent:"center" }}>
              {[["3L/monthly","Products"],["4","Categories"],["OEM","Compatible"],["ISO","Certified"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize: isMobile ? 20 : 24, fontWeight:900, color:"#7ecff0" }}>{v}</div>
                  <div style={{ fontSize:8, color:"rgba(255,255,255,0.4)", letterSpacing:"0.18em", textTransform:"uppercase", marginTop:3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BREADCRUMB ══ */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e8eef8", boxShadow:"0 1px 6px rgba(45,61,139,0.06)" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"9px 16px", display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:7, cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.background="#f4f7ff"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              <svg width="11" height="11" fill="none" stroke="#2d3d8b" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"#6b7280" }}>Home</span>
            </span>
            <svg width="12" height="12" fill="none" stroke="#c7d4e8" viewBox="0 0 24 24" strokeWidth="2"><path d="M9 5l7 7-7 7"/></svg>
            <span style={{ display:"flex", alignItems:"center", padding:"4px 10px", borderRadius:7, background:"#eef3fb", border:"1px solid #dbeafe" }}>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:600, color:"#2d3d8b" }}>products</span>
            </span>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div style={{
          maxWidth:1280, margin:"0 auto", padding: bodyPad,
          display:"flex",
          flexDirection: isDesktop ? "row" : "column",
          gap: isDesktop ? 26 : 0,
          alignItems:"flex-start",
        }}>

          {/* Desktop sidebar */}
          {isDesktop && (
            <aside className="sidebar-sticky" style={{ width:230, flexShrink:0 }}>
              <SidebarContent active={active} onPick={pickCat} />
            </aside>
          )}

          {/* Mobile / tablet drawer */}
          {!isDesktop && drawerOpen && (
            <>
              <div className="drawer-bg" onClick={() => setDrawerOpen(false)} />
              <div className="drawer">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:12, fontWeight:700, color:"#2d3d8b", letterSpacing:"0.15em" }}>FILTERS</span>
                  <button onClick={() => setDrawerOpen(false)}
                    style={{ width:30, height:30, borderRadius:8, border:"1px solid #dbeafe", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="13" height="13" fill="none" stroke="#475569" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <SidebarContent active={active} onPick={pickCat} />
              </div>
            </>
          )}

          {/* Products */}
          <div style={{ flex:1, minWidth:0, width:"100%" }}>

            {/* Toolbar */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:10, marginBottom:18, flexWrap:"wrap",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {!isDesktop && (
                  <button
                    onClick={() => setDrawerOpen(true)}
                    style={{
                      display:"flex", alignItems:"center", gap:6,
                      padding:"8px 13px", borderRadius:10,
                      border:"1.5px solid #dbeafe", background:"#fff",
                      cursor:"pointer", color:"#2d3d8b", flexShrink:0,
                    }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:600 }}>Filters</span>
                  </button>
                )}
                <div>
                  <h2 style={{ fontFamily:"'Cinzel',serif", fontSize: isMobile ? 11 : 20, fontWeight:900, color:"#2d3d8b", letterSpacing:"0.04em", margin:0 }}>{cat?.label}</h2>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#a0aec0", margin:"1px 0 0" }}>
                    <span style={{ color:"#4a96b6", fontWeight:600 }}>{prods.length}</span> products &nbsp;·&nbsp; page {page}/{total}
                  </p>
                </div>
              </div>

              <select value={sortBy} onChange={handleSort}
                style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:500, padding:"8px 12px", borderRadius:10, border:"1.5px solid #dbeafe", color:"#2d3d8b", background:"#fff", cursor:"pointer", outline:"none", flexShrink:0 }}>
                <option value="featured">Sort: Featured</option>
                <option value="az">Name A → Z</option>
                <option value="za">Name Z → A</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Grid */}
            <div key={gk} className="grid-wrap" style={{ display:"grid", gridTemplateColumns: gridCols, gap: cardGap }}>
              {slice.map(p => <Card key={p.id} p={p} />)}
            </div>

            {/* Pagination */}
            {total > 1 && (
              <div style={{ marginTop:40, display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
                <div style={{ width:"100%", maxWidth:240, height:3, borderRadius:99, background:"#dbeafe" }}>
                  <div style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#2d3d8b,#4a96b6)", width:`${(page/total)*100}%`, transition:"width .4s ease" }}/>
                </div>

                <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 3 : 5, flexWrap:"wrap", justifyContent:"center" }}>
                  <button className="pg-btn" disabled={page===1} onClick={() => page>1 && pickPage(page-1)}
                    style={{ width:34, height:34, borderRadius:9, background:"#fff", border:"1.5px solid #dbeafe", display:"flex", alignItems:"center", justifyContent:"center", color:"#2d3d8b" }}>
                    <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
                  </button>

                  {Array.from({length:total},(_,i)=>i+1).map(n => {
                    const far = Math.abs(n-page)>1 && n!==1 && n!==total;
                    if (far && (n===page-2||n===page+2)) return <span key={n} style={{ color:"#c7d4e8", fontSize:12, padding:"0 2px" }}>···</span>;
                    if (far) return null;
                    const isA = n===page;
                    return (
                      <button key={n} className="pg-btn" onClick={() => pickPage(n)}
                        style={{ width:34, height:34, borderRadius:9, fontSize:12, fontWeight:700, background: isA?"linear-gradient(135deg,#2d3d8b,#4a96b6)":"#fff", color: isA?"#fff":"#6b7280", border: isA?"none":"1.5px solid #e0eaf8", boxShadow: isA?"0 4px 14px rgba(45,61,139,0.25)":"none" }}>
                        {n}
                      </button>
                    );
                  })}

                  <button className="pg-btn" disabled={page===total} onClick={() => page<total && pickPage(page+1)}
                    style={{ width:34, height:34, borderRadius:9, background:"#fff", border:"1.5px solid #dbeafe", display:"flex", alignItems:"center", justifyContent:"center", color:"#2d3d8b" }}>
                    <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>

                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#a0aec0" }}>
                  Showing {(page-1)*PER+1}–{Math.min(page*PER,prods.length)} of {prods.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}