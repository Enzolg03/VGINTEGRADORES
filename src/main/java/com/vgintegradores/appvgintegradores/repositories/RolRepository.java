package com.vgintegradores.appvgintegradores.repositories;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
    Rol findByDescrol(String descrol);
}
