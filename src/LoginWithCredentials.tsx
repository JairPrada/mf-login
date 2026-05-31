import { useState } from "react";
import "./App.css";
import { publish } from "./events";

function LoginWithCredentials() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canContinue = username && password;

  const handleContinue = async () => {
    if (!canContinue || loading) return;
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const user = await res.json();
      publish("mf-login:LoginWithCredentials:submit", {
        username,
        userId: user.id,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-topbar" />
      <header className="login-header">
        <div className="login-logo">
          <div className="login-logo-text">
            <span className="login-logo-name">Banco Caja Social</span>
          </div>
        </div>
        <nav className="login-nav">
          <span>Credito </span>
          <span className="login-nav-highlight">Hipotecario</span>
        </nav>
      </header>
      <main className="login-main">
        <h2 className="login-title">
          Para iniciar su solicitud
          <br />
          ingrese sus credenciales
        </h2>
        <div className="login-form-wrap">
          {loading && (
            <div className="login-overlay">
              <div className="login-overlay-spinner" />
            </div>
          )}
          <div className="login-form">
            <input
              type="text"
              className="login-input"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="login-input"
              placeholder="Contrasena"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`login-btn${canContinue && !loading ? " login-btn--active" : ""}`}
              disabled={!canContinue || loading}
              onClick={handleContinue}
            >
              {loading ? (
                <>
                  <span className="login-spinner" />Verificando...
                </>
              ) : (
                "Continuar"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginWithCredentials;
