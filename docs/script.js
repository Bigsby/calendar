
function displayData(data) {
    const newSpan = document.createElement("span");
    newSpan.innerText = data.techs.backend.length;
    document.body.appendChild(newSpan);        
}

function start() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            displayData(req.response);
        }
    };
    req.responseType = 'json';
    req.open("GET", "data.json");
    req.send();
}