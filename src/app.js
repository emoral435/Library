const myLibrary = []; // this is the declaration for the list that the addBook function loops through to print to the screen

function Book(name, author, pages, checked) { // this is an object constructor that makes an object with name, author, pages and checked
    this.name = name
    this.author = author
    this.pages = pages
    this.checked = checked
}

function addBookToBookshelf() {
    myLibrary.forEach( book => {
        const parentDiv = document.createElement("div")
        const nameDiv = document.createElement("div")
        const authorDiv = document.createElement("div")
        const pagesDiv = document.createElement("div")
        nameDiv.textContent = book.name; authorDiv.textContent = book.author; pagesDiv.textContent = book.pages;
        parentDiv.classList.add(`bg-white rounded-lg shadow-md h-[15rem] grid grid-rows-[repeat(4,1fr)] items-center justify-center text-xl font-['American_Typewriter'] m-4`)
        parentDiv.appendChild(nameDiv, authorDiv, pagesDiv);
    })
}

function makeCheckmark() { // this creates an instance of a checkmark that we can use to put into every bookshelf item
    const myLabel = document.createElement('label')
    const checkbox = document.createElement('input')
    const mySpan = document.createElement('span')
    mySpan.classList.add('slider')
    myLabel.classList.add('switch')
    checkbox.type = 'checkbox'
    checkbox.name = 'check{$fruits.length}'
    checkbox.id = 'check{$fruits.length}_id'
}

let bookshelf = document.querySelector('#bookshelf');