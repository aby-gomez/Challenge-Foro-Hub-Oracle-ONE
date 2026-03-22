package com.alura.foro_hub.topico;

import com.alura.foro_hub.curso.Curso;
import com.alura.foro_hub.respuesta.Respuesta;
import com.alura.foro_hub.topico.dto.DtoActualizarTopico;
import com.alura.foro_hub.topico.dto.DtoCrearTopico;
import com.alura.foro_hub.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Table(name = "topicos")
@Entity(name = "Topico")
@Getter
@NoArgsConstructor
@AllArgsConstructor
//overrida de equals y hash
@EqualsAndHashCode(of = "id")
public class Topico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String mensaje;
    private Instant fechaCreacion;

    @Enumerated(EnumType.STRING)
    private StatusTopico status;

    @ManyToOne//relacion unidireccional con usuario
    @JoinColumn(name= "autor_id", nullable = false)
    private Usuario autor;

    @ManyToOne//relacion unidireccional con curso
    @JoinColumn(name="curso_id", nullable = false)
    private Curso curso;

    @OneToMany(mappedBy = "topico")//define el atributo que va a ser usado en la otra clase(Respuesta) para mapear a la variable mappedby, la dueña de la relacion es respuesta
    private List<Respuesta> respuestas= new ArrayList<>();

    private boolean activo;

    public Topico(DtoCrearTopico datos, Usuario usuario){
        this.titulo= datos.titulo();
        this.mensaje = datos.mensaje();
        this.fechaCreacion = Instant.now();
        this.status = StatusTopico.ABIERTO;
        this.autor = usuario;
        this.activo = true;
    }

    public void setCurso(Curso curso){
        this.curso = curso;
    }

    public void actualizarTopico(DtoActualizarTopico datos) {
        this.titulo = datos.titulo();
        this.mensaje = datos.mensaje();
    }

    public void borrarTopico(){
        this.activo = false;
    }
}

