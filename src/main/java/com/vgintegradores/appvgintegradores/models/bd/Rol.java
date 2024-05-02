package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idrol;
    @Column(name = "descrol")
    private String descrol;
}
