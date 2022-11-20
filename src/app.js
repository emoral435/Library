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

Book.prototype.read = () => { // this is so that every book object doesnt make the same function over and over again. it returns whether the checkmark is clicked or not at the time of the input
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
    button.dataset.index = `${myLibrary.length - 1}`
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
    listenToggle()
    listenDelete()
}

function deleteBooks(index, number) { // this function deletes all books in the myLibrary array
    for (let i = index; i <= (index + number); i++) {
        delete mylibrary[i]
    }
    myLibrary.splice(index, number)
}

function removeChildNodes(parent) { // this removes all child nodes from a parent node
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function deleteButton() { // this is the function call to the corresponding delete all button you can see on the DOM
    deleteBooks(0, myLibrary.length)
    removeChildNodes(bookshelf)
    totalBooks = 0; readTotal = 0, compTotal = 0
    numTotal.textContent = `Total: ${totalBooks}`
    numRead.textContent = `Reading: ${readTotal}`
    numCompleted.textContent = `Completed: ${compTotal}`
}

function listenToggle() { // this function makes sure that every button that shows unfinished or finished can be toggled to alternate
    let toggleButton = document.querySelectorAll('.toggle')
    toggleButton.forEach( btn => {
        let nbtn = btn.cloneNode(true)
        btn.parentNode.replaceChild(nbtn, btn)
        nbtn.addEventListener('click', () => {
            let nextButton = nbtn.nextElementSibling;
            nbtn.classList.toggle('unfinished')
            nbtn.classList.toggle('finished')
            let index = parseInt(nextButton.dataset.index)
            if (myLibrary[index].readStatus) {
                nbtn.textContent = `Unfinished`
                myLibrary[index].readStatus = false
                compTotal -= 1
                readTotal += 1
                numRead.textContent = `Read: ${readTotal}`
                numCompleted.textContent = `Completed: ${compTotal}`
            } else {
                nbtn.textContent = `Finished`
                myLibrary[index].readStatus = true
                compTotal += 1
                readTotal -= 1
                numRead.textContent = `Read: ${readTotal}`
                numCompleted.textContent = `Completed: ${compTotal}`
            }
        })
    })
}

function listenDelete() { // this adds an event handler for every time the user wants to delete an individual book from their bookshelf
    let remove = document.querySelectorAll('.remove')
    remove.forEach( btn => {
        let nbtn = btn.cloneNode(true)
        btn.parentNode.replaceChild(nbtn, btn)
        nbtn.addEventListener('click', () => {
            let index = parseInt(nbtn.dataset.index)
            console.log(index)
            totalBooks -= 1
            numTotal.textContent = `Total: ${totalBooks}`
            console.log(myLibrary[index].readStatus)
            if (myLibrary[index].readStatus) {
                compTotal -= 1
                numCompleted.textContent = `Completed: ${compTotal}`
            } else {
                readTotal -= 1
                numRead.textContent = `Read: ${readTotal}`
            } 
            nbtn.parentElement.remove()
            updateDataset(index)
            deleteBooks(index, 1)
        });
    })
}

function updateDataset(number) { // this just goes through the other books on the bookshelf and updates their relationship with the index of their book in myLibrary array
    let remove = document.querySelectorAll('.remove')
    remove.forEach( btn => {
        console.log('this worked')
        if (parseInt(btn.dataset.index) > number) {
            let newValue = parseInt(btn.dataset.index) - 1
            btn.dataset.index = newValue
            console.log(btn.dataset.index)
        }
    })
}

// MAIN

addButton.addEventListener('click', (event) => { // this is the main event handler for when the user submits their inputs !!
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
