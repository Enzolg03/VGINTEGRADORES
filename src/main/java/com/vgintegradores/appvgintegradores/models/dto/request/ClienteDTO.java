package com.vgintegradores.appvgintegradores.models.dto.request;

import lombok.Data;

@Data
public class ClienteDTO {
    private int idcliente;
    private String nroruc;
    private String nomempresa;
    private String nomcliente;
    private String direccion;
    private String telefono;
    private String correo;
    private String logo;
}
