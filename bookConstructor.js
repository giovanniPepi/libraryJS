let myLibrary = [];
let deleteCreated = false;
let editMode = false;
let inputValidation = false;


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
    editBookBtn = document.querySelector(".editBook");
}

function cleanRight () {
    containerRight.innerHTML = "";
}

function refreshInput() {
    tittleInpt.value = '';
    authorInpt.value = '';
    pagesInpt.value = '';     
    removeWarnings();  
}

enableEventListeners = () => {
    window.addEventListener("keyup", validateInput);
    addBtn.addEventListener("click", () => {
        getUserInpt();
        cleanRight();
        if(myLibrary.length > 0 ) showLibrary();
        refreshInput();
    });
    statsBtn.addEventListener("click", showLibrary);
    cleanBtn.addEventListener("click", clean)
    deleteBtn.addEventListener("click", () => {
        editMode = false;
        deleteArea();
    });
    editBookBtn.addEventListener("click", () => {
        editMode = true;
        editBook();
    })
    middleDiv.addEventListener("click", validateInput);
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

removeWarnings = () => {
    if (tittleDiv.children.length > 2) tittleDiv.removeChild(tittleDiv.lastChild);
    if (authorDiv.children.length > 2) authorDiv.removeChild(authorDiv.lastChild);
    if (pagesDiv.children.length > 2) pagesDiv.removeChild(pagesDiv.lastChild);     
}

getUserInpt = () => {
    validateInput();
    if (inputWarning) return; //avoid duplicating warnings
    if (!inputValidation) return // avoid pushign empty items to myLibrary;
        const tittle = neatInput(tittleInpt.value);
        const author = neatInput(authorInpt.value);
        const pages = pagesInpt.value;
        const read = readInpt.value;
        myLibrary = new Book(tittle, author, pages, read);
}

validateInput = () => {
    middleDiv.contains(warningPara)? inputWarning = true : inputWarning = false;
    inputValidation = true;
    if (tittleInpt.value === "") {
        createWarning('text'); 
        inputValidation = false;
        // avoids creating more than one warning
        if (tittleDiv.children.length < 3) tittleDiv.appendChild(warningPara);
    } else removeWarnings();   //removes warning, if it had one
    if (authorInpt.value === "") {
        createWarning('text'); 
        inputValidation = false;
        if (authorDiv.children.length < 3) authorDiv.appendChild(warningPara);
    } else removeWarnings();
    let regex=/^[0-9]+$/;
    if (pagesInpt.value === "" || !pagesInpt.value.match(regex)) {
        createWarning('number');
        inputValidation = false; 
        if (pagesDiv.children.length <3) pagesDiv.appendChild(warningPara);
    } else removeWarnings();
}

/* function Book (tittle, author, pages, read) {
    this.tittle = tittle; 
    this.author = author; 
    this.pages = pages;
    this.read = read;
}
 */

/* Book.prototype.info = function () {
    let readStatus;
    this.read? readStatus = "already read." : readStatus = "not read yet.";
    return `${this.tittle}, by ${this.author}, ${this.pages} pages, ${readStatus}`;
} */

class Book { 
  
  constructor(tittle, author, pages, read) {
    this.tittle = tittle; 
    this.author = author; 
    this.pages = pages;
    this.read = read;
  }


  setReadStats() {
    let readStatus;
    this.read? readStatus = "already read." : readStatus = "not read yet.";
    return `${this.tittle}, by ${this.author}, ${this.pages} pages, ${readStatus}`
  }

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
    if (containerRight.children.length > 0) cleanRight() ; //clean delete section before showing library;
    if (myLibrary.length == 0) return; // avoids creating an empty div
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
    myLibrary = [];
    inputs.forEach((input => input.value = ""));
    cleanRight();
    refreshInput();
    warnings = document.querySelectorAll(".inputWarning")
    warnings.forEach((warning => warning.textContent = ""));
}

function deleteBook (index) {
    myLibrary.splice(index, 1);
}

function deleteArea () {
    if (deleteCreated) return // avoid duplication; 
    if(containerRight.children.length > 0) cleanRight(); // clean statsDiv before displaying books
    if (myLibrary.length === 0) return; // avoids creating an empty div
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
    deleteCreated = true; // boolean to avoid duplication
    createDeleteOptionListener();
}

function createDeleteOptionListener () {
    deleteArray = document.querySelectorAll(".deleteOption");
    if (!editMode) {
        deleteArray.forEach((item => item.addEventListener ("click", () => {
            deleteBook(item.id);
            cleanRight();
            deleteCreated = false;
            deleteArea();
        })));
    } else if (editMode) {
        askDeleteP.textContent = "Click on a book to edit";
        deleteArray.forEach((item => item.addEventListener ("click", () => {
            tittleInpt.value = `${myLibrary[item.id]['tittle']}`;
            authorInpt.value = `${myLibrary[item.id]['author']}`;
            pagesInpt.value = `${myLibrary[item.id]['pages']}`;
            readInpt.value = `${myLibrary[item.id]['read']}`;
            deleteBook(item.id);
            cleanRight();
            deleteCreated = false;
            deleteArea();
        })));
    }
}

function editBook () {
    deleteArea();   
    createDeleteOptionListener();
}

enableQuerySelectors();

enableEventListeners();

clean();


