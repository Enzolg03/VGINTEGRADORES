package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "estado")
public class Estado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idestado;
    @Column(name = "descestado")
    private String descestado;
}
