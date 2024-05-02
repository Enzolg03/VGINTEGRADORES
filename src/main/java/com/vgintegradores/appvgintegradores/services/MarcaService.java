package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Marca;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.MarcaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MarcaService {
    private MarcaRepository marcaRepository;
    public List<Marca> listarMarcas(){ return marcaRepository.findAll(); }
    public ResultadoResponse registrarMarca(Marca marca){
        boolean respuesta = true;
        String mensaje = "Marca Registrada";
        Marca nuevaMarca = new Marca();
        try{
            if(marca.getIdmarca()>0){
                nuevaMarca.setIdmarca(marca.getIdmarca());
            }
                nuevaMarca.setDescmarca(marca.getDescmarca());
            marcaRepository.save(marca);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Marca NO Registrada";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
    public ResultadoResponse eliminarMarca(int idmarca){
        boolean respuesta = true;
        String mensaje = "Marca Eliminada";
        Marca nuevaMarca = new Marca();
        try{
            marcaRepository.deleteById(idmarca);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Marca NO Eliminada";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
