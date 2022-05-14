// Store book objects in array
const myLibrary = [];

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
            const readString = (this.read === true) ? 'has read' : 'not read yet';
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
    const tableHead = document.createElement('thead');
    const tableRow = document.createElement('tr');
    
    Object.keys(referenceObject).forEach(key => {
        const headerCell = document.createElement('th');
        headerCell.innerText = convertToTitleCase(key);
        tableRow.appendChild(headerCell);
    });

    tableHead.appendChild(tableRow);
    return tableHead;
}

function populateTableBody(library) {
    const tableBody = document.createElement('tbody');
    let bookID = 0;

    library.forEach(book => {
        const tableRow = document.createElement('tr');
        const values = Object.values(book);

        // Add book ID to each row's data attribute
        tableRow.dataset.bookId = bookID++;

        const tdArray = values.filter(value => value != null).map(value => {
            const tableData = document.createElement('td');
            tableData.innerText = value;
            return tableData;
        });

        tdArray.forEach(td => tableRow.appendChild(td));

        // Add Delete Book button
        const deleteButtonTD = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        
        deleteButton.addEventListener('click', evt => {
            thisButton = evt.target;
            // get data attribute from parent's parent (<tr data-...>);
            const idx = thisButton.parentElement.parentElement.dataset.bookId;
            // delete book object at index 'idx'
            myLibrary.splice(idx, 1);
            // repopulate table rows
            console.log(myLibrary);
            deleteTable();
            table.appendChild(populateTableBody(myLibrary));
        });
        
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

function deleteTable() {
    const oldTableBody = document.querySelector('tbody');
    oldTableBody.remove();
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
    deleteTable();
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
