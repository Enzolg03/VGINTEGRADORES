package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Categoria;
import com.vgintegradores.appvgintegradores.models.bd.Estado;
import com.vgintegradores.appvgintegradores.models.bd.Marca;
import com.vgintegradores.appvgintegradores.models.bd.Producto;
import com.vgintegradores.appvgintegradores.models.dto.request.ProductoDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.ProductoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductoService {
    private ProductoRepository productoRepository;

    public List<Producto> listarProductos(){ return productoRepository.findAll(); }

    public ResultadoResponse registrarProducto(ProductoDTO productoDTO){
        boolean respuesta = true;
        String mensaje = "Producto Registrado";
        try{
            Producto nuevoProducto = new Producto();
            if(productoDTO.getIdproducto()>0){
                nuevoProducto.setIdproducto(productoDTO.getIdproducto());
            }
            nuevoProducto.setNomproducto(productoDTO.getNomproducto());
            nuevoProducto.setDescproducto(productoDTO.getDescproducto());
            Categoria categoria = new Categoria();
            categoria.setIdcategoria(productoDTO.getIdcategoria());
            nuevoProducto.setCategoria(categoria);
            Marca marca = new Marca();
            marca.setIdmarca(productoDTO.getIdmarca());
            nuevoProducto.setMarca(marca);
            Estado estado = new Estado();
            estado.setIdestado(productoDTO.getIdestado());
            nuevoProducto.setEstado(estado);
            nuevoProducto.setStock(productoDTO.getStock());
            nuevoProducto.setPrecio(productoDTO.getPrecio());
            nuevoProducto.setImagen(productoDTO.getImagen());
            productoRepository.save(nuevoProducto);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Producto NO Registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
