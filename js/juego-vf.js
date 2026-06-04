
const TOTAL_RONDA = Math.min(10, preguntasVF.length);

const pregunta = document.getElementById("pregunta");
const resultado = document.getElementById("resultado");
const siguienteBtn = document.getElementById("siguiente-btn");

const puntajeElemento = document.getElementById("puntaje");
const juegoCard = document.getElementById("juego-card");

const progresoBarra = document.getElementById("progreso-barra");
const progresoActual = document.getElementById("progreso-actual");
const progresoTotal = document.getElementById("progreso-total");

let indicePregunta = 0;
let puntaje = 0;
let rondaActual = [];
let preguntasDisponibles = [];
let respondida = false;

function iniciarRonda(){

    indicePregunta = 0;
    puntaje = 0;

    puntajeElemento.textContent = puntaje;

    if(
        preguntasDisponibles.length <
        TOTAL_RONDA
    ){

        preguntasDisponibles =
        [...preguntasVF]
        .sort(() => Math.random() - 0.5);
    }

    rondaActual =
    preguntasDisponibles.splice(
        0,
        TOTAL_RONDA
    );

    progresoTotal.textContent =
    TOTAL_RONDA;

    siguienteBtn.innerHTML =
    '<i class="fa-solid fa-arrow-right"></i> Siguiente';

    document.getElementById("btn-verdadero").style.display =
    "inline-flex";

    document.getElementById("btn-falso").style.display =
    "inline-flex";

    document.getElementById("btn-verdadero").disabled =
    false;

    document.getElementById("btn-falso").disabled =
    false;

    cargarPregunta();
}
function cargarPregunta(){

    respondida = false;

    const actual = rondaActual[indicePregunta];

    if(!actual) return;

    pregunta.textContent = actual.pregunta;

    resultado.innerHTML = "";

    siguienteBtn.style.display = "none";

    document.getElementById("btn-verdadero").disabled = false;
    document.getElementById("btn-falso").disabled = false;

    const porcentaje =
    ((indicePregunta + 1) / TOTAL_RONDA) * 100;

    progresoBarra.style.width =
    `${porcentaje}%`;

    progresoActual.textContent =
    indicePregunta + 1;
}


function responder(usuario){

    if(respondida) return;

    respondida = true;

    const actual =
    rondaActual[indicePregunta];

    document.getElementById("btn-verdadero").disabled = true;
    document.getElementById("btn-falso").disabled = true;

    if(usuario === actual.respuesta){

        puntaje++;

        puntajeElemento.textContent =
        puntaje;

        resultado.innerHTML = `
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

        resultado.innerHTML = `
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

    siguienteBtn.style.display = "block";
}

document
.getElementById("btn-verdadero")
.addEventListener("click", () => {


responder(true);


});

document
.getElementById("btn-falso")
.addEventListener("click", () => {


responder(false);


});

siguienteBtn.addEventListener("click", () => {


if(
    siguienteBtn.textContent.includes("Jugar otra ronda")
){

    iniciarRonda();
    return;
}

juegoCard.classList.add("slide-out");

setTimeout(() => {

    indicePregunta++;

    if(indicePregunta >= TOTAL_RONDA){

        juegoCard.classList.remove("slide-out");
        juegoCard.classList.remove("slide-in");

        const porcentaje =
        Math.round(
            (puntaje / TOTAL_RONDA) * 100
        );

        juegoCard.classList.remove("slide-out");

        document.getElementById("btn-verdadero").style.display = "none";
        document.getElementById("btn-falso").style.display = "none";

        puntaje = Math.min(puntaje, TOTAL_RONDA);
        pregunta.innerHTML =
        '<i class="fa-solid fa-trophy"></i> ¡Ronda completada!';

        let mensaje = "";

if(puntaje === TOTAL_RONDA){

    mensaje =
    '<i class="fa-solid fa-trophy"></i> ¡Excelente!';

}else if(puntaje >= TOTAL_RONDA * 0.7){

    mensaje =
    '<i class="fa-solid fa-star"></i> ¡Muy bien!';

}else if(puntaje >= TOTAL_RONDA * 0.5){

    mensaje =
    '<i class="fa-solid fa-hands-praying"></i> Buen trabajo';

}else{

    mensaje =
    '<i class="fa-solid fa-book-bible"></i> Seguí aprendiendo';
}
        resultado.innerHTML = `
            <h3>
                ${puntaje}/${TOTAL_RONDA}
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

        siguienteBtn.innerHTML =
        '<i class="fa-solid fa-rotate-right"></i> Jugar otra ronda';

        siguienteBtn.style.display = "block";

    
        return;
    }

    cargarPregunta();

    juegoCard.classList.remove("slide-out");

    juegoCard.classList.add("slide-in");

    setTimeout(() => {

        juegoCard.classList.remove("slide-in");

    }, 400);

}, 400);


});

iniciarRonda();
