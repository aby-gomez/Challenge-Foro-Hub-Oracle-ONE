package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Curso;
import com.alura.foro_hub.curso.CursoRepository;
import com.alura.foro_hub.curso.validadores.ValidadorDeCurso;
import com.alura.foro_hub.infra.exceptions.ValidationException;
import com.alura.foro_hub.topico.validadores.ValidadorDeTopico;
import com.alura.foro_hub.usuario.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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

    public Page<Topico> listarTopicos(Pageable paginacion) {
        return topicoRepository.findAll(paginacion);
    }


    public Page<Topico> listarTopicosConFiltro(Map<String, String> allParams,Pageable paginacion) {
        Specification<Topico> filtroInicial = Specification.where(null);//actua como filtro invisible

        for(Map.Entry<String,String> p : allParams.entrySet()){
            if(p.getKey().equals("curso")){
                filtroInicial=filtroInicial.and(TopicoSpecifications.nombreCurso(p.getValue()));
            }
            if(p.getKey().equals("año")){
                filtroInicial= filtroInicial.and(TopicoSpecifications.fechaCreacion(p.getValue()));
            }
        }

        Page<Topico> lista = topicoRepository.findAll(filtroInicial,paginacion);
        if(lista.isEmpty()){
            throw new ValidationException("No hay resultados para la busqueda");//verificar que no devuelve un error ya que no lo es
        }
       return lista;
    }
}
