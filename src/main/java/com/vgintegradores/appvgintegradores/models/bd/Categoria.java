package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcategoria;
    @Column(name = "desccategoria")
    private String desccategoria;
}
