<div align="center">

```
███████╗ ██████╗ ██████╗  ██████╗     ██╗  ██╗██╗   ██╗██████╗
██╔════╝██╔═══██╗██╔══██╗██╔═══██╗    ██║  ██║██║   ██║██╔══██╗
█████╗  ██║   ██║██████╔╝██║   ██║    ███████║██║   ██║██████╔╝
██╔══╝  ██║   ██║██╔══██╗██║   ██║    ██╔══██║██║   ██║██╔══██╗
██║     ╚██████╔╝██║  ██║╚██████╔╝    ██║  ██║╚██████╔╝██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝
```

**API REST — Backend Challenge · Alura + Oracle ONE**

<br/>

![Java](https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Flyway](https://img.shields.io/badge/Flyway-CC0200?style=for-the-badge&logo=flyway&logoColor=white)


![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white)

![Status](https://img.shields.io/badge/Status-En_Desarrollo-violet?style=for-the-badge)

</div>

---

## Descripción del Proyecto

**ForoHub** es una API REST desarrollada con Spring Boot para la gestión de un foro de discusión. El sistema permite realizar operaciones CRUD sobre tópicos, garantizando la persistencia de datos en una base de datos relacional y aplicando reglas de negocio estrictas para la seguridad y validacion de los datos.

---

## Tecnologias Utilizadas

| Categoria | Tecnologia |
|---|---|
| **Lenguaje** | Java 17 |
| **Framework** | Spring Boot 3 |
| **Persistencia** | Spring Data JPA / Hibernate |
| **Base de Datos** | MySQL |
| **Seguridad** | Spring Security + JWT |
| **Migraciones** | Flyway |
| **Documentacion** | Swagger / OpenAPI |
| **Testing de API** | Insomnia |

---

## Arquitectura

El codigo se organiza siguiendo el patrón **Package by Feature**, agrupando cada dominio (tópicos, usuarios, cursos, respuestas, autenticación) con sus propias capas de Controller, Service, Repository, DTOs y entidades. Esta estructura favorece la cohesión y hace que el proyecto escale sin convertirse en un laberinto.

```
src/
├── topicos/
│   ├── TopicoController.java
│   ├── TopicoService.java
│   ├── TopicoRepository.java
│   ├── TopicoSpecifications.java
│   └── dto/
├── usuarios/
├── cursos/
├── respuestas/
└── infra/
    └── security/
        ├── SecurityConfig.java
        ├── SecurityFilter.java
        └── TokenService.java
```


---

## Funcionalidades

**Gestion de Topicos**
- Crear, listar, detallar, actualizar y eliminar topicos
- Borrado lógico con campo `activo` (soft delete)
- Busqueda dinámica con filtros opcionales por nombre de curso y año

**Autenticacion y Seguridad**
- Registro de usuarios con contraseña encriptada (BCrypt)
- Login con generación de JWT firmado (HMAC256)
- Filtro personalizado `SecurityFilter` que valida el token en cada request
- Endpoints públicos: `POST /login` y `POST /usuario`
- Todos los demás endpoints requieren token válido

**Usuarios y Roles**
- Entidad `Usuario` que implementa `UserDetails`
- Relacion `@ManyToMany` con `Perfil` (roles) mediante tabla intermedia `roles_de_usuarios`
- Soporte para roles con `@Enumerated(EnumType.STRING)`

**Busquedas Dinamicas**
- `JpaSpecificationExecutor` para filtros combinables en tiempo de ejecucion
- Specifications para filtrar por curso y por rango de año
- Un unico metodo `findAll(Specification, Pageable)` reemplaza multiples metodos de repositorio

---

## Pruebas de la API

Los endpoints fueron probados manualmente con **Insomnia**, verificando el ciclo completo de autenticacion JWT: obtencion del token en `POST /login`, inclusion del header `Authorization: Bearer <token>` en las requests protegidas y validacion de los codigos de respuesta esperados para cada escenario (exito, acceso no autorizado, recurso no encontrado).

![Insomnia](https://img.shields.io/badge/Probado_con-Insomnia-4000BF?style=flat-square&logo=insomnia&logoColor=white)

---

## Frontend

Actualmente se esta trabajando en la interfaz de usuario para consumir esta API. El desarrollo del frontend se realiza sin frameworks pesados, priorizando el aprendizaje de las bases de la web:

- **HTML5** — estructura semantica del foro
- **CSS3** — diseno responsivo y estilizacion personalizada
- **JavaScript (Vanilla)** — consumo de la API mediante Fetch API, gestion del DOM y manejo de autenticacion local

> El frontend se encuentra en desarrollo activo.

---

## Instalacion y Ejecucion

**Prerrequisitos:** Java 17, Maven, MySQL

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/foro-hub.git
cd foro-hub

# Configurar la base de datos en application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/foro_hub
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contrasena

# Variable de entorno para el secreto JWT
JWT_SECRET=tu_secreto_seguro

# Ejecutar
./mvnw spring-boot:run
```
Flyway ejecutará automáticamente las migraciones al iniciar la aplicación.

---

<div align="center">

Construido como parte del programa **Oracle Next Education (ONE)** en colaboración con **Alura Latam**

<br/>

![Oracle ONE](https://img.shields.io/badge/Oracle-ONE_Program-F80000?style=flat-square&logo=oracle&logoColor=white)

</div>
