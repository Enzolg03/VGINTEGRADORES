package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Estado;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.EstadoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EstadoService {
    private EstadoRepository estadoRepository;

    public List<Estado> listarEstados(){ return estadoRepository.findAll(); }
    public ResultadoResponse registrarEstado(Estado estado){
        boolean respuesta = true;
        String mensaje = "Estado Registrado";
        try{
            Estado nuevoEstado = new Estado();
            if(estado.getIdestado()>0){
                nuevoEstado.setIdestado(estado.getIdestado());
            }
            nuevoEstado.setDescestado(estado.getDescestado());
            estadoRepository.save(estado);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Estado NO Registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
    public ResultadoResponse eliminarEstado(int idestado){
        boolean respuesta = true;
        String mensaje = "Estado Eliminado";
        try{
            estadoRepository.deleteById(idestado);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Estado NO Eliminado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
