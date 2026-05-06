function showYear(){
    const time = new Date();
    const year = time.getFullYear();
    let span = document.getElementById("year");
    if(span){
        span.textContent = year;
    }else{
        console.log("no existe");
    }
};
showYear()


// URL endpoint
const url_api = "https://rickandmortyapi.com/api/character";

/**
 * requestData
 * Send request to Endpoint
 * @param {string} url_api
 **/
async function requestData(url_api) {
    const response = await axios.get(url_api);
    let data = await response.data;
    getElementButton(document, 'set', data.info)
    renderHtml(data);
}

/**
 * loadMore
 * Call @Function getElementButton 
 */
function loadMore() {
    getElementButton(document, 'get')
}

/**
 * getElementButton
 * @param {object} elementButton
 * @param {object} button
 * @param {string} operation
 */
function getElementButton(elementButton, operation = 'get', info = null) {
    const button = elementButton.getElementById("loadMore");
    
    if(operation == 'get'){
        const next = button.getAttribute("data-next");
        if(next == "" || next == null){
            console.log("No hay url")
        } else {
            requestData(next);
        }
    } else {
        button.setAttribute("data-next", (info.next == null) ? '' : info.next)
        button.setAttribute("data-prev", (info.prev == null) ? '' : info.prev)
    }
}

/**
 * renderHtml
 * @param {object} element
 * @param {object} data
 */
function renderHtml(data){
    let element = document.getElementById("character");
    let resultCount = data.results.length;
    
    for (let index = 0; index < resultCount; index++) {
        let character = data.results[index];
        let status = (character.status == "Alive") ? "Alive" : "Dead"
        element.innerHTML += `<li id="${status}">
            <img src="${character.image}" alt="${character.name}">
            <div>
                <h2>${character.name}</h2>
                <p>status is ${character.status}</p>
                <span>gender is ${character.gender}</span>
            </div>
            
        </li>`;
    }
}

const response = requestData(url_api);