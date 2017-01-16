var websocket;
var websocketUrl = "ws://echo.websocket.org";

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
    console.log("WebSocket received message: " + event.data);
}

function onError(event) {
    console.log("WebSocket error: " + event.data);
}

window.addEventListener("load", init, false);
