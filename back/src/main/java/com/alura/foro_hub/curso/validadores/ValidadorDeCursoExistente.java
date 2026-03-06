package com.alura.foro_hub.curso.validadores;

import com.alura.foro_hub.curso.Curso;
import com.alura.foro_hub.curso.CursoRepository;
import com.alura.foro_hub.curso.DtoCurso;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ValidadorDeCursoExistente implements  ValidadorDeCurso{
    @Autowired
    CursoRepository cursoRepository;

    @Override
    public void validarCurso(DtoCurso datos) {
        Optional<Curso> curso = cursoRepository.findByCategoriaAndNombre(datos.categoria(), datos.nombreCurso());
        if (curso.isEmpty()) {
            throw new EntityNotFoundException("El curso '" + datos.nombreCurso() + "' no fue encontrado");
        }
    }
}
