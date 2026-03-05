package com.alura.foro_hub.topico;


import com.alura.foro_hub.topico.dto.DtoCrearTopico;
import com.alura.foro_hub.topico.dto.DtoDetalleTopico;
import com.alura.foro_hub.topico.dto.DtoListaTopicos;
import com.alura.foro_hub.topico.dto.DtoTopicoCreado;
import com.alura.foro_hub.usuario.Usuario;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;


@RestController
@RequestMapping("/tópicos")
public class TopicoController {

    @Autowired
    TopicoService service;

    @PostMapping
    //con authPrincipal Spring inyecta automáticamente el objeto Usuario que el SecurityFilter cargó en el contexto de seguridad.
    public ResponseEntity<DtoTopicoCreado> crearTopico(@RequestBody @Valid DtoCrearTopico datos, @AuthenticationPrincipal Usuario usuarioLogeado , UriComponentsBuilder uriComponentsBuilder){
                Topico topicoCreado = service.crearTopico(datos,usuarioLogeado);

                 URI uri = uriComponentsBuilder.path("/{id}").buildAndExpand(usuarioLogeado.getId()).toUri();
                 return ResponseEntity.created(uri).body(new DtoTopicoCreado(topicoCreado));

    }

    @GetMapping
    //Pageable ,  es capaz de contener todos los metadatos necesarios para implementar la paginación en una lista, orden asc por defecto
    public ResponseEntity<Page<DtoListaTopicos>> listarTopicos(@PageableDefault(size = 10, sort={"fechaCreacion"}) Pageable paginacion, @RequestParam(required = false) Map<String,String> allParams){
        //si no hay parametros de busqueda
        if(allParams.isEmpty()){
            //page provee metodo map que convierte automaticamente en dto, el  objeto Page<T> ya contiene la lista de productos
            Page<DtoListaTopicos> listaDeTopicos = service.listarTopicos(paginacion).map(DtoListaTopicos::new);
            return ResponseEntity.ok(listaDeTopicos);
        }
        //si hay parametros
        Page<DtoListaTopicos> listaDeTopicosFiltrados =(service.listarTopicosConFiltro(allParams,paginacion)).map(DtoListaTopicos::new);
        return ResponseEntity.ok(listaDeTopicosFiltrados);

    }

    @GetMapping("/{id}")
    //indicar que viaja dnetro del response entity sirve para la documentacion y evita errores de tipo
    public ResponseEntity<DtoDetalleTopico> detallarTopico(@PathVariable Long id){
            Topico topico = service.detallarTopico(id);

            return ResponseEntity.ok(new DtoDetalleTopico(topico));
    }

}
