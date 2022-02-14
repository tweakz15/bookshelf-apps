const unread_book_list_id = "books";
const readed_book_list_id = "readed-books";
const book_list_id = "listID"

function makeBook(title, writer, date, is_readed){
    const textTitle = document.createElement("h2");
    textTitle.innerText = title;

    const textWriter = document.createElement("h4");
    textWriter.innerText = writer;
    
    const textTime = document.createElement("p");
    textTime.innerText = date;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container")
    textContainer.append(textTitle, textWriter, textTime);

    const container = document.createElement("div");
    container.classList.add("item-book")
    container.append(textContainer);
    

    if(is_readed){
        container.append(
            undoButton(),
            deleteButton());
    } else{
        container.append(completedButton());
    }
    
    return container;

}

function addBook(){
    const unreadBOOKList = document.getElementById(unread_book_list_id);

    const text_title = document.getElementById("title").value;
    const text_writer = document.getElementById("writer").value;
    const text_date = document.getElementById("date").value;
 
    const book = makeBook(text_title, text_writer, text_date, false);
    const bookObject = makeBookObject(text_title, text_writer, text_date, false);
    book[book_list_id] = bookObject.id;
    books.push(bookObject);

    unreadBOOKList.append(book);
    updateBook();
}

function readedBook(bookList){
    const bookTitle = bookList.querySelector(".text-container >h2").innerText;
    const bookWriter = bookList.querySelector(".text-container >h4").innerText;
    const bookDate = bookList.querySelector(".text-container >p").innerText
    
    const newBook = makeBook(bookTitle, bookWriter, bookDate, true);
    const book = findBook(bookList[book_list_id]);
    book.is_readed = true;
    newBook[book_list_id] = book.id;

    const listReadedBook = document.getElementById(readed_book_list_id);
    listReadedBook.append(newBook); 
    bookList.remove()

    updateBook();
}

function undoFromReaded(bookList){
    const bookUnread = document.getElementById(unread_book_list_id);
    const bookTitle = bookList.querySelector(".text-container> h2").innerText;
    const bookWriter = bookList.querySelector(".text-container> h4").innerText;
    const bookDate = bookList.querySelector(".text-container> p").innerText;

    const newBook = makeBook(bookTitle, bookWriter, bookDate, false);
    const book = findBook(bookList[book_list_id]);
    book.is_readed = false;
    newBook[book_list_id] = book.id;

    bookUnread.append(newBook);
    bookList.remove();

    updateBook();
}

function removeFromReaded(bookList){
    const bookPosition = findBookIndex(bookList[book_list_id]);
    books.splice(bookPosition,1);

    bookList.remove();
    updateBook();
}

function makeButton(buttonClass, eventListener){
    const button = document.createElement("button");
    
    button.classList.add(buttonClass);
    
    button.addEventListener("click", function (event){
	eventListener(event);
    });

    return button;
}

function completedButton(){
    return makeButton("completed-btn", function(event){
        readedBook(event.target.parentElement);
    });
}

function deleteButton(){
    return makeButton("delete-btn", function(event){
        removeFromReaded(event.target.parentElement);
    });
}

function undoButton(){
    return makeButton("undo-btn", function(event){
        undoFromReaded(event.target.parentElement);
    });
}

function refreshBook(){
    const bookUnread = document.getElementById(unread_book_list_id);
    let listReadedBook = document.getElementById(readed_book_list_id);

    for (book of books){
        const newBook = makeBook(book.title, book.writer, book.date, book.is_readed);
        newBook[book_list_id] = book.id;

        if (book.is_readed){
            listReadedBook.append(newBook);
        } else{
            bookUnread.append(newBook);
        }
    }
}

