package com.alura.foro_hub.curso;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Categoria {
    TECNOLOGIA,

    ARTE_Y_CREATIVIDAD,

    CIENCIAS_Y_NATURALEZA,

    HUMANIDADES,

    NEGOCIOS_Y_FINANZAS,

    SALUD_Y_BIENESTAR,

    OFICIOS_Y_HOBBIES;

    @JsonCreator//si se lanza la excepcion sprinv la envuelve con un HttpMessageNotReadableException
    public static Categoria fromString(String categoria){
        for(Categoria c : Categoria.values()){
            if(c.name().equalsIgnoreCase(categoria)){
                return c;
            }
        }
        throw new IllegalArgumentException("Ninguna categoria encontrada: " + categoria);
    }
}
