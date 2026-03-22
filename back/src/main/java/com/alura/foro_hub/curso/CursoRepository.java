package com.alura.foro_hub.curso;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    Optional<Curso> findByCategoriaAndNombre(Categoria categoria, String nombre);

    List<Curso> findByCategoria( Categoria categoria);


}
