package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Marca;
import com.vgintegradores.appvgintegradores.models.bd.Pais;
import com.vgintegradores.appvgintegradores.models.bd.Producto;
import com.vgintegradores.appvgintegradores.models.bd.Proveedor;
import com.vgintegradores.appvgintegradores.models.dto.request.ProveedorDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.ProductoRepository;
import com.vgintegradores.appvgintegradores.repositories.ProveedorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class ProveedorService {
    private ProveedorRepository proveedorRepository;
    private ProductoRepository productoRepository;
    public List<Proveedor> listarProveedores(){
        return proveedorRepository.findAll();
    }
    public Proveedor findByNomproveedor(String proveedor){ return proveedorRepository.findByNomproveedor(proveedor); }
    public ResultadoResponse registrarProveedor(ProveedorDTO proveedorDTO, String producto) {
        boolean respuesta = true;
        String mensaje = "Proveedor Registrado";
        try{
            Proveedor nuevoProveedor = new Proveedor();
            if(proveedorDTO.getIdproveedor()>0){
                nuevoProveedor.setIdproveedor(proveedorDTO.getIdproveedor());
            }
            nuevoProveedor.setNomproveedor(proveedorDTO.getNomproveedor());
            Pais pais = new Pais();
            pais.setIdpais(proveedorDTO.getIdpais());
            nuevoProveedor.setPais(pais);
            nuevoProveedor.setDireccion(proveedorDTO.getDireccion());
            nuevoProveedor.setTelefono(proveedorDTO.getTelefono());
            nuevoProveedor.setCorreo(proveedorDTO.getCorreo());
            Producto proveedorProducto = productoRepository.findByNomproducto(producto);
            nuevoProveedor.setProductos(new HashSet<>(Arrays.asList(proveedorProducto)));
            proveedorRepository.save(nuevoProveedor);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Proveedor NO Registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
