package com.vgintegradores.appvgintegradores.repositories;

import com.vgintegradores.appvgintegradores.models.bd.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Producto findByNomproducto(String nomproducto);
    Producto findByIdproducto(int idproducto);
}
