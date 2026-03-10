    import getDatos from "./fetch.js";

    const containerTopicos = document.getElementById("container");
    let datos = [];
    
    //async y await se hace con try catch
    const inicializar = async () =>{//async hace que la funcion devuelva una promesa 
    try {
        const respuesta = await getDatos("GET", "/topicos");//pausa la ejecucion y espera una promesa resuelta
        crearLista(respuesta); // Solo se ejecuta si la línea anterior tuvo éxito
        datos = respuesta.content;
    } catch (error) {
        console.error("Error al cargar tópicos:", error);
        //  podría mostrar un mensaje de error en el DOM para el usuario
    }
}
        
    const formatearFecha= (fecha) =>{
    return new Date(fecha).toLocaleDateString("es-AR")
    }

    const crearLista = (data) => {
        let contenedor = document.getElementById("container");
        
     /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        contenedor.insertAdjacentHTML("afterbegin",
        data.content.map((i,n) => {
             return ` <div class="card-item"> 
                    <div>
                        <img src="/front/img/topico-item-${n+1}.svg" alt="topico-img" class="img-container">
                    </div>
                    <div class="card-item-content" >
                        <div class="date">${formatearFecha(i.fechaCreacion)}</div>
                        <div class="title">${i.titulo} </div>
                        <div class="text">${i.mensaje}</div>
                    </div>
                </div>`
        }
    ).join("") //el array que devuelve esta formado x comas, eso grid lo toma como otra columna y daria problemas
)
}

 inicializar();

 const detalleTopico = (data) =>{
            let dato = data[0];

            return ` <div class="card-item card-item-detail"> 
                    <div>
                        <img src="/front/img/topico-item-${1}.svg" alt="topico-img" class="img-container">
                    </div>
                    <div class="card-item-content" >
                        <div class="date">${formatearFecha(dato.fechaCreacion)}</div>
                        <div class="title">${dato.titulo} </div>
                        <div class="text" id="text-detail">${dato.mensaje}</div>
                    </div>
                </div>`
 }


containerTopicos.addEventListener("click", () =>{//event bublbing, haciendo click en el hijo el evento sube al padre, este contenedor
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    detalleTopico(datos);
})
    