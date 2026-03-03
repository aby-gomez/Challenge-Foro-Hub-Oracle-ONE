package com.alura.foro_hub.curso;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    Optional<Curso> findByCategoriaAndNombre(Categoria categoria, String nombre);
}
