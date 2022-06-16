const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const input = document.querySelector("input");
    const sendBtn = document.querySelector(".btn_send");
    const geoBtn = document.querySelector(".btn_geo");

    let socket = new WebSocket(wsUri);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение  с сервером установлено";
    }

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }
    // раздел обработки нажатия кнопки Send
    sendBtn.addEventListener("click", sendMessage);

    // раздел отсылки сообщения
    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        input.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved ? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }
    // раздел обработки нажатия кнопки Геолокация
    geoBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            writeToChat('Geolocation не поддерживается вашим браузером', false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });

    // Функция, выводящая текст об ошибке
    const error = () => {
        writeToChat('Невозможно получить ваше местоположение', false);
    }

    // Функция, срабатывающая при успешном получении геолокации
    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        writeToChat(`<a>https://www.openstreetmap.org/#map=18/${latitude}/${longitude}</a>`, false);
    }




}

document.addEventListener("DOMContentLoaded", pageLoaded);