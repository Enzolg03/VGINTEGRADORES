package com.vgintegradores.appvgintegradores.controllers.producto;

import com.vgintegradores.appvgintegradores.models.bd.Marca;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.MarcaService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/productos/marca")
public class MarcaController {

    private MarcaService marcaService;
    @GetMapping("/frmmarca")
    public String index(Model model){
        model.addAttribute("listaMarcas", marcaService.listarMarcas());
        return "productos/frmmarca";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarMarca(@RequestBody Marca marca){
        return marcaService.registrarMarca(marca);
    }
    @ResponseBody
    @DeleteMapping("/eliminar")
    public ResultadoResponse eliminarMarca(@RequestBody Marca marca){
        return marcaService.eliminarMarca(marca.getIdmarca());
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Marca> listarMarca(){
        return marcaService.listarMarcas();
    }
}
