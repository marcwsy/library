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

Book.prototype.toggleRead = function() {
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


let editTable;
let addBook = document.querySelector('button')
let table = document.querySelector('table')
let titleInput = document.getElementById('title')
let authorInput = document.getElementById('author')
let pagesInput = document.getElementById('pages')
let readBook = document.getElementById('read')

function deleteRow(elem) {
    table = elem.parentNode.parentNode.parentNode;
    let row = elem.parentNode.parentNode;
    let confirmDelete = confirm('are you sure you want to delete?')
    if (confirmDelete == true) {
    row.parentNode.removeChild(row);
    }
    else {
        return false
    }
}

addBook.addEventListener('click', addBookToTable)

function addBookToTable() {
    let title = titleInput.value.toUpperCase()
    let author = authorInput.value.toUpperCase()
    let pages = pagesInput.value.toUpperCase()
    let read = readBook.checked
    if (title === '') {
        return alert('Title cannot be blank')
    } 
    else if (author === '') {
        return alert('Author cannot be blank')
    }
    if (readBook.checked == true) {
        read = 'YES'
    } 
    else {
        false
        read = 'NO'
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
}

table.onclick = function(e) {
    let target = e.target.closest('.cancel,.ok,td');
  
    if (!table.contains(target)) return;
  
    if (target.className == 'cancel') {
      editdone(editTable.elem, false);
    } else if (target.className == 'ok') {
      editdone(editTable.elem, true);
    } else if (target.nodeName == 'TD') {
      if (editTable) return;
  
      editBook(target);
    }

};

function editBook(td) {
    editTable = {
        elem: td,
        data: td.innerHTML
      };
    td.classList.add('edit-td');
    let textArea = document.createElement('textarea');
    textArea.className = 'edit-area';
  
    textArea.value = td.innerHTML;
    td.innerHTML = '';
    td.appendChild(textArea);
    textArea.focus();
  
    td.insertAdjacentHTML("beforeEnd",
      '<div><button class="ok">OK</button><button class="cancel">CANCEL</button></div>')

}

function editdone(td, isOk) {
    if (isOk) {
      td.innerHTML = td.firstChild.value.toUpperCase();
    } else {
      td.innerHTML = editTable.data;
    }
    td.classList.remove('edit-td');
    editTable = null;
}