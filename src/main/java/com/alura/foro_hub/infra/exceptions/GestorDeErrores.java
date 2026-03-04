package com.alura.foro_hub.infra.exceptions;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.alura.foro_hub.infra.exceptions.ValidationException;

import javax.naming.AuthenticationException;

@RestControllerAdvice
public class GestorDeErrores {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity gestionarError400(MethodArgumentNotValidException ex) {
        var errores = ex.getFieldErrors();//metodo de su clase madre devuelve un objeto Field Error
        return ResponseEntity.badRequest().body(errores.stream().map(DatosErrorValidacion::new).toList());
    }
    //dto que se le mostrara al cliente
    public record DatosErrorValidacion(String campo, String mensaje) {
        public DatosErrorValidacion(FieldError error) {
            this(error.getField(), error.getDefaultMessage());
        }
    }

    @ExceptionHandler(BadCredentialsException.class)//subclase de authenticationexception la arroja el auth manager si falla la autenticacion del login
    public ResponseEntity gestionarError401() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña inválidos");
    }

    //al no encontrar un curso con ese nombre error 404 o cualquier otro recurso no encontrado
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity gestionarError404(EntityNotFoundException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    //si se envio mal escrita la categoria
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity gestionarError40(IllegalArgumentException e){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity tratarErrorDeValidacion(ValidationException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

}
