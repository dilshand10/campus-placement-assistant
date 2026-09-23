export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">🎓 Campus Placement Assistant</div>
            <p className="footer-tagline">
              AI-powered campus placement guidance prototype powered by Microsoft Foundry and Foundry IQ.
            </p>
          </div>

          <div className="footer-stack-badges">
            <span className="badge">Microsoft Foundry</span>
            <span className="badge">Foundry IQ RAG</span>
            <span className="badge">Microsoft Entra ID</span>
            <span className="badge">FastAPI</span>
            <span className="badge">React + Vite</span>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>⚠️ Synthetic Data Notice:</strong> Placement information shown in this prototype is synthetic/demo data and should not be treated as official university or company placement information.
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 Campus Placement Assistant • AI-103 Academic Project
          </div>
          <div className="footer-team">
            Team: Gursharan • Rudraksh • Muskan • Denish • Dilshan
          </div>
        </div>
      </div>
    </footer>
  );
}
