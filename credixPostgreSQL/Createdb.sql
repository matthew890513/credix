psql -U mateovazquezw -d postgres

DROP DATABASE credixdb;

REVOKE ALL PRIVILEGES ON DATABASE credixdb FROM credixuser;
DROP USER IF EXISTS credixuser;

-- Crear la base de datos
CREATE DATABASE credixdb;

-- Crear un usuario
CREATE USER credixuser WITH ENCRYPTED PASSWORD 'credixpass';

-- Dar permisos al usuario sobre la base
GRANT ALL PRIVILEGES ON DATABASE credixdb TO credixuser;

-- Salir
\q

psql -U credixuser -d credixdb

\i Script.sql
\i Seed.sql

Verificar que las tablas y objetos se hayan creado correctamente:
\dt
\dv
\df

-- Salir
\q
