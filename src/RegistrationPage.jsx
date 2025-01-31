import React, { useState } from "react";
import "./styles.css";

function RegistrationPage({ setIsRegistered }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      console.log("Inscription réussie !");
      setIsRegistered(true);
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="logo">mycantine</h1>
        <h2>Inscription</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="tel"
            placeholder="Numéro MoMo"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="register-button">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
