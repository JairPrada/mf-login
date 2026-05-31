import { useState } from "react";
import "./App.css";
import { publish } from "./events";

function Login() {
  const [accepted, setAccepted] = useState(false);
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [loading, setLoading] = useState(false);

  const canContinue = accepted && docType && docNumber && occupation;

  const handleContinue = async () => {
    if (!canContinue || loading) return;
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const user = await res.json();
      publish("mf-login:Login:submit", { docType, docNumber, userId: user.id });
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
          <span>Crédito </span>
          <span className="login-nav-highlight">Hipotecario</span>
        </nav>
      </header>
      <main className="login-main">
        <h2 className="login-title">
          Para iniciar su solicitud
          <br />
          ingrese los siguientes datos
        </h2>
        <div className="login-form-wrap">
          {loading && (
            <div className="login-overlay">
              <div className="login-overlay-spinner" />
            </div>
          )}
        <div className="login-form">
          <div className="login-select-wrap">
            <select
              className="login-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="" disabled>Tipo de documento</option>
              <option value="cc">Cédula de ciudadanía</option>
              <option value="ce">Cédula de extranjería</option>
              <option value="pa">Pasaporte</option>
            </select>
          </div>
          <input
            type="text"
            className="login-input"
            placeholder="Número de documento"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
          />
          <div className="login-select-wrap">
            <select
              className="login-select"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="" disabled>Ocupación</option>
              <option value="emp">Empleado</option>
              <option value="ind">Independiente</option>
              <option value="pen">Pensionado</option>
            </select>
          </div>
          <label className="login-checkbox-label">
            <input
              type="checkbox"
              className="login-checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <span className="login-checkbox-text">
              He leído y acepto el{" "}
              <a href="#" className="login-link">tratamiento de datos personales</a>{" "}
              para los fines previstos en la autorización.
            </span>
          </label>
          <button
            className={`login-btn${canContinue && !loading ? " login-btn--active" : ""}`}
            disabled={!canContinue || loading}
            onClick={handleContinue}
          >
            {loading ? <><span className="login-spinner" />Verificando...</> : "Continuar"}
          </button>
        </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
