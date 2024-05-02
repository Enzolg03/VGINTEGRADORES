package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "marca")
public class Marca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idmarca;
    @Column(name = "descmarca")
    private String descmarca;
}
