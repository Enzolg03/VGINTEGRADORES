package com.vgintegradores.appvgintegradores.services;

import com.vgintegradores.appvgintegradores.models.bd.*;
import com.vgintegradores.appvgintegradores.models.dto.request.ClienteDTO;
import com.vgintegradores.appvgintegradores.models.response.ResultadoResponse;
import com.vgintegradores.appvgintegradores.repositories.ClienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClienteService {
    private ClienteRepository clienteRepository;
    public List<Cliente> listarClientes(){ return clienteRepository.findAll(); }
    public ResultadoResponse registrarCliente(ClienteDTO clienteDTO){
        boolean respuesta = true;
        String mensaje = "Cliente Registrado";
        try{
            Cliente nuevoCliente = new Cliente();
            if(clienteDTO.getIdcliente()>0){
                nuevoCliente.setIdcliente(clienteDTO.getIdcliente());
            }
            nuevoCliente.setNroruc(clienteDTO.getNroruc());
            nuevoCliente.setNomempresa(clienteDTO.getNomempresa());
            nuevoCliente.setNomcliente(clienteDTO.getNomcliente());
            nuevoCliente.setDireccion(clienteDTO.getDireccion());
            nuevoCliente.setTelefono(clienteDTO.getTelefono());
            nuevoCliente.setCorreo(clienteDTO.getCorreo());
            nuevoCliente.setLogo(clienteDTO.getLogo());
            clienteRepository.save(nuevoCliente);
        }catch (Exception ex){
            respuesta = false;
            mensaje = "cliente NO Registrado";
        }
        return ResultadoResponse.builder().respuesta(respuesta)
                .mensaje(mensaje).build();
    }
}
