import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Actualiza los campos cuando cambia el user
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name, email });
      setMessage("Datos actualizados correctamente");
    } catch (err) {
      setMessage("Error al actualizar datos");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Mi Perfil</h2>

        {message && <p className="profile-message">{message}</p>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-input"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="profile-input"
            required
          />
          <button type="submit" className="profile-button">
            Actualizar Perfil
          </button>
        </form>

        {/* Botón solo para admin */}
        {user?.role === "admin" && (
          <button
            className="profile-admin-button"
            onClick={() => navigate("/admin/users")}
          >
            Listar Usuarios
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;