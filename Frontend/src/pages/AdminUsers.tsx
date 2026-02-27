import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/user.service";
import "../App.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const AdminUsers = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filtro de búsqueda
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación sobre usuarios filtrados
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Lista de Usuarios (Admin)</h2>

        <div className="admin-buttons">
          <button
            className="admin-button admin-button-back"
            onClick={() => navigate("/profile")}
          >
            Volver a mi perfil
          </button>
          <button
            className="admin-button admin-button-logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* Filtro de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre o email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reinicia a la página 1 al filtrar
          }}
          style={{
            padding: "8px",
            width: "100%",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: "5px" }}
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              style={{
                margin: "0 3px",
                fontWeight: currentPage === i + 1 ? "bold" : "normal",
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ marginLeft: "5px" }}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;