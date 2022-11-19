// these have the declarations that are used everywhere throughout the codebase, so it useful to see them all here at the top

const myLibrary = []; // this is the declaration for the list that the addBook function loops through to print to the screen
const bookshelf = document.querySelector('#bookshelf'); // this is the area where we put the book in the bookshelf
const form = document.querySelector('#library')
const title = document.getElementById("title")
const author = document.getElementById("author")
const pages = document.getElementById("pages")
const numRead = document.getElementById("read")
const numCompleted = document.getElementById("completed")
const numTotal = document.getElementById("total")
const addButton = document.getElementById("add")
let totalBooks = 0
let readTotal = 0
let compTotal = 0

// FUNCTIONS

function Book(name, author, pages) { // this is an object constructor that makes an object with name, author, pages and checked
    this.name = name
    this.author = author
    this.pages = pages
}

// Book.prototype.read = () => {

// }

function addBookToBookshelf() { // this, when called, will add each book object in the myLibrary array to the DOM, with a style and a checkbox to change whether the reader read the book or not
    const parentDiv = document.createElement("div")
    const nameDiv = document.createElement("div")
    const authorDiv = document.createElement("div")
    const pagesDiv = document.createElement("div")
    const button = document.createElement("button")
    totalBooks += 1
    numTotal.textContent  = `TOTAL: ${totalBooks}`
    button.classList.add('remove')
    parentDiv.classList.add(`parent`)
    button.textContent = `Delete Book`
    nameDiv.textContent = `${myLibrary[myLibrary.length - 1].name}`
    authorDiv.textContent = `${myLibrary[myLibrary.length - 1].author}`
    pagesDiv.textContent = `${myLibrary[myLibrary.length - 1].pages}`
    parentDiv.append(nameDiv, authorDiv, pagesDiv, button)
    bookshelf.append(parentDiv)
}

function deleteBooks() { // this function deletes all books in the myLibrary array
    myLibrary.splice(0, myLibrary.length)
}

function removeChildNodes(parent) { // this removes all child nodes from a parent node
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function deleteButton() { // this is the function call to the corresponding delete all button you can see on the DOM
    deleteBooks()
    removeChildNodes(bookshelf)
    totalBooks = 0
    numTotal.textContent = `TOTAL: ${totalBooks}`
}

// MAIN

let removeNode = document.querySelectorAll('.remove') // this set ups so that every button added to the DOM can be removed
removeNode.forEach( node => {
    node.addEventListener('click', ()  => {
        node.parentNode.removeChild(node);
    })
})

addButton.addEventListener('click', (event) => {
    event.preventDefault()
    if (form.reportValidity()) {
        let addedBook = new Book(title.value, author.value, pages.value)
        myLibrary.push(addedBook)
        title.value = ''
        author.value = ''
        pages.value = ''
        addBookToBookshelf()
    }
})