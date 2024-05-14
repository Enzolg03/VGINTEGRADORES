package com.vgintegradores.appvgintegradores.models.dto.request;

import com.vgintegradores.appvgintegradores.models.bd.Categoria;
import com.vgintegradores.appvgintegradores.models.bd.Estado;
import com.vgintegradores.appvgintegradores.models.bd.Marca;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Blob;

@Data
public class ProductoDTO {
    private Integer idproducto;
    private String nomproducto;
    private String descproducto;
    private Integer idcategoria;
    private Integer idmarca;
    private Integer idestado;
    private Integer stock ;
    private double precio;
    private String imagen;
}
