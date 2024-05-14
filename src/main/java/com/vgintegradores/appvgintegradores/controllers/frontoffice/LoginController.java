package com.vgintegradores.appvgintegradores.controllers.frontoffice;

import com.vgintegradores.appvgintegradores.models.bd.Rol;
import com.vgintegradores.appvgintegradores.models.bd.Usuario;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.services.RolService;
import com.vgintegradores.appvgintegradores.services.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Controller
@RequestMapping("/auth")
public class LoginController {
    private UsuarioService usuarioService;
    private RolService rolService;
    @GetMapping("/login")
    public String login(){
        return "frontoffice/auth/login";
    }

    @GetMapping("/login-success")
    public String loginsuccess(Model model){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // Añade los atributos al modelo
        model.addAttribute("username", auth.getName());
        model.addAttribute("rol", auth.getAuthorities());
        return "redirect:/home";
    }

    @GetMapping("/frmusuario")
    public String index(Model model){
        model.addAttribute("listausuario", usuarioService.listarUsuarios());
        List<Rol> roles = rolService.listarRoles();
        model.addAttribute("roles", roles);
        return "administracion/frmusuario";
    }

    @PostMapping("/guardarusuario")
    @ResponseBody
    public ResultadoResponse guardarUsuario(@ModelAttribute Usuario usuario, @RequestParam String rol){
        return usuarioService.saveUserWithRole(usuario, rol);
    }

    @GetMapping("/listar")
    @ResponseBody
    public List<Usuario> listarUsuarios(){
        return usuarioService.listarUsuarios();
    }

    @DeleteMapping("/eliminarusuario")
    @ResponseBody
    public ResultadoResponse eliminarUsuario(@RequestBody Usuario usuario){
        return usuarioService.eliminarUsuario(usuario.getIdusuario());
    }
}
