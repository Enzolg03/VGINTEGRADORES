package com.vgintegradores.appvgintegradores.controllers.cliente;

import com.vgintegradores.appvgintegradores.models.bd.Cliente;
import com.vgintegradores.appvgintegradores.models.dto.request.ClienteDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.ClienteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/clientes/cliente")
public class ClienteController {
    private ClienteService clienteService;
    @GetMapping("/frmcliente")
    public String index(Model model){
        model.addAttribute("listaClientes", clienteService.listarClientes());
        return "cliente/frmcliente";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarClientes(@RequestBody ClienteDTO clienteDTO){
        return clienteService.registrarCliente(clienteDTO);
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Cliente> listarClientes(){
        return clienteService.listarClientes();
    }
}
