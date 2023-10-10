myLibrary = [];

function Book(name, author, pages, readingStatus) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.readingStatus = readingStatus
}

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    addBookToLibrary();
    createBook();
    dialog.close();
});

const anewBook = document.getElementById('new-book');
const dialog = document.querySelector('dialog');
anewBook.addEventListener('click', () => {
    dialog.showModal();
});

document.addEventListener('click', function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

//funtion to push the new added book to myLibrary array
function addBookToLibrary() {
    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readingStatusInput = document.querySelector('input[name="reading-status"]:checked');
    
    const book = new Book(nameInput.value, authorInput.value, pagesInput.value, readingStatusInput.value);
    myLibrary.push(book);
}

// funtion that hides the book information when clicking on the book name
function hideDetails(bookAuthor, bookPages, bookReadingStatus) {
    bookAuthor.style.display = 'none';
    bookPages.style.display = 'none';
    bookReadingStatus.style.display = 'none';
}

// funtion that shows the book information when clicking on the book name
function showDetails(bookAuthor, bookPages, bookReadingStatus) {
    bookAuthor.style.display = 'block';
    bookPages.style.display = 'block';
    bookReadingStatus.style.display = 'block';
}

// funtion that changes the color depending on if the book has been read or not
function changeReadingStatus(readingStatusInput, bookReadingStatus) {
    if (readingStatusInput.value == 'read') {
        readingStatusInput.value = 'not read';
        bookReadingStatus.textContent = readingStatusInput.value;
        bookReadingStatus.style.color = 'red';
    } else {
        readingStatusInput.value = 'read';
        bookReadingStatus.textContent = readingStatusInput.value;
        bookReadingStatus.style.color = 'green';
    }
}

// funtion that deletes a book
function removeBook(container) {
    const bookName = container.querySelector('#book-name').textContent;
    const index = myLibrary.findIndex(book => book.name === bookName);

    if (index !== -1) {
        myLibrary.splice(index, 1);
    }

    container.parentNode.removeChild(container);
}


// function to create element that display the book information
function createBook() {
    const myBooks = document.getElementById('book-library');
    myBooks.innerHTML = '';

    const nameInput = document.getElementById('name');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const readingStatusInput = document.querySelector('input[name="reading-status"]:checked');

    for (let i = 0; i < myLibrary.length; i++) {
        const bookInfo = myLibrary[i];

        const container = document.createElement('div');
        container.id = 'container';
        myBooks.appendChild(container);

        const bookName = document.createElement('button');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookReadingStatus = document.createElement('button');
        
        bookName.textContent = bookInfo.name;
        bookAuthor.textContent = bookInfo.author;
        bookPages.textContent = `${bookInfo.pages} pages`;
        bookReadingStatus.textContent = bookInfo.readingStatus;

        bookReadingStatus.id = 'reading-status';
        if (bookInfo.readingStatus == 'read') {
            bookReadingStatus.style.color = 'green';
        } else {
            bookReadingStatus.style.color = 'red';
        }

        container.appendChild(bookName);
        container.appendChild(bookAuthor);
        container.appendChild(bookPages);
        container.appendChild(bookReadingStatus);

        const bookRemover = document.createElement('img');
        bookRemover.id = 'book-remover';
        bookRemover.src = 'icons/X.svg';
        container.appendChild(bookRemover);

        bookRemover.addEventListener('click', () => {
            removeBook(container)
        });
    
        bookName.id = 'book-name';
    
        bookName.addEventListener('click', () => {
            if (bookAuthor.style.display == 'none' && bookPages.style.display == 'none' && bookReadingStatus.style.display == 'none') {
                showDetails(bookAuthor, bookPages, bookReadingStatus)
            } else {
                hideDetails(bookAuthor, bookPages, bookReadingStatus)
            }
        })

        bookReadingStatus.addEventListener('click', () => {
            changeReadingStatus(readingStatusInput, bookReadingStatus)
        });
    }
    nameInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readingStatusInput.checked = false;
}
