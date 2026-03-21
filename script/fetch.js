const baseURL = 'http://localhost:8080';
const token = localStorage.getItem("tokenJWT");
const login = "login.html";

const sesionExpirada = () => {
        alert("sesion expirada");
        localStorage.clear();
        window.location.href= "login.html"
}


export  function getDatos (metodo,endpoint){
    
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
   
}

   
export  function getDatosPorId (metodo,endpoint,id){
    
    return fetch( `${baseURL}${endpoint}${id}`, {
        method: `${metodo}`,
        headers: { 'Accept': 'application/json',//enviame un json
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
   
}

export function putDatos(endpoint,body){
 return fetch (`${baseURL}${endpoint}`,{
            method: "PUT",
            headers: { 'Content-Type': 'application/json' ,
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },//los content type se dividen en tipo/subtipo
            body: body,
})
 .then(response => {
        if(response.ok){
            return response.json();
        }else{
        throw new Error(`Error ${response.status}`);
        }
    })
}

export function postDatos(endpoint,body){
 return fetch (`${baseURL}${endpoint}`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' ,
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
})
 .then(response => {
        if(response.ok){
            return response.json();
        }else{
        throw new Error(`Error ${response.status}`);
        }
    })
}