let listaAmigos = [];
let listaDisponible = []; // Lista temporal para los amigos restantes

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    // Validar que no esté vacío
    if (!nombre) {
        alert("Por favor, ingresa un nombre.");
        input.focus();  // Enfocar el cursor en el campo de texto
        return;
    }

    // Validar que no se repitan nombres
    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        input.focus();  // Enfocar el cursor en el campo de texto
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
            // Si el nombre ya ha sido sorteado, se aplica la clase "tachado"
            if (!listaDisponible.includes(listaAmigos[i])) {
                li.classList.add("tachado");
            }
            ul.appendChild(li);
        }
        listaAmigosContainer.appendChild(ul);
    }
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Por favor, ingresa al menos un nombre antes de sortear.");
        document.getElementById("amigo").focus();  // Enfocar el cursor en el campo de texto
        return;
    }

    if (listaDisponible.length === 0) {
        alert("Ya no quedan amigos para sortear.");
        document.getElementById("amigo").focus();  // Enfocar el cursor en el campo de texto
        return;
    }

    const elegido = listaDisponible[Math.floor(Math.random() * listaDisponible.length)];
    listaDisponible = listaDisponible.filter(nombre => nombre !== elegido);
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `El amigo secreto que te tocó es: <strong>${elegido}</strong>`;

    // Mostrar el nombre sorteado tachado
    mostrarAmigos();
}

function reiniciarLista() {
    if (listaAmigos.length === 0) {
        alert("Por favor, ingresa al menos un nombre antes de reiniciar.");
        document.getElementById("amigo").focus();  // Enfocar el cursor en el campo de texto
        return;
    }

    listaAmigos = [];
    listaDisponible = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}











