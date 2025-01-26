let listaAmigos = [];
let listaDisponible = [];
let juegoEnCurso = false;
let jugadorActual = null;

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
    input.focus();

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

    if (nuevoNombre === null) { 
        document.getElementById("amigo").focus();
        return;
    }

    if (!nuevoNombre) {
        alert("El nombre no puede estar vacío.");
        document.getElementById("amigo").focus();
        return;
    }

    const nuevoNombreNormalizado = nuevoNombre.toLowerCase();
    if (
        listaAmigos.some(
            (amigo, idx) => amigo.toLowerCase() === nuevoNombreNormalizado && idx !== index
        )
    ) {
        alert("Este nombre ya está en la lista.");
        document.getElementById("amigo").focus();
        return;
    }

    const viejoNombre = listaAmigos[index];
    listaAmigos[index] = nuevoNombre;

    const indexDisponible = listaDisponible.indexOf(viejoNombre);
    if (indexDisponible !== -1) {
        listaDisponible[indexDisponible] = nuevoNombre;
    }

    mostrarAmigos();
    document.getElementById("amigo").focus();
}

function sortearAmigo() {
    const botonSortear = document.getElementById("btnSortear");
    const botonNuevoIntento = document.querySelector(".button-reset");
    const botonInstrucciones = document.querySelector(".button-instructions");
    const botonAñadir = document.querySelector(".button-add");

    if (listaAmigos.length < 2) {
        alert("Debes ingresar al menos dos amigos para poder sortear.");
        return;
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

    while (!jugador) {
        const continuar = confirm("No has ingresado un nombre. ¿Quieres intentarlo de nuevo?");
        
        if (!continuar) {
            alert("Has decidido salir.");
            return;
        }

        jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();
    }

    while (jugador && !listaAmigos.some(amigo => amigo.toLowerCase() === jugador.toLowerCase())) {
        const continuar = confirm("El jugador ingresado no está en la lista de amigos. ¿Quieres intentar de nuevo?");
        
        if (!continuar) {
            alert("Has decidido salir.");
            return;
        }

        jugador = prompt("¿Quién está jugando ahora?, ingrese su nombre igual como esta en la lista de amigos.").trim();
    }

    if (!jugador) {
        alert("Debes ingresar el nombre del jugador actual.");
        document.getElementById("amigo").focus();
        return;
    }

    const jugadorNormalizado = jugador.toLowerCase();
    if (jugadorActual === jugadorNormalizado) {
        alert("Ya jugaste tu turno. No puedes jugar nuevamente.");
        document.getElementById("amigo").focus();
        return;
    }

    juegoEnCurso = true;
    jugadorActual = jugadorNormalizado;

    let elegido;
    let intentoFallido = false;

    do {
        if (listaDisponible.length === 1 && listaDisponible[0].toLowerCase() === jugadorNormalizado) {
            alert("Te a tocado tu propio nombre, avisale a tus amigos que elijan de nuevo. Reiniciando el sorteo...");
            listaDisponible = [...listaAmigos];
            return;  // Terminamos aquí sin reiniciar el sorteo completo
        }

        elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];

        if (elegido.toLowerCase() === jugadorNormalizado) {
            intentoFallido = true;
        }
    } while (intentoFallido);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;

    mostrarAmigos();

    listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);

    // Desactiva los botones mientras se muestra el mensaje
    botonSortear.disabled = true;
    botonNuevoIntento.disabled = true;
    botonInstrucciones.disabled = true;
    botonAñadir.disabled = true;

    setTimeout(() => {
        resultado.innerHTML = "";
        // Reactiva los botones después de 5 segundos
        botonSortear.disabled = false;
        botonNuevoIntento.disabled = false;
        botonInstrucciones.disabled = false;
        botonAñadir.disabled = false;
    }, 5000);
}

function reiniciarLista() {
    if (listaAmigos.length === 0) {
        alert("No hay ningún juego actualmente.");
        document.getElementById("amigo").focus();
        return;
    }

    if (!juegoEnCurso) {
        const confirmarReinicio = confirm("No se ha sorteado ningún amigo aún. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            document.getElementById("amigo").focus();
            return;
        }
    } else if (juegoEnCurso) {
        const confirmarReinicio = confirm("Juego en curso. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            document.getElementById("amigo").focus();
            return;
        }
    }

    listaAmigos = [];
    listaDisponible = [];
    juegoEnCurso = false;
    jugadorActual = null;
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    document.getElementById("amigo").focus();
}

function mostrarInstrucciones() {
    const instrucciones = document.getElementById("instrucciones");
    instrucciones.style.display = "flex"; 
    document.getElementById("amigo").blur();
}

function cerrarInstrucciones() {
    const instrucciones = document.getElementById("instrucciones");
    instrucciones.style.display = "none"; 
    document.getElementById("amigo").focus();
}
































