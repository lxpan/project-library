// Store book objects in array
let myLibrary = [];

// Object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read) ? 'Yes' : 'No';
    this.bookID = null;
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

function populateLibrary() {
    theHobbit = new Book('The Hobbit', 'JRR Tolkien', 500, false);
    harryPotter = new Book('Harry Potter', 'JK Rowling', 499, false);
    nineteenEightyFour = new Book('1984', 'George Orwell', '384', true);

    addBookToLibrary(theHobbit);
    addBookToLibrary(harryPotter);
    addBookToLibrary(nineteenEightyFour);
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

function populateTableBody(library) {
    let tableBody = document.createElement('tbody');
    let bookID = 0;

    library.forEach(book => {
        let tableRow = document.createElement('tr');
        let values = Object.values(book);

        // Add book ID to each row's data attribute
        tableRow.dataset.bookId = bookID++;

        let tdArray = values.filter(value => value != null).map(value => {
            let tableData = document.createElement('td');
            tableData.innerText = value;
            return tableData;
        });

        tdArray.forEach(td => tableRow.appendChild(td));

        // Add Delete Book button
        let deleteButtonTD = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButtonTD.append(deleteButton);
        tableRow.appendChild(deleteButtonTD);

        tableBody.appendChild(tableRow);
    });
    return tableBody;
}

function showNewBookForm() {
    let newBookForm = document.querySelector('.new-book-form');
    newBookForm.style.display = 'flex';
}

function onSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    // retrieve form values as an object
    const formProps = Object.fromEntries(formData);
    // instantiate new book object and add to library array
    const newBook = new Book(formProps.title, formProps.author, formProps.pages, (formProps.read == 'Yes') ? true : false);
    addBookToLibrary(newBook);
    // delete old table body
    const oldTableBody = document.querySelector('tbody');
    oldTableBody.remove();
    // repopulate table with new table body of book objects
    table.appendChild(populateTableBody(myLibrary));
}

// loop through library and display book info
// myLibrary.forEach(book => console.log(book.info()));

populateLibrary();

let table = document.querySelector('table');

table.appendChild(createTableHeader(myLibrary[0]));
table.appendChild(populateTableBody(myLibrary));

let newBookButton = document.querySelector('.new-book-button');
newBookButton.addEventListener('click', showNewBookForm);

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

// let addNewBookButton = document.querySelector('.add-book');
// addNewBookButton.addEventListener('submit', addNewBook);
