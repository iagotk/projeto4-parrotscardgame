/* VARIAVEIS GLOBAIS */

let quantidadecartas = 0;
let par = 0;
let div = [];
let cartas = [];
let carta1;
let carta2;
let cartaclicada;
let verificarCarta;
let pararcartas;
let partidas = 0;
let certo = 0;
let novapartida = "";
let contartempo = 0;
let contagem = 0;
let tempofinal = 0;
let jogosvencidos = 0;
let img = ["demon", "cyclops", "dragon", "beholder", "ferumbras", "giant-spider", "orc-berserker"];

/* loop de quantas cartas quer jogar */
while (quantidadecartas < 4 || quantidadecartas > 14 || par !== 0) {
  quantidadecartas = prompt("Com quantas cartas você quer jogar?\nSelecione numeros pares entre 4 e 14!");
  quantidadecartas = parseInt(quantidadecartas); /* converte em uma string e retorna numero inteiro ou Not A Number*/
  par = quantidadecartas % 2;
}

/* imagem nas cartas */
for (let i = 0; i < quantidadecartas / 2; i++) {
  cartas.push(img[i]);
  cartas.push(img[i]);
}
function comparador() {
return Math.random() - 0.3; /* Math.random retorna o elemento aleatoriamente*/
}
cartas.sort(comparador); /* .sort pra ordenar os elementos da propria array e retornar eles, nao necessariamente na msm ordem */

/* div imagens */
for (i = 0; i < quantidadecartas; i++) {
  div[i] = `<div class="unidade" data-cartabla = "${cartas[i]}" data-identifier="card">
                <div class="frente face virar">
                  <img src="img/${cartas[i]}.gif" data-identifier="front-face">
             </div>
            <div class="verso face" data-identifier="back-face">
                <img src="img/fronttibia.png">
            </div></div>`;
  addcartas = document.querySelector(".cartas");
  addcartas.innerHTML += div[i];
}
 /*virar carta clicando*/
let todasascartas = document.querySelectorAll(".unidade");
function virarCarta() {
  console.log(partidas);
  if (pararcartas) {
    return false;
  }
  this.classList.add("virar"); /* o this aqui é pra se referir ao objeto atual */
  if (!carta1) {
    carta1 = this;
    carta1.classList.add("virar");
    return false;
  }
  carta2 = this;
  compararcartas();
}

todasascartas.forEach((carta) => carta.addEventListener("click", virarCarta));
/*for.Each é usado pra percorrer arrays de um jeito diferente, passando uma funçao de callback pra cada elemento da array. ]
Ex.: valor atual (obrigatorio) - valor do elemento atual da array*/
/* registra uma espera de um evento */
function compararcartas() {
  verificarCarta = carta1.dataset.cartabla === carta2.dataset.cartabla;
  if (verificarCarta == false) {
    cartasDiferentes();
  } else {
    carta1.removeEventListener("click", virarCarta); /* o remove EventListener é pra indicar onde o EventListener vai parar segundo a condiçao */
    carta2.removeEventListener("click", virarCarta);
    limparVariaveis();
    certo += 1;
  }
  finalizarpartida();
  jogosvencidos += 1;
}

function cartasDiferentes() {
  pararcartas = true;
  setTimeout(() => { /* função q é executada APENAS 1x e serve para executar algo qd atingir o seu tempo */
    carta1.classList.remove("virar");
    carta2.classList.remove("virar");
    pararcartas = false;
    limparVariaveis();}, 500);
}

function limparVariaveis() {
  carta1 = null;
  carta2 = null;
}

function finalizarpartida() {
  setTimeout(() => {
    if (certo == parseInt(quantidadecartas) / 2) {
      tempofinal = contartempo.innerHTML;
      alert(
        "Você ganhou em " +
          jogosvencidos +
          " jogadas e em " +
          contagem +
          " segundos!"
      );
      começarnovapartida();
    }
  }, 1000);
}

/* funcao pra jogar novamente */
function começarnovapartida() {
  setTimeout(() => {
    novapartida = prompt("E ai noobzinho, vamos tentar mais uma vez? \n (sim/não)");
    escolha();
  }, 1000);
}

function escolha() {
  if (novapartida === "sim") {
    window.location.reload();
  } else {
    alert("Assim você nunca será digno de pisar nas terras tibianas!");
  }
}

/* temporizador */
function marcadortempo() {
  if (novapartida == "não") {
    contagem = contagem;
    contartempo.innerHTML = contagem + "s";
    return false;
  }
  contartempo = document.querySelector("time");
  contagem = contagem + 1;
  contartempo.innerHTML = contagem + "s";
}

setInterval(marcadortempo, 1000);

