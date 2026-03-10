    import {getDatos, getDatosPorId} from "./fetch.js"; //al estar marcadas solo con export las importo entre llaves, export default solo permite exportar 1 funcion

    const containerTopicos = document.getElementById("container");
    const modal = document.getElementById("modalDetalle");
    const mainContainer = document.getElementById("main-container");

    let listaTopicos = [];
    
    //async y await se hace con try catch
    const inicializarLista = async () =>{//async hace que la funcion devuelva una promesa 
        try {
            const respuesta = await getDatos("GET", "/topicos");//pausa la ejecucion y espera una promesa resuelta
            crearLista(respuesta); // Solo se ejecuta si la línea anterior tuvo éxito
            listaTopicos = respuesta.content;
        } catch (error) {
            console.error("Error al cargar tópicos:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }
    }

    const detallarTopico = async (id) =>{//async hace que la funcion devuelva una promesa 
        try {
            const respuesta = await getDatosPorId("GET", "/topicos",`/${id}`);//pausa la ejecucion y espera una promesa resuelta
            return respuesta;
            

        } catch (error) {
            console.error("Error al cargar tópico:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }
    }
        
    const formatearFecha= (fecha) =>{
    return new Date(fecha).toLocaleDateString("es-AR")
    }

    const crearLista = (data) => { //data-id es un custom data attirbute info solo visible para el programador?
    
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        containerTopicos.insertAdjacentHTML("afterbegin",
        data.content.map((i,n) => {
             return ` <div class="card-item" data-id="${i.id}"> 
                       
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


const detalleTopico = (data,id) =>{

         const posicion = listaTopicos.findIndex(item => item.id == id);
        

                return ` <div class="card-item" id="card-item-detail"> 
                        <div>
                        <img src="/front/img/topico-item-${posicion+1}.svg" alt="topico-img" class="img-container">
                    </div>
                    <div class="card-item-content" id="item-content-detail" >
                        <div class="date">${formatearFecha(data.fechaCreacion)}</div>
                        <div class="title">${data.titulo} </div>
                        <div class="text" id="text-detail">${data.mensaje}</div>
                        ${data.respuestas.map( (r) =>{
                            return `
                            <div class="item-response">${r.mensaje}</div>
                            `
                        }).join("")}
                    </div>
                </div>`
 }

 const crearTopico= () =>{
    return `
     <form  method="" class="create-topico" id="create-topico">
            <fieldset class="content-form">
                
                <legend>Crea tu tópico</legend>
                    <div class="labels-form">
                    <label for="title" >Título</label>
                    <input type="text" id="text" name="text" placeholder="Título" required>
            
                    <label for="msg" >Mensaje</label>
                    <input type="text" id="msg" name="msj" placeholder="Tu comentario" required>
                    </div>

                    <button type="submit"  >Crear</button>
                  
                
            </fieldset>
        </form>
    `

 }

 //inicio de ejecucion del script

 //carga lista de topicos
 inicializarLista();

 //muestra detalle del topico, igual debo poner async y await por llamar al fetch de detalle topico
containerTopicos.addEventListener("click", async (event) =>{//event bublbing, haciendo click en el hijo el evento sube al padre, este contenedor

    // Buscamos el elemento que tenga el atributo data-id partiendo desde donde se hizo clic
    const elementoConId = event.target.closest("[data-id]");
    const id = elementoConId.dataset.id;
    const topico = await detallarTopico(id);

    document.getElementById("contenidoModal").innerHTML = detalleTopico(topico,id);
    //  Muestra el modal
    modal.classList.add("active");
    
})

//sale del detalle de topico
modal.addEventListener("click", (event) =>{//nombre del pRmetro OBJETO DEL EVENTO
    const card = event.target.closest(".contenidoModal");
    if (card) return;
    document.getElementById("contenidoModal").innerHTML ="";
    modal.classList.remove("active");
    
})
    

//crear topico
window.addEventListener("hashchange", () =>{
    const destino = window.location.hash;

    if (destino === "#crear-topico"){
        mainContainer.innerHTML="";
        mainContainer.insertAdjacentHTML("afterbegin", crearTopico());
    }
    if(destino=== "#inicio"){
        window.location.href= "dashboard.html";
    }

})