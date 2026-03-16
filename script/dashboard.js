    import {getDatos, getDatosPorId, putDatos} from "./fetch.js"; //al estar marcadas solo con export las importo entre llaves, export default solo permite exportar 1 funcion
    import { crearLista, detalleTopico, crearTopico ,cursosDisponibles, leftNavInicio} from "./topicos.js";
    import { obtenerUsuario,mostrarUsuarioId } from "./auth.js";

    let containerTopicos = document.getElementById("container");/*let porque este elemento es dinamico, al estar recargando va a cambiar varias veces hacia donde hace referencia  */ 

    const mainContainer = document.getElementById("main-container");
    const leftNav = document.getElementById("left-nav");
    const toggle = document.getElementById("theme-toggle");
    const avatarBtn = document.getElementById("avatar-btn");
    const dropdown = document.getElementById("avatar-dropdown");
    const contenidoModal = document.getElementById("contenidoModal");
    
    let listaTopicos = [];

    
    const limpiarMain = () =>{
        mainContainer.innerHTML= "";
    }
    
   const mostrarUsuario = () => {
        const nombre = obtenerUsuario().nombre;
        document.getElementById("avatar-initials").textContent = nombre.charAt(0).toUpperCase();
        document.getElementById("avatar-name").textContent = `Hola ${nombre}!`;
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
        try { return await getDatos("GET","/cursos/categorias");
        }catch (error) {
            console.error("Error al cargar categorìas:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }

    }

    const traerCursosPorCategoria = async (categoria) =>{
        try{ return await getDatos("GET", `/cursos/${categoria}`);
        }catch (error) {
            console.error("Error al cargar cursos:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }
    }

    const editarTopico = async (endpoint,body) =>{
        try{
            return await putDatos(endpoint,body);
        }catch(err){
            console.error("error al editar topico",err);
        }
    }

    

//inicio de ejecucion del script

 //carga lista de topicos
 inicializarLista();
 mostrarUsuario();

 //muestra detalle del topico, igual debo poner async y await por llamar al fetch de detalle topico
mainContainer.addEventListener("click", async (event) =>{//event bublbing, haciendo click en el hijo el evento sube al padre, este contenedor
    
    // Buscamos el elemento que tenga el atributo data-id partiendo desde donde se hizo clic
    const elementoConId = event.target.closest("[data-id]");
    const imgId = event.target.closest("[data-img-id]");
    if(!elementoConId|| !imgId) return;

    const id = elementoConId.dataset.id;
    const idImg = imgId.dataset.imgId;

    const topico = await detallarTopico(id);
    const idUser = mostrarUsuarioId();  

    document.getElementById("contenidoModal").innerHTML = detalleTopico(topico,idImg);

    //editar solo si es autor
    if(topico.autor.id === idUser){
        document.getElementById("detail-meta").insertAdjacentHTML("beforeend",`
        <div class ="acciones-topico" id="acciones-topico">
            <div id='edicion-topico'>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
            
            </div>
            <div id='eliminar-topico'>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                
            </div>
        </div>`
        );
    }
    if(topico.respuestas.some(r => r.autor.id === idUser)){
        document.querySelectorAll(`[data-response-id="${idUser}"]`).forEach((r) =>r.insertAdjacentHTML("beforeend","<p >Editar</p>"));//query selector all porque pueden ser varias respuestas
    }

    //  Muestra el modal
    document.getElementById("modalDetalle").classList.add("active");
})

//editar un tópico
mainContainer.addEventListener("click", (event) =>{
    
    const e= event.target.closest("#edicion-topico");
    console.log(e);
   if(!e) return;
   
    const accionesTopico = document.getElementById("acciones-topico");
        accionesTopico.innerHTML = `
        <div class="guardar-cambios" id ="guardar-cambios">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
           
        </div>

        <div class ="cancelar-cambios">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
        </div>
    `;
    
    
    const titulo= contenidoModal.querySelector(".title").textContent;//me aseguro que la clase a la que me refiero es la que este dentro del modal
    const mensaje= contenidoModal.querySelector(".text").textContent;
    
    contenidoModal.querySelector(".title").innerHTML = `<input type='text' value='${titulo}' class="editar-topico edicion-titulo" name = 'text' >`;//inner html reemplaza
    contenidoModal.querySelector(".text").innerHTML = `<textarea class="editar-topico edicion-mensaje" >${mensaje}</textarea>`;

    contenidoModal.querySelector(".title").classList.add("editar");
  
    
})

//guardar cambios
mainContainer.addEventListener("click", async (e) =>{
    const guardar = e.target.closest("#guardar-cambios");
    console.log(guardar)
    if(!guardar) return;

    const topico = e.target.closest("[data-topico-id]");
    const idTopico = topico.dataset.topicoId;
    
    const titulo = contenidoModal.querySelector(".edicion-titulo").value;
    const mensaje= contenidoModal.querySelector(".edicion-mensaje").value;
    console.log(mensaje)
    
    const edicion = JSON.stringify({titulo: titulo, mensaje:mensaje});

   const edicionOk = await editarTopico(`/topicos/${idTopico}`, edicion);
    console.log(edicionOk)
   if(edicionOk){
    contenidoModal.querySelector(".title").innerHTML = `${edicionOk.titulo}`;
    contenidoModal.querySelector(".text").innerHTML = `${edicionOk.mensaje}`;
  const accionesTopico = document.getElementById("acciones-topico");
        accionesTopico.innerHTML = `
         <div id='edicion-topico'>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
            
            </div>
            <div id='eliminar-topico'>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
                
            </div>
        `
          inicializarLista();
    }
  
   }
    
 )

//sale del detalle de topico
mainContainer.addEventListener("click", (event) =>{//nombre del parametro OBJETO DEL EVENTO
    const modal = document.getElementById("modalDetalle");
  
const card = event.target.closest(".contenidoModal");

if (card) return;

const edicion = event.target.closest("#edicion-topico");

if(edicion) return;

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
            leftNavInicio();

            //reasigno el valor de el contenedor
            containerTopicos = document.getElementById("container");
            // Ahora que el #container existe en el DOM, le pedimos a crearLista que lo llene
            crearLista({content: listaTopicos});
        }
    if(event.target.closest("#crear-topico")){

            const categorias = await traerCategorias();
            mainContainer.insertAdjacentHTML("afterbegin", crearTopico(categorias));
            const crear = document.getElementById("crear-topico");
            crear.classList.add("active");
        }
})

//trae los cursos en crear tópico
mainContainer.addEventListener("change", async (event) => {
    const categoriaConId = event.target.closest("#categoria");
    if(!categoriaConId) return;

    //trae el valor de la categoria del select
    const categoriaSeleccionada = event.target.value;
    const cursos = await traerCursosPorCategoria(categoriaSeleccionada);
    cursosDisponibles(cursos);
} )


//modo oscuro
toggle.addEventListener("click", () => {
    const actual = document.documentElement.getAttribute("data-theme");//tomo custom atribute de la etiqueta html
    document.documentElement.setAttribute("data-theme", actual === "dark" ? "light" : "dark");
    localStorage.setItem("theme", actual === "dark" ? "light" : "dark");
    
    
});
//recordar preferencia al recargar
    const temaGuardado = localStorage.getItem("theme");
    if (temaGuardado) document.documentElement.setAttribute("data-theme", temaGuardado);

//abre dropdown de usuario
avatarBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita que el click se propague y cierre el menu inmediatamente
    dropdown.classList.toggle("active");
        });
    // cierra el dropdown al hacer click en cualquier otro lado
    document.addEventListener("click", () => {
    dropdown.classList.remove("active");
});

//cerrar sesión
document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("tokenJWT");
    window.location.href = "/front/login.html";
});