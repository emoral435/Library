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
    this.readStatus = this.read()
}

Book.prototype.read = () => {
    let status = document.querySelector('#finished')
    if (status.checked) {
        compTotal += 1
        return true
    } else {
        readTotal += 1
        return false
    }
}

function addBookToBookshelf() { // this, when called, will add each book object in the myLibrary array to the DOM, with a style and a checkbox to change whether the reader read the book or not
    const parentDiv = document.createElement("div")
    const nameDiv = document.createElement("div")
    const authorDiv = document.createElement("div")
    const pagesDiv = document.createElement("div")
    const button = document.createElement("button")
    const switchButton = document.createElement("button")
    switchButton.classList.add('toggle')
    totalBooks += 1
    numTotal.textContent  = `Total: ${totalBooks}`
    if (myLibrary[myLibrary.length - 1].readStatus) {
        numCompleted.textContent = `Completed: ${compTotal}`
        switchButton.textContent = 'Finished'
        switchButton.classList.add("finished")
    } else {
        numRead.textContent = `Reading: ${readTotal}`
        switchButton.textContent = 'Unfinished'
        switchButton.classList.add("unfinished")
    }
    button.classList.add('remove')
    parentDiv.classList.add(`parent`)
    nameDiv.classList.add('toCenter')
    authorDiv.classList.add('toCenter')
    pagesDiv.classList.add('toCenter')
    button.textContent = `Delete Book`
    nameDiv.textContent = `'${myLibrary[myLibrary.length - 1].name}'`
    authorDiv.textContent = `${myLibrary[myLibrary.length - 1].author}`
    pagesDiv.textContent = `${myLibrary[myLibrary.length - 1].pages} pages`
    parentDiv.append(nameDiv, authorDiv, pagesDiv, switchButton, button)
    bookshelf.append(parentDiv)
    listen()
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
    totalBooks = 0;readTotalBooks = 0, compTotal = 0
    numTotal.textContent = `Total: ${totalBooks}`
    numRead.textContent = `Reading: ${readTotalBooks}`
    numCompleted.textContent = `Completed: ${compTotal}`
}

function listen() {
    let toggleButton = document.querySelectorAll('.toggle')
    toggleButton.forEach( btn => {
        btn.onclick = () => {
            btn.classList.toggle('unfinished')
            btn.classList.toggle('finished')
        }
    })
}

// MAIN

let removeNode = document.querySelectorAll('.remove') // this set ups so that every button added to the DOM can be removed
removeNode.forEach( node => {
    node.addEventListener('click', ()  => {
        node.parentNode.removeChild();
    })
})

addButton.addEventListener('click', (event) => {
    event.preventDefault()
    if (form.reportValidity()) {
        let addedBook = new Book(title.value, author.value, pages.value)
        let status = document.querySelector('#finished')
        myLibrary.push(addedBook)
        title.value = ''
        author.value = ''
        pages.value = ''
        status.checked = false 
        addBookToBookshelf()
    }
})
