create table topicos(
    id bigint primary key not null auto_increment,
    titulo varchar(255)  not null,
    mensaje text  not null,
    fecha_creacion timestamp not null default current_timestamp,
    status varchar(25) not null,
    autor_id bigint not null,
    curso_id bigint not null,
    constraint fk_topicos_usuarios foreign key(autor_id) references usuarios(id),
    constraint fk_topicos_cursos foreign key(curso_id) references cursos(id)

    );