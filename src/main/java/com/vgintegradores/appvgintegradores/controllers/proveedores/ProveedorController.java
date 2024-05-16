package com.vgintegradores.appvgintegradores.controllers.proveedores;

import com.vgintegradores.appvgintegradores.models.bd.Producto;
import com.vgintegradores.appvgintegradores.models.bd.Proveedor;
import com.vgintegradores.appvgintegradores.models.dto.request.ProveedorDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.ProductoRepository;
import com.vgintegradores.appvgintegradores.repositories.ProveedorRepository;
import com.vgintegradores.appvgintegradores.services.ProductoService;
import com.vgintegradores.appvgintegradores.services.ProveedorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;

@Controller
@AllArgsConstructor
@RequestMapping("/proveedores")
public class ProveedorController {
    private ProveedorService proveedorService;
    private ProductoService productoService;
    @Autowired
    private ProveedorRepository proveedorRepository;
    @Autowired
    private ProductoRepository productoRepository;
    @GetMapping("/frmproveedor")
    public String index(Model model){
        model.addAttribute("listaProveedores", proveedorService.listarProveedores());
        List<Producto> productos = productoService.listarProductos();
        model.addAttribute("productos",productos);
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
    @ResponseBody
    @PutMapping("/prov_prod")
    public Proveedor asignarProductos(@RequestParam int idproveedor, @RequestParam int idproducto){
        Proveedor proveedor = proveedorRepository.findByIdproveedor(idproveedor);
        Producto producto = productoRepository.findByIdproducto(idproducto);
        proveedor.getProductos().add(producto);
        return proveedorRepository.save(proveedor);
    }
    @ResponseBody
    @GetMapping("/productos/{idProveedor}")
    public Set<Producto> verProductosProveedor(@PathVariable int idProveedor) {
        Proveedor proveedor = proveedorRepository.findByIdproveedor(idProveedor);
        Set<Producto> productosOrdenados = new TreeSet<>((producto1, producto2) ->
                Integer.compare(producto1.getIdproducto(), producto2.getIdproducto()));
        productosOrdenados.addAll(proveedor.getProductos());
        return productosOrdenados;
    }

}
