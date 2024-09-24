const btnAdicionarTarefa = document.querySelector(".btn-adicionar-tarefa");
const formAdicionarTarefa = document.querySelector(".adicionar-tarefa");
const inputAdicionarTarefa = document.querySelector(".adicionar-tarefa-input");
const btnSalvarTarefa = document.querySelector(".btn-salvar");
const ulListaDeTarefas = document.querySelector(".lista-de-tarefas");
const btnCancelarDigitacaoTarefa = document.querySelector(".btn-cancelar");
const nomeDaTarefaEmAndamento = document.querySelector(".tarefas-cabecalho2");

const btnLimparConcluidas = document.querySelector(".limpar-concluidas")
const btnLimparTodas = document.querySelector(".limpar-todas");

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

//recebe as info do navegador, se não tiver informações armazenadas
//cria um array vazio
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []


function atualizarTarefasLocalStorage (){
     //guardar informações no navegador
                    //nome do item que ira guardar as info
                            //api que armezena como string
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarTarefa (tarefa){
    //criando elementos
    const tarefaLi = document.createElement("li");
    tarefaLi.classList.add("tarefa");

    const tarefaDiv = document.createElement("div");

    const tarefaImg = document.createElement("img");
    tarefaImg.src = "/img/feito-icon.png";
    tarefaImg.alt = "ícone feito";

    const tarefaTexto = document.createElement("p");
    tarefaTexto.innerText = tarefa.descricao;

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-editar-tarefa");

    const imgBtnEditar = document.createElement("img");
    imgBtnEditar.src = "/img/editar-icon.png";
    imgBtnEditar.alt = "editar";

    //adicionando no html
    tarefaLi.appendChild(tarefaDiv);
    tarefaDiv.appendChild(tarefaImg);
    tarefaDiv.appendChild(tarefaTexto);
    tarefaLi.appendChild(btnEditar);
    btnEditar.appendChild(imgBtnEditar);
    ulListaDeTarefas.appendChild(tarefaLi)

    //funcoes-------------------------------------------
    //btn editar
    btnEditar.onclick = () => {
        //atualiza o html
        let tarefaDigitada = false;

        while(tarefaDigitada === false){
            let novaTarefaTexto = prompt("Digite o novo nome da tarefa :")

            if(novaTarefaTexto === ""){
                alert("Campo em branco. Por favor, digite uma tarefa válida!");
            }else{
                tarefaDigitada = true;

                tarefaTexto.innerText = novaTarefaTexto;

                //atualiza o local storage
                tarefa.descricao = novaTarefaTexto;
                atualizarTarefasLocalStorage();
            }
        }
    }

    if(tarefa.completa){
        tarefaLi.classList.add("tarefa-concluida");
        tarefaLi.title = "Tarefa concluída!";
        btnEditar.classList.add("btn-editar-desativado")
    }
    else{
            //quando clicar no li da tarefa
        tarefaLi.onclick = () => {
            //remove a classe selecionada de todas as tarefas
            const listaTarefasSelecionadas = document.querySelectorAll(".tarefa-ativa");
            listaTarefasSelecionadas.forEach(selecionada => {
                selecionada.classList.remove("tarefa-ativa")
            })
    
            //se acontecer um click numa tarefa ja selecionanda 
            //retira a selecao
            if(tarefaSelecionada === tarefa){
                nomeDaTarefaEmAndamento.textContent = "";
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                //para de executar o codigo
                return
            }
    
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = tarefaLi;
            nomeDaTarefaEmAndamento.textContent = tarefa.descricao;
            tarefaLi.classList.toggle('tarefa-ativa');
        }
    }



}

//mostra e esconde o campo de adicionar nova tarefa
btnAdicionarTarefa.addEventListener("click",  () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

inputAdicionarTarefa.addEventListener("keydown", (evento) => {
    if(evento.key === "Enter"){
        salvarTarefa();
    }
})

function salvarTarefa () {
    const tarefa = {
        descricao: inputAdicionarTarefa.value
    }
    tarefas.push(tarefa);

   
    atualizarTarefasLocalStorage();

    criarTarefa(tarefa)

    inputAdicionarTarefa.value= ''
    formAdicionarTarefa.classList.add("hidden")
}

btnSalvarTarefa.addEventListener("click", (evento) => {
    evento.preventDefault();
    salvarTarefa();
})

//pega as tarefas já armazenadas no localStorage e printa
tarefas.forEach(tarefa => {
    criarTarefa(tarefa)
})

//cancelar digitacao da tarefa
btnCancelarDigitacaoTarefa.onclick = () => {
    inputAdicionarTarefa.value= ''
    formAdicionarTarefa.classList.add("hidden")
}


//EVENTO CUSTOMIZADO - TAREFA FINALIZADA---------------------

document.addEventListener("FocoFinalizado", () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove("tarefa-ativa");
        liTarefaSelecionada.classList.add("tarefa-concluida");
        liTarefaSelecionada.title = "Tarefa concluída!";
        liTarefaSelecionada.querySelector("button").classList.add("btn-editar-desativado")

        tarefaSelecionada.completa = true;
        atualizarTarefasLocalStorage();
    }
})


//HOVER OPCOES DE LIMPAR TAREFAS-------------------------------
const info = document.querySelector(".icon-info");
const ulLimparTarefas = document.querySelector(".info-opcoes");

info.addEventListener("mouseenter", () => {
    ulLimparTarefas.classList.remove("hidden");
})

ulLimparTarefas.addEventListener("mouseleave", () => {
    ulLimparTarefas.classList.add("hidden")
})


//LIMPAR TAREFAS-----------------------------------------------

const limparTarefas = (somenteCompletas) => {
    const classe = somenteCompletas ? 
                   ".tarefa-concluida" 
                   : ".tarefa"
    //remove do html
    document.querySelectorAll(classe).forEach(elemento => {
        elemento.remove();
    })

    //filtra tarefas e armazena no array
    tarefas = somenteCompletas ?  
              tarefas.filter(tarefa => !tarefa.completa) 
              : tarefas = [];

    atualizarTarefasLocalStorage();
}

btnLimparConcluidas.onclick = () => limparTarefas(true);
btnLimparTodas.onclick = () => limparTarefas(false);
