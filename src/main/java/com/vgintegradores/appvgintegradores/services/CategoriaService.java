package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Categoria;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.CategoriaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoriaService {
    private CategoriaRepository categoriaRepository;
    public List<Categoria> listarCategorias(){ return categoriaRepository.findAll(); }
    public ResultadoResponse registrarCategoria(Categoria categoria){
        boolean respuesta = true;
        String mensaje = "Categoria Registrada";
        try{
            Categoria nuevaCategoria = new Categoria();
            if(categoria.getIdcategoria()>0){
                nuevaCategoria.setIdcategoria(categoria.getIdcategoria());
            }
            nuevaCategoria.setDesccategoria(categoria.getDesccategoria());
            categoriaRepository.save(categoria);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Categoria NO Registrada";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
    public ResultadoResponse eliminarCategoria(int idcategoria){
        boolean respuesta = true;
        String mensaje = "Categoria Eliminada";
        try{
            categoriaRepository.deleteById(idcategoria);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Categoria NO Eliminada";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
