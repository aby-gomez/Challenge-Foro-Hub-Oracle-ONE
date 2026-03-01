package com.alura.foro_hub.usuario;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController//habilita esta clase como un controlador REST y que pueda interceptar peticiones al servidor

public class UsuarioController {
    @Autowired
    UsuarioService service;

    @PostMapping("/usuario")
    //request body convierte el json en dto, valid activa la bean validation
    public ResponseEntity registrarUsuario(@RequestBody @Valid DtoRegistroUsuario datos, UriComponentsBuilder uriComponentsBuilder){
                    Usuario usuario = service.registrarUsuario(datos);
                    if(usuario==null){
                        return ResponseEntity.internalServerError().build();
                    }else {
                        URI uri = uriComponentsBuilder.path("/usuario/{id}").buildAndExpand(usuario.getId()).toUri();
                        return ResponseEntity.created(uri).body(new DtoRegistroUsuarioDetalles(usuario));//devuelve 201
                    }
    };



}
