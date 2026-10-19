async function getUsuarios() {
    const buscarUsuarios = await fetch("http://localhost:3000/usuarios")
    const usuario = buscarUsuarios.json();
    const lista = document.getElementById("usuario");

    lista.innerHTML = "";

    usuario.forEach(usuario => {
        lista.innerHTML += `

        `
    });

    
}