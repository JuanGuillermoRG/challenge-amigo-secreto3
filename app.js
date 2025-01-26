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

    document.getElementById("amigo").focus(); // Mantener el foco en el campo de entrada
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

function sortearAmigo() {
    const input = document.getElementById("amigo");
    const botonSortear = document.getElementById("btnSortear");

    if (listaAmigos.length < 2) {
        alert("Debes ingresar al menos dos amigos para poder sortear.");
        input.focus();
        return;
    }

    if (listaAmigos.length === 0) {
        alert("Por favor, ingresa al menos un nombre antes de sortear.");
        input.focus();
        return;
    }

    if (listaDisponible.length === 0) {
        alert("Ya no quedan amigos para sortear.");
        input.focus();
        return;
    }

    let jugador = "";

    // Pedir el nombre del jugador hasta que se ingrese uno válido o se cancele
    while (true) {
        const input = document.getElementById("amigo"); // Obtén el campo de entrada
        let jugador = prompt("¿Quién está jugando ahora?, ingresa su nombre igual como está en la lista de amigos.");
    
        // Si el usuario cancela (prompt devuelve `null`)
        if (jugador === null) {
            alert("Has cancelado el proceso.");
            input.focus(); // Asegura que el foco vuelva al campo de texto
            return;
        }
    
        // Si el usuario no ingresa nada o solo espacios
        jugador = jugador.trim(); // Elimina espacios en blanco al inicio y al final
        if (!jugador) {
            alert("Debes ingresar el nombre del jugador.");
            input.focus(); // Asegura que el foco vuelva al campo de texto
            continue;
        }
    
        // Verificar si el nombre está en la lista de amigos
        const jugadorNormalizado = jugador.toLowerCase();
        if (listaAmigos.some(amigo => amigo.toLowerCase() === jugadorNormalizado)) {
            break; // Si el nombre es válido, salir del bucle
        } else {
            alert("El nombre ingresado no está en la lista. Intenta de nuevo.");
            input.focus(); // Asegura que el foco vuelva al campo de texto
        }
    }
    

    if (jugadorActual === jugador.toLowerCase()) {
        alert("Ya jugaste tu turno. No puedes jugar nuevamente.");
        input.focus();
        return;
    }

    juegoEnCurso = true;
    jugadorActual = jugador.toLowerCase();

    let elegido;

    do {
        elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];
    } while (elegido.toLowerCase() === jugadorActual);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;
    mostrarAmigos();

    listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);

    botonSortear.disabled = true;

    setTimeout(() => {
        resultado.innerHTML = "";
        botonSortear.disabled = false;
        input.focus(); // Mantiene el foco en el input después del sorteo
    }, 5000);
}

function reiniciarLista() {
    const input = document.getElementById("amigo");

    if (listaAmigos.length === 0) {
        alert("No hay ningún juego actualmente.");
        input.focus();
        return;
    }

    if (!juegoEnCurso) {
        const confirmarReinicio = confirm("No se ha sorteado ningún amigo aún. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            input.focus();
            return;
        }
    } else if (juegoEnCurso) {
        const confirmarReinicio = confirm("Juego en curso. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            input.focus();
            return;
        }
    }

    listaAmigos = [];
    listaDisponible = [];
    juegoEnCurso = false;
    jugadorActual = null;
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    input.focus();
}

function mostrarInstrucciones() {
    document.getElementById("instrucciones").style.display = "flex";
    document.getElementById("amigo").blur();
}

function cerrarInstrucciones() {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("amigo").focus();
}












