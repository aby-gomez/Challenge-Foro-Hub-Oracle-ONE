alter table topicos add activo tinyint default 1;
update topicos set activo = 1;