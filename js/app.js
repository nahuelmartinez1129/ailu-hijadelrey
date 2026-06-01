

/* =========================
   FECHA
========================= */

const fechaElemento =
document.getElementById("fecha-palabra");

const hoy = new Date();

fechaElemento.textContent =
hoy.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

/* =========================
   RENDERIZAR
========================= */

function renderizarPalabra(palabra){

    const versiculo =
    document.getElementById("versiculo-texto");

    const referencia =
    document.getElementById("versiculo-referencia");

    const reflexion =
    document.getElementById("reflexion-texto");

    versiculo.classList.remove("fade");
    referencia.classList.remove("fade");
    reflexion.classList.remove("fade");

    void versiculo.offsetWidth;

    versiculo.textContent =
    `"${palabra.versiculo}"`;

    referencia.textContent =
    palabra.referencia;

    reflexion.textContent =
    palabra.reflexion;

    versiculo.classList.add("fade");
    referencia.classList.add("fade");
    reflexion.classList.add("fade");
}

/* =========================
   PALABRA DEL DÍA
========================= */

function obtenerPalabraDelDia(){

    const hoy = new Date();

    const inicioAnio =
    new Date(hoy.getFullYear(), 0, 0);

    const diferencia =
    hoy - inicioAnio;

    const diaDelAnio =
    Math.floor(
        diferencia / 86400000
    );

    return palabras[
        diaDelAnio % palabras.length
    ];
}

/* =========================
   CARGA INICIAL
========================= */

renderizarPalabra(
    obtenerPalabraDelDia()
);

/* =========================
   OTRA PALABRA
========================= */

let ultimoIndice = -1;

document
.getElementById("nueva-palabra")
.addEventListener("click", ()=>{

    let nuevoIndice;

    do{

        nuevoIndice =
        Math.floor(
            Math.random() * palabras.length
        );

    }while(
        nuevoIndice === ultimoIndice
    );

    ultimoIndice = nuevoIndice;

    renderizarPalabra(
        palabras[nuevoIndice]
    );

});

const palabraCard =
document.querySelector(".palabra-card");

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            palabraCard.classList.add("show");

        }

    });

},{
    threshold:.3
});

observer.observe(palabraCard);

const botonHero =
document.getElementById("descubrir-palabra");

botonHero.addEventListener("click",(e)=>{

    e.preventDefault();

    const seccion =
    document.getElementById("palabra-hoy");

    seccion.scrollIntoView({

        behavior:"smooth"

    });

});

/* ====================
   ACORDEÓN CONTENIDO
==================== */

const categorias =
document.querySelectorAll(".categoria-btn");

categorias.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const contenido =
        btn.nextElementSibling;

        contenido.classList.toggle("active");

        const icono =
        btn.querySelector("span");

        if(
            contenido.classList.contains("active")
        ){

            icono.textContent = "−";

        }else{

            icono.textContent = "+";

        }

    });

});