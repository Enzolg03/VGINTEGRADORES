package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idusuario;
    @Column(name = "nombres")
    private String nombres;
    @Column(name = "apellidos")
    private String apellidos;
    @Column(name = "email")
    private String email;
    @Column(name = "nomusuario")
    private String nomusuario;
    @Column(name = "password")
    private String password;
    @Column(name = "activo")
    private boolean activo;
    @ManyToMany(cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol",
            joinColumns = @JoinColumn(name = "idusuario"),
            inverseJoinColumns = @JoinColumn(name = "idrol"))
    private Set<Rol> roles;

}
