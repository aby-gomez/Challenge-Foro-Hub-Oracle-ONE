create table respuestas(
    id bigint primary key not null auto_increment,
    mensaje text not null,
    topico_id bigint  not null,
    fecha_creacion timestamp not null default current_timestamp,
    autor_id bigint not null,
    solucion tinyint not null default 0,
    constraint fk_respuestas_topico foreign key(topico_id) references topicos(id),
    constraint fk_respuestas_usuarios foreign key(autor_id) references usuarios(id)

    );