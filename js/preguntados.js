let preguntasActualesPreguntados = [];
let indicePreguntaPreguntados = 0;
let puntajePreguntados = 0;
let respondidaPreguntados = false;

const preguntaElementoPreguntados =
document.getElementById("pregunta-preguntados");

const opcionesElementoPreguntados =
document.getElementById("opciones-preguntados");

const resultadoElementoPreguntados =
document.getElementById("resultado-preguntados");

const puntajeElementoPreguntados =
document.getElementById("puntaje-preguntados");

const progresoBarraPreguntados =
document.getElementById("progreso-preguntados");

const preguntaActualPreguntados =
document.getElementById("pregunta-actual");

const preguntaTotalPreguntados =
document.getElementById("pregunta-total");

const siguienteBtnPreguntados =
document.getElementById("siguiente-preguntados");

const btnAntiguoPreguntados =
document.getElementById("btn-antiguo");

const categoriasPreguntados =
document.querySelector(".categorias-grid");

const juegoPreguntados =
document.getElementById("juego-preguntados");

const volverPreguntados =
document.getElementById("volver-categorias");

btnAntiguoPreguntados.addEventListener("click",()=>{

    btnAntiguoPreguntados.classList.add(
        "activa"
    );

    setTimeout(()=>{

        categoriasPreguntados.style.display =
        "none";

        juegoPreguntados.classList.remove(
        "oculto"
        );

        iniciarJuegoPreguntados(
            antiguoTestamentoNivel1
        );

    },300);

});

volverPreguntados.addEventListener("click",()=>{

    categoriasPreguntados.style.display =
    "grid";

    juegoPreguntados.classList.add(
    "oculto"

    );

     btnAntiguoPreguntados.classList.remove(
    "activa"
    );

});


function iniciarJuegoPreguntados(preguntas){

    preguntasActualesPreguntados =
    [...preguntas]
    .sort(() => Math.random() - 0.5);

    indicePreguntaPreguntados = 0;

    puntajePreguntados = 0;

    puntajeElementoPreguntados.textContent =
    puntajePreguntados;

    preguntaTotalPreguntados.textContent =
    preguntasActualesPreguntados.length;

    cargarPreguntaPreguntados();

}


function cargarPreguntaPreguntados(){

    respondidaPreguntados = false;

    const actual =
    preguntasActualesPreguntados[
    indicePreguntaPreguntados
    ];

    if(!actual) return;

    preguntaElementoPreguntados.textContent =
    actual.pregunta;

    preguntaActualPreguntados.textContent =
    indicePreguntaPreguntados + 1;

    resultadoElementoPreguntados.innerHTML =
    "";

    siguienteBtnPreguntados.style.display =
    "none";

    opcionesElementoPreguntados.innerHTML =
    "";

    const porcentaje =
    (
    (indicePreguntaPreguntados + 1)
    /
    preguntasActualesPreguntados.length
    )
    * 100;

    progresoBarraPreguntados.style.width =
    `${porcentaje}%`;

    actual.opciones.forEach(
    (opcion,index)=>{

        const boton =
        document.createElement("button");

        boton.textContent =
        opcion;

        boton.addEventListener(
        "click",
        ()=> responderPreguntados(index)
        );

        opcionesElementoPreguntados
        .appendChild(boton);

    });

}


function responderPreguntados(
indiceElegido
){

    if(respondidaPreguntados) return;

    respondidaPreguntados = true;

    const actual =
    preguntasActualesPreguntados[
    indicePreguntaPreguntados
    ];

    const botones =
    opcionesElementoPreguntados
    .querySelectorAll("button");

    botones.forEach(
    (boton,index)=>{

        boton.disabled = true;

        if(index === actual.correcta){

            boton.classList.add(
            "correcta"
            );

        }

        if(
            index === indiceElegido &&
            index !== actual.correcta
        ){

            boton.classList.add(
            "incorrecta"
            );

        }

    });

    if(
        indiceElegido ===
        actual.correcta
    ){

        puntajePreguntados++;

        puntajeElementoPreguntados.textContent =
        puntajePreguntados;

        resultadoElementoPreguntados.innerHTML =
            `
            <p class="correcto-animacion">
                <i class="fa-solid fa-circle-check"></i>
                ¡Correcto!
            </p>

            <p>
                <i class="fa-solid fa-book-bible"></i>
                ${actual.referencia}
            </p>
            `;

    }else{

   juegoPreguntados.classList.add(
"shake-card"
);

setTimeout(()=>{

    juegoPreguntados.classList.remove(
    "shake-card"
    );

},400);

       resultadoElementoPreguntados.innerHTML =
            `
            <p class="incorrecto-animacion">
                <i class="fa-solid fa-circle-xmark"></i>
                Incorrecto
            </p>

            <p>
                <i class="fa-solid fa-book-bible"></i>
                ${actual.referencia}
            </p>
            `;
    }

    siguienteBtnPreguntados.style.display =
    "block";

}


siguienteBtnPreguntados.addEventListener(
"click",
()=>{

    indicePreguntaPreguntados++;

    if(
        indicePreguntaPreguntados >=
        preguntasActualesPreguntados.length
    ){

        finalizarJuegoPreguntados();

        return;
    }

    cargarPreguntaPreguntados();

});


function finalizarJuegoPreguntados(){

    preguntaElementoPreguntados.innerHTML =
    `
    <i class="fa-solid fa-trophy"></i>
    ¡Nivel completado!
    `;

    opcionesElementoPreguntados.innerHTML =
    "";

    const porcentaje =
    Math.round(
    (
    puntajePreguntados /
    preguntasActualesPreguntados.length
    )
    * 100
    );

    let mensaje = "";

    if(
puntajePreguntados ===
preguntasActualesPreguntados.length
){

    mensaje =
    '<i class="fa-solid fa-trophy"></i> ¡Perfecto!';

}else if(
puntajePreguntados >=
preguntasActualesPreguntados.length * 0.7
){

    mensaje =
    '<i class="fa-solid fa-star"></i> ¡Muy bien!';

}else if(
puntajePreguntados >=
preguntasActualesPreguntados.length * 0.5
){

    mensaje =
    '<i class="fa-solid fa-hands-praying"></i> Buen trabajo';

}else{

    mensaje =
    '<i class="fa-solid fa-book-bible"></i> Seguí aprendiendo';

}
    resultadoElementoPreguntados.innerHTML =
`
<h3>
${puntajePreguntados}/${preguntasActualesPreguntados.length}
correctas
</h3>

<p>
${porcentaje}% de aciertos
</p>

<h4 class="mensaje-final">
${mensaje}
</h4>

<p>
🔓 Próximamente:
Antiguo Testamento Nivel 2
</p>
`;

}