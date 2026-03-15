 
 export  const leerToken = (token) => {
        const payload = token.split(".")[1];//el token esta separado por 3 puntos, el del medio es el payload
        const decoded = JSON.parse(atob(payload));//atob es una funcion nativa del navegador que decodfica base 64
        return decoded;
    }

 
 export  const obtenerUsuario = () =>{
    const token = localStorage.getItem("tokenJWT");
    return leerToken(token);    
    }
 
 
 export const mostrarUsuarioId =() =>{
        return obtenerUsuario().id;
    }