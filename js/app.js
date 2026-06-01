const palabras = [

{
    versiculo: "No temas porque yo estoy contigo.",
    referencia: "Isaías 41:10",
    reflexion:
    "A veces el miedo aparece cuando no sabemos qué va a pasar mañana. Dios no promete una vida sin dificultades, pero sí promete caminar con nosotros en cada paso."
},

{
    versiculo: "Todo lo puedo en Cristo que me fortalece.",
    referencia: "Filipenses 4:13",
    reflexion:
    "Cuando sentís que no podés más, recordá que tu fuerza no depende solamente de vos. Dios puede sostenerte incluso en los momentos más difíciles."
},

{
    versiculo: "El Señor es mi pastor, nada me faltará.",
    referencia: "Salmos 23:1",
    reflexion:
    "Dios conoce cada necesidad de tu vida. Aunque hoy no veas la respuesta, podés confiar en que Él sigue cuidando de vos."
},

{
    versiculo: "Porque yo sé los planes que tengo para ustedes.",
    referencia: "Jeremías 29:11",
    reflexion:
    "Puede que no entiendas todo lo que está pasando, pero Dios sigue escribiendo tu historia con propósito y amor."
},

{
    versiculo: "La paz les dejo, mi paz les doy.",
    referencia: "Juan 14:27",
    reflexion:
    "La paz que Dios ofrece no depende de las circunstancias. Incluso en medio del caos, Él puede traer descanso a tu corazón."
}

];

function mostrarPalabra() {

    const palabra =
    palabras[Math.floor(Math.random() * palabras.length)];

    document.getElementById("versiculo-texto").textContent =
    `"${palabra.versiculo}"`;

    document.getElementById("versiculo-referencia").textContent =
    palabra.referencia;

    document.getElementById("reflexion-texto").textContent =
    palabra.reflexion;
}

mostrarPalabra();

document
.getElementById("nueva-palabra")
.addEventListener("click", mostrarPalabra);