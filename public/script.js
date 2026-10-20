const API_URL = "http://localhost:3000";


async function buscarUsuarios() {
    const res = await fetch(`${API_URL}/usuarios`);
    const usuarios = await res.json();
    const lista = document.getElementById("get-usuarios");
    
    lista.innerHTML = "";

    if (usuarios.length === 0) {
        lista.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return;
    }

    usuarios.forEach(u => {
        lista.innerHTML += `
            <div>
                <h3>${u.nome}</h3>
                <p>Email: ${u.email}</p>
                <p>CPF: ${u.cpf}</p>
                
                <div>
                    <input type="text" id="putNome-${u.id}" value="${u.nome}" placeholder="Nome">
                    <input type="email" id="putEmail-${u.id}" value="${u.email}" placeholder="Email">
                    <input type="password" id="putSenha-${u.id}" value="${u.senha}" placeholder="Nova Senha">
                    <input type="text" id="putCpf-${u.id}" value="${u.cpf}" placeholder="CPF">
                    <button onclick="atualizarUsuario(${u.id})">Salvar Alterações</button>
                    <button onclick="deletarUsuario(${u.id})">Deletar</button>
                </div>
            </div>
        `;
    });
}

async function cadastrarUsuario() {
    const nome = document.getElementById("usuario-nome").value;
    const email = document.getElementById("usuario-email").value;
    const senha = document.getElementById("usuario-senha").value;
    const cpf = document.getElementById("usuario-cpf").value;

    if (!nome || !email || !senha || !cpf) return alert("Preencha todos os campos do usuário!");

    const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, cpf })
    });

    if (res.ok) {
        document.getElementById("usuario-nome").value = "";
        document.getElementById("usuario-email").value = "";
        document.getElementById("usuario-senha").value = "";
        document.getElementById("usuario-cpf").value = "";
        buscarUsuarios();
    }
}

async function atualizarUsuario(id) {
    const nome = document.getElementById(`putNome-${id}`).value;
    const email = document.getElementById(`putEmail-${id}`).value;
    const senha = document.getElementById(`putSenha-${id}`).value;
    const cpf = document.getElementById(`putCpf-${id}`).value;

    const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, cpf })
    });

    if (res.ok) buscarUsuarios();
}

async function deletarUsuario(id) {
    const res = await fetch(`${API_URL}/usuarios/${id}`, { method: "DELETE" });
    if (res.ok) buscarUsuarios();
}

async function buscarTarefas() {
    const res = await fetch(`${API_URL}/tarefas`);
    const tarefas = await res.json();
    const lista = document.getElementById("get-tarefas");
    
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(t => {
        lista.innerHTML += `
            <div>
                <p>Descrição: ${t.descrição}</p>
                <p>Prazo: ${t.prazo}</p>
                
                <div>
                    <input type="text" id="putDescricao-${t.id}" value="${t.descrição}" placeholder="Descrição">
                    <input type="text" id="putPrazo-${t.id}" value="${t.prazo}" placeholder="Prazo">
                    <button onclick="atualizarTarefa(${t.id})">Salvar Alterações</button>
                    <button onclick="deletarTarefa(${t.id})">Deletar</button>
                </div>
            </div>
        `;
    });
}

async function cadastrarTarefa() {
    const descrição = document.getElementById("tarefa-descricao").value;
    const prazo = document.getElementById("tarefa-prazo").value;

    if (!descrição || !prazo) return alert("Preencha todos os campos da tarefa!");

    const res = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descrição, prazo })
    });

    if (res.ok) {
        document.getElementById("tarefa-descricao").value = "";
        document.getElementById("tarefa-prazo").value = "";
        buscarTarefas();
    }
}

async function atualizarTarefa(id) {
    const descrição = document.getElementById(`putDescricao-${id}`).value;
    const prazo = document.getElementById(`putPrazo-${id}`).value;

    const res = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descrição, prazo })
    });

    if (res.ok) buscarTarefas();
}

async function deletarTarefa(id) {
    const res = await fetch(`${API_URL}/tarefas/${id}`, { method: "DELETE" });
    if (res.ok) buscarTarefas();
}


document.getElementById("btn-usuario").addEventListener("click", cadastrarUsuario);
document.getElementById("btn-tarefa").addEventListener("click", cadastrarTarefa);

buscarUsuarios();
buscarTarefas();