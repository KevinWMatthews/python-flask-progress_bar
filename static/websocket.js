var websocket;
// This url can be used for testing. It echoes anything that you send to it.
// var websocketUrl = "ws://echo.websocket.org";
var websocketUrl = "ws://localhost:9000/echo";  // cd_websocket.c demands this url.

function init() {
    websocket = new WebSocket(websocketUrl);
    websocket.onopen = function(event) { onOpen(event) };
    websocket.onclose = function(event) { onClose(event) };
    websocket.onmessage = function(event) { onMessage(event) };
    websocket.onerror = function(event) { onError(event) };
}

function onOpen(event) {
    console.log("WebSocket opened.");
}

function onClose(event) {
    console.log("WebSocket closed.");
}

function onMessage(event) {
    progress = event.data;

    console.log("WebSocket received message: " + progress);
    if ($.isNumeric(progress) == false)
    {
        console.log("Received non-numeric data!");
        return;
    }
    if (progress < 0 || progress > 100)
    {
        console.log("Progress out of range!");
        return;
    }

    updateProgressBar(progress);
}

function onError(event) {
    console.log("WebSocket error: " + event.data);
}

function updateProgressBar(progress) {
    $('#progress_bar').css('width', progress + '%').attr('aria-valuenow', progress + '%');
}

window.addEventListener("load", init, false);
