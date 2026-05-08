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
let isLoading = false;
let number_page = 1;

async function requestData(url_api) {
    if (isLoading) return;

    isLoading = await true;

    if(memory_preview[url_api]){
        renderHtml(memory_preview[url_api]);
        getElementButton(document, 'set', memory_preview[url_api].info);
        getElementButton2(document, 'set', memory_preview[url_api].info);
        isLoading = false;
        return;
    }

    try {
        const response = await axios.get(url_api);
        let data = await response.data;

        getElementButton(document, 'set', data.info);
        getElementButton2(document, 'set', data.info);

        renderHtml(data);
    } catch (error) {
        number_page -= 1
        console.error("Error en la petición:", error);
    } finally {
        setTimeout(()=> {
            isLoading = false;
        }, 500)
    }
}

/**
 * loadMore
 * Call @Function getElementButton 
 */


function loadMore() {
    if (!isLoading) {
        getElementButton(document, 'get');
        const block = document.getElementById("block");
        block.classList.toggle("show");
        setTimeout(()=> {
            block.classList.remove("show")
        }, 500)
    }
}


function loadPreview() {
    getElementButton2(document, 'get');
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
            console.log("No hay siguiente");
        } else {
            requestData(next);
            number_page += 1;
        }

    } else {
        button.setAttribute("data-next", info.next ? info.next : '');
    }
}

function getElementButton2(elementButton, operation = 'get', info = null) {
    const button = elementButton.getElementById("loadPreview");
    
    if(operation == 'get'){
        const prev = button.getAttribute("data-prev");

        if(prev == "" || prev == null){
            console.log("No hay anterior");
        } else {
            requestData(prev);
            number_page -= 1;
        }

    } else {
        button.setAttribute("data-prev", info.prev ? info.prev : '');
    }
}

/**
 * renderHtml
 * @param {object} element
 * @param {object} data
 */

let memory_preview = {};


function renderHtml(data){
    let element = document.getElementById("character");
    let page =  document.getElementById("page");
    let resultCount = data.results.length; 
    // let info = data.info.length;

    html = "";

    for (let index = 0; index < resultCount; index++) {
        let character = data.results[index];
        let status = (character.status == "Alive") ? "Alive" : "Dead";

        html += `<li id="${status}" class="${character.gender.toLowerCase()}">
            <img src="${character.image}" alt="${character.name}">
            <div>
                <h3>${character.name}</h3>
                <p>status is ${character.status}</p>
                <span>gender is ${character.gender}</span>
            </div>
        </li>`;
    }

    element.innerHTML = html

    page.innerHTML = `<p class="retro-page">current page  [${number_page}] . . . . . [42] total</p>
` 

    // for (i = 0; i < info; i++) {
    //     let containerinfo = data.info[i];
    //     let page = containerinfo.pages;
    //     let total = containerinfo.pages.length;
    // }
}


requestData(url_api);

function Male() {
    male = document.querySelectorAll(".male")
    femaleP = document.querySelectorAll(".female")
    unknownO = document.querySelectorAll(".unknown")
 
    male.forEach(el => el.style.display = "block");
    femaleP.forEach(el => el.style.display = "none");
    unknownO.forEach(el => el.style.display = "none");
}

function female() {
    male = document.querySelectorAll(".male")
    femaleP = document.querySelectorAll(".female")
    unknownO = document.querySelectorAll(".unknown")
 
    male.forEach(el => el.style.display = "none");
    femaleP.forEach(el => el.style.display = "block");
    unknownO.forEach(el => el.style.display = "none");
}

function unknown() {
    male = document.querySelectorAll(".male")
    femaleP = document.querySelectorAll(".female")
    unknownO = document.querySelectorAll(".unknown")
 
    male.forEach(el => el.style.display = "none");
    femaleP.forEach(el => el.style.display = "none");
    unknownO.forEach(el => el.style.display = "block");
}

function All() {
    male = document.querySelectorAll(".male")
    femaleP = document.querySelectorAll(".female")
    unknownO = document.querySelectorAll(".unknown")
 
    male.forEach(el => el.style.display = "block");
    femaleP.forEach(el => el.style.display = "block");
    unknownO.forEach(el => el.style.display = "block");
}

