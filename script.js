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
  }, 40);
}

//BTN MUSICA ANIMAÇÃO
const btnMusica = document.querySelector('.btn-musica-bola');

btnMusica.onclick = function () {
  if(btnMusica.classList[1] === "btn-musica-bola-animacao"){
    btnMusica.classList.remove('btn-musica-bola-animacao');
  }
  else
  {
    btnMusica.classList.add('btn-musica-bola-animacao');
  }
}

//---------------------------------------------------------------------------------

//Troca imagem fundo
const body = document.querySelector('body');
const btnFoco = document.querySelectorAll('.minutagem-secao')[0];
const btnCurto = document.querySelectorAll('.minutagem-secao')[1];
const btnLongo = document.querySelectorAll('.minutagem-secao')[2];
const imgAstronauta = document.querySelector('.apresentacao-img');
const titulo = document.querySelector('.apresentacao-texto');

btnFoco.addEventListener('click', () =>{
  AlterarConteudo('url("/img/fundo1.png")', 'img/astronauta1.png', 1)
});

btnCurto.addEventListener('click', () =>{
  AlterarConteudo('url("/img/fundo2.png")', 'img/astronauta2.png', 2)
});

btnLongo.addEventListener('click', () =>{
  AlterarConteudo('url("/img/fundo3.png")', 'img/astronauta3.png', 3)
});

function AlterarConteudo(url, img, posicao){
  body.style.backgroundImage = url;
  imgAstronauta.setAttribute('src', img);

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
      <h1 class="apresentacao-destaque">Faça uma pausa<br>entre as estrelas!</h1>`
      break;

  }

}