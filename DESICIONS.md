# DECISIONS.md

## Librerías y tecnologías elegidas

- **Backend:** Node.js + Express + PostgreSQL  
- **Frontend:** React 18 + TypeScript  
- **Routing:** React Router  
- **HTTP Requests:** Axios  
- **Estilos:** CSS modularizado (cada página y componente tiene su CSS)  
- **Autenticación:** JWT (Json Web Tokens)  
- **Gestión de estado:** Context API para autenticación  

---

## Desafíos enfrentados

- No conocía React, pero manejo Angular, por lo que tuve que adaptarme a los hooks (`useState`, `useEffect`, `useContext`) y a la estructura de componentes de React.  
- Implementar la comunicación con el backend y el manejo de JWT en frontend.  
- Validaciones de formularios y mantener inputs controlados.  
- Implementar roles (admin vs user) y permisos correctamente.  

---

## Qué mejoraría con más tiempo

- Agregar **tests unitarios** y de integración para backend y frontend.   
- Manejo de notificaciones para mostrar mensajes de éxito o error.  
- Mejorar la paginacion y filtros de la lista de usuarios para grandes volúmenes de datos.  

---

## Cómo escalar esta solución

- Separar frontend y backend en repositorios distintos y desplegarlos en entornos independientes.  
- Implementar roles adicionales y permisos más granulares.  
- Implementar test automaticos y CI/CD para despliegues más seguros.  
- Optimizar consultas a la base de datos y agregar índices para mejorar performance en listas grandes.  