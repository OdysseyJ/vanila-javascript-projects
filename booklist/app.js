// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

UI.prototype.deleteBook = function(book){
    if(book.className ==="delete"){
        book.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}

UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');

    div.className=`alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    setTimeout(()=>{
        document.querySelector(".alert").remove();
    },3000)
}

// Event Listeners
document.getElementById("book-form").addEventListener('submit',  handleSubmit);
document.getElementById("book-list").addEventListener("click", handleRemoveBook);

function handleSubmit(e){
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;

    const book = new Book(title, author ,isbn);

    const ui = new UI();

    if (title === "" || author === "" || isbn === ""){
        ui.showAlert("Please fill", "error");
    }else{
        ui.addBookToList(book);

        ui.showAlert("book added", "success");

        ui.clearFields();
    }


    e.preventDefault();
}

function handleRemoveBook(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("book removed", "success");
    e.preventDefault();
}