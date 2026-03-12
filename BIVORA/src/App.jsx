import { useEffect, useMemo, useRef, useState } from "react";

const C = {
  ink: "#0A0A0A",
  paper: "#FAFAF8",
  cream: "#F2F0EB",
  accent: "#C8553D",
  accentL: "#D4745F",
  muted: "#6B6560",
  border: "#E2DFD9",
  card: "#FFFFFF",
  dark: "#1A1714",
  darkM: "#A39E96",
};

const F = {
  d: "'Playfair Display', Georgia, serif",
  b: "'DM Sans', 'Helvetica Neue', sans-serif",
  m: "'JetBrains Mono', monospace",
};

function Reveal({ children, delay = 0, immediate = false }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Btn({ children, primary = false, onClick, full = false }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: F.b,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.5,
        padding: "15px 28px",
        border: primary ? "none" : `1.5px solid ${C.ink}`,
        borderRadius: 0,
        cursor: "pointer",
        background: primary ? (hover ? C.accentL : C.accent) : hover ? C.ink : "transparent",
        color: primary ? "#fff" : hover ? "#fff" : C.ink,
        transition: "all 0.25s ease",
        textTransform: "uppercase",
        width: full ? "100%" : "auto",
        minHeight: 52,
      }}
    >
      {children}
    </button>
  );
}

function Nav({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  const handleGo = (p) => {
    go(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "18px 0",
          background: scrolled ? "rgba(250,250,248,0.96)" : "rgba(250,250,248,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            onClick={() => handleGo("home")}
            style={{
              fontFamily: F.d,
              fontSize: 22,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: -0.5,
              flexShrink: 0,
            }}
          >
            BIVORA<span style={{ color: C.accent }}>.</span>
          </div>

          <div className="dnav" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {items.map(([label, p]) => (
              <span
                key={p}
                onClick={() => handleGo(p)}
                style={{
                  fontFamily: F.b,
                  fontSize: 13,
                  fontWeight: page === p ? 600 : 400,
                  cursor: "pointer",
                  color: page === p ? C.accent : C.muted,
                  transition: "color 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            ))}
            <Btn primary onClick={() => handleGo("book")}>
              Book a Call
            </Btn>
          </div>

          <div
            className="mtog"
            onClick={() => setMobileOpen((prev) => !prev)}
            style={{
              display: "none",
              cursor: "pointer",
              fontFamily: F.b,
              fontSize: 24,
              padding: 8,
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: C.paper,
            zIndex: 999,
            paddingTop: 84,
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px 32px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map(([label, p]) => (
                <div
                  key={p}
                  onClick={() => handleGo(p)}
                  style={{
                    fontFamily: F.d,
                    fontSize: 20,
                    cursor: "pointer",
                    color: page === p ? C.accent : C.ink,
                    padding: "14px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {label}
                </div>
              ))}

              <div style={{ marginTop: 16 }}>
                <Btn primary full onClick={() => handleGo("book")}>
                  Book a Call
                </Btn>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: ${C.paper};
          color: ${C.ink};
        }

        @media (max-width: 1100px) {
          .dnav {
            display: none !important;
          }
          .mtog {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

function Footer({ go }) {
  const handleGo = (p) => {
    go(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ background: C.dark, color: C.darkM, padding: "72px 0 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 36,
            marginBottom: 52,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: F.d,
                fontSize: 22,
                fontWeight: 700,
                color: C.paper,
                marginBottom: 14,
              }}
            >
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
            {[["Home", "home"], ["Services", "services"], ["Pricing", "pricing"], ["Case Studies", "cases"], ["About", "about"]].map(
              ([label, p]) => (
                <div
                  key={p}
                  onClick={() => handleGo(p)}
                  style={{
                    fontFamily: F.b,
                    fontSize: 13,
                    marginBottom: 10,
                    cursor: "pointer",
                    color: C.darkM,
                  }}
                >
                  {label}
                </div>
              )
            )}
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
            {[["Privacy Policy", "privacy"], ["Terms of Service", "terms"], ["Cookie Policy", "cookies"]].map(([label, p]) => (
              <div
                key={p}
                onClick={() => handleGo(p)}
                style={{
                  fontFamily: F.b,
                  fontSize: 13,
                  marginBottom: 10,
                  cursor: "pointer",
                  color: C.darkM,
                }}
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
            <p style={{ fontFamily: F.b, fontSize: 13, marginBottom: 6 }}>Stacey@bivora.co.uk</p>
            <p style={{ fontFamily: F.b, fontSize: 13 }}>+44 7477158745</p>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: F.b,
            fontSize: 11,
          }}
        >
          <span>© 2025 Bivora Limited. All rights reserved.</span>
          <span>Company No. 16662699. Registered in England and Wales</span>
        </div>
      </div>
    </footer>
  );
}

const Label = ({ children, light = false }) => (
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

const Title = ({ children, light = false, center = false }) => (
  <h2
    style={{
      fontFamily: F.d,
      fontSize: "clamp(28px, 5vw, 42px)",
      fontWeight: 600,
      lineHeight: 1.15,
      color: light ? C.paper : C.ink,
      maxWidth: 760,
      textAlign: center ? "center" : "left",
      margin: center ? "0 auto" : 0,
    }}
  >
    {children}
  </h2>
);

const Wrap = ({ children, wide = false }) => (
  <div style={{ maxWidth: wide ? 1200 : 980, margin: "0 auto", padding: "0 20px" }}>{children}</div>
);

const Sec = ({ children, bg, dark = false, style, pad }) => (
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
  const handleGo = (p) => {
    go(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Sec pad="120px 0 80px" bg={`linear-gradient(165deg, ${C.paper}, ${C.cream}, ${C.paper})`}>
        <Wrap>
          <Reveal immediate>
            <Label>UK Advertising Agency</Label>
          </Reveal>

          <Reveal immediate delay={0.05}>
            <h1
              style={{
                fontFamily: F.d,
                fontSize: "clamp(34px, 9vw, 60px)",
                fontWeight: 600,
                lineHeight: 1.05,
                marginBottom: 22,
                letterSpacing: -1,
                maxWidth: 900,
              }}
            >
              Turn Advertising Spend Into{" "}
              <span style={{ color: C.accent }}>Predictable Revenue</span>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.1}>
            <p
              style={{
                fontFamily: F.b,
                fontSize: 17,
                color: C.muted,
                maxWidth: 620,
                marginBottom: 34,
                lineHeight: 1.8,
              }}
            >
              Bivora Limited builds paid advertising systems that generate consistent leads and sales for UK businesses.
            </p>
          </Reveal>

          <Reveal immediate delay={0.15}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <Btn primary onClick={() => handleGo("book")}>
                Book a Strategy Call
              </Btn>
              <Btn onClick={() => handleGo("services")}>View Our Services</Btn>
            </div>
          </Reveal>

          <Reveal immediate delay={0.2}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 1,
                background: C.border,
                overflow: "hidden",
              }}
            >
              {[
                ["Platforms", "Meta & Google"],
                ["Focus", "UK Businesses"],
                ["Approach", "Data Led"],
                ["Reporting", "Transparent"],
              ].map(([k, v], i) => (
                <div key={i} style={{ background: C.card, padding: "24px 18px", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: F.m,
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: C.muted,
                      marginBottom: 8,
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
            <Title>We Build Advertising Systems That Drive Revenue</Title>
            <Dot />
          </Reveal>

          <Reveal delay={0.08}>
            <p
              style={{
                fontFamily: F.b,
                fontSize: 15,
                color: C.muted,
                maxWidth: 620,
                marginBottom: 42,
                lineHeight: 1.8,
              }}
            >
              Most businesses waste money on ads because they launch without a system. We build the full infrastructure:
              targeting, tracking, and conversion.
            </p>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {[
              ["Paid Ads Management", "Meta and Google campaigns built around your revenue goals."],
              ["Lead Generation", "Structured systems to fill your pipeline with qualified enquiries."],
              ["Conversion Optimisation", "Fixing the gaps between your traffic and your sales."],
              ["Creative Direction", "Ad creatives that stop the scroll and speak to your buyer."],
              ["Retargeting Campaigns", "Re engaging warm audiences who did not convert the first time."],
              ["Analytics & Tracking", "Every conversion measured, every decision backed by data."],
            ].map(([t, d], i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  style={{
                    padding: 28,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    height: "100%",
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, marginBottom: 18 }} />
                  <h3 style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{t}</h3>
                  <p style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d}</p>
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 28,
            }}
          >
            {[
              [
                "01",
                "Strategy & Audit",
                "We understand your business, audit current advertising, and build a tailored strategy with clear KPIs.",
              ],
              [
                "02",
                "Campaign Build & Launch",
                "Audience targeting, creatives, tracking, and structure. Nothing goes live until the full system is ready.",
              ],
              [
                "03",
                "Optimisation & Scaling",
                "Daily monitoring, weekly learning loops, and scaling what works while cutting wasted spend.",
              ],
            ].map(([n, t, d], i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                  <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>{n}</div>
                  <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{t}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 30 }}>
            <Reveal delay={0.2}>
              <Btn primary onClick={() => handleGo("book")}>
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
  const handleGo = (p) => {
    go(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Services</Label>
            <Title>Everything You Need To Run Profitable Ads</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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

          <div style={{ marginTop: 30 }}>
            <Reveal delay={0.18}>
              <Btn primary onClick={() => handleGo("book")}>
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
  const handleGo = (p) => {
    go(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const plans = [
    {
      name: "1 Month",
      price: "£1,000",
      note: "Get started with a single month of paid ads management.",
      items: ["Meta or Google", "Campaign build", "Weekly optimisation", "Monthly reporting"],
    },
    {
      name: "2 Months",
      price: "£2,000",
      note: "Build momentum with two months of structured campaign management.",
      items: ["Meta + Google or multi campaign", "Creative testing", "Retargeting system", "Tracking review"],
    },
    {
      name: "3 Months",
      price: "£3,000",
      note: "The recommended starting point for consistent, scalable results.",
      items: ["Full funnel support", "CRO collaboration", "Advanced reporting", "Priority support"],
    },
  ];

  return (
    <div>
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Pricing</Label>
            <Title>Simple Packages, Clear Outcomes</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${i === 1 ? C.accent : C.border}`,
                    padding: 28,
                    position: "relative",
                    height: "100%",
                  }}
                >
                  {i === 1 && <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: C.accent }} />}
                  <div style={{ fontFamily: F.m, fontSize: 11, letterSpacing: 2, color: C.muted, marginBottom: 10 }}>
                    {p.name.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: F.d, fontSize: 26, fontWeight: 600, marginBottom: 10 }}>{p.price}</div>
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 16 }}>{p.note}</div>
                  <ul style={{ paddingLeft: 18, fontFamily: F.b, fontSize: 14, color: C.ink, lineHeight: 1.9 }}>
                    {p.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 18 }}>
                    <Btn primary={i === 1} full onClick={() => handleGo("book")}>
                      Book a Call
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
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Case Studies</Label>
            <Title>Proof Through Process</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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
                  <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 14 }}>{c.desc}</div>
                  <div style={{ fontFamily: F.m, fontSize: 12, color: C.accent, letterSpacing: 1 }}>RESULT: {c.result}</div>
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
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>About</Label>
            <Title>Built For Businesses That Want Consistency</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Insights</Label>
            <Title>Ideas You Can Use</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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
  const handleGo = (p) => {
    go(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Contact</Label>
            <Title>Let's Talk</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
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
                <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>Stacey@bivora.co.uk</div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
                <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Strategy Call</div>
                <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 14 }}>
                  Book a call to map your funnel, your offer, and your paid ads plan.
                </div>
                <Btn primary onClick={() => handleGo("book")}>
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
  const [open, setOpen] = useState(null);

  const qs = [
    [
      "Do you guarantee results?",
      "No. Ads depend on offer, market, budget, and fulfilment. We guarantee a clear process and transparent reporting.",
    ],
    [
      "Do you work with small budgets?",
      "Yes, if your offer is clear and you can fulfil demand. We will recommend the most realistic approach.",
    ],
    [
      "Do you do creative?",
      "We provide creative direction and testing plans. Final production can be handled by your team or ours depending on scope.",
    ],
    [
      "How fast can we start?",
      "Typically after an onboarding call and access to ad accounts and tracking tools.",
    ],
  ];

  return (
    <div>
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>FAQ</Label>
            <Title>Common Questions</Title>
            <Dot />
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ display: "grid", gap: 12 }}>
            {qs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.05}>
                <div
                  style={{
                    background: C.card,
                    border: `1px solid ${open === i ? C.accent : C.border}`,
                    padding: 18,
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div style={{ fontFamily: F.d, fontSize: 16, fontWeight: 600 }}>{q}</div>
                    <div style={{ fontFamily: F.m, fontSize: 16, color: C.accent, flexShrink: 0 }}>{open === i ? "−" : "+"}</div>
                  </div>

                  {open === i && (
                    <div style={{ marginTop: 10, fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{a}</div>
                  )}
                </div>
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
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Book</Label>
            <Title>Book a Strategy Call</Title>
            <Dot />
          </Reveal>

          <Reveal immediate delay={0.08}>
            <p style={{ fontFamily: F.b, fontSize: 15, color: C.muted, lineHeight: 1.9, maxWidth: 820 }}>
              Choose a time that works for you. We will map your funnel, review your offer, and outline a paid ads plan.
            </p>
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <Reveal>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
              <div style={{ fontFamily: F.d, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Schedule a Call</div>
              <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.8, marginBottom: 20 }}>
                Click below to open the booking calendar and select a time that works for you.
              </div>
              <Btn
                primary
                onClick={() => window.open("https://calendly.com/bivorauk/new-meeting", "_blank", "noopener,noreferrer")}
              >
                Book a Strategy Call
              </Btn>
            </div>
          </Reveal>
        </Wrap>
      </Sec>
    </div>
  );
}

function LegalPage({ title, body }) {
  return (
    <div>
      <Sec pad="120px 0 70px" bg={C.paper}>
        <Wrap>
          <Reveal immediate>
            <Label>Legal</Label>
            <Title>{title}</Title>
            <Dot />
          </Reveal>
        </Wrap>
      </Sec>

      <Sec>
        <Wrap>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ fontFamily: F.b, fontSize: 14, color: C.muted, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{body}</div>
          </div>
        </Wrap>
      </Sec>
    </div>
  );
}

const PRIVACY = `PRIVACY POLICY


1. Introduction
This Privacy Policy explains how Bivora Limited collects, uses, stores, shares, and otherwise processes personal data in connection with our advertising, marketing, and related services (the "Services").

We are committed to protecting your privacy and handling personal data in a transparent, lawful, and secure manner. This Privacy Policy applies to all individuals whose personal data we process, including clients, prospective clients, website visitors, job applicants, suppliers, and other individuals who interact with us.

We process personal data in accordance with the Data Protection Act 2018 and the UK General Data Protection Regulation ("UK GDPR").

Please read this Privacy Policy carefully. If you have any questions, please contact us using the details in Section 14.

2. Definitions
In this Privacy Policy:
• "Personal Data" means any information relating to an identified or identifiable natural person.
• "Processing" means any operation performed on personal data, including collection, storage, use, disclosure, transfer, and deletion.
• "Data Subject" means the individual to whom personal data relates.
• "Data Controller" means the person or organisation that determines the purposes and means of processing personal data.
• "Data Processor" means a person or organisation that processes personal data on behalf of a data controller.
• "Special Category Data" means personal data relating to matters such as racial or ethnic origin, political opinions, religious beliefs, trade union membership, genetic data, biometric data, health, sex life, or sexual orientation.

3. Categories of Personal Data We Collect
We collect different categories of personal data depending on how you interact with us.

3.1 Client and Contact Information
We may collect:
• Name
• Email address
• Telephone number
• Job title
• Company name
• Industry and business type
• Physical address and billing address
• Payment and banking information, where relevant, usually processed securely by third-party payment providers

3.2 Website Visitor Information
When you visit our website, we may collect:
• IP address and device identifiers
• Browser type and operating system
• Pages viewed and duration of visit
• Referral source and browsing activity
• Cookies and similar tracking technologies

3.3 Marketing and Communications Data
We may collect:
• Newsletter sign-up details
• Marketing preferences
• Email engagement history
• Survey responses and feedback
• Social media handles, interactions, and communications

3.4 Employment and Recruitment Data
If you apply to work with us, we may collect:
• CV and employment history
• Qualifications and references
• Background check information, where appropriate
• Payroll and tax information, if employment begins

4. Lawful Bases for Processing
We only process personal data where we have a valid lawful basis under UK GDPR.

4.1 Consent
We rely on consent where required, particularly for certain marketing communications and non-essential cookies. You may withdraw consent at any time.

4.2 Contractual Necessity
We process personal data where necessary to enter into or perform a contract with you, including delivering services, invoicing, project communication, and account management.

4.3 Legal Obligation
We may process personal data to comply with our legal obligations, including tax, accounting, employment, anti-money laundering, and regulatory requirements.

4.4 Legitimate Interests
We may process personal data where necessary for our legitimate interests, provided those interests are not overridden by your rights and freedoms. These interests may include:
• Improving our website and services
• Monitoring and maintaining security
• Preventing fraud and misuse
• Analysing business performance
• Managing client relationships
• Sending direct marketing where permitted by law

4.5 Vital Interests
In exceptional cases, we may process personal data to protect someone's vital interests.

5. Purposes of Processing
We may process personal data for the following purposes:
• Providing advertising, marketing, and consulting services
• Managing enquiries, proposals, contracts, and client accounts
• Delivering campaigns and reporting on performance
• Processing payments and maintaining financial records
• Sending operational communications, invoices, and service updates
• Sending marketing communications where lawful
• Improving website functionality and user experience
• Analysing campaign and business performance
• Hiring and managing staff
• Complying with legal and regulatory obligations
• Preventing fraud, abuse, or unauthorised access
• Establishing, exercising, or defending legal claims

6. Data Sharing and Disclosure
We may share personal data only where necessary and appropriate.

6.1 Service Providers
We may share personal data with trusted third-party service providers such as:
• Cloud hosting and storage providers
• Payment processors and banking providers
• Email and marketing automation platforms
• Analytics and reporting platforms
• Legal, compliance, and accounting advisers

These providers are required to process personal data only on our instructions and to implement appropriate security measures.

6.2 Advertising and Media Partners
Where relevant to service delivery, we may share client-related data with advertising platforms, publishers, media networks, and related partners in order to execute campaigns and measure results.

6.3 Legal and Regulatory Authorities
We may disclose personal data where required by law or where reasonably necessary to comply with legal obligations, court orders, government requests, or regulatory requirements.

6.4 Corporate Transactions
If we are involved in a merger, restructuring, investment, acquisition, or sale of assets, personal data may be disclosed or transferred as part of that transaction, subject to appropriate safeguards.

6.5 Consent-Based Sharing
We may also share personal data with third parties where you have expressly consented.

7. Data Retention
We retain personal data only for as long as necessary for the purposes for which it was collected, including to satisfy legal, regulatory, tax, accounting, and reporting requirements.

Typical retention periods include:
• Client and contract records: for the duration of the relationship and up to 6 to 7 years afterwards
• Marketing records: while you remain subscribed and, where relevant, for a reasonable period after unsubscribing
• Website analytics data: generally 12 to 24 months
• Recruitment data: generally up to 12 months unless longer retention is required or agreed
• Data relevant to disputes or claims: until the matter is resolved and any limitation period has passed

When data is no longer required, we securely delete or anonymise it unless we are legally required to retain it.

8. International Data Transfers
Some of our providers may process personal data outside the UK or EEA. Where this happens, we take appropriate steps to ensure your personal data remains protected.

These safeguards may include:
• Standard Contractual Clauses
• Binding Corporate Rules
• Transfers to countries with an adequacy decision
• Other lawful transfer mechanisms
• Your explicit consent, where appropriate

You may contact us if you would like more information about the safeguards we use.

9. Your Rights
Under UK GDPR, you may have the following rights, subject to certain conditions and exemptions:
• The right to access your personal data
• The right to correct inaccurate or incomplete data
• The right to request deletion of your personal data
• The right to restrict processing
• The right to object to processing
• The right to data portability
• Rights in relation to automated decision-making and profiling
• The right to withdraw consent where processing relies on consent
• The right to complain to the Information Commissioner's Office ("ICO")

If you wish to exercise any of these rights, please contact us using the details in Section 14.

10. Data Security
We use appropriate technical and organisational measures to protect personal data against accidental loss, misuse, unauthorised access, disclosure, or destruction.

These measures may include:
• Encryption in transit and, where appropriate, at rest
• Access controls and authentication procedures
• Secure systems and infrastructure
• Staff training and confidentiality obligations
• Monitoring, auditing, and incident response processes

While we take security seriously, no system can be guaranteed to be completely secure.

11. Cookies and Tracking Technologies
Our website uses cookies and similar technologies to improve functionality, analyse usage, and support marketing activities.

For more information about the cookies we use, the purposes for which we use them, and how you can manage your preferences, please see our Cookie Policy.

12. Third-Party Links
Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, content, or security of those external websites. We encourage you to review their privacy policies before sharing personal data.

13. Marketing Communications
Where permitted by law, we may send you marketing communications about our services, updates, and insights.

You can opt out at any time by:
• Clicking the unsubscribe link in any marketing email
• Contacting us directly
• Updating your preferences, where available

Please note that even if you opt out of marketing, we may still send service-related and transactional communications where necessary.

14. Contact Details
If you have questions about this Privacy Policy, would like to exercise your rights, or wish to raise a data protection concern, please contact:

Bivora Limited
Address: 125 Deansgate, Manchester, M3 2BY
Email: Stacey@bivora.co.uk
Phone: +44 7477158745
Website: bivora.co.uk
Company No.: 16662699

15. Changes to This Privacy Policy
We may update this Privacy Policy from time to time to reflect changes in our business, technology, legal obligations, or data processing practices.

Any material updates will be posted on our website together with the revised "Last Updated" date.`;

const TERMS = `TERMS OF SERVICE

1. Introduction and Acceptance
These Terms of Service form a legally binding agreement between Bivora Limited a company registered in England and Wales, and you.

By accessing our website, requesting our services, signing a proposal, statement of work, or contract, or otherwise engaging us, you confirm that you have read, understood, and agreed to these Terms.

If you do not agree to these Terms, you must not use our services.

2. Services
We provide advertising, marketing, creative, and related consulting services as set out in individual proposals, statements of work ("SOWs"), quotations, or contracts.

Services may include:
• Digital advertising strategy and campaign management
• Brand and creative strategy
• Media planning and buying
• Copywriting and content creation
• Social media services
• SEO and SEM services
• Reporting, analytics, and performance reviews
• Marketing consultancy and advisory support

The exact scope of services will be set out in the relevant SOW or contract. If there is any conflict between these Terms and a signed SOW or contract, the signed SOW or contract will prevail.

3. Client Responsibilities
To enable us to perform the services effectively, you agree to:
• Provide complete, accurate, and timely information, materials, and approvals
• Ensure that all materials supplied by you are lawful and do not infringe third-party rights
• Obtain all necessary permissions, licences, and consents for any content or data you ask us to use
• Cooperate with us in a timely and professional manner
• Review deliverables and provide feedback within agreed timelines
• Comply with all applicable laws and platform rules relevant to your business and campaigns
• Keep confidential any confidential or commercially sensitive information we share with you

If you fail to meet these responsibilities, we may suspend work, adjust timelines, or revise fees where reasonably necessary.

4. Fees, Invoicing, and Payment

4.1 Fees
Fees will be set out in the relevant proposal, SOW, or contract and are stated in GBP unless otherwise agreed. VAT will be added where applicable.

4.2 Invoicing
We will invoice in accordance with the agreed payment structure. Unless otherwise stated in writing, invoices are payable within 30 days of the invoice date.

4.3 Additional Work
Any work outside the agreed scope may require a separate quotation and written approval before it is carried out.

Third-party costs such as ad spend, software subscriptions, contractor fees, stock assets, or platform charges may be billed separately unless expressly included.

4.4 Late Payment
If payment is not made on time, we may charge interest in accordance with the Late Payment of Commercial Debts (Interest) Act 1998 and may suspend or terminate services if overdue amounts remain unpaid.

4.5 Refunds
Except where required by law, fees are non-refundable once services have commenced or time and resources have been committed.

5. Intellectual Property

5.1 Our Pre-Existing Materials
All pre-existing materials, tools, systems, frameworks, templates, processes, know-how, and methodologies owned or developed by us independently of the engagement remain our property.

5.2 Deliverables
Subject to full payment of all sums due, we grant you a non-exclusive licence to use final approved deliverables for the purpose for which they were created, unless otherwise agreed in writing.

Unless expressly transferred in writing, ownership of underlying concepts, drafts, working files, strategies, methodologies, and pre-existing intellectual property remains with us.

5.3 Client Materials
You retain ownership of materials you provide to us. You grant us a non-exclusive licence to use, reproduce, adapt, and process those materials as reasonably necessary to perform the services.

You confirm that you own or have the right to use and licence all materials you provide.

5.4 Portfolio Use
Unless otherwise agreed in writing, we may refer to you as a client and display non-confidential work in our portfolio, website, and marketing materials.

6. Warranties and Disclaimers

6.1 Our Warranty
We warrant that we will perform the services with reasonable skill and care and in a professional manner consistent with normal industry standards.

6.2 No Performance Guarantee
We do not guarantee specific results, revenue, sales, leads, rankings, or return on investment. Marketing and advertising outcomes depend on many factors outside our control, including market conditions, customer behaviour, platform changes, budget, offer strength, pricing, fulfilment, competition, and client-side performance.

6.3 General Disclaimer
Except as expressly stated in these Terms or required by law, all warranties, representations, and conditions are excluded to the fullest extent permitted by law.

7. Limitation of Liability
To the fullest extent permitted by law:
• We will not be liable for any indirect, incidental, special, consequential, or punitive loss or damage
• We will not be liable for loss of profit, revenue, business opportunity, goodwill, anticipated savings, or data
• Our total aggregate liability arising out of or in connection with the services or these Terms will not exceed the greater of £1,000 or the total fees paid by you to us in the 12 months immediately preceding the claim

Nothing in these Terms excludes or limits liability for fraud, fraudulent misrepresentation, death, or personal injury caused by negligence, or any other liability that cannot legally be excluded.

8. Indemnity
You agree to indemnify and hold us harmless against claims, losses, liabilities, costs, and expenses arising out of or connected with:
• Materials or instructions supplied by you
• Your breach of these Terms
• Your misuse of deliverables
• Your breach of applicable laws, regulations, or platform policies
• Any allegation that materials supplied by you infringe third-party rights

9. Confidentiality
Each party agrees to keep confidential all confidential information disclosed by the other party and to use it only for the purpose of the relationship.

This obligation does not apply to information that:
• Is or becomes public through no breach of confidence
• Was already lawfully known
• Is independently developed without use of the confidential information
• Must be disclosed by law, court order, or regulatory obligation

10. Term and Termination

10.1 Term
The engagement begins when we accept your instructions or when an SOW or contract is signed, and continues until the services are completed or terminated.

10.2 Termination for Convenience
Either party may terminate for convenience by giving 30 days' written notice, unless a different notice period is agreed in writing.

10.3 Termination for Cause
Either party may terminate immediately if the other:
• Commits a material breach and fails to remedy it within 10 days of written notice
• Becomes insolvent or unable to pay its debts
• Acts in a way that creates a serious legal, reputational, or commercial risk

10.4 Effect of Termination
On termination:
• We may stop work immediately
• You must pay for all work completed and costs incurred up to the termination date
• Any provisions intended to survive termination will continue in force, including payment, confidentiality, intellectual property, liability, and indemnity provisions

11. Changes to Scope
Any changes to scope, timeline, deliverables, or objectives must be agreed in writing. Changes may require revised fees, deadlines, and resource allocation.

12. Claims Limitation Period
Any claim arising out of or connected with the services or these Terms must be brought within one year of the date on which the claim arose, unless a longer period is required by law.

13. Governing Law and Jurisdiction
These Terms are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any dispute or claim arising out of or in connection with these Terms or the services.

14. Dispute Resolution
Before starting formal proceedings, the parties will use reasonable efforts to resolve disputes through good-faith discussions. If appropriate, the parties may also agree to mediation.

15. General

15.1 Entire Agreement
These Terms, together with any signed proposal, SOW, or contract, form the entire agreement between the parties in relation to the services.

15.2 Variation
No variation of these Terms is valid unless agreed in writing.

15.3 Severability
If any provision is found invalid or unenforceable, the remainder of the Terms will remain in effect.

15.4 Waiver
A failure or delay in enforcing any right does not amount to a waiver of that right.

15.5 Relationship
Nothing in these Terms creates a partnership, agency, joint venture, fiduciary duty, or employment relationship between the parties.

15.6 Assignment
You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign these Terms as part of a reorganisation, merger, sale, or transfer of business.

15.7 Notices
Formal notices should be sent in writing by email or post to the contact details most recently provided by the receiving party.

16. Contact Details
For questions relating to these Terms, please contact:

Bivora Limited
Address: 125 Deansgate, Manchester, M3 2BY
Email: Stacey@bivora.co.uk
Phone: +44 7477158745
Website: bivora.co.uk
Company No.: 16662699`;

const COOKIES = `COOKIE POLICY


1. Introduction
This Cookie Policy explains how Bivora Limited uses cookies and similar tracking technologies on bivora.co.uk.

We use cookies to improve your browsing experience, understand how visitors use our Website, support functionality, and help us improve our services. This Cookie Policy explains the types of cookies we use, why we use them, and how you can manage your preferences.

We are committed to transparency and to complying with the Privacy and Electronic Communications Regulations 2003 ("PECR") and the UK GDPR.

2. What Are Cookies and Similar Technologies

2.1 Cookies
Cookies are small text files placed on your device when you visit a website. They help websites function, recognise your device, remember preferences, and collect analytical information.

Cookies may be:
• Session cookies, which are deleted when you close your browser
• Persistent cookies, which remain on your device for a set period or until deleted
• First-party cookies, which are set by our Website
• Third-party cookies, which are set by third-party services

2.2 Similar Technologies
We may also use similar technologies such as:
• Pixels or web beacons
• Local storage
• Device identifiers
• Server logs

3. Types of Cookies We Use

3.1 Strictly Necessary Cookies
These cookies are required for the Website to function properly and cannot be switched off in our systems. They may be used for:
• Security
• Session handling
• Form protection
• Load balancing
• Saving your cookie preferences

Lawful basis: legitimate interests and, where relevant, performance of a service requested by you.

3.2 Performance and Analytics Cookies
These cookies help us understand how visitors interact with the Website by collecting information such as traffic sources, pages viewed, and time spent on pages.

Tools may include:
• Google Analytics 4
• Hotjar
• Microsoft Clarity

Lawful basis: consent where required.

3.3 Functionality Cookies
These cookies remember choices you make and help provide enhanced, more personalised features, such as:
• Saved preferences
• Accessibility settings
• Language settings
• Form input memory

Lawful basis: consent or legitimate interests, depending on the nature and use of the cookie.

3.4 Marketing and Advertising Cookies
These cookies may be used to track visitors across websites and build profiles to show relevant advertising.

Tools may include:
• Google Ads
• Meta Pixel
• LinkedIn Insight Tag
• Twitter/X Pixel
• Mailchimp integrations

Lawful basis: consent.

3.5 Social Media Cookies
If you interact with embedded media or social plugins, the relevant platform may place cookies on your device.

Platforms may include:
• Facebook/Instagram
• LinkedIn
• Twitter/X
• YouTube

Lawful basis: consent.

4. Third-Party Cookies
Some cookies are placed by third-party services that appear on our Website or are used by us for analytics, advertising, support, or communication functions.

These providers may process data outside the UK or EEA. Where that happens, we take steps to ensure appropriate safeguards are in place.

For more information on how personal data is handled, please see our Privacy Policy.

5. Cookie Consent and Control

5.1 Consent
Where required by law, we ask for your consent before placing non-essential cookies on your device. Strictly necessary cookies do not require consent.

When you first visit our Website, you may be given options to:
• Accept all cookies
• Reject non-essential cookies
• Manage cookie preferences by category

5.2 Changing Your Preferences
You can manage or update your cookie preferences at any time through our cookie banner or settings tool, where available.

5.3 Browser Settings
Most web browsers allow you to control cookies through browser settings. You can usually block or delete cookies through your browser. Please note that disabling certain cookies may affect Website functionality.

6. Examples of Cookies We May Use
Examples may include:

Strictly Necessary:
• Session identifiers
• Consent preference cookies
• Security and anti-CSRF cookies

Analytics:
• _ga
• _gid
• _gat
• Hotjar cookies
• Clarity identifiers

Marketing:
• Meta Pixel cookies
• LinkedIn Insight Tag cookies
• Google Ads conversion cookies
• Mailchimp-related tracking cookies

The specific cookies used may change over time as our Website and tools evolve.

7. Do Not Track
Some browsers offer a "Do Not Track" setting. Because there is no universally accepted standard for responding to DNT signals, our Website may not respond to them consistently. You can still control cookies using the methods described above.

8. Email Tracking
If you receive marketing emails from us, those emails may contain tracking pixels or tagged links that help us understand open rates, click-through rates, and engagement.

You can unsubscribe from marketing emails at any time using the unsubscribe link in the email or by contacting us directly.

9. Children's Privacy
Our Website is not intended for children under the age of 13, and we do not knowingly collect personal data from children through cookies or similar technologies.

If you believe a child has provided personal data to us, please contact us.

10. Changes to This Cookie Policy
We may update this Cookie Policy from time to time to reflect changes in law, guidance, technology, or our use of cookies and tracking tools.

Any updates will be posted on this page with a revised "Last Updated" date.

11. Contact Details
If you have any questions about this Cookie Policy or how we use cookies, please contact:

Bivora Limited
Address: 125 Deansgate, Manchester, M3 2BY
Email: Stacey@bivora.co.uk
Phone: +44 7477158745
Website: bivora.co.uk
Company No.: 16662699

12. Further Information
You can find more information about cookies and privacy from:
• The Information Commissioner's Office (ICO)
• Your Online Choices
• All About Cookies
• Google Privacy and Terms`;

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
    if (page === "privacy") return <LegalPage title="Privacy Policy" body={PRIVACY} />;
    if (page === "terms") return <LegalPage title="Terms of Service" body={TERMS} />;
    if (page === "cookies") return <LegalPage title="Cookie Policy" body={COOKIES} />;
    return <Home go={go} />;
  }, [page]);

  return (
    <div style={{ background: C.paper, color: C.ink, minHeight: "100vh" }}>
      <Nav page={page} go={go} />
      <div style={{ paddingTop: 76 }}>{content}</div>
      <Footer go={go} />
    </div>
  );
}