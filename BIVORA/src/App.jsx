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
            <p style={{ fontFamily: F.b, fontSize: 13, marginBottom: 6 }}>stacey@bivora.co.uk</p>
            <p style={{ fontFamily: F.b, fontSize: 13 }}>+44 7477158745</p>
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