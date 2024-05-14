package com.vgintegradores.appvgintegradores.models.dto.request;

import lombok.Data;

@Data
public class ProveedorDTO {
    private int idproveedor;
    private String nomproveedor;
    private int idpais;
    private String direccion;
    private String telefono;
    private String correo;
}
