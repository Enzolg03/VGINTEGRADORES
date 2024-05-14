package com.vgintegradores.appvgintegradores.controllers.proveedores;

import com.vgintegradores.appvgintegradores.models.bd.Proveedor;
import com.vgintegradores.appvgintegradores.models.dto.request.ProveedorDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.ProveedorService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/proveedores")
public class ProveedorController {
    private ProveedorService proveedorService;
    @GetMapping("/frmproveedor")
    public String index(Model model){
        model.addAttribute("listaProveedores", proveedorService.listarProveedores());
        return "proveedores/frmproveedor";
    }
    @ResponseBody
    @PostMapping("/registrar")
    private ResultadoResponse registrarProveedor(@ModelAttribute ProveedorDTO proveedorDTO, @RequestParam String producto){
        return proveedorService.registrarProveedor(proveedorDTO, producto);
    }
    @ResponseBody
    @GetMapping("/listar")
    private List<Proveedor> listarProveedores(){
        return proveedorService.listarProveedores();
    }
}
