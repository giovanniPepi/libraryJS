let myLibrary = [];
let deleteCreated = false;

enableQuerySelectors = () => {
    addBtn = document.querySelector(".addBtn");
    cleanBtn = document.querySelector(".cleanBtn");
    statsBtn = document.querySelector(".statsBtn");
    tittleInpt = document.querySelector("#tittle");
    authorInpt = document.querySelector("#Author");
    pagesInpt = document.querySelector("#pages");
    readInpt = document.querySelector(".readInpt");
    tittleDiv = document.querySelector(".tittleDiv");
    authorDiv = document.querySelector(".authorDiv");
    pagesDiv = document.querySelector(".pagesDiv");
    readDiv = document.querySelector(".readDiv");
    warningPara = document.querySelector(".inputWarning")
    middleDiv = document.querySelector(".middleSectionContainer")
    statsDiv = document.querySelector(".stats");
    containerRight = document.querySelector(".containerRight");
    inputs = document.querySelectorAll("input");
    deleteBtn = document.querySelector(".deleteBtn");
}
enableEventListeners = () => {
    window.addEventListener("keyup", validateInput);
    addBtn.addEventListener("click", getUserInpt);
    statsBtn.addEventListener("click", showLibrary);
    cleanBtn.addEventListener("click", clean)
    deleteBtn.addEventListener("click", deleteArea);
}
createWarning = (type) => {
    warningPara = document.createElement("p");
    warningPara.setAttribute("class", "inputWarning");
    switch (type) {
        case ('text'): 
            warningPara.textContent = "Invalid name";
        break;
        case ('number'): 
            warningPara.textContent = "Invalid number";
        break;
    }
}
getUserInpt = () => {
    validateInput();
    if (inputError === true) return;
        const tittle = neatInput(tittleInpt.value);
        const author = neatInput(authorInpt.value);
        const pages = pagesInpt.value;
        const read = readInpt.value;
        return myLibrary.push(new Book (tittle, author, pages, read));
}
validateInput = () => {
    middleDiv.contains(warningPara)? inputError = true : inputError = false;
    if (tittleInpt.value === "") {
        createWarning('text'); 
        // avoids creating more than one warning
        if (tittleDiv.children.length < 3) tittleDiv.appendChild(warningPara);
    } else if (tittleDiv.children.length > 2) tittleDiv.removeChild(tittleDiv.lastChild)   //removes warning, if it had one
    if (authorInpt.value === "") {
        createWarning('text'); 
        if (authorDiv.children.length < 3) authorDiv.appendChild(warningPara);
    } else if (authorDiv.children.length > 2) authorDiv.removeChild(authorDiv.lastChild)
    if (pagesInpt.value === "" || isNaN(parseInt(pagesInpt.value))) {
        createWarning('number'); 
        if (pagesDiv.children.length <3) pagesDiv.appendChild(warningPara);
    } else if (pagesDiv.children.length > 2) pagesDiv.removeChild(pagesDiv.lastChild); 
}
function Book (tittle, author, pages, read) {
    this.tittle = tittle; 
    this.author = author; 
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function () {
    let readStatus;
    this.read? readStatus = "already read." : readStatus = "not read yet.";
    return `${this.tittle}, by ${this.author}, ${this.pages} pages, ${readStatus}`;
}
function neatInput (string) {
    const spaceString = string.split(" ");
    const spaceStringArray = spaceString.map(function (x) {
        first = x.slice(0, 1);
        firstUpper = first.toUpperCase();
        theRest = x.slice(1);
        return firstUpper + theRest;    
    });
    const neat = spaceStringArray.toString().replace(/,/g, " ");
    return neat;   
}
function showLibrary () {
    if (containerRight.children.length > 0) containerRight.innerHTML = "" ; //clean delete section before showing library;
    statsDiv = document.createElement("div");
    statsDiv.setAttribute("class", "stats");
    myLibrary.forEach((item => {
        resultDiv = document.createElement("div");
        resultDiv.setAttribute("data-indexPosition", `${myLibrary.indexOf(item)}`);
        resultDiv.textContent = item.info(); 
        statsDiv.appendChild(resultDiv);
    }))
    containerRight.appendChild(statsDiv);
    deleteCreated = false;
}
function clean () {
    containerRight.style.background = 'inherit';
    while(statsDiv.firstChild) {
        statsDiv.removeChild(statsDiv.lastChild);
    }
    myLibrary = [];
    inputs.forEach((input => input.value = ""));
    containerRight.innerHTML = "";
}
function deleteBook (index) {
    myLibrary.splice(index, 1);
}
function deleteArea () {
    if (deleteCreated) return // 
    if(containerRight.children.length > 0) containerRight.innerHTML = ""; // clean statsDiv before displaying books
    deleteBookDiv = document.createElement("div");
    deleteBookDiv.setAttribute("class", "deleteBookDiv");
    askDeleteP = document.createElement("p");
    askDeleteP.textContent = "Click on a book to delete: ";
    deleteBookDiv.appendChild(askDeleteP);
    selectDelete = document.createElement("div");
    selectDelete.setAttribute("class", "deleteSelect");
    myLibrary.forEach((book => {
        deleteOption = document.createElement("div");
        deleteOption.setAttribute("class", "deleteOption");
        deleteOption.setAttribute("id", `${myLibrary.indexOf(book)}`);
        deleteOption.textContent = `${book['tittle']}`;
        selectDelete.appendChild(deleteOption);
    }))
    deleteBookDiv.appendChild(selectDelete);
    containerRight.appendChild(deleteBookDiv);    
    deleteCreated = true;
}
enableQuerySelectors();
enableEventListeners();



