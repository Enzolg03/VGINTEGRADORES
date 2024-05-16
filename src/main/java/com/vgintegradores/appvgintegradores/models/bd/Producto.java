package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idproducto;
    @Column(name = "nomproducto")
    private String nomproducto;
    @Column(name = "descproducto")
    private String descproducto;
    @ManyToOne
    @JoinColumn(name = "categoria")
    private Categoria categoria;
    @ManyToOne
    @JoinColumn(name = "marca")
    private Marca marca;
    @ManyToOne
    @JoinColumn(name = "estado")
    private Estado estado;
    @Column(name = "stock")
    private int stock;
    @Column(name = "precio")
    private double precio;
    @Column(name = "imagen")
    private String imagen;
}
