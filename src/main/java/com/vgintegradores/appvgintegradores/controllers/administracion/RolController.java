package com.vgintegradores.appvgintegradores.controllers.administracion;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.RolService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/administracion/rol")
public class RolController {
    private RolService rolService;
    @GetMapping("/frmrol")
    public String index(Model model){
        model.addAttribute("listaRoles", rolService.listarRoles());
        return "administracion/frmrol";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarRol(@RequestBody Rol rol){
        return rolService.registrarRol(rol);
    }
    @ResponseBody
    @DeleteMapping("/eliminar")
    public ResultadoResponse eliminarRol(@RequestBody Rol rol){
        return rolService.eliminarRol(rol.getIdrol());
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Rol> listarRoles(){
        return rolService.listarRoles();
    }
}
