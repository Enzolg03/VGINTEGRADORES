package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Pais;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.PaisRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PaisService {
    private PaisRepository paisRepository;

    public List<Pais> listarPaises(){
        return paisRepository.findAll();
    }
    public ResultadoResponse registrarPais(Pais pais){
        boolean respuesta = true;
        String mensaje = "País registrado";
        try{
            Pais nuevoPais = new Pais();
            if(pais.getIdpais()>0){
                nuevoPais.setIdpais(pais.getIdpais());
            }
            nuevoPais.setNompais(pais.getNompais());
            paisRepository.save(nuevoPais);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "País NO registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
    public ResultadoResponse eliminarPais(int idpais){
        boolean respuesta = true;
        String mensaje = "País eliminado";
        try{
            paisRepository.deleteById(idpais);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "País NO eliminado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
