// Data structures

class Book {
    // the constructor...
    constructor(title, author, pages, isRead) {
      this.author = author;
      this.pages = pages;
      this.title = title;
      this.isRead = isRead;
    }
  }
  
  // UI
  
  class Library {
    constructor() {
      this.myLibrary = [];
    }
  
    getBook(title) {
      return this.myLibrary.find((book) => book.title === title);
    }
  
    addBook(book) {
      this.myLibrary.push(book);
    }
  
    changeReadStatus(title) {
      const book = this.getBook(title);
      book.isRead = !book.isRead;
      this.updateBooksGrid();
    };
    
    
    removeBook(title) {
      this.myLibrary = this.myLibrary.filter((book) => book.title !== title);
    }
    
    deleteBook(title) {
      this.removeBook(title);
      this.updateBooksGrid();
    };
  
    
  getBookFromForm() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;
    return new Book(title, author, pages, isRead);
  };
  
  updateBooksGrid() {
    this.resetBooksGrid();
    for (const book of this.myLibrary) {
      this.createBookCard(book);
    }
  };
  
  resetBooksGrid () {
    booksGrid.innerHTML = "";
  };
  
  closeAddBookModal () {
    const addBookModal = document.getElementById("addBookModal");
    addBookModal.classList.remove("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("active");
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.classList.remove("active");
    errorMsg.textContent = "";
  };
  
  addNewBook(e) {  
    e.preventDefault();
    const newBook = this.getBookFromForm();
    this.addBook(newBook);
    this.updateBooksGrid();
    this.closeAddBookModal();
  };
  
  // Book Card Creation
  
  createBookCard(book) {
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const readBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
  
    bookCard.classList.add("book-card");
    readBtn.classList.add("btn");
    deleteBtn.classList.add("btn");
  
    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    deleteBtn.textContent = "Delete";
    readBtn.onclick = () => this.changeReadStatus(book.title);
    deleteBtn.onclick = () => this.deleteBook(book.title);
  
    if (book.isRead) {
      readBtn.textContent = "Read";
      readBtn.classList.add("read");
    } else {
      readBtn.textContent = "Unread";
      readBtn.classList.add("unread");
    }
  
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(deleteBtn);
    booksGrid.appendChild(bookCard);
  };
  
  openAddBookModal() {
    const addBookForm = document.getElementById("addBookForm");
    addBookForm.reset();
    const addBookModal = document.getElementById("addBookModal");
    addBookModal.classList.add("active");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");
  };
    
  }
  
  
  // Adding Book to Library
  
  const library = new Library()
  const addBookBtn = document.getElementById("addBookBtn");
  addBookBtn.onclick = () => library.openAddBookModal();
  const addBookForm = document.getElementById("addBookForm");
  addBookForm.addEventListener('submit', (e) => library.addNewBook(e));
  const overlay = document.getElementById("overlay");
  overlay.onclick = () => library.closeAddBookModal();
  
  // Small Effects
  