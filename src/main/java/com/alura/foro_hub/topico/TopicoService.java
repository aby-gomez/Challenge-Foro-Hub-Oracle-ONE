package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Curso;
import com.alura.foro_hub.curso.CursoRepository;
import com.alura.foro_hub.curso.validadores.ValidadorDeCurso;
import com.alura.foro_hub.infra.exceptions.ValidationException;
import com.alura.foro_hub.topico.dto.DtoActualizarTopico;
import com.alura.foro_hub.topico.dto.DtoCrearTopico;
import com.alura.foro_hub.topico.validadores.ValidadorDeTopico;
import com.alura.foro_hub.usuario.Usuario;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
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

    //traer lista de topicos
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

//ficha detalles topico
    public Topico detallarTopico(Long id) {
        Optional<Topico> topico = topicoRepository.findById(id);
        if(topico.isEmpty()){
            throw new EntityNotFoundException("topico no encontrado");
        }
        return topico.get();
    }

//actualizar topico
    @Transactional
    public Topico actualizarTopico(Long id, Usuario usuarioLogeado, DtoActualizarTopico datos) {

        Optional<Topico> topico = topicoRepository.findByIdAndAutorEmail(id,usuarioLogeado.getEmail());
        if(topico.isEmpty()){
            throw new EntityNotFoundException("topico no encontrado o no tenes permisos para editar ese tópico");
        }
        Topico topicoExiste = topico.get();
        topicoExiste.actualizarTopico(datos);


        return topicoRepository.save(topicoExiste);
    }

//borrar topico
    @Transactional
    public void borrarTopico(Long id, Usuario usuarioLogeado) {
        Optional<Topico> topico = topicoRepository.findById(id);
        if(topico.isEmpty()){
            throw new EntityNotFoundException("topico no encontrado");
        }
        Topico topicoExiste = topico.get();
        boolean esModerador = usuarioLogeado.getAuthorities().stream().anyMatch(u->u.getAuthority().equals("MODERADOR"));
        boolean esAutor = usuarioLogeado.getEmail().equals(topicoExiste.getAutor().getEmail());

        if(esModerador || esAutor ){
            topicoExiste.borrarTopico();
        }else{
        throw new ValidationException("no tienes los permisos para borrar este topico");}
    }
}
