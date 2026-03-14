    import {getDatos, getDatosPorId} from "./fetch.js"; //al estar marcadas solo con export las importo entre llaves, export default solo permite exportar 1 funcion

    let containerTopicos = document.getElementById("container");/*let porque este elemento es dinamico, al estar recargando va a cambiar varias veces hacia donde hace referencia  */ 

    const mainContainer = document.getElementById("main-container");
    const leftNav = document.getElementById("left-nav");
    const toggle = document.getElementById("theme-toggle");
    const avatarBtn = document.getElementById("avatar-btn");
    const dropdown = document.getElementById("avatar-dropdown");

    let listaTopicos = [];

    const formatearFecha= (fecha) =>{
    return new Date(fecha).toLocaleDateString("es-AR")
    }

    const limpiarMain = () =>{
        mainContainer.innerHTML= "";
    }
    
    const leerToken = (token) => {
             const payload = token.split(".")[1];//el token esta separado por 3 puntos, el del medio es el payload
             const decoded = JSON.parse(atob(payload));//atob es una funcion nativa del navegador que decodfica base 64
             return decoded;
            }

    const obtenerUsuario = () =>{
        const token = localStorage.getItem("tokenJWT");
      return leerToken(token);    
    }

    const mostrarUsuario = () => {
        const nombre = obtenerUsuario().nombre;
        document.getElementById("avatar-initials").textContent = nombre.charAt(0).toUpperCase();
        document.getElementById("avatar-name").textContent = `Hola ${nombre}!`;
}

    const mostrarUsuarioId =() =>{
        return obtenerUsuario().id;
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
    try{        
    return await getDatos("GET", `/cursos/${categoria}`);

    }catch (error) {
            console.error("Error al cargar cursos:", error);
            //  podría mostrar un mensaje de error en el DOM para el usuario
        }
 }

    

    const crearLista = (data) => { //data-id es un custom data attirbute info solo visible para el programador?
       
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        containerTopicos.insertAdjacentHTML("afterbegin", data.content.map((i,n) => {
             return ` <div class="card-item" data-id="${i.id}"> 
                       
                    <div>
                        <img src="/front/img/topico-item-${n+1}.svg" alt="topico-img" class="img-container">
                    </div>
                    <div class="card-item-content" >
                        <div class="card-top-row">
                            <div class="date">${formatearFecha(i.fechaCreacion)}</div>
                            <div class="status-badge ${i.status}">${i.status}</div>
                        </div>
                        <div class="title">${i.titulo} </div>
                        <div class="text">${i.mensaje}</div>
                        <div class="curso-tag">${i.nombreCurso}</div>
                        
                    </div>
                </div>`
        }
    ).join("") //el array que devuelve esta formado x comas, eso grid lo toma como otra columna y daria problemas
        )
}

const detalleTopico = (data, id) => {
    const posicion = listaTopicos.findIndex(item => item.id == id);
  

    return `
        <div class="card-item" id="card-item-detail">

            <div class="detail-header">
                <img src="/front/img/topico-item-${posicion+1}.svg" alt="topico-img" class="img-container">
                <div class="detail-tags">
                    <span class="curso-tag">${data.curso.nombreCurso}</span>
                    <span class="curso-tag">${data.curso.categoria}</span>
                    <span class="status-badge ${data.status}">${data.status}</span>
            
                </div>
                <div class="detail-meta" id="detail-meta">
                    <span class="avatar-circle">${data.autor.name.charAt(0).toUpperCase()}</span>
                    <span class="avatar-name">${data.autor.name}</span>
                    <span class="date">${formatearFecha(data.fechaCreacion)}</span>
                </div>
                <div class="title">${data.titulo}</div>
                
                <div class="text" id="text-detail">${data.mensaje}</div>
            </div>

            <div class="detail-respuestas">
                <p class="respuestas-titulo">Respuestas (${data.respuestas.length})</p>

                ${data.respuestas.length === 0
                    ? `<p class="sin-respuestas">Todavia no hay respuestas</p>`
                    : data.respuestas.map(r => `
                        <div class="item-response" >
                            <div class="response-meta" id="response-meta" data-response-id="${r.autor.id}">
                                <span class="avatar-circle">${r.autor.name.charAt(0).toUpperCase()}</span>
                                <span class="avatar-name">${r.autor.name}</span>
                                <span class="date">${formatearFecha(r.fechaCreacion)}</span>
                            </div>
                            <p class="response-text">${r.mensaje}</p>
                        </div>
                    `).join("")
                }

                <div class="response-form">
                    <textarea id="nueva-respuesta" placeholder="Escribi tu respuesta..." rows="3"></textarea>
                    <button id="btn-responder">Responder</button>
                </div>
            </div>

        </div>
    `;
};

 const crearTopico= (categorias) =>{
    return `
            <form method="" class="form-create-topico" id="create-topico">
                <fieldset class="create-topico-content">
                    <legend></legend>
                    
                    <div class="create-topico-input">
                        
                        <div class="form-left">
                            <label for="text">Título</label>
                            <input type="text" id="text" name="text" placeholder="Título" required>
                            <label for="msg">Mensaje</label>
                            <textarea id="msg" name="msj" placeholder="Tu comentario" required></textarea>
                        </div>

                        <div class="form-right">
                            <div id="categorie-select">
                                <label for="categoria">Seleccioná la categoría:</label>
                                <select id="categoria" name="categoria">
                                    ${categorias.map((r) => `
                                        <option value="${r.categoria}">${r.categoria}</option>
                                    `).join("")}
                                </select>
                            </div>
                            <div id="curso-select"></div>
                        </div>

                    </div>

                    <div class="button-create">
                        <button type="submit">Crear</button>
                    </div>
                    
                </fieldset>
            </form>
    `

 }

const cursosDisponibles = (cursos) => {
    const cursoCreado = document.getElementById("curso-select");
  
        cursoCreado.innerHTML="";
    
    if (cursos.length === 0) {
        cursoCreado.insertAdjacentHTML(
            "afterbegin",
            `<p>No hay cursos disponibles en esa categoria</p>`
        );
        return;
    } else {
        const html = `
            <div id="curso-select"=>
                <label for="curso">Seleccioná el curso: </label>
                <select id="curso" name="curso">
                    ${cursos.map((c) => `
                        <option value="${c.cursoNombre}" data-curso="${c.cursoNombre}">
                            ${c.cursoNombre}
                        </option>
                    `).join("")}
                </select>
            </div>
        `;
        cursoCreado.insertAdjacentHTML("afterbegin", html);
    }
};

 //inicio de ejecucion del script

 //carga lista de topicos
 inicializarLista();
 mostrarUsuario();

 //muestra detalle del topico, igual debo poner async y await por llamar al fetch de detalle topico
mainContainer.addEventListener("click", async (event) =>{//event bublbing, haciendo click en el hijo el evento sube al padre, este contenedor

    // Buscamos el elemento que tenga el atributo data-id partiendo desde donde se hizo clic
    const elementoConId = event.target.closest("[data-id]");
    if(!elementoConId) return;
    const id = elementoConId.dataset.id;
    const topico = await detallarTopico(id);
      const idUser = mostrarUsuarioId();  

    document.getElementById("contenidoModal").innerHTML = detalleTopico(topico,id);

    if(topico.autor.id===idUser){
        document.getElementById("detail-meta").insertAdjacentHTML("beforeend","<p id='editar'>Editar</p>");
    }
    if(topico.respuestas.some(r => r.autor.id === idUser)){

        document.querySelectorAll(`[data-response-id="${idUser}"]`).forEach((r) =>r.insertAdjacentHTML("beforeend","<p >Editar</p>"));//query selector all porque pueden ser varias respuestas
    }
    //  Muestra el modal
    document.getElementById("modalDetalle").classList.add("active");
    
})

mainContainer.addEventListener("click", (event) =>{
    
    const e= event.target.closest("#editar");
    if(!e) return;

    const titulo= document.getElementById("contenidoModal").querySelector(".title").textContent;//me aseguro que la clase a la que me refiero es la que este dentro del modal
    const mensaje= document.getElementById("contenidoModal").querySelector(".text").textContent;
document.getElementById("contenidoModal").querySelector(".title").innerHTML = `<input type='text' value='${titulo}'>`;

document.getElementById("contenidoModal").querySelector(".text").innerHTML = `<input type='text' value='${mensaje}'>`;

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


mainContainer.addEventListener("change", async (event) => {
    console.log("se disparo el evento")
    
    const categoriaConId = event.target.closest("#categoria");
     if(!categoriaConId) return;

     const categoriaSeleccionada = event.target.value;
    console.log(categoriaSeleccionada);
    const cursos = await traerCursosPorCategoria(categoriaSeleccionada);
    cursosDisponibles(cursos);



} )


//modo oscurso
toggle.addEventListener("click", () => {
    const actual = document.documentElement.getAttribute("data-theme");//tomo custom atribute de la etiqueta html
    document.documentElement.setAttribute("data-theme", actual === "dark" ? "light" : "dark");
    localStorage.setItem("theme", actual === "dark" ? "light" : "dark");
});

// recordar preferencia al recargar
  const temaGuardado = localStorage.getItem("theme");
    if (temaGuardado) document.documentElement.setAttribute("data-theme", temaGuardado);


    avatarBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita que el click se propague y cierre el menu inmediatamente
    dropdown.classList.toggle("active");
        });

// cierra el dropdown al hacer click en cualquier otro lado
document.addEventListener("click", () => {
    dropdown.classList.remove("active");
});

document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/front/login.html";
});