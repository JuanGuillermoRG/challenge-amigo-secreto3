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

    const nombresPorColumna = 4;
    const columnas = Math.ceil(listaAmigos.length / nombresPorColumna);

    for (let col = 0; col < columnas; col++) {
        const ul = document.createElement("ul");
        ul.style.display = "inline-block";
        ul.style.margin = "0 10px";
        ul.style.verticalAlign = "top";

        for (let i = col * nombresPorColumna; i < (col + 1) * nombresPorColumna && i < listaAmigos.length; i++) {
            const li = document.createElement("li");
            li.textContent = listaAmigos[i];
            if (!listaDisponible.includes(listaAmigos[i])) {
                li.classList.add("tachado");
            }
            ul.appendChild(li);
        }
        listaAmigosContainer.appendChild(ul);
    }
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
        alert("Por favor, ingresa al menos un nombre antes de reiniciar.");
        document.getElementById("amigo").focus();
        return;
    }

    if (juegoEnCurso) {
        const confirmarReinicio = confirm("Juego en curso. ¿Estás seguro de que deseas reiniciar?");

        if (!confirmarReinicio) {
            return; // El usuario eligió no reiniciar
        }
    }

    listaAmigos = [];
    listaDisponible = [];
    juegoEnCurso = false; // Reiniciar la bandera
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}