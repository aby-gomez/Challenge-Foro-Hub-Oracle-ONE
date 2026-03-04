package com.alura.foro_hub.topico.validadores;

import com.alura.foro_hub.topico.DtoCrearTopico;
import com.alura.foro_hub.topico.TopicoRepository;
import com.alura.foro_hub.infra.exceptions.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidadorDeTopicoDuplicado implements ValidadorDeTopico{
    @Autowired
    TopicoRepository topicoRepository;

    @Override
    public void validarTopico(DtoCrearTopico datos) {
        boolean topicoExiste = topicoRepository.existsByTituloAndMensaje(datos.titulo(),datos.mensaje());
        if(topicoExiste){
            throw new ValidationException("El tópico ya existe");
        }
    }
}
