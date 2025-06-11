//PROBANDO CHATBOT

function toggleChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
  chatBox.style.flexDirection = "column";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addMessage("user", msg);
  input.value = "";

  setTimeout(() => {
    generateBotResponse(msg);
  }, 600);
}

function addMessage(type, text) {
  const msgEl = document.createElement("div");
  msgEl.className = type + "-msg";
  msgEl.textContent = text;
  document.getElementById("chatBody").appendChild(msgEl);
  document.getElementById("chatBody").scrollTop = document.getElementById("chatBody").scrollHeight;
}

function generateBotResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  let response = "";

  if (msg.includes("hola") || msg.includes("buenas")) {
    response = "¡Hola! ¿En qué puedo ayudarte hoy?";
  }
  if (msg.includes("productos")) {
    response = "Tenemos refrescos como RedSpark, BlueFizz y Limón Soul 🍋.";
  }
  if (msg.includes("contacto") || msg.includes("hablar")) {
    response = "Puedes contactarnos al correo: contacto@sodalimon.com 📧";
  }
  if (msg.includes("trabajo") || msg.includes("empleo")) {
    response = "Visita la sección 'Trabaja con nosotros' para ver oportunidades laborales.";
  }
  if (msg.includes("entrega") || msg.includes("delivery")) {
    response = "Sí, realizamos entregas a domicilio 🚚.";
  }
  if (msg.includes("horario")) {
    response = "Atendemos de lunes a sábado de 9:00 a.m. a 7:00 p.m. ⏰";
  }
  if (msg.includes("azucar") || msg.includes("sin azúcar")) {
    response = "Sí, tenemos bebidas sin azúcar 💚.";
  }
  if (msg.includes("pedido")) {
    response = "Puedes hacer tu pedido por WhatsApp, redes o nuestra web.";
  }
  if (msg.includes("ubicacion") || msg.includes("dónde están") || msg.includes("dirección")) {
    response = "Estamos en Ica, Perú 🇵🇪 y realizamos entregas a todo el país.";
  }
   if (msg.includes("Agua Vip")) {
    response = "Buena opcion una bebida para mantenerte 100% hidratado despues de esta terrible calor en Ica. 🥵"; 
  }

  if (!response) {
    response = "Lo siento, aún estoy aprendiendo. ¿Podrías intentar con otra pregunta?";
  }

  addMessage("bot", response);
}

function handleKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
