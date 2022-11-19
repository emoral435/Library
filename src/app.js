const myLibrary = []; // this is the declaration for the list that the addBook function loops through to print to the screen
let bookshelf = document.querySelector('#bookshelf'); // this is the area where we put the book in the bookshelf

function Book(name, author, pages) { // this is an object constructor that makes an object with name, author, pages and checked
    this.name = name
    this.author = author
    this.pages = pages
}

function addBook() {
    console.log('this part is at least working')
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
        nameDiv.textContent = book.name; authorDiv.textContent = book.author; pagesDiv.textContent = book.pages;
        parentDiv.classList.add(`bg-white rounded-lg shadow-md h-[15rem] grid grid-rows-[repeat(5,1fr)] items-center justify-center text-xl font-['American_Typewriter'] m-4`)
        parentDiv.appendChild(nameDiv, authorDiv, pagesDiv, button, makeCheckmark(book.checked))
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
}

let removeNode = document.querySelectorAll('.remove') // this set ups so that every button added to the DOM can be removed
removeNode.forEach( node => {
    node.addEventListener('click', ()  => {
        node.parentNode.removeChild(node);
    })
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
