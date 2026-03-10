const baseURL = 'http://localhost:8080';
const token = localStorage.getItem("tokenJWT");
const login = "login.html";

const sesionExpirada = () => {
        alert("sesion expirada");
        localStorage.clear();
        window.location.href= "login.html"
}


export default function getDatos (metodo,endpoint){
    
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

   
