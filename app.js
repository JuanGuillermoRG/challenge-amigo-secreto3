
let listaAmigos = [];
let listaDisponible = [];
let juegoEnCurso = false; // Nueva bandera para verificar si el juego ha comenzado

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (juegoEnCurso) {
        alert("Juego en curso. No es posible agregar más amigos.");
        input.value = ""; // Limpia el campo tras aceptar la alerta
        return;
    }

    if (!nombre) {
        alert("Por favor, ingresa un nombre.");
        input.focus();
        return;
    }

    if (listaAmigos.includes(nombre)) {
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

        // Botón para editar nombres
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("boton-editar"); // Aplica la clase "boton-editar"
        editButton.style.marginLeft = "10px";

        // Deshabilitar el botón de editar si el juego está en curso
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

    if (!nuevoNombre) {
        alert("El nombre no puede estar vacío.");
        return;
    }

    if (listaAmigos.includes(nuevoNombre) && listaAmigos[index] !== nuevoNombre) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    const viejoNombre = listaAmigos[index];
    listaAmigos[index] = nuevoNombre;

    // Actualizar la lista disponible
    const indexDisponible = listaDisponible.indexOf(viejoNombre);
    if (indexDisponible !== -1) {
        listaDisponible[indexDisponible] = nuevoNombre;
    }

    mostrarAmigos();
}

function sortearAmigo() {
    const botonSortear = document.getElementById("btnSortear");

    if (listaAmigos.length === 0) {
        alert("Por favor, ingresa al menos un nombre antes de sortear.");
        document.getElementById("amigo").focus();
        return;
    }

    if (listaDisponible.length === 0) {
        alert("Ya no quedan amigos para sortear.");
        return;
    }

    juegoEnCurso = true; // Marcar que el juego ha comenzado

    const elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];
    listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;
    mostrarAmigos();

    // Bloquear el botón durante 5 segundos
    botonSortear.disabled = true;
    setTimeout(() => {
        resultado.innerHTML = "";
        botonSortear.disabled = false;
    }, 5000);
}

function reiniciarLista() {
    if (listaAmigos.length === 0) {
        alert("No hay ningún juego actualmente.");
        document.getElementById("amigo").focus();
        return;
    }

    // Confirmar reinicio si aún no se ha sorteado por primera vez
    if (!juegoEnCurso) {
        const confirmarReinicio = confirm("No se ha sorteado ningún amigo aún. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            return; // El usuario eligió no reiniciar
        }
    } else if (juegoEnCurso) {
        const confirmarReinicio = confirm("Juego en curso. ¿Estás seguro de que deseas reiniciar?");
        if (!confirmarReinicio) {
            return; // El usuario eligió no reiniciar
        }
    }

    // Reiniciar las listas y los estados
    listaAmigos = [];
    listaDisponible = [];
    juegoEnCurso = false; // Reiniciar la bandera
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}

