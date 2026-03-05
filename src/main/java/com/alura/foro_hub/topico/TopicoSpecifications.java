package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Curso;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;

public class TopicoSpecifications {
    //no es necesario crear el criteria builder, todo esto devuevle un Predicate que maneja Specifications
    public static Specification<Topico> nombreCurso(String nombre){

        return ((root, query, cb) ->{
            Join<Topico, Curso> unionCurso = root.join("curso");//realiza inner join
                return cb.equal(unionCurso.get("nombre"),nombre);
        }
        );
    }

    public static Specification<Topico> fechaCreacion(String año){

        return((root, query, cb) -> {
            Instant fechaInicio= Instant.parse(año+"-01-01T00:00:00Z");
            Instant fechaFin = Instant.parse(año+"-12-31T23:59:59.999999999Z");
            return cb.between(root.get("fechaCreacion"),fechaInicio,fechaFin);

        }
        );

    }
}

