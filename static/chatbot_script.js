// obtener la entrada de texto y botón 
const inputUsuario = document.getElementById('entrada')
const botonEnviar = document.getElementById('enviar')

// obtener el contenedor de los mensajes 
const contenedorMensajes = document.getElementById('mensajes')

const MAX_MENSAJES = 10

// función para agregar cada mensaje al contenedor 
function crearBurbuja(mensaje, tipo){
    const burbuja = document.createElement('div');
    burbuja.classList.add(tipo);
    burbuja.textContent = (mensaje);
    contenedorMensajes.appendChild(burbuja)

    while(contenedorMensajes.children.length > MAX_MENSAJES){
        contenedorMensajes.removeChild(contenedorMensajes.firstChild);
    }
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}

// funcion de enviar el mensaje
function enviarMensajes() {
    const mensajeUsuario = inputUsuario.value.trim();
    if (!mensajeUsuario) return;

    crearBurbuja(mensajeUsuario, 'user-msg');
    inputUsuario.value = '';

    // conectar con backend según sea local o host
const BASE_URL = window.location.hostname.includes('localhost') ?
'http://127.0.0.1:5000' : '';

    fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ mensaje:mensajeUsuario })
    })
    .then(res => res.json())
    .then(data => {
        crearBurbuja(data.respuesta, 'bot-msg');
    })
    .catch(err => {
        console.error(err);
        crearBurbuja("Error al conectar con el bot", 'bot-msg')
    });
}

botonEnviar.addEventListener('click', enviarMensajes);
botonEnviar.addEventListener('touchend', enviarMensajes);

// enviar con enter 
inputUsuario.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        botonEnviar.click();
    }
});