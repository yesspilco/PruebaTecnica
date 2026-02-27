export const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autorizado");

  const res = await fetch("http://localhost:3000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener usuarios");
  }

  return res.json();
};

export const updateUser = async (data: { name?: string; email?: string }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autorizado");

  const res = await fetch("http://localhost:3000/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar perfil");
  }

  return res.json();
};