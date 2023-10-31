const duracionGiro = 500;
const elementos = document.querySelectorAll(".slot img");
const giroBoton = document.getElementById("spin-btn");
const resultados = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]
const wheel = document.querySelector('.wheel');
const startButton = document.querySelector('.button');


function obtenerAleatorios() {
    var numeroAleatorio = Math.floor(Math.random() * 10);
    var rutaImagen = `./tm-img/${numeroAleatorio}.png`;
    return rutaImagen;
}

function giro() {
    giroBoton.disabled = true;

    const valores = [obtenerAleatorios(), obtenerAleatorios(), obtenerAleatorios()];
    const comienzo = Date.now();

    function girarUnaVez(indice) {
        const ahora = Date.now();
        const tiempTrans = ahora - comienzo;
        if (tiempTrans < duracionGiro) {
            elementos[indice].src = obtenerAleatorios();
            requestAnimationFrame(() => girarUnaVez(indice));
        } else {
            elementos[indice].src = valores[indice];
            if (indice === 2) {
                setTimeout(function () {
                    ganaONo();
                    giroBoton.disabled = false;
                }, 100);
            }
        }
    }

    for (let i = 0; i < elementos.length; i++) {
        girarUnaVez(i);
    }
}

function ganaONo() {
    if (
        elementos[0].src === elementos[1].src &&
        elementos[1].src === elementos[2].src
    ) {
        alert("¡Has ganado! Los TRES(3) slots coinciden!");
    } else if (
        elementos[0].src === elementos[1].src ||
        elementos[1].src === elementos[2].src ||
        elementos[0].src === elementos[2].src
    ) {
        alert("¡Has ganado! Los DOS(2) slots coinciden!");
    }
}

//RULETA
let deg = 0.5;
function girarRuleta(){
    deg += -1000 - Math.random() * 1000;
    wheel.style.transition = 'transform 3s ease';
    wheel.style.transform = `rotate(${deg}deg)`;
    let pos = parseInt((-deg % 360) / (360 / 37));
    startButton.disabled = true;
    setTimeout(() => {
        if (
            pos === 0
        ) {
            alert("FELICIDADES! Sacaste el 0 Verde!")
        } else if (
            (pos % 2) === 1
        ) {            alert(`Sacaste el ${resultados[pos]} Rojo`)
        } else {
            alert(`Sacaste el ${resultados[pos]} Negro`)
        }
        startButton.disabled = false;
    }, 3000);
}

giroBoton.addEventListener("click", giro);
startButton.addEventListener("click", girarRuleta);
