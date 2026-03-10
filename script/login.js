
const baseURL = 'http://localhost:8080/login';
const form = document.getElementById('form');
const topicos = "/dashboard.html"

const guardarToken = (token) => {
    localStorage.setItem("tokenJWT", token);
};


    form.addEventListener("submit", function(event){
        event.preventDefault();//evita que la pagina se recargue(submit envia y recarga)
        
        //obtengo valores de los campos
        let mail = document.getElementById('user').value;
        let contraseña = document.getElementById('pass').value;

        //convierto los valores props de un objeto
        const loginData = {
        email: mail,       
        contraseña: contraseña  
        };

        //convierto el objeto a json
        let loginJson = JSON.stringify(loginData);

        fetch(baseURL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },//los content type se dividen en tipo/subtipo
            body: loginJson,
        })
        .then(response => {//cada then devuelve una Promise que contiene un objeto Response
            if (response.ok){//si la respuesta esta en el rango de 200
               
                return response.json();
            }
            if(response.status === 403){ alert('Usuario no registrado')};
            throw new Error(`Response status: ${response.status} y ${response.body}`);
        })

        .then(data => {
            guardarToken(data.tokenJWT);
             window.location.href = "dashboard.html";//ingreso a lla otra pagina
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });

     
        form.reset();//restaura valores predeterminados del form

    })
//el fetch al estar afuera del event listener se ejecutaba primero y luego el callback del primero, declare mal el objeto literal

//fetch solo devuelve una promesa (url, opcional(objeto con la request http)), await fetch es para que espere si o si la respuesta(solo trae headers)
/*let response = await fetch(baseURL, {
    method: POST,
    headers: { 'Content-Type': 'application/json' },//los content type se dividen en tipo/subtipo
    body: loginJson,
})
//si vino un respuesta en el rango de 200
if (response.ok) {
    let token = await response.text//segundo await trae body tmb
    console.log(token);
}
else {
    console.log(response.text, "error");
}

*/




