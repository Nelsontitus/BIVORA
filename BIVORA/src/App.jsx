import { useEffect, useMemo, useRef, useState } from "react";

const C = {
  ink: "#0A0A0A",
  paper: "#FAFAF8",
  cream: "#F2F0EB",
  accent: "#C8553D",
  accentL: "#D4745F",
  muted: "#6B6560",
  border: "#E2DFD9",
  card: "#FFF",
  dark: "#1A1714",
  darkM: "#A39E96",
};

const F = {
  d: "'Playfair Display', Georgia, serif",
  b: "'DM Sans', 'Helvetica Neue', sans-serif",
  m: "'JetBrains Mono', monospace",
};

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([el]) => {
        if (el.isIntersecting) setV(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, primary, onClick, full }) {
  const [h, setH] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: F.b,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.5,
        padding: "15px 32px",
        border: primary ? "none" : `1.5px solid ${C.ink}`,
        borderRadius: 0,
        cursor: "pointer",
        background: primary
          ? h
            ? C.accentL
            : C.accent
          : h
          ? C.ink
          : "transparent",
        color: primary ? "#fff" : h ? "#fff" : C.ink,
        transition: "all 0.3s",
        textTransform: "uppercase",
        width: full ? "100%" : "auto",
      }}
    >
      {children}
    </button>
  );
}

function Nav({ page, go }) {
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);

  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const items = useMemo(
    () => [
      ["Home", "home"],
      ["Services", "services"],
      ["Pricing", "pricing"],
      ["Case Studies", "cases"],
      ["About", "about"],
      ["Insights", "insights"],
      ["Contact", "contact"],
      ["FAQ", "faq"],
    ],
    []
  );

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: sc ? "12px 0" : "18px 0",
          background: sc ? "rgba(250,250,248,0.95)" : "transparent",
          backdropFilter: sc ? "blur(16px)" : "none",
          borderBottom: sc ? `1px solid ${C.border}` : "1px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            onClick={() => {
              go("home");
              window.scrollTo(0, 0);
            }}
            style={{
              fontFamily: F.d,
              fontSize: 22,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: -0.5,
            }}
          >
            BIVORA<span style={{ color: C.accent }}>.</span>
          </div>

          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="dnav">
            {items.map(([label, p]) => (
              <span
                key={p}
                onClick={() => {
                  go(p);
                  window.scrollTo(0, 0);
                }}
                style={{
                  fontFamily: F.b,
                  fontSize: 13,
                  fontWeight: page === p ? 600 : 400,
                  cursor: "pointer",
                  color: page === p ? C.accent : C.muted,
                  transition: "color 0.2s",
                }}
              >
                {label}
              </span>
            ))}
            <Btn
              primary
              onClick={() => {
                go("book");
                window.scrollTo(0, 0);
              }}
            >
              Book a Call
            </Btn>
          </div>

          <div
            className="mtog"
            onClick={() => setMob(!mob)}
            style={{
              display: "none",
              cursor: "pointer",
              fontFamily: F.b,
              fontSize: 20,
              padding: 8,
              userSelect: "none",
            }}
          >
            {mob ? "X" : "☰"}
          </div>
        </div>
      </nav>

      {mob && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: C.paper,
            zIndex: 999,
            paddingTop: 80,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {items.map(([label, p]) => (
                <span
                  key={p}
                  onClick={() => {
                    go(p);
                    setMob(false);
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    fontFamily: F.d,
                    fontSize: 18,
                    cursor: "pointer",
                    color: page === p ? C.accent : C.ink,
                    padding: "8px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {label}
                </span>
              ))}
              <Btn
                primary
                full
                onClick={() => {
                  go("book");
                  setMob(false);
                  window.scrollTo(0, 0);
                }}
              >
                Book a Call
              </Btn>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width:900px){
          .dnav{display:none !important;}
          .mtog{display:block !important;}
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ background: C.dark, color: C.darkM, padding: "72px 0 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            marginBottom: 56,
          }}
        >
          <div>
            <div style={{ fontFamily: F.d, fontSize: 22, fontWeight: 700, color: C.paper, marginBottom: 14 }}>
              BIVORA<span style={{ color: C.accent }}>.</span>
            </div>
            <p style={{ fontFamily: F.b, fontSize: 13, lineHeight: 1.8, maxWidth: 260 }}>
              UK advertising agency building predictable customer acquisition systems.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: F.b,
                color: C.paper,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Pages
            </h4>
            {[
              ["Home", "home"],
              ["Services", "services"],
              ["Pricing", "pricing"],
              ["Case Studies", "cases"],
              ["About", "about"],
            ].map(([label, p]) => (
              <div
                key={p}
                onClick={() => {
                  go(p);
                  window.scrollTo(0, 0);
                }}
                style={{ fontFamily: F.b, fontSize: 13, marginBottom: 10, cursor: "pointer" }}
              >
                {label}
              </div>
            ))}
          </div>

          <div>
            <h4
              style={{
                fontFamily: F.b,
                color: C.paper,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Legal
            </h4>
            {[
              ["Privacy Policy", "privacy"],
              ["Terms of Service", "terms"],
              ["Cookie Policy", "cookies"],
            ].map(([label, p]) => (
              <div
                key={p}
                onClick={() => {
                  go(p);
                  window.scrollTo(0, 0);
                }}
                style={{ fontFamily: F.b, fontSize: 13, marginBottom: 10, cursor: "pointer" }}
              >
                {label}
              </div>
            ))}
          </div>

          <div>
            <h4
              style={{
                fontFamily: F.b,
                color: C.paper,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Contact
            </h4>
            <p style={{ fontFamily: F.b, fontSize: 13, marginBottom: 6 }}>hello@bivora.co.uk</p>
            <p style={{ fontFamily: F.b, fontSize: 13 }}>England & Wales</p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: F.b,
            fontSize: 11,
          }}
        >
          <span>© 2025 Bivora Limited. All rights reserved.</span>
          <span>Company No. [Insert]. Registered in England and Wales</span>
        </div>
      </div>
    </footer>
  );
}

const Label = ({ children, light }) => (
  <div
    style={{
      fontFamily: F.m,
      fontSize: 11,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: light ? C.darkM : C.muted,
      marginBottom: 14,
      fontWeight: 500,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, light, center }) => (
  <h2
    style={{
      fontFamily: F.d,
      fontSize: "clamp(26px,4vw,42px)",
      fontWeight: 600,
      lineHeight: 1.2,
      color: light ? C.paper : C.ink,
      maxWidth: 680,
      textAlign: center ? "center" : "left",
      margin: center ? "0 auto" : 0,
    }}
  >
    {children}
  </h2>
);

const Wrap = ({ children, wide }) => (
  <div style={{ maxWidth: wide ? 1200 : 940, margin: "0 auto", padding: "0 24px" }}>{children}</div>
);

const Sec = ({ children, bg, dark, style, pad }) => (
  <section
    style={{
      padding: pad || "90px 0",
      background: bg || (dark ? C.dark : "transparent"),
      color: dark ? C.paper : C.ink,
      ...style,
    }}
  >
    {children}
  </section>
);

const Dot = () => <div style={{ width: 48, height: 3, background: C.accent, margin: "20px 0 16px" }} />;

function Home({ go }) {
  return (
    <div>
      <Sec pad="160px 0 100px" bg={`linear-gradient(165deg,${C.paper},${C.cream},${C.paper})`}>
        <Wrap>
          <Reveal>
            <Label>UK Advertising Agency</Label>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              style={{
                fontFamily: F.d,
                fontSize: "clamp(34px,5.5vw,60px)",
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: 24,
                letterSpacing: -1,
              }}
            >
              Turn Advertising Spend Into{" "}
              <span style={{ color: C.accent }}>Predictable Revenue</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                fontFamily: F.b,
                fontSize: 17,
                color: C.muted,
                maxWidth: 560,
                marginBottom: 40,
                lineHeight: 1.8,
              }}
            >
              Bivora Limited builds paid advertising systems for businesses ready to generate consistent leads and sales,
              not just clicks.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn
                primary
                onClick={() => {
                  go("book");
                  window.scrollTo(0, 0);
                }}
              >
                Book a Strategy Call
              </Btn>
              <Btn
                onClick={() => {
                  go("services");
                  window.scrollTo(0, 0);
                }}
              >
                View Our Services
              </Btn>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 1,
                background: C.border,
                marginTop: 80,
                overflow: "hidden",
              }}
            >
              {[
                ["Platforms", "Meta & Google"],
                ["Focus", "UK Businesses"],
                ["Approach", "Data Led"],
                ["Reporting", "Transparent"],
              ].map(([k, v], i) => (
                <div key={i} style={{ background: C.card, padding: "24px 20px", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: F.m,
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: C.muted,
                      marginBottom: 6,
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ fontFamily: F.d, fontSize: 15, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <Reveal>
            <Label>What We Do</Label>
            <Title>
              We Build Advertising Systems That Drive Revenue
            </Title>
            <Dot />
          </Reveal>

          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, maxWidth: 560, marginBottom: 48, lineHeight: 1.8 }}>
              Most businesses waste money on ads because they launch without a system. We build the full infrastructure:
              targeting, tracking, and conversion.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              ["Paid Ads Management", "Meta and Google campaigns built around your revenue goals."],
              ["Lead Generation", "Structured systems to fill your pipeline with qualified enquiries."],
              ["Conversion Optimisation", "Fixing the gaps between your traffic and your sales."],
              ["Creative Direction", "Ad creatives you stop the scroll and speak to your buyer."],
              ["Retargeting Campaigns", "Re engaging warm audiences who did not convert first time."],
              ["Analytics & Tracking", "Every conversion measured, every decision data backed."],
            ].map(([t, d], i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  style={{
                    padding: 32,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    height: "100%",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.accent;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, marginBottom: 18 }} />
                  <h3 style={{ fontFamily: F.d, fontSize: 17, fontWeight: 600, marginBottom: 10 }}>{t}</h3>
                  <p style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>

      <Sec bg={C.cream}>
        <Wrap>
          <Reveal>
            <Label>Our Process</Label>
            <Title>From Audit to Scale</Title>
            <Dot />
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 36, marginTop: 32 }}>
            {[
              ["01", "Strategy & Audit", "We understand your business, audit current advertising, and build a tailored strategy with clear KPIs."],
              ["02", "Campaign Build & Launch", "Audience targeting, creatives, tracking, and structure. Nothing goes live until the full system is ready."],
              ["03", "Optimisation & Scaling", "Daily monitoring, weekly learning loops, and scaling what works while cutting waste."],
            ].map(([n, t, d], i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>
                    {n}
                  </div>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{t}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <Reveal delay={0.25}>
              <Btn
                primary
                onClick={() => {
                  go("book");
                  window.scrollTo(0, 0);
                }}
              >
                Book a Call
              </Btn>
            </Reveal>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Services({ go }) {
  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Services</Label>
            <Title>Everything You Need To Run Profitable Ads</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 720 }}>
              We do not sell random ads. We build systems that can be measured, improved, and scaled.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {[
              ["Meta Ads Management", "Full campaign build, creative testing, retargeting, and weekly reporting."],
              ["Google Search Ads", "High intent keywords, landing page alignment, and conversion tracking."],
              ["Landing Page Review", "Improve message clarity, trust signals, and conversion rate."],
              ["Tracking Setup", "GA4, Meta Pixel, Google Tag Manager, events, and conversion diagnostics."],
              ["Creative Frameworks", "Angles, hooks, and formats that speak to your buyer."],
              ["Funnel Strategy", "Offer, positioning, and the path from first click to purchase."],
            ].map(([t, d], i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{t}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 32 }}>
            <Reveal delay={0.2}>
              <Btn
                primary
                onClick={() => {
                  go("book");
                  window.scrollTo(0, 0);
                }}
              >
                Book a Strategy Call
              </Btn>
            </Reveal>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Pricing({ go }) {
  const plans = [
    {
      name: "Starter",
      price: "£750/mo",
      note: "For businesses starting paid ads with a clear offer.",
      items: ["Meta or Google", "Campaign build", "Weekly optimisation", "Monthly reporting"],
    },
    {
      name: "Growth",
      price: "£1,250/mo",
      note: "For businesses ready to scale with testing and structure.",
      items: ["Meta + Google or Multi campaign", "Creative testing", "Retargeting system", "Tracking review"],
    },
    {
      name: "Scale",
      price: "Custom",
      note: "For brands with higher spend and advanced needs.",
      items: ["Full funnel support", "CRO collaboration", "Advanced reporting", "Priority support"],
    },
  ];

  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Pricing</Label>
            <Title>Simple Packages, Clear Outcomes</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 760 }}>
              Pricing depends on your goals, your offer, and your tracking setup. These are common starting points.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>
                    {p.name.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: F.d, fontSize: 26, fontWeight: 600, marginBottom: 10 }}>{p.price}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>
                    {p.note}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontFamily: F.b, fontSize: 14, color: C.ink, lineHeight: 1.9 }}>
                    {p.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 18 }}>
                    <Btn
                      primary={i === 1}
                      onClick={() => {
                        go("book");
                        window.scrollTo(0, 0);
                      }}
                      full
                    >
                      {i === 2 ? "Request a Quote" : "Book a Call"}
                    </Btn>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Cases() {
  const cases = [
    {
      title: "Lead Generation System",
      desc: "Restructured targeting and retargeting, improved landing page alignment, and reduced wasted spend.",
      result: "Improved lead quality and conversion rate.",
    },
    {
      title: "Creative Testing Sprint",
      desc: "Built a creative pipeline with angles and weekly testing cycles to find winning messages.",
      result: "Increased click intent and lowered cost per qualified enquiry.",
    },
    {
      title: "Tracking and Attribution Fix",
      desc: "Diagnosed event tracking issues and rebuilt conversion signals for better optimisation.",
      result: "More stable performance and clearer reporting.",
    },
  ];

  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Case Studies</Label>
            <Title>Proof Through Process</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 760 }}>
              We focus on repeatable systems. Results vary by offer, budget, and market, but the structure stays consistent.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{c.title}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 14 }}>
                    {c.desc}
                  </div>
                  <div style={{ fontFamily: F.m, fontSize: 12, color: C.ink, letterSpacing: 1 }}>
                    RESULT: {c.result}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function About() {
  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>About</Label>
            <Title>Built For Businesses That Want Consistency</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 820 }}>
              Bivora is a UK advertising agency focused on predictable customer acquisition. We prioritise tracking,
              disciplined testing, and honest reporting. If your offer is strong and your business can fulfil demand,
              we can help you scale responsibly.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {[
              ["Clarity", "We align messaging, offer, and targeting before spending more."],
              ["Discipline", "We run structured tests, not guesswork."],
              ["Transparency", "You see what is working, what is not, and why."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{t}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Insights() {
  const posts = [
    { title: "Why most ads fail", desc: "It is usually not the platform. It is the system behind the campaign." },
    { title: "Tracking before scaling", desc: "If you cannot measure conversions, you cannot optimise properly." },
    { title: "Creative is the new targeting", desc: "Your angle and message often matter more than your audience size." },
  ];

  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Insights</Label>
            <Title>Ideas You Can Use</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 760 }}>
              Short thoughts on ads, tracking, and conversion. Built for busy founders.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{p.title}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Contact({ go }) {
  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Contact</Label>
            <Title>Let’s Talk</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 760 }}>
              If you want a predictable paid ads system, book a call or email us.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18 }}>
            <Reveal>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Email</div>
                <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>
                  hello@bivora.co.uk
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Strategy Call</div>
                <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 14 }}>
                  Book a call to map your funnel, your offer, and your paid ads plan.
                </div>
                <Btn
                  primary
                  onClick={() => {
                    go("book");
                    window.scrollTo(0, 0);
                  }}
                >
                  Book a Call
                </Btn>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function FAQ() {
  const qs = [
    ["Do you guarantee results?", "No. Ads depend on offer, market, budget, and fulfilment. We guarantee a clear process and transparent reporting."],
    ["Do you work with small budgets?", "Yes, if your offer is clear and you can fulfil demand. We will recommend the most realistic approach."],
    ["Do you do creative?", "We provide creative direction and testing plans. Final production can be handled by your team or ours depending on scope."],
    ["How fast can we start?", "Typically after an onboarding call and access to ad accounts and tracking tools."],
  ];

  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>FAQ</Label>
            <Title>Common Questions</Title>
            <Dot />
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {qs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.05}>
                <details style={{ background: C.card, border: `1px solid ${C.border}`, padding: 18 }}>
                  <summary style={{ cursor: "pointer", fontFamily: F.d, fontSize: 16, fontWeight: 600 }}>
                    {q}
                  </summary>
                  <div style={{ marginTop: 10, fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>
                    {a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function Book() {
  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Book</Label>
            <Title>Book a Strategy Call</Title>
            <Dot />
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 820 }}>
              Replace this section with your Calendly embed or booking link. For now it shows a placeholder layout.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Booking Placeholder</div>
            <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 14 }}>
              Add your embed:
              <br />
              {"<iframe src='YOUR_CALENDLY_LINK' ... />"}
            </div>
            <Btn primary onClick={() => window.open("https://calendly.com", "_blank", "noopener,noreferrer")}>
              Open Calendly
            </Btn>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

function LegalPage({ title, body }) {
  return (
    <div>
      <Sec pad="160px 0 80px" bg={C.paper}>
        <Wrap>
          <Reveal>
            <Label>Legal</Label>
            <Title>{title}</Title>
            <Dot />
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
              {body}
            </div>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");

  const go = (p) => setPage(p);

  const content = useMemo(() => {
    if (page === "home") return <Home go={go} />;
    if (page === "services") return <Services go={go} />;
    if (page === "pricing") return <Pricing go={go} />;
    if (page === "cases") return <Cases />;
    if (page === "about") return <About />;
    if (page === "insights") return <Insights />;
    if (page === "contact") return <Contact go={go} />;
    if (page === "faq") return <FAQ />;
    if (page === "book") return <Book />;
    if (page === "privacy")
      return (
        <LegalPage
          title="Privacy Policy"
          body={`This is a placeholder privacy policy.\n\nAdd your real policy text here.\n\nInclude what data you collect, why you collect it, how you store it, and how users can contact you.`}
        />
      );
    if (page === "terms")
      return (
        <LegalPage
          title="Terms of Service"
          body={`This is a placeholder terms of service.\n\nAdd your real terms here, including scope of work, payment terms, refunds, and limitations of liability.`}
        />
      );
    if (page === "cookies")
      return (
        <LegalPage
          title="Cookie Policy"
          body={`This is a placeholder cookie policy.\n\nAdd your cookie details here, including analytics cookies, advertising cookies, and how users can manage their preferences.`}
        />
      );
    return <Home go={go} />;
  }, [page]);

  return (
    <div style={{ background: C.paper, color: C.ink, minHeight: "100vh" }}>
      <Nav page={page} go={go} />
      <div style={{ paddingTop: 72 }}>{content}</div>
      <Footer go={go} />
    </div>
  );
}
