import { useState } from "react";
import { ArrowRight, Zap, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const T = { cinzel: "'Cinzel', serif", poppins: "'Poppins', sans-serif" };

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap');

        .footer-col-head {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,1);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 22px;
        }

        .footer-link {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px;
          color: rgba(255,255,255,1);
          margin-bottom: 13px;
          text-decoration: none;
          font-weight: 400;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #4a96b6; }

        .footer-social {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: all 0.3s; cursor: pointer;
        }
        .footer-social:hover {
          background: #2d3d8b;
          border-color: #2d3d8b;
          transform: translateY(-2px);
        }

        .footer-input {
          flex: 1;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          border-radius: 8px;
          font-size: 13px;
          padding: 11px 14px;
          font-family: 'Poppins', sans-serif;
          outline: none;
          transition: border-color 0.3s;
        }
        .footer-input:focus { border-color: rgba(45,61,139,0.35); }
        .footer-input::placeholder { color: rgba(255,255,255,0.3); }

        .footer-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 11px 16px; border-radius: 8px; flex-shrink: 0;
          background: rgba(45,61,139,0.35); color: white; border: none; cursor: pointer;
          transition: all 0.3s; box-shadow: 0 4px 14px rgba(45,61,139,0.35);
        }
        .footer-btn:hover {
          background: #1f2d70;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(45,61,139,0.45);
        }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{ background: "rgb(23, 34, 88)", padding: "72px clamp(16px,4vw,40px) 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Main grid */}
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1.5fr",
              gap: 52,
              marginBottom: 52,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              paddingBottom: 52,
            }}
          >

            {/* ── Brand column ── */}
            <div>
              {/* Logo — falls back to text if image missing */}
              <Link to ="#home" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
                <img
                  src="/logo5/1.png"
                  alt="V3 Auto Group"
                  style={{ height: 36, width: "auto", objectFit: "contain" }}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
             
              </Link>

              <p style={{ fontFamily: T.poppins, fontSize: 13.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.85, maxWidth: 280, fontWeight: 400 }}>
                Supplying premium automotive filtration solutions to workshops, dealerships, and fleet operators across India since 2009.
              </p>

              {/* Social icons */}
              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                {[
                  { label: "IN", href: "#" },
                  { label: "TW", href: "#" },
                  { label: "FB", href: "#" },
                ].map(s => (
                  <a key={s.label} href={s.href} className="footer-social">
                    <span style={{ fontFamily: T.poppins, fontSize: 10, color: "white", fontWeight: 700 }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Products column ── */}
            <div>
              <div className="footer-col-head">Products</div>
              {[
                { label: "Oil Filter", href: "/product" },
                { label: "Air Filter", href: "/product" },
                { label: "Foam Filter", href: "product" },
                { label: "Oil Strainer Filter", href: "/product" },
             
              ].map(({ label, href }) => (
                <Link key={label} to={href} className="footer-link">{label}</Link>
              ))}
            </div>

            {/* ── Company column ── */}
            <div>
              <div className="footer-col-head">Company</div>
              {[
                { label: "About Us", href: "/about" },
                { label: "Why V3", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Founder", href:"/about"}
         
              ].map(({ label, href }) => (
                <Link key={label} to={href} className="footer-link">{label}</Link>
              ))}
            </div>

            {/* ── Catalogue / newsletter column ── */}
            <div>
              <div className="footer-col-head">Catalogue</div>
              <p style={{ fontFamily: T.poppins, fontSize: 13.5, color: "rgba(255,255,255,0.38)", marginBottom: 18, lineHeight: 1.72, fontWeight: 400 }}>
                Drop your email and we'll send you our full product catalogue.
              </p>

              {sent ? (
                <div style={{
                  padding: "12px 16px", borderRadius: 8,
                  background: "rgba(45,61,139,0.25)", border: "1px solid rgba(45,61,139,0.5)",
                  fontFamily: T.poppins, fontSize: 13, color: "#7ecde8", fontWeight: 500,
                }}>
                  ✓ Catalogue request sent!
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="footer-input"
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <button className="footer-btn" onClick={handleSend}>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {/* Contact info */}
              <div style={{ marginTop: 28 }}>
                <div className="footer-col-head" style={{ marginBottom: 16 }}>Contact</div>
                {[
                  { icon: Phone, text: "+91 99XXXXXXXX" },
                  { icon: Mail, text: "v3auto@gmail.com " },
                  { icon: MapPin, text: "New Delhi – 110020" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
                    <Icon size={13} color="rgba(74,150,182,0.7)" strokeWidth={1.8} />
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 14,
          }}>
            <span style={{ fontFamily: T.poppins, fontSize: 13, color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>
              © 2025 V3 Auto Group. All rights reserved.
            </span>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Service"].map(l => (
                <a key={l} href="#" style={{ fontFamily: T.poppins, fontSize: 12.5, color: "rgba(255,255,255,0.2)", textDecoration: "none", fontWeight: 400, transition: "color .2s" }}
                  onMouseEnter={e => (e.target.style.color = "#4a96b6")}
                  onMouseLeave={e => (e.target.style.color = "rgba(255,255,255,0.2)")}
                >{l}</a>
              ))}
              <span style={{ fontFamily: T.poppins, fontSize: 12.5, color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>
                Engineered for Excellence.
              </span>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}