function addElement(tag, text, parent) {
    const newElement = document.createElement(tag);
    newElement.innerText = text;
    (parent || document.body).appendChild(newElement);
    return newElement;
}

function addList(items, parent) {
    const list = document.createElement("ul");
    items.forEach(item => {
        if (!item.hide) {
            const itemElement = addElement("li", item.name, list);
            if (item.code) {
                itemElement.classList.add("implemented");
                addElement("span", " ", itemElement);
                const codeLink = addElement("a", "code", itemElement);
                codeLink.href = item.code;
                codeLink.target = "_blank";
            }
            if (item.subitems) {
                addList(item.subitems, itemElement);
            }
        }
    });
    (parent || document.body).appendChild(list);
}

function displayFeatures(features) {
    addElement("h2", "Features");
    const list = document.createElement("ul");
    addList(features);
}

function displayCategories(title, categories){
    addElement("h2", title);
    categories.forEach(category => {
        if (!category.hide) {
            addElement("h3", category.name);
            addList(category.items);
        }
    });
}

function displayTechs(techs) {
    displayCategories("Technologies", techs);
}

function displayData(data) {
    displayFeatures(data.features);
    displayTechs(data.techs);
}

function start() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            displayData(req.response);
        }
    };
    req.responseType = 'json';
    req.open("GET", "data.json");
    req.send();
}