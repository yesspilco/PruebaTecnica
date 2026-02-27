import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Aquí va la lógica para actualizar perfil
    setEditing(false);
    alert("Datos actualizados correctamente!");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="profile-container">

      <div className="profile-form">
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editing}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!editing}
        />

        {!editing ? (
          <button className="btn" onClick={handleEdit}>
            Editar
          </button>
        ) : (
          <button className="btn" onClick={handleSave}>
            Guardar
          </button>
        )}

        {/* Botón de cerrar sesión */}
        <button className="btn btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserProfile;