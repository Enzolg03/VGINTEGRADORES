package com.vgintegradores.appvgintegradores.controllers.pais;

import com.vgintegradores.appvgintegradores.models.bd.Pais;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.PaisRepository;
import com.vgintegradores.appvgintegradores.services.PaisService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/paises")
public class PaisController {
    private PaisService paisService;
    @GetMapping("/frmpais")
    public String index(Model model){
        model.addAttribute("listaPaises", paisService.listarPaises());
        return "pais/frmpais";
    }
    @ResponseBody
    @PostMapping("/registrar")
    public ResultadoResponse registrarPais(@ModelAttribute Pais pais){
        return paisService.registrarPais(pais);
    }
    @ResponseBody
    @DeleteMapping("/eliminar")
    public ResultadoResponse eliminarPais(@ModelAttribute Pais pais){
        return paisService.eliminarPais(pais.getIdpais());
    }
    @ResponseBody
    @GetMapping("/listar")
    public List<Pais> listarPais(){
        return paisService.listarPaises();
    }
}
