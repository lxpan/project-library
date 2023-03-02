import React, { useState } from 'react';

function Form() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState('');
    const [read, setRead] = useState(false);

    return (
        <>
            <form>
                <fieldset className="new-book-form">
                    <legend>Add New Book</legend>
                    <label htmlFor="title">Title (*):</label>
                    <input type="text" name="title" id="title" required></input>

                    <label htmlFor="author">Author (*):</label>
                    <input type="text" name="author" id="author" required></input>

                    <label htmlFor="Pages">Pages:</label>
                    <input type="text" name="pages" id="pages"></input>

                    <div className="radio-row">
                        <input type="radio" name="read" id="readChoiceYes" value="Yes"></input>
                        <label htmlFor="readChoiceYes">Yes</label>
                    </div>

                    <div className="radio-row">
                        <input type="radio" name="read" id="readChoiceNo" value="No"></input>
                        <label htmlFor="readChoiceNo">No</label>
                    </div>

                    <button className="add-book">Add Book</button>
                </fieldset>
            </form>
        </>
    );
}

export default Form;
