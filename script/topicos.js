  import { formatearFecha } from "./utils.js";

  
  export function crearLista (data) { //data-id es un custom data attirbute info solo visible para el programador?
       
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        document.getElementById("container").insertAdjacentHTML("afterbegin", data.content.map((i,n) => {
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