    import {getDatos, getDatosPorId} from "./fetch.js"; //al estar marcadas solo con export las importo entre llaves, export default solo permite exportar 1 funcion

    let containerTopicos = document.getElementById("container");/*let porque este elemento es dinamico, al estar recargando va a cambiar varias veces hacia donde hace referencia  */ 

    const mainContainer = document.getElementById("main-container");
    const leftNav = document.getElementById("left-nav");
    let listaTopicos = [];

    const formatearFecha= (fecha) =>{
    return new Date(fecha).toLocaleDateString("es-AR")
    }

    const limpiarMain = () =>{
        mainContainer.innerHTML= "";
    }
    
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
        
   
    const traerCategorias = async () => {
        try { return await getDatos("GET", "/cursos/categorias");
        }catch (error) {
            console.error("Error al cargar categorìas:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }

    }

    const crearLista = (data) => { //data-id es un custom data attirbute info solo visible para el programador?
        console.log(data)
    
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        containerTopicos.insertAdjacentHTML("afterbegin", data.content.map((i,n) => {
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

 const crearTopico= (categorias) =>{
    return `
     <form  method="" class="form-create-topico" id="create-topico">
            <fieldset class = "create-topico-content">

                <legend></legend>
                   
                   <div class= "create-topico-input">
                   
                    <label for="text">Título</label>
                    <input type="text" id="text" name="text" placeholder="Título" required>
                
                    <label for="msg" >Mensaje</label>
                    <input type="text" id="msg" name="msj" placeholder="Tu comentario" required>
                    
                    <div class="button-create">
                        <button type="submit"  >Crear</button>
                    </div>

                    <div>
                         <label for="categoria">Seleccioná la categoría : </label>
                         <select id="categoria" name="categoria">
                         ${categorias.map( (r) =>{
                            return `
                            <option value="${r.categoria}">${r.categoria}</option>
                            `
                         }).join("")
                    }
                               
                         </select>
                    </div>
                    </div>
                    
                
            </fieldset>
          
        </form>
    `

 }

 //inicio de ejecucion del script

 //carga lista de topicos
 inicializarLista();

 //muestra detalle del topico, igual debo poner async y await por llamar al fetch de detalle topico
mainContainer.addEventListener("click", async (event) =>{//event bublbing, haciendo click en el hijo el evento sube al padre, este contenedor

    // Buscamos el elemento que tenga el atributo data-id partiendo desde donde se hizo clic
    const elementoConId = event.target.closest("[data-id]");
    if(!elementoConId) return;
    const id = elementoConId.dataset.id;
    const topico = await detallarTopico(id);

    document.getElementById("contenidoModal").innerHTML = detalleTopico(topico,id);
    //  Muestra el modal
    document.getElementById("modalDetalle").classList.add("active");
    
})

//sale del detalle de topico
mainContainer.addEventListener("click", (event) =>{//nombre del parametro OBJETO DEL EVENTO
    const modal = document.getElementById("modalDetalle");
    if(!modal) return;

    const card = event.target.closest(".contenidoModal");
    if (card) return;

     // Solo cerramos si el modal está activo
    if (modal.classList.contains("active")) {
        document.getElementById("contenidoModal").innerHTML = "";
        modal.classList.remove("active");
    }
    
})
    

//crear topico
// window.addEventListener("hashchange", () =>{
//     const destino = window.location.hash;

//     if (destino === "#crear-topico"){
//         mainContainer.innerHTML="";
//         mainContainer.insertAdjacentHTML("afterbegin", crearTopico());
//         const crear = document.getElementById("crear-topico");

//     }
//     if(destino=== "#inicio"){
//         window.location.href= "dashboard.html";
//     }

// })


//crear topico, no olvidar que el contexto debe ser async para esperar una promesa
leftNav.addEventListener("click", async (event) =>{
     const link = event.target.closest('li'); // Buscamos el link más cercano
    if (!link) return;

    limpiarMain();
    document.querySelectorAll('.nav-dash ul li ').forEach(a => a.classList.remove('active'));

   if(event.target.closest("#inicio")){
            
            const inicio = document.getElementById("inicio");
            inicio.classList.add("active");
            
            mainContainer.innerHTML = `
            <div class="card-container" id="container"></div>
            <div id="modalDetalle">
            <div id="contenidoModal" class="contenidoModal">
            </div>
             </div>
            `;

            //reasigno el valor de el contenedor
            containerTopicos = document.getElementById("container");
           

             // 2. Ahora que el #container existe en el DOM, le pedimos a crearLista que lo llene
            // Nota: Tu función crearLista ya debería tener el document.getElementById("container") adentro
            crearLista({content: listaTopicos});
        }

    if(event.target.closest("#crear-topico")){
             const respuesta = await traerCategorias();
               
            mainContainer.insertAdjacentHTML("afterbegin", crearTopico(respuesta));
            const crear = document.getElementById("crear-topico");
            crear.classList.add("active");
        }
})

