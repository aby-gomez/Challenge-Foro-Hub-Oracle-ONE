create table usuarios(
    id bigint primary key not null auto_increment,
    nombre varchar(50)  not null,
    email varchar(50) unique not null,
    contraseña varchar(255) not null
    );