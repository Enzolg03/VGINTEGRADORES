package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cliente")

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcliente;
    @Column(name = "nroruc")
    private String nroruc;
    @Column(name = "nomempresa")
    private String nomempresa;
    @Column(name = "nomcliente")
    private String nomcliente;
    @Column(name = "direccion")
    private String direccion;
    @Column(name = "telefono")
    private String telefono;
    @Column(name = "correo")
    private String correo;
    @Column(name = "logo")
    private String logo;
}
