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
    myLibrary.forEach( book => {
        const parentDiv = document.createElement("div")
        const nameDiv = document.createElement("div")
        const authorDiv = document.createElement("div")
        const pagesDiv = document.createElement("div")
        const button = document.createElement("button")
        button.classList.add(`text-white bg-[#039659] hover:bg-[#1a704c] rounded-none px-2 py-3 shadow-md remove`)
        button.textContent = `Delete Book`
        nameDiv.textContent = toString(book.name); authorDiv.textContent = toString(book.author); pagesDiv.textContent = toString(book.pages);
        parentDiv.classList.add(`bg-white rounded-lg shadow-md h-[15rem] grid grid-rows-[repeat(5,1fr)] items-center justify-center text-xl font-['American_Typewriter'] m-4`)
        parentDiv.appendChild(nameDiv, authorDiv, pagesDiv, button)
        bookshelf.appendChild(parentDiv)
    })
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
        console.log("YOU CLICKED IT! AND ITS STAYING!")
        totalBooks += 1
        numTotal.textContent  = `TOTAL: ${totalBooks}`
    }
})






function makeCheckmark(isChecked) { // this creates an instance of a checkmark that we can use to put into every bookshelf item
    const myLabel = document.createElement('label')
    const checkbox = document.createElement('input')
    const mySpan = document.createElement('span')
    myLabel.appendChild(checkbox, mySpan)
    mySpan.classList.add('slider')
    myLabel.classList.add('switch')
    checkbox.type = 'checkbox'
    checkbox.name = 'check{$fruits.length}'
    checkbox.id = 'check{$fruits.length}_id'
    checkbox.value = isChecked
    return myLabel
}
