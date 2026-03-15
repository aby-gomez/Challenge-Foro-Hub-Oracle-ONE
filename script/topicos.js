  import { formatearFecha } from "./utils.js";

  
  export function crearLista (data) { //data-id es un custom data attirbute info solo visible para el programador?
       
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        document.getElementById("container").insertAdjacentHTML("afterbegin", data.content.map((i,n) => {
             return ` <div class="card-item" data-id="${i.id}"> 
                       
                    <div>
                        <img src="/front/img/topico-item-${n% 8 + 1}.svg" alt="topico-img" class="img-container" data-img-id="${n% 8 + 1}">
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


export const detalleTopico = (data,posicion) => {
   
  

    return `
        <div class="card-item" id="card-item-detail">

            <div class="detail-header">
                <img src="/front/img/topico-item-${posicion}.svg" alt="topico-img" class="img-container">
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
                <div class ="detail-topic">
                    <div class="title">${data.titulo}</div>
                    <div class="text" id="text-detail">${data.mensaje}</div>
                </div>
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


export const crearTopico = (categorias) =>{
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

 export const cursosDisponibles = (cursos) => {
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

 export const leftNavInicio = () =>{
    const inicio = document.getElementById("inicio");
                inicio.classList.add("active");
                
                document.getElementById("main-container").innerHTML = `
                <div class="card-container" id="container"></div>
                <div id="modalDetalle">
                <div id="contenidoModal" class="contenidoModal">
                </div>
                 </div>
                `;
 }