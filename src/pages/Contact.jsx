import { useState,useEffect } from "react";
import {
  MapPin, Phone, Mail, Clock, Award, FlaskConical, Car, Zap,
  MessageCircle, Leaf, ChevronDown, Filter, Wind, Layers, Droplets
} from "lucide-react";

const BRAND = "#20308b";

const Divider = ({ light = false }) => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"10px 0" }}>
    <div style={{ height:1, width:48, background: light ? "rgba(255,255,255,0.25)" : `${BRAND}33` }} />
    <div style={{ width:6, height:6, background: light ? "white" : BRAND, transform:"rotate(45deg)" }} />
    <div style={{ height:1, width:48, background: light ? "rgba(255,255,255,0.25)" : `${BRAND}33` }} />
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroBanner = () => (
  <section style={{ position:"relative", minHeight:"clamp(360px,60vw,560px)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
    <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1800&q=80&fit=crop"
      alt="Automotive" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center" }} />
    <div style={{ position:"absolute", inset:0, background:"linear-gradient(120deg,rgba(32,48,139,0.92) 0%,rgba(16,26,80,0.78) 55%,rgba(0,0,0,0.6) 100%)" }} />
    <div style={{ position:"absolute", bottom:28, right:28, width:80, height:80, borderBottom:"2px solid rgba(255,255,255,0.2)", borderRight:"2px solid rgba(255,255,255,0.2)" }} />
    <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"0 24px", maxWidth:700 }}>
      <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(255,255,255,0.2)", borderRadius:40, padding:"6px 18px", marginBottom:24, background:"rgba(255,255,255,0.07)" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#93c5fd", animation:"pulse 2s infinite" }} />
        <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, letterSpacing:"0.3em", color:"#bfdbfe", textTransform:"uppercase" }}>V3 Auto Group</span>
      </div>
      <h1 style={{ fontFamily:"'Cinzel',serif", color:"white", fontSize:"clamp(2rem,6vw,5rem)", fontWeight:900, letterSpacing:"0.12em", lineHeight:1.1, margin:"0 0 8px", textShadow:"0 4px 40px rgba(0,0,0,0.5)" }}>
        Contact Us
      </h1>
      <Divider light />
      <p style={{ fontFamily:"'Poppins',sans-serif", color:"rgba(219,234,254,0.85)", fontSize:"clamp(14px,2vw,17px)", lineHeight:1.7, margin:"12px auto 32px", maxWidth:520 }}>
        Premium filtration solutions — reach out and our experts will guide you every step of the way.
      </p>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontFamily:"'Poppins',sans-serif", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)" }}>
        <span>Home</span><span style={{ color:"rgba(255,255,255,0.2)" }}>›</span><span style={{ color:"#93c5fd" }}>Contact Us</span>
      </div>
    </div>
    {/* <div style={{ position:"absolute", bottom:0, left:0, right:0, height:80, background:"linear-gradient(transparent,#eff6ff)" }} /> */}
  </section>
);

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault(); setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name:"", email:"", phone:"", subject:"", message:"" });
  };
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const infoItems = [
    { title:"Office Address", value:"Plot No. 45, Industrial Area,\nPhase II, Noida, UP – 201301", Icon: MapPin },
    { title:"Phone & WhatsApp", value:"+91 98765 43210\n+91 91234 56789", Icon: Phone },
    { title:"Email", value:"v3auto@gmail.com \nsupport@v3autogroup.com", Icon: Mail },
    { title:"Office Hours", value:"Mon – Fri: 9AM – 7PM\nSat: 10AM – 5PM  |  Sun: Closed", Icon: Clock },
  ];
  const inp = { width:"100%", boxSizing:"border-box", border:"1.5px solid #dbeafe", borderRadius:10, padding:"12px 14px", fontFamily:"'Poppins',sans-serif", fontSize:14, color:"#1e293b", background:"#f8faff", outline:"none" };
  const lbl = { fontFamily:"'Poppins',sans-serif", fontSize:11, fontWeight:600, color:BRAND, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:6 };

  
  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        .form-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .info-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .right-col {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        /* Map fills remaining height of right column after info cards */
        .map-wrapper {
          flex: 1;
          min-height: 280px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 24px rgba(32,48,139,0.15);
          border: 1.5px solid #dbeafe;
        }
        .map-wrapper iframe {
          width: 100%;
          height: 100%;
          min-height: 230px;
          border: 0;
          display: block;
        }
        /* Tablet */
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .right-col {
            gap: 14px;
          }
          .map-wrapper {
            min-height: 280px;
            flex: none;
          }
          .map-wrapper iframe {
            min-height: 280px;
          }
        }
        /* Mobile */
        @media (max-width: 560px) {
          .form-input-grid {
            grid-template-columns: 1fr;
          }
          .info-cards-grid {
            grid-template-columns: 1fr;
          }
          .map-wrapper {
            min-height: 220px;
          }
          .map-wrapper iframe {
            min-height: 220px;
          }
        }
      `}</style>
      <section style={{ background:"#eff6ff", padding:"clamp(40px,8vw,80px) 24px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, letterSpacing:"0.25em", color:`${BRAND}99`, textTransform:"uppercase", marginBottom:8 }}>Reach Out</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:700, letterSpacing:"0.12em", margin:"0 0 4px" }}>Contact & Get In Touch</h2>
            <Divider /><p style={{ fontFamily:"'Poppins',sans-serif", color:"#64748b", fontSize:14, margin:"8px 0 0" }}>Fill the form or use any of the details below — we're always here to help.</p>
          </div>

          <div className="contact-grid">
            {/* ── Form ── */}
            <div style={{ background:"white", borderRadius:20, boxShadow:"0 4px 40px rgba(32,48,139,0.08)", borderTop:`4px solid ${BRAND}`, padding:"clamp(20px,4vw,36px)" }}>
              <h3 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:20, fontWeight:700, letterSpacing:"0.08em", margin:"0 0 4px" }}>Send a Message</h3>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#94a3b8", margin:"0 0 28px" }}>We'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-input-grid">
                  {[{label:"Full Name",key:"name",type:"text",ph:"John Doe"},{label:"Email",key:"email",type:"email",ph:"john@example.com"},{label:"Phone",key:"phone",type:"tel",ph:"+91 98765 43210"},{label:"Subject",key:"subject",type:"text",ph:"Filter Inquiry"}].map(({label,key,type,ph})=>(
                    <div key={key}><label style={lbl}>{label}</label>
                    <input type={type} value={form[key]} placeholder={ph} required={key!=="phone"}
                      onChange={e=>setForm({...form,[key]:e.target.value})} style={inp}
                      onFocus={e=>e.target.style.borderColor=BRAND} onBlur={e=>e.target.style.borderColor="#dbeafe"} /></div>
                  ))}
                </div>
                <div style={{ marginBottom:24 }}>
                  <label style={lbl}>Message</label>
                  <textarea rows={5} value={form.message} placeholder="Tell us about your filtration needs..." required
                    onChange={e=>setForm({...form,message:e.target.value})} style={{...inp,resize:"none",lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor=BRAND} onBlur={e=>e.target.style.borderColor="#dbeafe"} />
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                  <button type="submit" style={{ background:BRAND, color:"white", border:"none", fontFamily:"'Cinzel',serif", fontSize:12, letterSpacing:"0.15em", textTransform:"uppercase", padding:"14px 32px", borderRadius:10, cursor:"pointer", fontWeight:700 }}>Submit Inquiry</button>
                  {sent && <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:"#16a34a", fontWeight:500 }}>✅ Sent! We'll be in touch soon.</span>}
                </div>
              </form>
            </div>

            {/* ── Info cards + Map (right column — full height matched via flex) ── */}
            <div className="right-col">
              <div className="info-cards-grid">
                {infoItems.map(({title,value,Icon})=>(
                  <div key={title} style={{ background:"white", borderRadius:16, padding:"20px 18px", boxShadow:"0 2px 16px rgba(32,48,139,0.06)", border:"1.5px solid #dbeafe" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:34, height:34, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon size={16} color={BRAND} />
                      </div>
                      <span style={{ fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:700, color:BRAND, letterSpacing:"0.12em", textTransform:"uppercase" }}>{title}</span>
                    </div>
                    {value.split("\n").map((l,i)=><p key={i} style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:"#475569", lineHeight:1.7, margin:0 }}>{l}</p>)}
                  </div>
                ))}
              </div>

              {/* Map — stretches to fill remaining height of the right column */}
              <div className="map-wrapper" style={{ flex:1 }}>
                <iframe
                  title="V3 Auto Group Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8553268508894!2d77.32416687549485!3d28.567940275702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a1a7780cbb%3A0x58ab77d5e47cb0a8!2sIndustrial%20Area%2C%20Phase%20II%2C%20Noida%2C%20Uttar%20Pradesh%20201305!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(transparent,rgba(32,48,139,0.88))", padding:"20px 16px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <MapPin size={13} color="#93c5fd" />
                    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:"rgba(191,219,254,0.95)", fontWeight:500 }}>Industrial Area Phase II, Noida</span>
                  </div>
                  <a href="https://maps.google.com/?q=Industrial+Area+Phase+2+Noida+Uttar+Pradesh" target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:"'Poppins',sans-serif", fontSize:10, color:"#93c5fd", textDecoration:"none", letterSpacing:"0.1em", textTransform:"uppercase", border:"1px solid rgba(147,197,253,0.35)", borderRadius:20, padding:"4px 10px" }}>
                    Open Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── OIL STRAINER SECTION ─────────────────────────────────────────────────────
const OilStrainerSection = () => {
  const features = [
    { Icon: Layers, title: "Multi-Layer Mesh", desc: "Precision-woven stainless steel mesh captures particles as small as 25 microns without restricting oil flow." },
    { Icon: Droplets, title: "Full-Flow Design", desc: "Engineered for maximum oil volume throughput, ensuring your engine stays lubricated even under peak load." },
    { Icon: Zap, title: "Heat Resistant", desc: "Tested up to 180°C — maintains structural integrity and filtration performance under extreme engine temperatures." },
    { Icon: Filter, title: "Easy Serviceability", desc: "Tool-free removal design with a quick-lock tab system for fast, mess-free cleaning during routine maintenance." },
    { Icon: Award, title: "OEM Fit Guarantee", desc: "Direct-fit replacement for 2,000+ engine models — no modification required, bolt-on installation every time." },
    { Icon: FlaskConical, title: "Corrosion Proof", desc: "Electroplated zinc finish with passivation layer resists rust and oil degradation over extended service life." },
  ];
  return (
    <>
      <style>{`
        .oil-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        .feature-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        @media(max-width:900px){
          .oil-grid { grid-template-columns:1fr; gap:36px; }
        }
        @media(max-width:480px){
          .feature-grid { grid-template-columns:1fr; }
        }
      `}</style>
      <section style={{ background:"white", padding:"clamp(40px,8vw,80px) 24px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div className="oil-grid">
            <div>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, letterSpacing:"0.25em", color:`${BRAND}99`, textTransform:"uppercase", marginBottom:10 }}>Precision Engineering</p>
              <h2 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:700, letterSpacing:"0.1em", margin:"0 0 4px", lineHeight:1.3 }}>Oil Strainer<br/>Screens</h2>
              <Divider />
              <p style={{ fontFamily:"'Poppins',sans-serif", color:"#475569", fontSize:14, lineHeight:1.85, margin:"16px 0 28px" }}>
                V3 oil strainer screens are the first line of defence for your engine. Engineered to intercept metal shavings, sludge, and particulate contamination before they reach critical engine components — extending engine life and maintaining oil pressure.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {["25μ filtration","Stainless 304","2000+ fitments"].map(t=>(
                  <span key={t} style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, fontWeight:600, color:BRAND, background:"#eff6ff", border:`1px solid ${BRAND}22`, borderRadius:20, padding:"6px 14px" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="feature-grid">
              {features.map(({Icon,title,desc})=>(
                <div key={title} style={{ background:"#f8faff", border:"1.5px solid #dbeafe", borderRadius:14, padding:"18px 16px", transition:"box-shadow 0.2s, transform 0.2s", cursor:"default" }}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 8px 24px ${BRAND}18`;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.borderColor=`${BRAND}44`;}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="#dbeafe";}}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${BRAND}12`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                    <Icon size={17} color={BRAND} />
                  </div>
                  <h4 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", margin:"0 0 8px" }}>{title}</h4>
                  <p style={{ fontFamily:"'Poppins',sans-serif", color:"#64748b", fontSize:12, lineHeight:1.7, margin:0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const items = [
    { Icon:Award,       title:"OEM-Grade Quality",       desc:"Filters that meet or exceed OEM standards for fit, form, and function across all vehicle types." },
    { Icon:FlaskConical,title:"Rigorous Lab Testing",     desc:"Every batch tested for filtration efficiency, pressure drop, and burst strength in ISO-certified labs." },
    { Icon:Car,         title:"Universal Compatibility",  desc:"10,000+ SKUs covering oil, air, and foam filters for cars, trucks, two-wheelers, and machinery." },
    { Icon:Zap,         title:"Fast Dispatch",            desc:"Pan-India warehousing with same-day or next-day dispatch for orders placed before 3 PM." },
    { Icon:MessageCircle,title:"Expert Technical Support",desc:"Our automotive engineers are always on call to help you select the right filter for your application." },
    { Icon:Leaf,        title:"Eco-Conscious Design",     desc:"Sustainable materials and recyclable packaging — protecting your engine without costing the planet." },
  ];
  return (
    <>
      <style>{`
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        @media(max-width:900px){ .why-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:520px){ .why-grid { grid-template-columns:1fr; } }
      `}</style>
      <section style={{ background:"#eff6ff", padding:"clamp(40px,8vw,80px) 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:`${BRAND}08` }} />
        <div style={{ position:"absolute", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:`${BRAND}06` }} />
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, letterSpacing:"0.25em", color:`${BRAND}99`, textTransform:"uppercase", marginBottom:8 }}>Our Commitment</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:700, letterSpacing:"0.12em", margin:"0 0 4px" }}>Why Choose V3 Auto Group</h2>
            <Divider />
            <p style={{ fontFamily:"'Poppins',sans-serif", color:"#64748b", fontSize:14, margin:"8px auto 0", maxWidth:460 }}>Decades of filtration expertise, backed by innovation and trust.</p>
          </div>
          <div className="why-grid">
            {items.map(({Icon,title,desc})=>(
              <div key={title} style={{ background:"rgba(255,255,255,0.55)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"1.5px solid rgba(255,255,255,0.8)", borderRadius:18, padding:"28px 24px", boxShadow:"0 4px 24px rgba(32,48,139,0.07), inset 0 1px 0 rgba(255,255,255,0.9)", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 12px 36px ${BRAND}18, inset 0 1px 0 rgba(255,255,255,0.9)`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 4px 24px rgba(32,48,139,0.07), inset 0 1px 0 rgba(255,255,255,0.9)";}}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${BRAND}12`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                  <Icon size={20} color={BRAND} />
                </div>
                <h3 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:12, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", margin:"0 0 10px" }}>{title}</h3>
                <p style={{ fontFamily:"'Poppins',sans-serif", color:"#475569", fontSize:13, lineHeight:1.75, margin:0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqData = [
  { category:"Oil Filter",   Icon:Droplets, color:"#f59e0b",
    faqs:[
      {q:"How often should I replace my oil filter?",         a:"Replace every oil change — typically every 5,000–10,000 km depending on driving conditions and oil type."},
      {q:"What happens if I use a wrong-size oil filter?",    a:"An ill-fitting filter causes oil leaks, insufficient filtration, and engine damage. Always use the spec'd filter for your vehicle."},
      {q:"Are V3 oil filters compatible with synthetic oil?", a:"Yes. All V3 oil filters work with conventional and full-synthetic oils, featuring synthetic blend media for superior particle capture."},
    ]},
  { category:"Foam Filter",  Icon:Layers, color:"#10b981",
    faqs:[
      {q:"Can foam filters be washed and reused?",        a:"Yes! V3 foam filters support multiple cleaning cycles. Wash with mild detergent, dry fully, re-oil lightly, and reinstall."},
      {q:"What are foam filters best suited for?",        a:"Ideal for dusty, off-road, and motorsport use — ATVs, dirt bikes, and race cars where high airflow and washability matter."},
      {q:"When should a foam filter be replaced?",        a:"Replace when you see tears, permanent deformation, or the foam no longer returns to shape after washing. Usually every 2–3 years."},
    ]},
  { category:"Air Filter",   Icon:Wind, color:"#3b82f6",
    faqs:[
      {q:"How frequently should an air filter be replaced?",             a:"Every 15,000–20,000 km under normal conditions. In dusty environments inspect every 5,000 km and replace as needed."},
      {q:"Will a high-performance air filter improve fuel economy?",     a:"A clean high-flow filter ensures the correct air-fuel mix, improving combustion efficiency and marginally boosting fuel economy."},
      {q:"How can I tell if my air filter is clogged?",                  a:"Watch for reduced acceleration, higher fuel consumption, black exhaust smoke, or rough idle. Visible grey/black debris confirms replacement."},
    ]},
  { category:"Oil Strainer", Icon:Filter, color:"#8b5cf6",
    faqs:[
      {q:"What is an oil strainer and why is it important?",             a:"An oil strainer sits at the oil pump inlet and filters large particles from oil before they reach engine components. It's critical for protecting the oil pump and engine internals."},
      {q:"How often should I clean my oil strainer screen?",             a:"Inspect and clean the oil strainer every 40,000–60,000 km or whenever you perform a deep engine service. In high-performance applications, inspect more frequently."},
      {q:"Can a clogged oil strainer damage my engine?",                 a:"Yes. A clogged strainer restricts oil flow, causing oil starvation — which can lead to bearing failure, increased wear, and in severe cases, catastrophic engine damage."},
    ]},
];

const FAQSection = () => {
  const [open, setOpen] = useState({});
  const toggle = key => setOpen(p=>({...p,[key]:!p[key]}));

  const half1 = faqData.slice(0,2);
  const half2 = faqData.slice(2,4);

  const renderCategory = ({category,Icon,color,faqs}) => (
    <div key={category} style={{ marginBottom:36 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:BRAND, borderRadius:8, padding:"8px 16px" }}>
          <Icon size={15} color="white" />
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:11, color:"white", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>{category}</span>
        </div>
        <div style={{ flex:1, height:1, background:"#e2e8f0" }} />
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {faqs.map(({q,a},idx)=>{
          const key=`${category}-${idx}`;
          const isOpen=open[key];
          return (
            <div key={idx} style={{ border:isOpen?`1.5px solid ${BRAND}33`:"1.5px solid #e2e8f0", borderRadius:12, overflow:"hidden", background:isOpen?"#f8faff":"white", transition:"all 0.2s" }}>
              <button onClick={()=>toggle(key)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"15px 18px", background:"transparent", border:"none", cursor:"pointer", textAlign:"left", gap:12 }}>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, fontWeight:600, color:BRAND, lineHeight:1.5 }}>{q}</span>
                <div style={{ width:26, height:26, borderRadius:"50%", border:`1.5px solid ${BRAND}33`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:isOpen?BRAND:"transparent", transition:"all 0.2s" }}>
                  <ChevronDown size={14} color={isOpen?"white":BRAND} style={{ transform:isOpen?"rotate(180deg)":"rotate(0)", transition:"transform 0.2s" }} />
                </div>
              </button>
              {isOpen && (
                <div style={{ padding:"0 18px 16px", borderTop:"1px solid #e2e8f0" }}>
                  <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:"#475569", lineHeight:1.75, margin:"12px 0 0" }}>{a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        .faq-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        @media(max-width:820px){ .faq-grid { grid-template-columns:1fr; } }
      `}</style>
      <section style={{ background:"#eff6ff", padding:"clamp(40px,8vw,80px) 24px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, letterSpacing:"0.25em", color:`${BRAND}99`, textTransform:"uppercase", marginBottom:8 }}>Support</p>
            <h2 style={{ fontFamily:"'Cinzel',serif", color:BRAND, fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:700, letterSpacing:"0.12em", margin:"0 0 4px" }}>Frequently Asked Questions</h2>
            <Divider />
            <p style={{ fontFamily:"'Poppins',sans-serif", color:"#64748b", fontSize:14, margin:"8px 0 0" }}>Everything you need to know about our filtration products.</p>
          </div>
          <div className="faq-grid">
            <div>{half1.map(renderCategory)}</div>
            <div>{half2.map(renderCategory)}</div>
          </div>
        </div>
      </section>
    </>
  );
};


// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
      `}</style>
      <div style={{ minHeight:"100vh" }}>
        <HeroBanner />
        <ContactSection />
        
        <WhyChooseUs />
        <FAQSection />
 
      </div>
    </>
  );
}