let tarefas = []; // Array global para armazenar as tarefas

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa");
    let tarefa = inputTarefa.value.trim();
    const mensagem = document.getElementById("mensagem");

    if (tarefa === "") {
        mensagem.textContent = "Digite uma tarefa para adicioná-la à sua lista!";
        mensagem.style.color = "red";
        return;
    }

    // Verifica se a tarefa já existe na lista para evitar duplicações
    if (tarefas.includes(tarefa)) {
        mensagem.textContent = "Essa tarefa já está na sua lista!";
        mensagem.style.color = "orange";
        return;
    }

    // Adiciona a tarefa ao array e atualiza a lista
    tarefas.push(tarefa);
    mensagem.textContent = "Tarefa adicionada com sucesso!";
    mensagem.style.color = "green";

    realizarTarefas(); // Atualiza a lista exibida

    // Limpa o input do usuário
    inputTarefa.value = "";

    // Atualiza a visibilidade do botão "Limpar Tudo"
    atualizarVisibilidadeBotaoLimpar();
}

function realizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas");
    
    // Limpa a lista antes de adicionar novos itens para evitar duplicações
    listaTarefas.innerHTML = "";

    // Adiciona cada tarefa como um novo item na lista
    for (let i = 0; i < tarefas.length; i++) {
        let novaTarefa = document.createElement("li");
        novaTarefa.textContent = tarefas[i];
        // Botão para remover o item na lista de tarefa    
        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => {
            removerTarefa(i)
        }
        // Botão para editar a tarefa
        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => {
            editarTarefa(i)
        }
        // Aqui chama as funções dos botões
        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        listaTarefas.appendChild(novaTarefa);
    }
}
// Remover uma tarefa na lista
function removerTarefa(i){
    tarefas.splice(i, 1);
    realizarTarefas();
    
    // Atualiza a visibilidade do botão "Limpar Tudo"
    atualizarVisibilidadeBotaoLimpar();
}
// Para editar tarefa e não duplicar a tarefa
function editarTarefa(i){
    let tarefaEditada = prompt("Edite a tarefa:");
    if (tarefaEditada.trim() !== "") {

        if (tarefas.includes(tarefaEditada)) {
            alert("Essa tarefa já está na lista!");
            return;
        }
        tarefas[i] = tarefaEditada;
        realizarTarefas();
    }
}
// Apaga todas as tarefas da lista
function limparLista() {
    tarefas.length = 0;
    realizarTarefas();

    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = "Lista de tarefa limpa com sucesso!";
    mensagem.style.color = "blue";

    // Atualiza a visibilidade do botão "Limpar Tudo"
    atualizarVisibilidadeBotaoLimpar();
}

// Função para atualizar a visibilidade do botão "Limpar Tudo"
function atualizarVisibilidadeBotaoLimpar() {
    const botaoLimpar = document.querySelector('.botao_lista');
    if (tarefas.length === 0) {
        botaoLimpar.style.display = "none"; // Esconde o botão
    } else {
        botaoLimpar.style.display = "inline-block"; // Exibe o botão
    }
}

// Esconde o botão "Limpar Tudo" inicialmente
atualizarVisibilidadeBotaoLimpar();