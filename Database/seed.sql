-- Insertar datos de prueba

-- Admin
INSERT INTO users (name, email, password, role)
VALUES (
    'Admin',
    'adminprueba@test.com',
    '$2b$10$PxkoBxAxCBYF6M2Scd9lhuwkLCXbxFV6MLCwwu1LGUOcyrcOfpW3O',     'admin'
);

-- Usuario normal
INSERT INTO users (name, email, password, role)
VALUES (
    'Usuario de prueba',
    'userprueba@test.com',
    '$2b$10$V7bCSfbxQX0Dy5MMj2FfFe/X..sATVsl27WKLRQznx2h.VmYxDHr2', 
    'user'
);