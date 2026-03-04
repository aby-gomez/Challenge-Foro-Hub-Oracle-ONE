package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Curso;
import com.alura.foro_hub.curso.CursoRepository;
import com.alura.foro_hub.curso.validadores.ValidadorDeCurso;
import com.alura.foro_hub.topico.validadores.ValidadorDeTopico;
import com.alura.foro_hub.usuario.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicoService {
    @Autowired
    CursoRepository cursoRepository;

    @Autowired
    TopicoRepository topicoRepository;

    @Autowired
    List<ValidadorDeTopico> validadorDeTopicos;

    @Autowired
    List<ValidadorDeCurso> validadorDeCursos;

    public Topico crearTopico(DtoCrearTopico datos, Usuario usuarioLogeado){

        //no permitir topicos duplicados
            validadorDeTopicos.forEach(v-> v.validarTopico(datos));

            //busco que se encuentre el curso en la bd
            Optional<Curso> curso = cursoRepository.findByCategoriaAndNombre(datos.curso().categoria(), datos.curso().nombreCurso());
            if (curso.isEmpty()) {
                throw new EntityNotFoundException("El curso '" + datos.curso().nombreCurso() + "' no fue encontrado");
            }
            Curso cursoOk = curso.get();
            Topico topico = new Topico(datos, usuarioLogeado);
            topico.setCurso(cursoOk);

            return topicoRepository.save(topico);


    }
}
