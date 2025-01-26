
let listaAmigos = [];
let listaDisponible = [];
let juegoEnCurso = false;
let jugadorActual = null; // Guarda quién está jugando actualmente

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (juegoEnCurso) {
        alert("Juego en curso. No es posible agregar más amigos.");
        input.value = "";
        input.focus();
        return;
    }

    if (!nombre) {
        alert("Por favor, ingresa un nombre.");
        input.focus();
        return;
    }

    const nombreNormalizado = nombre.toLowerCase();
    if (listaAmigos.some(amigo => amigo.toLowerCase() === nombreNormalizado)) {
        alert("Este nombre ya está en la lista.");
        input.focus();
        return;
    }

    listaAmigos.push(nombre);
    listaDisponible.push(nombre);
    input.value = "";
    input.focus(); // Vuelve a poner el foco en el input

    mostrarAmigos();
}

function mostrarAmigos() {
    const listaAmigosContainer = document.getElementById("listaAmigos");
    listaAmigosContainer.innerHTML = "";

    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        if (!listaDisponible.includes(amigo)) {
            li.classList.add("tachado");
        }

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("boton-editar");
        editButton.style.marginLeft = "10px";

        if (juegoEnCurso) {
            editButton.disabled = true;
        } else {
            editButton.onclick = () => editarAmigo(index);
        }

        li.appendChild(editButton);
        listaAmigosContainer.appendChild(li);
    });
}


function editarAmigo(index) {
    const nuevoNombre = prompt("Edita el nombre:", listaAmigos[index]);

    if (nuevoNombre === null) { // Si el usuario cancela la edición
        document.getElementById("amigo").focus(); // Restablece el foco al campo de texto
        return;
    }

    if (!nuevoNombre) {
        alert("El nombre no puede estar vacío.");
        document.getElementById("amigo").focus(); // Asegura que el foco esté en el campo de texto si el nombre está vacío
        return;
    }

    const nuevoNombreNormalizado = nuevoNombre.toLowerCase();
    if (
        listaAmigos.some(
            (amigo, idx) => amigo.toLowerCase() === nuevoNombreNormalizado && idx !== index
        )
    ) {
        alert("Este nombre ya está en la lista.");
        document.getElementById("amigo").focus(); // Restablece el foco si el nombre ya está en la lista
        return;
    }

    const viejoNombre = listaAmigos[index];
    listaAmigos[index] = nuevoNombre;

    const indexDisponible = listaDisponible.indexOf(viejoNombre);
    if (indexDisponible !== -1) {
        listaDisponible[indexDisponible] = nuevoNombre;
    }

    mostrarAmigos();
    document.getElementById("amigo").focus(); // Asegura que el foco esté en el campo de texto después de editar
}




// function sortearAmigo() {
//     const botonSortear = document.getElementById("btnSortear");

//     if (listaAmigos.length < 2) {
//         alert("Debes ingresar al menos dos amigos para poder sortear.");
//         return; // No permite seguir si hay menos de dos amigos en la lista
//     }

//     if (listaAmigos.length === 0) {
//         alert("Por favor, ingresa al menos un nombre antes de sortear.");
//         document.getElementById("amigo").focus();
//         return;
//     }

//     if (listaDisponible.length === 0) {
//         alert("Ya no quedan amigos para sortear.");
//         return;
//     }

//     let jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();
    
//     // Repetir la petición de nombre hasta que el jugador ingrese uno válido o decida salir
//     while (jugador && !listaAmigos.some(amigo => amigo.toLowerCase() === jugador.toLowerCase())) {
//         // Si el jugador ingresado no está en la lista, preguntamos si quiere seguir intentando o salir
//         const continuar = confirm("El jugador ingresado no está en la lista de amigos. ¿Quieres intentar de nuevo?");
        
//         if (!continuar) {
//             alert("Has decidido salir. busque su nombre igual como esta en la lista de amigos.");
//             document.getElementById("amigo").focus(); // Pone el foco en el campo de texto para ingresar un nombre si se desea
//             return; // Salimos de la función sin hacer nada más
//         }

//         // Si el jugador elige continuar, volvemos a pedir el nombre
//         jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();
//     }

//     // Si el nombre está vacío, mostramos una alerta
//     if (!jugador) {
//         alert("Debes ingresar el nombre del jugador actual.");
//         document.getElementById("amigo").focus(); // Pone el foco en el campo de texto
//         return;
//     }

//     const jugadorNormalizado = jugador.toLowerCase();
//     if (jugadorActual === jugadorNormalizado) {
//         alert("Ya jugaste tu turno. No puedes jugar nuevamente.");
//         document.getElementById("amigo").focus(); // Pone el foco en el campo de texto
//         return;
//     }

//     juegoEnCurso = true;
//     jugadorActual = jugadorNormalizado;

//     let elegido;
//     do {
//         elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];
//     } while (elegido.toLowerCase() === jugadorNormalizado);

//     // Mostrar directamente el mensaje sin alerta
//     const resultado = document.getElementById("resultado");
//     resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;
//     mostrarAmigos();

//     // Eliminar el elegido de la lista disponible
//     listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);

//     // Bloquea el botón durante 5 segundos
//     botonSortear.disabled = true;

//     // Establece un temporizador para el mensaje y el botón
//     setTimeout(() => {
//         resultado.innerHTML = ""; // Elimina el mensaje después de 5 segundos
//         botonSortear.disabled = false; // Vuelve a habilitar el botón
//     }, 5000);
// }






// Función para sortear el amigo secreto
function sortearAmigo() {
    const botonSortear = document.getElementById("btnSortear");

    if (listaAmigos.length < 2) {
        alert("Debes ingresar al menos dos amigos para poder sortear.");
        return; // No permite seguir si hay menos de dos amigos en la lista
    }

    if (listaAmigos.length === 0) {
        alert("Por favor, ingresa al menos un nombre antes de sortear.");
        document.getElementById("amigo").focus();
        return;
    }

    if (listaDisponible.length === 0) {
        alert("Ya no quedan amigos para sortear.");
        return;
    }

    let jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();

    // Repetir la petición de nombre hasta que el jugador ingrese uno válido o decida salir
    while (jugador && !listaAmigos.some(amigo => amigo.toLowerCase() === jugador.toLowerCase())) {
        // Si el jugador ingresado no está en la lista, preguntamos si quiere seguir intentando o salir
        const continuar = confirm("El jugador ingresado no está en la lista de amigos. ¿Quieres intentar de nuevo?");
        
        if (!continuar) {
            alert("Has decidido salir. busque su nombre igual como esta en la lista de amigos.");
            document.getElementById("amigo").focus(); // Pone el foco en el campo de texto para ingresar un nombre si se desea
            return; // Salimos de la función sin hacer nada más
        }

        // Si el jugador elige continuar, volvemos a pedir el nombre
        jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();
    }

    // Si el nombre está vacío, mostramos una alerta
    if (!jugador) {
        alert("Debes ingresar el nombre del jugador actual.");
        document.getElementById("amigo").focus(); // Pone el foco en el campo de texto
        return;
    }

    const jugadorNormalizado = jugador.toLowerCase();
    if (jugadorActual === jugadorNormalizado) {
        alert("Ya jugaste tu turno. No puedes jugar nuevamente.");
        document.getElementById("amigo").focus(); // Pone el foco en el campo de texto
        return;
    }

    juegoEnCurso = true;
    jugadorActual = jugadorNormalizado;

    let elegido;
    let intentoFallido = false;

    do {
        // Si solo hay un jugador y el elegido es el mismo, reiniciamos el sorteo
        if (listaDisponible.length === 1 && listaDisponible[0].toLowerCase() === jugadorNormalizado) {
            alert("No puedes sacar tu propio nombre. Reiniciando el sorteo...");
            reiniciarLista();  // Llamamos a la función de reinicio
            return;  // Terminamos la ejecución de esta función
        }

        elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];

        // Si el elegido es el mismo que el jugador, marcamos como fallo
        if (elegido.toLowerCase() === jugadorNormalizado) {
            intentoFallido = true;
        }
    } while (intentoFallido); // Repetimos hasta que el jugador no se saque a sí mismo

    // Mostrar directamente el mensaje sin alerta
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;
    mostrarAmigos();

    // Eliminar el elegido de la lista disponible
    listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);

    // Bloquea el botón durante 5 segundos
    botonSortear.disabled = true;

    // Establece un temporizador para el mensaje y el botón
    setTimeout(() => {
        resultado.innerHTML = ""; // Elimina el mensaje después de 5 segundos
        botonSortear.disabled = false; // Vuelve a habilitar el botón
    }, 5000);
}


function reiniciarLista() {
    if (listaAmigos.length === 0) {
        alert("No hay ningún juego actualmente.");
        document.getElementById("amigo").focus(); // Asegura que el foco esté en el campo de texto
        return;
    }

    if (!juegoEnCurso) {
        const confirmarReinicio = confirm("No se ha sorteado ningún amigo aún. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            document.getElementById("amigo").focus(); // Restablece el foco si se cancela
            return;
        }
    } else if (juegoEnCurso) {
        const confirmarReinicio = confirm("Juego en curso. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            document.getElementById("amigo").focus(); // Restablece el foco si se cancela
            return;
        }
    }

    listaAmigos = [];
    listaDisponible = [];
    juegoEnCurso = false;
    jugadorActual = null;
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    document.getElementById("amigo").focus(); // Asegura que el foco esté en el campo de texto al reiniciar
}





function mostrarInstrucciones() {
    const instrucciones = document.getElementById("instrucciones");
    instrucciones.style.display = "flex";  // Muestra el contenedor de instrucciones
    document.getElementById("amigo").blur();  // Elimina el foco del campo de texto
}

function cerrarInstrucciones() {
    const instrucciones = document.getElementById("instrucciones");
    instrucciones.style.display = "none";  // Oculta el contenedor de instrucciones
    document.getElementById("amigo").focus();  // Devuelve el foco al campo de texto
}

document.querySelector('.button-instructions').addEventListener('click', function() {
    document.querySelector('.instrucciones-container').style.display = 'flex';
});

document.querySelector('.button-aceptar').addEventListener('click', function() {
    document.querySelector('.instrucciones-container').style.display = 'none';
});











