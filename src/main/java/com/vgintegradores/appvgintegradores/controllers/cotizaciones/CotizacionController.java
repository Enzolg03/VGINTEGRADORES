package com.vgintegradores.appvgintegradores.controllers.cotizaciones;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping("/cotizaciones")
public class CotizacionController {
    @GetMapping("/frmcotizaciones")
    private String index(){
        return "cotizaciones/frmcotizaciones";
    }
}
