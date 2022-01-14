function handleBuildingChange() {
    var roomSelect = document.getElementById('rooms-select');
    var socketSelect = document.getElementById('sockets-select');

    var roomsContainer = document.getElementById('rooms-container');
    var socketsContainer = document.getElementById('sockets-container');
    var socketContainer = document.getElementById('socket-container');

    roomsContainer.style.display="none";
    socketsContainer.style.display="none";
    socketContainer.style.display="none";

    removeOptions(roomSelect);
    removeOptions(socketSelect);

    var socketContainer = document.getElementById("socket-container");
    socketContainer.innerHTML = '';

}

function handleRoomChange() {
    var socketSelect = document.getElementById('sockets-select');
    var socketsContainer = document.getElementById('sockets-container');
    var socketContainer = document.getElementById('socket-container');

    socketsContainer.style.display="none";
    socketContainer.style.display="none";

    removeOptions(socketSelect);

    var socketContainer = document.getElementById("socket-container");
    socketContainer.innerHTML = '';
}

function handleSocketChange() {
    var socketContainer = document.getElementById("socket-container");
    socketContainer.style.display="none";
    socketContainer.innerHTML = '';
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
    selectElement.remove(i);
    }
}



function getBuildings() {
    var buildingsSelect = document.getElementById('buildings-select');
    if(!buildingsSelect.options.length) {

        var req = new XMLHttpRequest();
        req.open('GET', '/database', true); 
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200){
                    var responseJsonArray = JSON.parse(req.responseText);
                    console.log(responseJsonArray)
                    for (var i = 0; i < responseJsonArray.length; i++) {
                        var select = document.getElementById("buildings-select");
                        var option = document.createElement("option");
                        option.text = responseJsonArray[i].budynek;
                        option.value = responseJsonArray[i].budynek;
                        select.add(option);
                    }
                    var buildingsContainer = document.getElementById('buildings-container');
                    buildingsContainer.style.display="block";
                }
                else
                console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);
    }
}



function getRooms() {
    var roomsSelect = document.getElementById('rooms-select');
    if(!roomsSelect.options.length) {
        var req = new XMLHttpRequest();
        var selectedBuilding = document.getElementById("buildings-select").value
        var urlString = '/database/building/' + selectedBuilding;
        req.open('GET', urlString, true); 
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200){
                    var responseJsonArray = JSON.parse(req.responseText);
                    console.log(responseJsonArray)
                    for (var i = 0; i < responseJsonArray.length; i++) {
                        var select = document.getElementById("rooms-select");
                        var option = document.createElement("option");
                        option.text = responseJsonArray[i].pokoj;
                        option.value = responseJsonArray[i].pokoj;
                        select.add(option);
                    }
                    var roomsContainer = document.getElementById('rooms-container');
                    roomsContainer.style.display="block";
                }
                else
                console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);
    }
}

function getSockets() {
    var socketsSelect = document.getElementById('sockets-select');
    if(!socketsSelect.options.length) {
        var req = new XMLHttpRequest();
        var selectedBuilding = document.getElementById("buildings-select").value
        var selectedRoom = document.getElementById("rooms-select").value

        var urlString = '/database/building/' + selectedBuilding + '/room/' + selectedRoom;
        req.open('GET', urlString, true); 
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200){
                    var responseJsonArray = JSON.parse(req.responseText);
                    console.log(responseJsonArray)
                    for (var i = 0; i < responseJsonArray.length; i++) {
                        var select = document.getElementById("sockets-select");
                        var option = document.createElement("option");
                        option.text = responseJsonArray[i].nr_gniazdka;
                        option.value = responseJsonArray[i].nr_gniazdka;
                        select.add(option);
                    }
                    var socketsContainer = document.getElementById('sockets-container');
                    socketsContainer.style.display="block";
                }
                else
                console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);
    }
}

function getSocketData() {
        var req = new XMLHttpRequest();
        var selectedBuilding = document.getElementById("buildings-select").value
        var selectedRoom = document.getElementById("rooms-select").value
        var selectedSocket = document.getElementById("sockets-select").value

        var urlString = '/database/building/' + selectedBuilding + '/room/' + selectedRoom + '/socketNumber/' + selectedSocket;
        req.open('GET', urlString, true); 
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200){
                    var responseJsonArray = JSON.parse(req.responseText);
                    var socketContainer = document.getElementById("socket-container");
                    var htmlTemplate = '' + 
                        '        <table>' + 
                        '          <tr>' + 
                        '            <th>Nr gniazdka</th>' + 
                        '            <th>Podłączono</th>' + 
                        '            <th>Patch Panel</th>' + 
                        '            <th>Nr Patch Panel</th>' + 
                        '            <th>Nr Switch</th>' + 
                        '            <th>Port Switch</th>' + 
                        '            <th>Adres ip</th>' + 
                        '          </tr>' + 
                        '          <tr>' + 
                        '            <td>'+ responseJsonArray[0].nr_gniazdka +'</td>' + 
                        '            <td>'+ responseJsonArray[0].typ +'</td>' + 
                        '            <td>'+ responseJsonArray[0].patch_panel +'</td>' + 
                        '            <td>'+ responseJsonArray[0].nr_patch_panel +'</td>' + 
                        '            <td>'+ responseJsonArray[0].nr_switch +'</td>' + 
                        '            <td>'+ responseJsonArray[0].port_na_switchu +'</td>' + 
                        '            <td>'+ responseJsonArray[0].adresip +'</td>' + 
                        '          </tr>' + 
                        '        </table>' + 
                        '';
                        socketContainer.innerHTML = htmlTemplate;
                        var socketContainer = document.getElementById('socket-container');
                        socketContainer.style.display="block";
                }
                else
                console.log("Błąd podczas ładowania strony\n");
            }
        };
        req.send(null);
    
}