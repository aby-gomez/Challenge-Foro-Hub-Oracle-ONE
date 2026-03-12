package com.alura.foro_hub.curso;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    @Autowired
    CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<DtoListaCursoCategoria>> listaDeCursos(){
        List<Curso> cursos = cursoService.listaDeCursos();
        return ResponseEntity.ok(cursos.stream().map(DtoListaCursoCategoria::new).toList());
    }

    @GetMapping("/{categoria}")
    public ResponseEntity<List<DtoListaCurso>> traerCursoPorCategoria(@PathVariable Categoria categoria){
        List<Curso> cursos = cursoService.traerCursoPorCategoria(categoria);
        return ResponseEntity.ok(cursos.stream().map(DtoListaCurso::new).toList());
    }

    //ya conozco las categorias al ser un enum no necesito consultar en la bd. pero si quiero que se pueda editar tiene que pasar  ser tabla
    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> traerCategorias(){
        return ResponseEntity.ok(List.of(Categoria.values()));
    }
}
