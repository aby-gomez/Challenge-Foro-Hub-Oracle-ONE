package com.alura.foro_hub.usuario;

import com.alura.foro_hub.perfil.Perfil;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
//overrida de equals y hash
@EqualsAndHashCode(of = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;
    private String contraseña;

    @ManyToMany(fetch = FetchType.EAGER)//perfiles se cargaran inmediatamente junto con usuarios
    @JoinTable(
            name = "perfiles_de_usuarios",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "perfil_id"))
    private List<Perfil> perfiles;//lista solo en usuario, relacion unidireccional, no necesito mapped by en perfil
}
