import { useState } from "react";
import "./App.css";

interface LoginProps {
  emit: (event: string, detail: Record<string, unknown>) => void;
}

function Login({ emit }: LoginProps) {
  const [accepted, setAccepted] = useState(false);
  const [docType, setDocType] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [occupation, setOccupation] = useState("");

  const canContinue = accepted && docType && docNumber && occupation;

  const handleContinue = () => {
    if (!canContinue) return;
    emit("login:submit", { docType, docNumber, occupation });
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
          <span>Cr\u00e9dito </span>
          <span className="login-nav-highlight">Hipotecario</span>
        </nav>
      </header>
      <main className="login-main">
        <h2 className="login-title">
          Para iniciar su solicitud
          <br />
          ingrese los siguientes datos
        </h2>
        <div className="login-form">
          <div className="login-select-wrap">
            <select
              className="login-select"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
            >
              <option value="" disabled>Tipo de documento</option>
              <option value="cc">C\u00e9dula de ciudadan\u00eda</option>
              <option value="ce">C\u00e9dula de extranjer\u00eda</option>
              <option value="pa">Pasaporte</option>
            </select>
          </div>
          <input
            type="text"
            className="login-input"
            placeholder="N\u00famero de documento"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)}
          />
          <div className="login-select-wrap">
            <select
              className="login-select"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option value="" disabled>Ocupaci\u00f3n</option>
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
              He le\u00eddo y acepto el{" "}
              <a href="#" className="login-link">tratamiento de datos personales</a>{" "}
              para los fines previstos en la autorizaci\u00f3n.
            </span>
          </label>
          <button
            className={`login-btn${canContinue ? " login-btn--active" : ""}`}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
