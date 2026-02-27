# Prueba Técnica - Yesenia Pilco

## Descripción
Proyecto para la gestion de usuarios con roles de admin y user.
Funcionalidades:
- Login de usuarios
- Registro de usuarios  
- Perfil del usuario, donde se puede editar los datos del usuario que inicio sesion
- Listado de usuarios solo generado por el admin

Tecnologias utilizadas:
- Frontend: React + TypeScript  
- Backend: Node.js + Express + PostgreSQL  

## Prerrequisitos
- Node.js >= 20.x
- PostgreSQL >= 16.x
- npm >= 9.x

## Instalacion Backend
  cd backend
  npm install
  cp .env.example .env  #configurar variables
  npm run dev 
  

## Instalación Frontend
cd frontend
npm install
npm run dev

## creacion de la base de datos
- CREATE DATABASE Prueba;
- Ejecutar schema.sql 
- psql -d Prueba -f database/schema.sql
- Ejecutar seed.sql
- psql -d nombre_base_datos -f database/schema.sql

## Credenciales de prueba

- Admin: adminprueba@test.com / 12345678
- Usuario normal: userprueba@test.com / 12345678

## ENDPOINTS DISPONIBLES CON EJEMPLOS
Login
- Método: POST
- Ruta: /api/auth/login
- Descripción: Inicia sesión y devuelve token JWT y datos del usuario.
- Body (JSON):
-    {
      "email": "adminprueba@test.com",
      "password": "12345678"
-    }
- respuesta exitosa
-    {
-      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
-      "user": {
-        "id": 1,
-        "name": "Admin",
-        "email": "adminprueba@test.com",
-        "role": "admin"
-      }
-    }

Registro de usuario
- Método: POST
- Ruta: /api/auth/register
- Descripción: Registra un nuevo usuario.
- Body (JSON):
-    {
-     "name": "Usuario de prueba",
-      "email": "userprueba@test.com",
-      "password": "12345678"
-    }
- Respuesta exitosa
-    {
-      "message": "Usuario registrado correctamente",
-      "user": {
-        "id": 2,
-        "name": "Usuario de prueba",
-        "email": "userprueba@test.com",
-        "role": "user"
-      }
-    }

Obtener perfil del usuario logueado
- Método: GET
- Ruta: /api/users/me
- Descripción: Obtiene los datos del usuario actual.
- Headers:
- Authorization: Bearer <token_obtenido_del_login> luego que un usuario realice el login
- Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoianVuaW9yQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcyMjE0NjM3LCJleHAiOjE3NzIyMTgyMzd9.ZaRZhq15fuPveQWwUqqMTQV0x9oQiELvz7j4sLKqZD4

- Respuesta Exitosa
-    {
-      "id": 2,
-      "name": "Usuario de prueba",
-      "email": "userprueba@test.com",
-      "role": "user"
-    }

Actualizar perfil del usuario
- Método: PUT
- Ruta: /api/users/me
- Descripción: Actualiza el nombre y/o email del usuario logueado.
- Headers:
- Authorization: Bearer <token_obtenido_del_login>
-    {
-      "name": "User 1",
-      "email": "userprueba@test.com"
-    }
- Respuesta exitosa
-    {
-      "message": "Perfil actualizado correctamente",
-      "user": {
-        "id": 2,
-        "name": "User1",
-        "email": "userprueba@test.com",
-        "role": "user"
-      }
-    }

Listar todos los usuarios (solo admin)
- Método: GET
- Ruta: /api/admin/users
- Descripción: Devuelve la lista de todos los usuarios. Solo accesible para usuarios con rol admin.
- Headers:
- Authorization: Bearer <token_admin>
- Respuesta exitosa
-    [
-     {
-       "id": 1,
-       "name": "Admin",
-       "email": "adminprueba@test.com",
-       "role": "admin"
-     },
-     {
-       "id": 2,
-       "name": "User1",
-       "email": "usuarioprueba@test.com",
-       "role": "user"
-     }
-   ]