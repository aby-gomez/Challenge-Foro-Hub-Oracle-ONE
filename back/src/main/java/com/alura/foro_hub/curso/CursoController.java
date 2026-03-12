package com.alura.foro_hub.curso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<DtoListaCurso>> listaDeCursos(){
        List<Curso> cursos = cursoService.listaDeCursos();
        return ResponseEntity.ok(cursos.stream().map(DtoListaCurso::new).toList());
    }
}
