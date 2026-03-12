package com.alura.foro_hub.curso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {
    @Autowired
    CursoRepository cursoRepository;

    public List<Curso> listaDeCursos() {
        return cursoRepository.findAll();
    }
}
