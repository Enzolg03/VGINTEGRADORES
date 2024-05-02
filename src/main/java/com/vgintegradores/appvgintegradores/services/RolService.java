package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.RolRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RolService {
    private RolRepository rolRepository;

    public List<Rol> listarRoles(){ return rolRepository.findAll(); }

    public ResultadoResponse registrarRol(Rol rol){
        boolean respuesta = true;
        String mensaje = "Rol Registrado";
        try{
            Rol nuevoRol = new Rol();
            if(rol.getIdrol()>0){
                nuevoRol.setIdrol(rol.getIdrol());
            }
            nuevoRol.setDescrol(rol.getDescrol());
            rolRepository.save(rol);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Rol NO Registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta).
                mensaje(mensaje).build();
    }
    public ResultadoResponse eliminarRol(int idrol){
        boolean respuesta = true;
        String mensaje = "Rol Eliminado";
        try{
            rolRepository.deleteById(idrol);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "Rol NO Eliminado";
        }
        return ResultadoResponse.builder().respuesta(respuesta).
                mensaje(mensaje).build();
    }
}
