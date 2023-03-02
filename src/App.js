import React, { useState } from 'react';
import Form from './components/Form';
import './styles/App.css';

function App() {
    const [collection, setCollection] = useState([
        {
            title: 'The Hobbit',
            author: 'J. R. R. Tolkien',
            pages: 310,
            read: false,
        },
        {
            title: 'Harry Potter and the Philosopher\'s Stone',
            author: 'J. K. Rowling',
            pages: 223,
            read: false,
        },
        {
            title: 'Nineteen Eighty-Four',
            author: 'George Orwell',
            pages: 328,
            read: true,
        },
    ]);

    const [bookId, setBookId] = useState(0);

    function showNewBookForm() {
        const newBookForm = document.querySelector('.new-book-form');
        newBookForm.style.display = 'flex';
    }

    return (
        <div className="app">
            <h1>The Library of Wonders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Pages</th>
                        <th>Read</th>
                        <th>BookID</th>
                        <th>ToggleRead</th>
                    </tr>
                </thead>
                <tbody>
                    {collection.map((book) => (
                        <tr key={bookId}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.pages}</td>
                            <td>{book.read ? 'Yes' : 'No'}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                            <td>
                                <button>Toggle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={showNewBookForm} className="new-book-button">
                New Book
            </button>
            <Form />
        </div>
    );
}

export default App;
