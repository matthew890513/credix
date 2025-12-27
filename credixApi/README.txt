Credix API Setup

Este documento explica cómo configurar y ejecutar la API Credix en tu entorno local.

Requisitos

Java 17+ instalado.

Maven instalado.

PostgreSQL con la base de datos Credix creada y configurada.

Conexión correcta a la base de datos según tu entorno local.

Configuración

Actualizar la conexión a la base de datos
Abre el archivo application.yml y modifica los valores de conexión para que coincidan con la configuración que realizaste al crear la base de datos:

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/credixdb  # Cambia 'credixdb' si tu DB tiene otro nombre
    username: credixuser                              # Cambia 'credixuser' por tu usuario
    password: credixpass                              # Cambia 'credixpass' por tu contraseña
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true

jwt:
  secret: vG7u8Fq9mZ2xR1kL5sN4pT6yW0aE3bH8vG7u8Fq9mZ2xR1kL5sN4pT6yW0aE3bH8
  expiration: 3600000


⚠️ Importante: Cambia username y password por los que configuraste al crear tu base de datos.
Para este proyecto, la contraseña encriptada que se usará es: 123456.

Ejecutar la API
En la terminal, desde la carpeta raíz del proyecto:

./mvnw clean install -U

./mvnw spring-boot:run
