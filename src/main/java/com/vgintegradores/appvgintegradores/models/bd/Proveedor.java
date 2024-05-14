package com.vgintegradores.appvgintegradores.models.bd;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "proveedor")
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idproveedor;
    @Column(name = "nomproveedor")
    private String nomproveedor;
    @ManyToOne
    @JoinColumn(name = "pais")
    private Pais pais;
    @Column( name = "direccion")
    private String direccion;
    @Column( name = "telefono")
    private String telefono;
    @Column( name = "correo")
    private String correo;
    @ManyToMany(cascade = CascadeType.MERGE,
            fetch = FetchType.EAGER)
    @JoinTable(name = "proveedor_producto",
            joinColumns = @JoinColumn(name = "idproveedor"),
            inverseJoinColumns = @JoinColumn(name = "idproducto"))
    private Set<Producto> productos;
}
