let myLibrary = []

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        read = false
    ){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        }
}

Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    }
    else {
        this.read = true;
    }
}
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, parseInt(pages), read);
    myLibrary.push(book);
}

let addBook = document.querySelector('button')
let table = document.querySelector('table')
let titleInput = document.getElementById('title')
let authorInput = document.getElementById('author')
let pagesInput = document.getElementById('pages')
let readBook = document.getElementById('read')

function deleteRow(elem) {
    table = elem.parentNode.parentNode.parentNode;
    let row = elem.parentNode.parentNode; 
    row.parentNode.removeChild(row);
  }

addBook.addEventListener('click', () => {
    let title = titleInput.value.toUpperCase()
    let author = authorInput.value.toUpperCase()
    let pages = pagesInput.value.toUpperCase()
    let read = readBook.checked
    if (readBook.checked == true) {
        read = 'Yes'
    } 
    else {
        false
        read = 'No'
    }    
    let template = `
                    <tr>
                    <td>${title}</td>
                    <td>${author}</td>
                    <td>${pages}</td>
                    <td>${read}</td>
                    <td><button onclick="deleteRow(this)" type="button" class="btn-close" aria-label="Close"></button></td>
                    </tr>
                    `
    table.innerHTML += template
    addBookToLibrary(title, author, pages, read)
})

