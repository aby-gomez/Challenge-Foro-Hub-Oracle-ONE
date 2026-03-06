
const baseURL = 'http://localhost:8080/login';
const form = document.getElementById('form');



    form.addEventListener("submit", function(event){
        event.preventDefault();//evita que la pagina se recargue
        
        //obtengo valores de los campos
        let mail = document.getElementById('user').value;
        let contraseña = document.getElementById('pass').value;

        //convierto a objeto
        const loginData = {
        email: mail,       
        contraseña: contraseña  
    };

        //convierto a json
        let loginJson = JSON.stringify(loginData);

        fetch(baseURL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },//los content type se dividen en tipo/subtipo
            body: loginJson,
        })
        .then(response => {
            if (response.ok){
                console.log(response.text)
            return response.text();}
    
            throw new Error(response.status);
        })
        .then(data => {
            console.log("Datos: " + data);
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });

     
        form.reset();

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



