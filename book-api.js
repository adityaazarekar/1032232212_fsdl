const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Where we will keep books (in-memory database)
let books = [];

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// ==================== ROUTES ====================

// Home route - serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// POST /book - Add a new book
app.post('/book', (req, res) => {
    const book = req.body;
    console.log('Adding book:', book);
    books.push(book);

    // If the request is from a form (urlencoded), redirect to book list
    if (req.headers['content-type'] && req.headers['content-type'].includes('urlencoded')) {
        res.redirect('/book-list.html');
    } else {
        res.json({ message: 'Book is added to the database', book: book });
    }
});

// GET /books - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /book/:isbn - Get a specific book by ISBN
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    res.status(404).send('Book not found');
});

// POST /book/:isbn - Edit/Update a book by ISBN
app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        if (books[i].isbn === isbn) {
            books[i] = newBook;
        }
    }

    // If the request is from a form, redirect to book list
    if (req.headers['content-type'] && req.headers['content-type'].includes('urlencoded')) {
        res.redirect('/book-list.html');
    } else {
        res.json({ message: 'Book is edited', book: newBook });
    }
});

// DELETE /book/:isbn - Delete a book by ISBN
app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    books = books.filter(book => book.isbn !== isbn);

    res.send('Book is deleted');
});

// Start server
app.listen(port, () => {
    console.log(`Book REST API server listening on http://localhost:${port}`);
});
