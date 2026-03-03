package com.alura.foro_hub.topico;


import com.alura.foro_hub.usuario.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;


@RestController
@RequestMapping("/topico")
public class TopicoController {

    @Autowired
    TopicoService service;

    @PostMapping("/crear")
    //con authPrincipal Spring inyecta automáticamente el objeto Usuario que el SecurityFilter cargó en el contexto de seguridad.
    public ResponseEntity crearTopico(@RequestBody @Valid DtoCrearTopico datos, @AuthenticationPrincipal Usuario usuarioLogeado , UriComponentsBuilder uriComponentsBuilder){
                Topico topicoCreado = service.crearTopico(datos,usuarioLogeado);

                 URI uri = uriComponentsBuilder.path("/{id}").buildAndExpand(usuarioLogeado.getId()).toUri();
                 return ResponseEntity.created(uri).body(new DtoTopicoCreado(topicoCreado));

    }


}
