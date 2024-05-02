package com.vgintegradores.appvgintegradores.controllers.producto;

import com.vgintegradores.appvgintegradores.models.bd.Categoria;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.CategoriaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/productos/categoria")
public class CategoriaController {
    private CategoriaService categoriaService;
    @GetMapping("/frmcategoria")
    public String index(Model model){
        model.addAttribute("listaCategorias", categoriaService.listarCategorias());
        return "productos/frmcategoria";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarCategoria(@RequestBody Categoria categoria){
        return categoriaService.registrarCategoria(categoria);
    }
    @ResponseBody
    @DeleteMapping("/eliminar")
    public ResultadoResponse eliminarCategoria(@RequestBody Categoria categoria){
        return categoriaService.eliminarCategoria(categoria.getIdcategoria());
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Categoria> listarCategoria(){
        return categoriaService.listarCategorias();
    }
}
