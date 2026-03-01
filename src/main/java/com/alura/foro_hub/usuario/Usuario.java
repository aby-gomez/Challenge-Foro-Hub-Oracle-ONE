package com.alura.foro_hub.usuario;

import com.alura.foro_hub.perfil.Perfil;
import com.alura.foro_hub.perfil.Rol;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
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
    private List<Perfil> perfiles = new ArrayList<>();//lista solo en usuario, relacion unidireccional, no necesito mapped by en perfil

    //para el registro de usuarios
    public Usuario(DtoRegistroUsuario datos, PasswordEncoder encoder){
            this.nombre = datos.nombre();
            this.email = datos.email();
            encriptarContrasena(datos.contraseña(), encoder);
    }

    public void setPerfiles(Perfil perfil){
                perfiles.add(perfil);
    }

    private void encriptarContrasena(String passwordPlana, PasswordEncoder encoder) {
        this.contraseña = encoder.encode(passwordPlana);
    }

}
