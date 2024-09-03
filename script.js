//ANIMAÇÃO LOGO
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector(".texto-header").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

//VARIAVEIS--------------------------------------------------------------------------------
//alterar conteudo
const body = document.querySelector('body');
const root = document.documentElement;
const imgAstronauta = document.querySelector('.apresentacao-img');
const titulo = document.querySelector('.apresentacao-texto');
const btnFoco = document.querySelectorAll('.minutagem-secao')[0];
const btnCurto = document.querySelectorAll('.minutagem-secao')[1];
const btnLongo = document.querySelectorAll('.minutagem-secao')[2];
const ListaBtn = document.querySelectorAll('.minutagem-secao');
const btnMusica = document.querySelector('.btn-musica-bola');
const btnMusicaFundo = document.querySelector('.btn-musica');
const musicaFocoInput = document.querySelector('.musica-input');
const musica = new Audio('/sounds/musica-foco.mp3');
musica.loop = true;
//temporizador
let tempoDecorridoSegundos = 1500;

//ALTERANDO CONTEUDO ----------------------------------------
//alterando img, texto e cores
btnFoco.addEventListener('click', () =>{
  //25min
  tempoDecorridoSegundos = 1500;
  AlterarConteudo('url("/img/fundo1.png")', 'img/astronauta1.png', 1, btnFoco)
});
btnCurto.addEventListener('click', () =>{
  //5min
  tempoDecorridoSegundos = 300;
  AlterarConteudo('url("/img/fundo2.png")', 'img/astronauta2.png', 2, btnCurto)
});
btnLongo.addEventListener('click', () =>{
  //15min
  tempoDecorridoSegundos = 900;
  AlterarConteudo('url("/img/fundo3.png")', 'img/astronauta3.png', 3, btnLongo)
});

//toca musica e animação do btn musica
btnMusica.onclick = function () {
  if(btnMusica.classList[1] === "btn-musica-bola-animacao"){
    btnMusica.classList.remove('btn-musica-bola-animacao');
    btnMusicaFundo.style.setProperty('background', 'rgba(255, 255, 255, 0.267)');
    musica.pause();
  }
  else
  {
    btnMusica.classList.add('btn-musica-bola-animacao');
    btnMusicaFundo.style.setProperty('background', 'var(--cor-destaque)');
    musica.play();
  }
}

//funções alterando conteudo
function AlterarConteudo(url, img, posicao, btn){
  //trocar o tempo
  MostrarTempo();

  //mudando imagens de fundo e do astronauta
  body.style.backgroundImage = url;
  imgAstronauta.setAttribute('src', img);
  //mudando titulo
  switch(posicao){
    case 1:
      titulo.innerHTML = 
      `<h1>Aperte os cintos,<br>É hora de lançar sua</h1>
      <h1 class="apresentacao-destaque">produtividade ao<br>infinito!</h1>`
      break;
    case 2:
      titulo.innerHTML =
      `<h1>Tempo para<BR>um pouso suave</h1>
      <h1 class="apresentacao-destaque">Faça uma pausa<BR>entre as estrelas!</h1>`
      break;
    case 3:
      titulo.innerHTML =
      `<H1>Hora de recarregar<br>os motores.</h1>
      <h1 class="apresentacao-destaque">Faça uma pausa<br>longa no cosmos!</h1>`
      break;
  }
  //mudando cor tema
  AlterarCorTema(posicao, btn);
}

function AlterarCorTema (posicao, btn){
  root.style.setProperty('--cor-destaque', `var(--cor-${posicao})`);
  root.style.setProperty('--fundo', `var(--fundo-${posicao})`);
  root.style.setProperty('--borda', `var(--borda-${posicao})`);

    //mudando btn de destaque
  ListaBtn.forEach(function(btn){
    btn.classList.remove('minutagem-destaque');
  });
  btn.classList.add('minutagem-destaque');
}

//TEMPORIZADOR---------------------------------------------------------

const btnComecar = document.querySelector('.btn-comecar');
const comecarOuPausarBtn = document.querySelector('.btn-comecar h2');
const iconBtn = document.querySelector('.btn-comecar img');
const tempoNaTela = document.querySelector('.minutagem-minutos');

const musicaStart = new Audio('/sounds/play.wav');
const musicaPause = new Audio('/sounds/pause.mp3');
const musicaConcluido = new Audio('/sounds/beep.mp3');

let intervaloId = null;

//diminui o número referente aos segundos
const contagemRegressiva = () => {
  //CONCLUIDO
  if(tempoDecorridoSegundos <= 0){
    musicaConcluido.play();
    Zerar();
    return
  }
  tempoDecorridoSegundos -= 1
  MostrarTempo();
}

btnComecar.addEventListener('click', IniciarEPausar);

//executa a diminuição do num a cada 1 segundo
function IniciarEPausar (){
  //se a contagem já começou
  if(intervaloId){
    //PAUSA a contagem
    musicaPause.play();
    Zerar()
    return
  }

  //INICIA a contagem
  musicaStart.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iconBtn.setAttribute('src', '/img/iconPausar.png')
  comecarOuPausarBtn.textContent = "Pausar";
}
//para de executar depois q chega a 0
function Zerar (){
  iconBtn.setAttribute('src', '/img/iconFoguete.png');
  comecarOuPausarBtn.textContent = "Começar";
  clearInterval(intervaloId);
  intervaloId = null;
}

function MostrarTempo (){
  //vezes 1 segundo em milissegundos
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  //formatação
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute : '2-digit', second : '2-digit'});
  tempoNaTela.innerHTML = `${tempoFormatado}`
}
//mostre sempre o tempo
MostrarTempo();