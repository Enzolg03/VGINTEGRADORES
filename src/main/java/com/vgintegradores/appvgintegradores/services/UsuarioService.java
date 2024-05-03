package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import com.vgintegradores.appvgintegradores.models.bd.Usuario;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.RolRepository;
import com.vgintegradores.appvgintegradores.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private RolRepository rolRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder =
            new BCryptPasswordEncoder();

    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }

    public Usuario findByUsername(String username){
        return usuarioRepository.findByNomusuario(username);
    }

    public ResultadoResponse saveUserWithRole(Usuario usuario, String rol){
        usuario.setPassword(bCryptPasswordEncoder.encode(usuario.getPassword()));
        Rol usuarioRol = rolRepository.findByDescrol(rol);
        usuario.setActivo(true);
        usuario.setRoles(new HashSet<>(Arrays.asList(usuarioRol)));
        String mensaje = "Usuario registrado";
        boolean respuesta = true;
        try{
            usuarioRepository.save(usuario);
        }catch (Exception ex){
            mensaje = "Usuario NO registrado";
            respuesta = false;
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }

    public ResultadoResponse eliminarUsuario(Integer idusuario){
        String mensaje = "Usuario eliminado";
        boolean respuesta = true;
        try {
            usuarioRepository.deleteById(idusuario);
        }catch (Exception ex){
            mensaje = "Usuario NO eliminado";
            respuesta = false;
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
