const myLibrary = [];

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; //bool

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`
    };

    
}

Book.prototype.changeRead = function(){
    this.read = !this.read;
}


let theHobbit = new Book("The Hobbit","J.R.R. Tolkien",310,true);
let harryPotter = new Book("Harry Potter","J.K. Rowling",3407,false);
myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
console.log(myLibrary)

function addBookToLibrary(newTitle, newAuthor, newPages, newRead){
    let title = newTitle;
    let author = newAuthor;
    let pages = newPages;
    let read = newRead;
    myLibrary.push(new Book(title,author,pages,read));
    libraryDisplay(); // Update the display after adding a new book
};

function libraryDisplay(){
    const library = document.querySelector("#library");
    library.innerHTML = ""; // Clear existing content

    for(let i = 0 ; i<myLibrary.length ; i++){

        const card = document.createElement("div");
        card.style.width = "300px";
        card.style.height = "300px";
        card.style.backgroundColor = "grey";
        card.setAttribute("id",`${i}`);
    
        const title = document.createElement("h1");
        title.textContent = myLibrary[i].title;
        const author = document.createElement("p");
        author.textContent = myLibrary[i].author;
        const pages = document.createElement("P");
        pages.textContent = myLibrary[i].pages;
    
        let ifRead = myLibrary[i].read;
        const read = document.createElement("p");
        ifRead ? read.textContent = "read" : read.textContent = "still to read";

        const deleteButton = document.createElement("button");
        deleteButton.style.width = "100px";
        deleteButton.style.height= "25px";
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () => {
            const cardEleminate = document.getElementById(`${card.id}`);
            console.log(cardEleminate);
            const eliminate = library.removeChild(cardEleminate);
        });

        const readButton = document.createElement("button");
        readButton.style.width= "100px";
        readButton.style.height= "25px";
        readButton.textContent = ifRead ? readButton.textContent = "not read" : readButton.textContent = "alredy read";
        readButton.addEventListener("click", () => {
            myLibrary[i].changeRead();
            libraryDisplay();

        })
        

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(deleteButton);
        card.appendChild(readButton);

        library.appendChild(card);
    }
}






const buttonDiv = document.querySelector("#button-div");
const newBookButton = document.querySelector("#new-book");

newBookButton.addEventListener("click", function addNewBook()  {
    newBookButton.disabled = true;
    
        const newDiv = document.createElement("div");
        newDiv.style.width = "600px";
        newDiv.style.height = "100px";
        newDiv.style.backgroundColor = "grey";
    
    
        const form = document.createElement("form");
    
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.placeholder = "title"
    
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.placeholder = "author";
    
        const pagesInput = document.createElement("input");
        pagesInput.type = "number";
        pagesInput.placeholder = "pages";
        let pagesNum = Number(pagesInput.value);
    
        const checkboxDiv = document.createElement("div");
        checkboxDiv.style.display = "flex";
        const checkboxText = document.createElement("p");
        checkboxText.textContent = "leido";
        const ifReadInput = document.createElement("input");
        ifReadInput.type = "checkbox";
    
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "submit";

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, ifReadInput.checked);
                console.log(typeof ifReadInput.checked);
                buttonDiv.removeChild(newDiv);
                newBookButton.disabled = false;
                
                libraryDisplay();
            })
        
    
    
        form.appendChild(titleInput);
        form.appendChild(authorInput);
        form.appendChild(pagesInput);
        form.appendChild(checkboxDiv);
        form.appendChild(submitButton);
    
        checkboxDiv.appendChild(ifReadInput);
        checkboxDiv.appendChild(checkboxText);
    
        newDiv.appendChild(form);
        buttonDiv.appendChild(newDiv);
});

libraryDisplay();

