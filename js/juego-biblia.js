
const TOTAL_RONDA_BIBLIA = Math.min(10, frasesBiblia.length);

const fraseBiblia = document.getElementById("frase-biblia");
const resultadoBiblia = document.getElementById("resultado-biblia");
const siguienteBtnBiblia = document.getElementById("siguiente-btn-biblia");

const puntajeElementoBiblia = document.getElementById("puntaje-biblia");
const juegoCardBiblia = document.getElementById("juego-card-biblia");

const progresoBarraBiblia = document.getElementById("progreso-barra-biblia");
const progresoActualBiblia = document.getElementById("progreso-actual-biblia");
const progresoTotalBiblia = document.getElementById("progreso-total-biblia");

let indiceFrase = 0;
let puntajeBiblia = 0;
let rondaBiblia = [];
let frasesDisponibles = [];
let respondidaBiblia = false;

function iniciarRonda(){

    indiceFrase = 0;
    puntajeBiblia = 0;

    puntajeElementoBiblia.textContent = puntajeBiblia;

    if(
        frasesDisponibles.length <
        TOTAL_RONDA_BIBLIA
    ){

        frasesDisponibles =
        [...frasesBiblia]
        .sort(() => Math.random() - 0.5);
    }

    rondaBiblia =
    frasesDisponibles.splice(
        0,
        TOTAL_RONDA_BIBLIA
    );

    progresoTotalBiblia.textContent =
    TOTAL_RONDA_BIBLIA;

    siguienteBtnBiblia.innerHTML =
    '<i class="fa-solid fa-arrow-right"></i> Siguiente';

    document.getElementById("btn-si").style.display =
    "inline-flex";

    document.getElementById("btn-no").style.display =
    "inline-flex";

    document.getElementById("btn-si").disabled =
    false;

    document.getElementById("btn-no").disabled =
    false;

    cargarPregunta();
}
function cargarPregunta(){

    respondidaBiblia = false;

    const actual = rondaBiblia[indiceFrase];

    if(!actual) return;

    fraseBiblia.textContent = actual.frase;

    resultadoBiblia.innerHTML = "";

    siguienteBtnBiblia.style.display = "none";

    document.getElementById("btn-si").disabled = false;
    document.getElementById("btn-no").disabled = false;

    const porcentaje =
    ((indiceFrase + 1) / TOTAL_RONDA_BIBLIA) * 100;

    progresoBarraBiblia.style.width =
    `${porcentaje}%`;

    progresoActualBiblia.textContent =
    indiceFrase + 1;
}


function responder(usuario){

    if(respondidaBiblia) return;

    respondidaBiblia = true;

    const actual =
    rondaBiblia[indiceFrase];

    document.getElementById("btn-si").disabled = true;
    document.getElementById("btn-no").disabled = true;

    if(usuario === actual.respuesta){

        puntajeBiblia++;

        puntajeElementoBiblia.textContent =
        puntajeBiblia;

        resultadoBiblia.innerHTML = `
            <p>
                <i class="fa-solid fa-award"></i>
                ¡Correcto!
            </p>

            <p>
                <i class="fa-solid fa-book-bible"></i>
                ${actual.referencia}
            </p>
        `;

    }else{

        resultadoBiblia.innerHTML = `
            <p>
                <i class="fa-solid fa-circle-xmark"></i>
                Incorrecto
            </p>

            <p>
                <i class="fa-solid fa-book-bible"></i>
                ${actual.referencia}
            </p>
        `;
    }

    siguienteBtnBiblia.style.display = "block";
}

document
.getElementById("btn-si")
.addEventListener("click", () => {


responder(true);


});

document
.getElementById("btn-no")
.addEventListener("click", () => {


responder(false);


});

siguienteBtnBiblia.addEventListener("click", () => {


if(
    siguienteBtnBiblia.textContent.includes("Jugar otra ronda")
){

    iniciarRonda();
    return;
}

juegoCardBiblia.classList.add("slide-out");

setTimeout(() => {

    indiceFrase++;

    if(indiceFrase >= TOTAL_RONDA_BIBLIA){

        juegoCardBiblia.classList.remove("slide-out");
        juegoCardBiblia.classList.remove("slide-in");

        const porcentaje =
        Math.round(
            (puntajeBiblia / TOTAL_RONDA_BIBLIA) * 100
        );

        juegoCardBiblia.classList.remove("slide-out");

        document.getElementById("btn-si").style.display = "none";
        document.getElementById("btn-no").style.display = "none";

        puntajeBiblia = Math.min(puntajeBiblia, TOTAL_RONDA_BIBLIA);
        fraseBiblia.innerHTML =
        '<i class="fa-solid fa-trophy"></i> ¡Ronda completada!';

        let mensaje = "";

if(puntajeBiblia === TOTAL_RONDA_BIBLIA){

    mensaje =
    '<i class="fa-solid fa-trophy"></i> ¡Excelente!';

}else if(puntajeBiblia >= TOTAL_RONDA_BIBLIA * 0.7){

    mensaje =
    '<i class="fa-solid fa-star"></i> ¡Muy bien!';

}else if(puntajeBiblia >= TOTAL_RONDA_BIBLIA * 0.5){

    mensaje =
    '<i class="fa-solid fa-hands-praying"></i> Buen trabajo';

}else{

    mensaje =
    '<i class="fa-solid fa-book-bible"></i> Seguí aprendiendo';
}
        resultadoBiblia.innerHTML = `
            <h3>
                ${puntajeBiblia}/${TOTAL_RONDA_BIBLIA}
                correctas
            </h3>

            <br>

            <div class="progreso-container">

                <div
                    class="progreso-barra"
                    style="width:${porcentaje}%">
                </div>

            </div>

            <p>
                ${porcentaje}% de aciertos
            </p>

            <h4 class="mensaje-final">
                ${mensaje}
            </h4>
        `;

        siguienteBtnBiblia.innerHTML =
        '<i class="fa-solid fa-rotate-right"></i> Jugar otra ronda';

        siguienteBtnBiblia.style.display = "block";

    
        return;
    }

    cargarPregunta();

    juegoCardBiblia.classList.remove("slide-out");

    juegoCardBiblia.classList.add("slide-in");

    setTimeout(() => {

        juegoCardBiblia.classList.remove("slide-in");

    }, 400);

}, 400);


});

iniciarRonda();
