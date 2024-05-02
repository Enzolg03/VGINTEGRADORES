package com.vgintegradores.appvgintegradores.repositories;

import com.vgintegradores.appvgintegradores.models.bd.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByNomusuario(String nomusuario);
}
