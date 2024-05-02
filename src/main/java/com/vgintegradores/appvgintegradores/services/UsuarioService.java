package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import com.vgintegradores.appvgintegradores.models.bd.Usuario;
import com.vgintegradores.appvgintegradores.repositories.RolRepository;
import com.vgintegradores.appvgintegradores.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;

@Service
@AllArgsConstructor
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private RolRepository rolRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder =
            new BCryptPasswordEncoder();
    public Usuario findByNomusuario(String nomusuario){
        return usuarioRepository.findByNomusuario(nomusuario);
    }
    public Usuario saveUser(Usuario usuario){
        usuario.setPassword(
                bCryptPasswordEncoder.encode(usuario.getPassword())
        );
        Rol usuarioRol = rolRepository.findByDescrol("ADMINISTRADOR");
        usuario.setActivo(true);
        usuario.setRoles(new HashSet<>(Arrays.asList(usuarioRol)));
        return usuarioRepository.save(usuario);
    }
}
