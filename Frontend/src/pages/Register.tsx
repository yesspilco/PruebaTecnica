import { useState } from "react";
import * as authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(name, email, password);
      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1 style={{ textAlign: "center" }}>Formulario de Registro</h1>
      <p>Por favor ingresa los siguientes datos para crear tu cuenta:</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Nombre completo:</label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Ej: Yess Pilco"
            onChange={e => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Ej: usuario@email.com"
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Mínimo 8 caracteres"
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          Registrar
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={goToLogin}
          style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
};

export default Register;