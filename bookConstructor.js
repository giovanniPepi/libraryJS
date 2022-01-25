let myLibrary = [];
inputError = false;

enableQuerySelectors = () => {
    addBtn = document.querySelector(".addBtn");
    deleteBtn = document.querySelector(".deleteBtn");
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
}
enableEventListeners = () => {
    window.addEventListener("keyup", () => {
        validateInput();
    });
    addBtn.addEventListener("click", () => {
        getUserInpt();        
    });
    statsBtn.addEventListener("click", () => {
        console.table(myLibrary);
    });
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
    if (middleDiv.contains(warningPara)) inputError = true;
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
mapLibrary = (item) => {
    return [item.info()];
}



//const book1 = new Book ('The Fellowship of the Ring', 'J. R. R. Tolkien', 423, false);
enableQuerySelectors();
enableEventListeners();



