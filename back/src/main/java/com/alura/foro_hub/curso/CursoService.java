package com.alura.foro_hub.curso;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {
    @Autowired
    CursoRepository cursoRepository;

    public List<Curso> listaDeCursos() {
        return cursoRepository.findAll();
    }

    public List<Curso> traerCursoPorCategoria( Categoria categoria) {
        List<Curso> cursos = cursoRepository.findByCategoria(categoria);
        if(cursos.isEmpty()){
            throw new EntityNotFoundException("no hay cursos en la categoria seleccionada");
        }
        return cursos;

    }
}
