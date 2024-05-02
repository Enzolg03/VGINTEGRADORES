package com.vgintegradores.appvgintegradores.repositories;

import com.vgintegradores.appvgintegradores.models.bd.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {
}
