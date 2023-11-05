
const form = document.querySelector('form');
const anewBook = document.getElementById('new-book');
const dialog = document.querySelector('dialog');
const legend = document.querySelector('legend');
const bookLibrary = document.getElementById('book-library');

myLibrary = [];

addLocalStorage();

anewBook.addEventListener('click', () => {
    legend.textContent = 'New Book';
    dialog.showModal();
});

document.addEventListener('click', function (event) {
    if (event.target === dialog) {
        dialog.close();
    }
});

function Book(name, author, pages, readingStatus) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.readingStatus = readingStatus,
    this.id = Math.floor(Math.random() * 1000000);
}

form.addEventListener('submit', function (event) {
    if (legend.textContent == 'New Book') {
    event.preventDefault();
    let nameInput = document.getElementById('name');
    let authorInput = document.getElementById('author');
    let pagesInput = document.getElementById('pages');
    let readingStatusInput = document.querySelector('input[name="reading-status"]:checked');

    const name = nameInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const readingStatus = readingStatusInput.value;
    
    let newBook = new Book(name, author, pages, readingStatus)
    myLibrary.push(newBook);
    saveAndRenderBooks();
    dialog.close();

    nameInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    if (readingStatusInput) {
        readingStatusInput.checked = false;
    }
    }
});

// function to create element that display the book information
function BookContainer(book) {
    this.element = document.createElement('div');
    this.element.id = 'container';

    this.element.dataset.id = book.id;

    this.name = document.createElement('button');
    this.name.classList.add('name');
    this.name.textContent = book.name;
    this.element.appendChild(this.name);

    this.author = document.createElement('p');
    this.author.classList.add('author');
    this.author.textContent = book.author;
    this.element.appendChild(this.author);

    this.pages = document.createElement('p');
    this.pages.classList.add('pages');
    this.pages.textContent = book.pages;
    this.element.appendChild(this.pages);

    this.read = document.createElement('button');
    this.read.classList.add('read');
    this.read.textContent = book.readingStatus;
    this.element.appendChild(this.read);

    if (book.readingStatus == 'read') {
        this.read.style.color = 'green';
    } else {
        this.read.style.color = 'red';
    }

    this.read.addEventListener('click', () => {
        if (book.readingStatus == 'read') {
            book.readingStatus = 'not read';
            this.read.textContent = book.readingStatus;
            this.read.style.color = 'red';
        } else {
            book.readingStatus = 'read';
            this.read.textContent = book.readingStatus;
            this.read.style.color = 'green';
        }
    });

    this.editButton = document.createElement('img');
    this.editButton.classList.add('edit-icon');
    this.editButton.src = 'icons/pencil.svg';
    this.element.appendChild(this.editButton);

    let currentlyEditedBook = null;

    this.editButton.addEventListener('click', () => {
        currentlyEditedBook = book;
        legend.textContent = 'Edit Book';
        dialog.showModal();
        form.addEventListener('submit', (e) => {
            if (currentlyEditedBook) {
                e.preventDefault();
                let nameInput = document.getElementById('name');
                let authorInput = document.getElementById('author');
                let pagesInput = document.getElementById('pages');
                let readingStatusInput = document.querySelector('input[name="reading-status"]:checked');

                const name = nameInput.value;
                const author = authorInput.value;
                const pages = pagesInput.value;
                const readingStatus = readingStatusInput.value;

                currentlyEditedBook.name = name;
                currentlyEditedBook.author = author;
                currentlyEditedBook.pages = pages;
                currentlyEditedBook.readingStatus = readingStatus;
    
                updateBookContainer(currentlyEditedBook);
                saveAndRenderBooks();
                dialog.close();
                currentlyEditedBook = null;

                nameInput.value = '';
                authorInput.value = '';
                pagesInput.value = '';
                if (readingStatusInput) {
                    readingStatusInput.checked = false;
                }
            }
        })
    })

    this.bookRemover = document.createElement('img');
    this.bookRemover.classList.add('remove-icon');
    this.bookRemover.src = 'icons/X.svg';
    this.element.appendChild(this.bookRemover);

    this.bookRemover.addEventListener('click', () => {
        let index = myLibrary.findIndex((b) => b.id === book.id);
        myLibrary.splice(index, 1);
    
        bookLibrary.removeChild(this.element);
        saveAndRenderBooks();
    })
}

function updateBookContainer(book) {
    const bookContainer = document.querySelector(`div[data-id="${book.id}"]`);
    if (bookContainer) {
        bookContainer.querySelector('.name').textContent = book.name;
        bookContainer.querySelector('.author').textContent = book.author;
        bookContainer.querySelector('.pages').textContent = book.pages;
        bookContainer.querySelector('.read').textContent = book.readingStatus;
        bookContainer.querySelector('.read').style.color = book.readingStatus === 'read' ? 'green' : 'red';
    }
}

function addLocalStorage() {
    // localStorage => save things in key value pairs - key = library : myLibrary
    myLibrary = JSON.parse(localStorage.getItem("library")) || [];
    saveAndRenderBooks();
}

function saveAndRenderBooks() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
    renderBooks();
}

function renderBooks() {
    bookLibrary.textContent = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        let newBookContainer = new BookContainer(book);
        bookLibrary.appendChild(newBookContainer.element);
    }
}

