// Array that stores all the books and set a default value
let myLibrary = [
    {
        bookName: "Java Scrip for Web Developers",
        author: "Matt Frisbie",
        status: "Read",
    },
    {
        bookName: "Javascript & JQuery",
        author: "Jonn Ducket",
        status: "Not Read"
    },
];

// use local storage to display data
$(document).ready(() => {
    if ((localStorage.getItem("booksData")) !== null){
        let localData = localStorage.getItem("booksData");
        localData= JSON.parse(localData);
        myLibrary=localData; 
      }
});

// The Object constructor

class Book {
    constructor (bookName, author, status){
        this.bookName = bookName,
        this.author = author,
        this.status = status
    }
}

// Add books functionality
const addBookToLibrary = () => {
    // get the user input
    let getBooks = $('#bookName').val();
    let getAuthor = $('#author').val();
    let getStatus = $('#BookStatus option:selected').text();
    
    // Create object from Book prototype
    let bookInput = Object.create(Book);
    // The user input will be oject's value
    bookInput.bookName = getBooks;
    bookInput.author = getAuthor;
    bookInput.status = getStatus;
    //console.log(bookInput);
    // Push the object into the array
    myLibrary.push(bookInput)
    //console.log(myLibrary);
    // a function that takes the user input and turns into a table
    // set local storage
    localStorage.setItem("booksData", JSON.stringify(myLibrary));
    
    const displayBook = () => {
        const htmlTable = `
            <tr>
                <td>${getBooks}</td>
                <td>${getAuthor}</td>
                <td><button class="status-button">${getStatus}</button></td>
                <td><button class="delete">delete</button></td>
            </tr>
        `;

        $('#tableBody').prepend(htmlTable);
        // get the button element for the read/Notread status
        let button = $(".status-button");
        //take the read/notRead status and write it
        //var e = $("#BookStatus");
        //the value and text examples are in the code below, let's keep it for possible further reference
        //var strSel = "The Value is: " + e.options[e.selectedIndex].value + " and text is: " + e.options[e.selectedIndex].text;
        //this is the dropdown value, chosen
        let statatusBook = $('#BookStatus option:selected').text();
        if (statatusBook == "Read"){
            button.html("Read");
        }else if(statatusBook == "Not Read"){
            button.html("Not Read");
        }

        //set attribute for swapping text on click
        button.attr("data-text-swap", "Not Read");
        button.attr("data-text-original", "Read");
        // function that changes the books read/NotRead status on click
        button.on('click', () => {
            if (button.attr("data-text-swap") == button.html()){
                button.html(button.attr("data-text-original"));
            } else {
                button.attr("data-text-orignal", button.html());
                button.html(button.attr("data-text-swap"));
            }

            index= myLibrary.findIndex(obj=> obj.bookName === getBooks&& obj.author === getAuthor);

            myLibrary[index].status = button.html();
            //update the local storage
            localStorage.setItem("booksData", JSON.stringify(myLibrary));
    
        })

        const deleteButton = () => {
            //create remove button
            let removeButton = document.querySelector(".delete"); 
            //console.log(removeButton.parentNode.parentNode);
            //add an event listener to the delete button
            removeButton.addEventListener("click", initRemoveButton, false);
            //delete its parent element 
            function initRemoveButton(){
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                //find the index that contains the book name and author related to the delete button
                //the difference here from the above function is elemen.bookName or author
                index= myLibrary.findIndex(obj=> obj.bookName === element.bookName && obj.author === element.author);
                //remove that index
                myLibrary.splice(index,1);
                //update the local storage 
                localStorage.setItem("booksData", JSON.stringify(myLibrary));
            }
        };
        deleteButton(); 
    };      
    displayBook();

    $('#bookName').val(' ');
    $('#author').val(' ');
}

// Loop though the array and display the books as table
const LoopArr = () => {

    myLibrary.forEach((element,index)=>{
        const htmlTable = `
            <tr>
                <td>${element.bookName}</td>
                <td>${element.author}</td>
                <td><button class="status-button">${element.status}</button></td>
                <td><button class="delete">delete</button></td>
            </tr>         
        `;

        $('#tableBody').prepend(htmlTable);
        // get the button element for the read/Notread status
        let button = $(".status-button");
        //set attribute for swapping text on click
        button.attr("data-text-swap", "Not Read");
        button.attr("data-text-original", "Read");
        // function that changes the books read/NotRead status on click
        button.on('click', () => {
            if (button.attr("data-text-swap") == button.html()){
                button.html(button.attr("data-text-original"));
            } else {
                button.attr("data-text-orignal", button.html());
                button.html(button.attr("data-text-swap"));
            }

            index= myLibrary.findIndex(obj => obj.bookName === element.bookName&& obj.author === element.author);
            myLibrary[index].status = button.html();
            //update the local storage
            localStorage.setItem("booksData", JSON.stringify(myLibrary));
        })

        const deleteButton = () => {
            //create remove button
            let removeButton = document.querySelector(".delete"); 
            //console.log(removeButton.parentNode.parentNode);
            //add an event listener to the delete button
            removeButton.addEventListener("click", initRemoveButton, false);
            //delete its parent element 
            function initRemoveButton(){
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                //find the index that contains the book name and author related to the delete button
                //the difference here from the above function is elemen.bookName or author
                index= myLibrary.findIndex(obj=> obj.bookName === element.bookName && obj.author === element.author);
                //remove that index
                myLibrary.splice(index,1);
                //update the local storage 
                localStorage.setItem("booksData", JSON.stringify(myLibrary));
            }
        };
        deleteButton();     

    });
}
