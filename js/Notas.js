const btnAdicionarTarefa = document.querySelector(".btn-adicionar-tarefa");
const formAdicionarTarefa = document.querySelector(".adicionar-tarefa");
const inputAdicionarTarefa = document.querySelector(".adicionar-tarefa-input");
const btnSalvarTarefa = document.querySelector(".btn-salvar");
const ulListaDeTarefas = document.querySelector(".lista-de-tarefas");

const tarefas = [];

function criarTarefa (texto){
    ulListaDeTarefas.innerHTML += `
        <li class="tarefa tarefa-concluida">
            <div>
                <img src="/img/feito-icon.png" alt="ícone feito">
                <p>${texto}</p>
            </div>
            <button class="btn-editar-tarefa"><img src="/img/editar-icon.png" alt="editar"></button>
        </li>   
    `
}


//mostra e esconde o campo de adicionar nova tarefa
btnAdicionarTarefa.addEventListener("click",  () => {
    formAdicionarTarefa.classList.toggle('hidden');
})


btnSalvarTarefa.addEventListener("click", (evento) => {
    evento.preventDefault();

    const tarefa = {
        descricao: inputAdicionarTarefa.value
    }
    tarefas.push(tarefa);

    //guardar informações no navegador
                    //nome do item que ira guardar as info
                            //api que armezena como string
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    criarTarefa(tarefa.descricao);
})


