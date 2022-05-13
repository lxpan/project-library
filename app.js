// Store book objects in array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readString = (this.read === true) ? 'has read' : 'not read yet';
        return `${this.title} by ${this.author}, ${pages} pages, ${readString}`;
    }
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

theHobbit = new Book('The Hobbit', 'JRR Tolkien', 500, false);
harryPotter = new Book('Harry Potter', 'JK Rowling', 499, false);
nineteenEightyFour = new Book('1984', 'George Orwell', '384', true);


addBookToLibrary(theHobbit);
addBookToLibrary(harryPotter);
addBookToLibrary(nineteenEightyFour);

// loop through library and display book info
myLibrary.forEach(book => console.log(book.info()));
