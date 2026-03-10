const App = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    color: '#ffffff',
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    textAlign: 'center',
    padding: '2rem',
    overflow: 'hidden',
    position: 'relative',
  }}>
    {/* Subtle animated background glow */}
    <div style={{
      position: 'absolute',
      width: '600px',
      height: '600px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'pulse 4s ease-in-out infinite',
      pointerEvents: 'none',
    }} />

    <div style={{ position: 'relative', zIndex: 1 }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: '0 0 0.5rem 0',
        background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        anodyx.com
      </h1>
      
      <div style={{
        width: '80px',
        height: '3px',
        background: 'linear-gradient(90deg, #6366f1, #818cf8)',
        borderRadius: '2px',
        margin: '1.5rem auto',
      }} />

      <p style={{
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        fontWeight: 300,
        color: 'rgba(255, 255, 255, 0.7)',
        margin: '0 0 2.5rem 0',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        This domain is for sale
      </p>

      <a
        href="mailto:[EMAIL_ADDRESS]"
        style={{
          display: 'inline-block',
          padding: '0.9rem 2.5rem',
          background: 'linear-gradient(135deg, #6366f1, #818cf8)',
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: 600,
          textDecoration: 'none',
          borderRadius: '50px',
          letterSpacing: '0.02em',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.3)';
        }}
      >
        Contact Us
      </a>
    </div>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;600;800&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @keyframes pulse {
        0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      }
    `}</style>
  </div>
);

export default App;
