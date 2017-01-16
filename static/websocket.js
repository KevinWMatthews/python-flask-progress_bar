var websocket1;
var websocket2;
// This url can be used for testing. It echoes anything that you send to it.
// var websocketUrl = "ws://echo.websocket.org";
var websocketUrl1 = "ws://localhost:9000/progress_bar_1";  // cd_websocket.c demands this url.
var websocketUrl2 = "ws://localhost:9000/progress_bar_2";  // cd_websocket.c demands this url.

function init() {
    openWebsocket(websocket1, websocketUrl1);
    openWebsocket(websocket2, websocketUrl2);
}

function openWebsocket(websocket, url) {
    websocket = new WebSocket(url);
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
    message = event.data;

    console.log("WebSocket received message: " + message);
    try {
        obj = JSON.parse(message);
    }
    catch(error) {
        console.log("Error parsing JSON: " + error);
        return;
    }
    console.log("id: " + obj.id + ", progress: " + obj.progress);

    var progress = obj.progress;
    var id = obj.id;

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

    updateProgressBar(id, progress);
}

function onError(event) {
    console.log("WebSocket error: " + event.data);
}

function updateProgressBar(id, progress) {
    $('#' + id).css('width', progress + '%').attr('aria-valuenow', progress + '%');
}

window.addEventListener("load", init, false);
