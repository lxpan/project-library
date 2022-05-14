// Store book objects in array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) ? 'Yes' : 'No';
    // Hide info method from functions that write to the table from enumerated data
    Object.defineProperty(this, 'info', {
        value: function() {
            let readString = (this.read === true) ? 'has read' : 'not read yet';
            return `${this.title} by ${this.author}, ${pages} pages, ${readString}`;
        },
        enumerable: false
    });
}

function convertToTitleCase(string) {
    return string.replace(string[0], string[0].toUpperCase());
}

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
}

function createTableHeader(referenceObject) {
    let tableHead = document.createElement('thead');
    let tableRow = document.createElement('tr');
    
    Object.keys(referenceObject).forEach(key => {
        let headerCell = document.createElement('th');
        headerCell.innerText = convertToTitleCase(key);
        tableRow.appendChild(headerCell);
    });

    tableHead.appendChild(tableRow);
    return tableHead;
}

function populateLibrary() {
    theHobbit = new Book('The Hobbit', 'JRR Tolkien', 500, false);
    harryPotter = new Book('Harry Potter', 'JK Rowling', 499, false);
    nineteenEightyFour = new Book('1984', 'George Orwell', '384', true);

    addBookToLibrary(theHobbit);
    addBookToLibrary(harryPotter);
    addBookToLibrary(nineteenEightyFour);
}

function populateTableBody(library) {
    let tableBody = document.createElement('tbody');

    library.forEach(book => {
        let tableRow = document.createElement('tr');
        let values = Object.values(book);

        let tdArray = values.map(value => {
            let tableData = document.createElement('td');
            tableData.innerText = value;
            return tableData;
        });

        tdArray.forEach(td => tableRow.appendChild(td));
        tableBody.appendChild(tableRow);
    });
    return tableBody;
}

// loop through library and display book info
// myLibrary.forEach(book => console.log(book.info()));

populateLibrary();

let body = document.querySelector('body');
let table = document.querySelector('table');

table.appendChild(createTableHeader(myLibrary[0]));
table.appendChild(populateTableBody(myLibrary));
body.appendChild(table);

console.log(myLibrary[0].info());