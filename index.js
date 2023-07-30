// Data structures

let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.author = author
  this.pages = pages
  this.title = title
  this.isRead = isRead
  // the constructor...
}


// UI

const addBookBtn = document.getElementById('addBookBtn')
const booksGrid = document.getElementById('booksGrid')
const overlay = document.getElementById('overlay')
const errorMsg = document.getElementById('errorMsg')
const addBookForm = document.getElementById('addBookForm')
const addBookModal = document.getElementById('addBookModal')
const submitBtn = document.getElementById('addInfo')

const openAddBookModal = () => {
  addBookForm.reset()
  addBookModal.classList.add('active')
  overlay.classList.add('active')
}



// Adding Book to Library

const getBookFromForm = () => {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const isRead = document.getElementById('isRead').checked
  return new Book(title, author, pages, isRead)
}

const updateBooksGrid = () => {
  resetBooksGrid()
  for (const book of myLibrary) {
    createBookCard(book)
  }
}

const resetBooksGrid = () => {
  booksGrid.innerHTML = ''
}


const closeAddBookModal = () => {
  addBookModal.classList.remove('active')
  overlay.classList.remove('active')
  errorMsg.classList.remove('active')
  errorMsg.textContent = ''
}

const addBook = (e) => {
  e.preventDefault()
  const newBook = getBookFromForm()
  myLibrary.push(newBook)
  updateBooksGrid()
  closeAddBookModal()
}

// Book Card Creation

const createBookCard = (book) => {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')
  const readBtn = document.createElement('button')
  const deleteBtn = document.createElement('button')

  bookCard.classList.add('book-card')
  readBtn.classList.add('btn')
  deleteBtn.classList.add('btn')

  title.textContent = `"${book.title}"`
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  deleteBtn.textContent = "Delete"
  readBtn.onclick = changeReadStatus
  deleteBtn.onclick = deleteBook

  if (book.isRead) {
    readBtn.textContent = "Read"
    readBtn.classList.add('read')
  } else {
    readBtn.textContent = "Unread"
    readBtn.classList.add('unread')
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  bookCard.appendChild(readBtn)
  bookCard.appendChild(deleteBtn)
  booksGrid.appendChild(bookCard)
}


addBookBtn.onclick = openAddBookModal
addBookForm.onsubmit = addBook
overlay.onclick = closeAddBookModal



// Small Effects

function getBook(title) {
  return myLibrary.find((book) => book.title === title)
}

const changeReadStatus = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ''
  )
  const book = getBook(title)
  book.isRead = !book.isRead
  updateBooksGrid()
}

const closeAll = () => {
  closeAddBookModal
  overlay.classList.remove('active')
}

function removeBook(title) {
  myLibrary = myLibrary.filter((book) => book.title !== title)
}

const deleteBook = (e) => {
  const title = e.target.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ''
  )
    removeBook(title)
    updateBooksGrid()
  }