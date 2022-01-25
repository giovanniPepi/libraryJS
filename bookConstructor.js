let myLibrary = [];

enableQuerySelectors = () => {
    addBtn = document.querySelector(".addBtn");
    deleteBtn = document.querySelector(".deleteBtn");
    statsBtn = document.querySelector(".statsBtn");
    tittleInpt = document.querySelector("#tittle");
    authorInpt = document.querySelector("#Author");
    pagesInpt = document.querySelector("#pages");
    readInpt = document.querySelector("#read");
    tittleDiv = document.querySelector(".tittleDiv");
    authorDiv = document.querySelector(".authorDiv");
    pagesDiv = document.querySelector(".pagesDiv");
    readDiv = document.querySelector(".readDiv");
    warningPara = document.querySelector(".inputWarning")
}
enableEventListeners = () => {
    addBtn.addEventListener("click", getUserInpt);
    statsBtn.addEventListener("click", () => console.table(myLibrary));
}
createWarning = () => {
    warningPara = document.createElement("p");
    warningPara.textContent = "Invalid name";
    warningPara.setAttribute("class", "inputWarning");
}
getUserInpt = () => {
    const tittle = tittleInpt.value;
    const author = authorInpt.value;
    const pages = pagesInpt.value;
    const read = readInpt.value;
    return myLibrary.push(new Book (tittle, author, pages, read));
}
validateInput = () => {
    if (tittleInpt.value === "") {
        createWarning(); 
        // avoids creating more than one warning
        if (tittleDiv.children.length < 3) tittleDiv.appendChild(warningPara);
    } else if (tittleDiv.children.length > 2) tittleDiv.removeChild(tittleDiv.lastChild)   //removes warning, if it had one

    
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
//const book1 = new Book ('The Fellowship of the Ring', 'J. R. R. Tolkien', 423, false);
enableQuerySelectors();
enableEventListeners();