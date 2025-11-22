const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; // boolean
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// const testBook = new Book("1984", "George Orwell", 328, true);
// console.log(testBook);

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

// console.log(myLibrary);

function renderLibrary() {
  const container = document.getElementById("books-container");

  container.innerHTML = ""; // Clear existing content

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.dataset.id = book.id;

    const header = document.createElement("div");
    header.classList.add("card-header");

    const titleEl = document.createElement("h3");
    titleEl.textContent = book.title;

    const authorEl = document.createElement("p");
    authorEl.classList.add("muted");
    authorEl.textContent = `by ${book.author}`;

    header.appendChild(titleEl);
    header.appendChild(authorEl);

    const metaRow = document.createElement("div");
    metaRow.classList.add("meta-row");

    const pagesEl = document.createElement("span");
    pagesEl.textContent = `${book.pages} pages`;

    const readBadge = document.createElement("span");
    readBadge.classList.add("badge");
    readBadge.textContent = book.read ? "Read" : "Not read yet";

    metaRow.appendChild(pagesEl);
    metaRow.appendChild(readBadge);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";

    toggleBtn.addEventListener("click", () => {
      const id = card.dataset.id;
      const book = myLibrary.find((book) => book.id === id);
      if (book) {
        book.toggleRead(); // use the prototype method
        renderLibrary(); // rerender to update text/label
      }
    });

    removeBtn.addEventListener("click", () => {
      const idToRemove = card.dataset.id;

      const index = myLibrary.findIndex((book) => book.id === idToRemove);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        renderLibrary();
      }
    });

    const actions = document.createElement("div");
    actions.classList.add("card-actions");
    actions.appendChild(toggleBtn);
    actions.appendChild(removeBtn);

    card.appendChild(header);
    card.appendChild(metaRow);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

const newBookForm = document.getElementById("new-book-form");
const newBookBtn = document.getElementById("new-book-btn");

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);
  renderLibrary();

  newBookForm.reset();
});
