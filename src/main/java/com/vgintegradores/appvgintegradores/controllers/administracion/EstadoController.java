package com.vgintegradores.appvgintegradores.controllers.administracion;

import com.vgintegradores.appvgintegradores.models.bd.Estado;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.EstadoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/administracion/estado")
public class EstadoController {
    private EstadoService estadoService;
    @GetMapping("/frmestado")
    public String index(Model model){
        model.addAttribute("listaEstados", estadoService.listarEstados());
        return "administracion/frmestado";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarEstado(@RequestBody Estado estado){
        return estadoService.registrarEstado(estado);
    }
    @ResponseBody
    @DeleteMapping("/eliminar")
    public ResultadoResponse eliminarEstado(@RequestBody Estado estado){
        return estadoService.eliminarEstado(estado.getIdestado());
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Estado> listarEstados(){
        return estadoService.listarEstados();
    }
}
