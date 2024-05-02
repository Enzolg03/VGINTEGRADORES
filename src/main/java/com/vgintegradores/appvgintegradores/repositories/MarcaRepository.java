package com.vgintegradores.appvgintegradores.repositories;

import com.vgintegradores.appvgintegradores.models.bd.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
}
