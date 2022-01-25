 // object constructor 
// If you’re using constructors to make your 
// objects it is best to define functions 
// on the prototype of that object
function Book (tittle, author, pages, read) {
    this.tittle = tittle; 
    this.author = author; 
    this.pages = pages;
    this.read = read;
}
// info on the prototype so it doesn't make a
// copy of the function with every inheritance
Book.prototype.info = function () {
    let readStatus;
    this.read? readStatus = "already read." : readStatus = "not read yet.";
    return `${this.tittle}, by ${this.author}, ${this.pages} pages, ${readStatus}`;
}
const book1 = new Book ('The Fellowship of the Ring', 'J. R. R. Tolkien', 423, false);

let myLibrary = [];


