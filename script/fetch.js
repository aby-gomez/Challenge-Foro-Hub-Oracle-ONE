const baseURL = 'http://localhost:8080';
const token = localStorage.getItem("tokenJWT");
const login = "login.html";

const sesionExpirada = () => {
        alert("sesion expirada");
        localStorage.clear();
        window.location.href= "login.html"
}

 const crearLista = (data) => {
        let contenedor = document.getElementById("container");
       
    
        /*backticks en la misma linea que el return para que js no agregue el punto y coma antes y salga de la funcion*/ 
        contenedor.insertAdjacentHTML("afterbegin",
        data.content.map(i => {
             return ` <div class="card-item"> 
                    <div>
                        <img src="/front/img/topico-item.svg" alt="topico-img" class="img-container">
                    </div>
                    <div class="card-item-content" >
                        <div class="date">12/00/2000</div>
                        <div class="title">${i.titulo} </div>
                        <div class="text">${i.mensaje}</div>
                    </div>
                </div>`
        }
    ).join("") //el array que devuelve esta formado x comas, eso grid lo toma como otra columna y daria problemas
)
}


export default function getDatos (metodo,endpoint){
    console.log(token)

    return fetch( `${baseURL}${endpoint}`, {
        method: `${metodo}`,
        headers: { 'accept': 'application/json',
            'Authorization': `Bearer ${token}`
         }
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }if(response.status === 403){
            sesionExpirada();
        }else{
        throw new Error(`Error ${response.status}`);
        }
    })
    .then(data => {
        crearLista(data);
    })
    .catch(error =>{
        console.error(error.message);

    })
}

   
