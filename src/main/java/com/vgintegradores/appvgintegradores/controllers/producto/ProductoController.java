package com.vgintegradores.appvgintegradores.controllers.producto;

import com.vgintegradores.appvgintegradores.models.bd.Producto;
import com.vgintegradores.appvgintegradores.models.dto.request.ProductoDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.ProductoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/productos/producto")
public class ProductoController {
    private ProductoService productoService;
    @GetMapping("/frmproducto")
    public String index(Model model){
        model.addAttribute("listaProductos", productoService.listarProductos());
        return "productos/frmproducto";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarProductos(@RequestBody ProductoDTO productoDTO){
        return productoService.registrarProducto(productoDTO);
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Producto> listarProductos(){
        return productoService.listarProductos();
    }
}
