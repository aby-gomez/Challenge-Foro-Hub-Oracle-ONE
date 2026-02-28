create table perfiles_de_usuarios(
    usuario_id bigint  not null,
    perfil_id bigint not null,
    primary key (usuario_id,perfil_id),
    constraint fk_perfiles_de_usuarios_usuarios_id foreign key(usuario_id) references usuarios(id),
    constraint fk_perfiles_de_usuarios_perfiles_id foreign key(perfil_id) references perfiles(id)
    );