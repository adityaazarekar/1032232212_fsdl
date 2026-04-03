// Set the edit modal with book information
const setEditModal = (isbn) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);
    const { title, author, publisher, publish_date, numOfPages } = book;

    // Fill the form fields
    document.getElementById('edit_isbn').value = isbn;
    document.getElementById('edit_title').value = title;
    document.getElementById('edit_author').value = author;
    document.getElementById('edit_publisher').value = publisher;
    document.getElementById('edit_publish_date').value = publish_date;
    document.getElementById('edit_numOfPages').value = numOfPages;

    // Set the form action URL
    document.getElementById('editForm').action = `http://localhost:3000/book/${isbn}`;
}

// Delete a book by ISBN
const deleteBook = (isbn) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `http://localhost:3000/book/${isbn}`, false);
    xhttp.send();

    // Reload the page to show updated list
    location.reload();
}

// Load all books from the API
const loadBooks = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    if (books.length === 0) {
        document.getElementById('books').innerHTML = `
            <div class="col-12 empty-state">
                <h3>📭 No books found</h3>
                <p>Start by adding a new book to the database!</p>
                <a href="/new-book.html" class="btn btn-light btn-lg">➕ Add First Book</a>
            </div>
        `;
        return;
    }

    for (let book of books) {
        const x = `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">ISBN: ${book.isbn}</h6>
                        <div><strong>Author:</strong> ${book.author}</div>
                        <div><strong>Publisher:</strong> ${book.publisher}</div>
                        <div><strong>Published:</strong> ${book.publish_date}</div>
                        <div><strong>Pages:</strong> ${book.numOfPages}</div>
                        <hr>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteBook('${book.isbn}')">🗑️ Delete</button>
                        <button type="button" class="btn btn-info btn-sm" data-bs-toggle="modal" data-bs-target="#editBookModal" onclick="setEditModal('${book.isbn}')">✏️ Edit</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('books').innerHTML += x;
    }
}

// Load books when page loads
loadBooks();
