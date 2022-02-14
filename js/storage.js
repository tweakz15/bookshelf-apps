const KEY_STORAGE = "BOOKSHELF_APPS";

let books = [];

function storageExist(){
    if(typeof(Storage) === undefined){
        alert('Browser tidak mendukung local storage');
        return false
    }
    return true;
}

function saveBook(){
    const parsedData = JSON.stringify(books);
    localStorage.setItem(KEY_STORAGE, parsedData);
    document.dispatchEvent(new Event("onsavedbook"));
}

function loadBook(){
    const serializedData = localStorage.getItem(KEY_STORAGE);
    let data = JSON.parse(serializedData);

    if(data !== null)
        books = data;
        document.dispatchEvent(new Event("onloadedbook"));        
}

function updateBook(){
    if(storageExist())
        saveBook();
}

function makeBookObject(title, writer, date, is_readed){
    return {
        id: +new Date(),
        title,
        writer,
        date,
        is_readed
    };
}

function findBook(bookID){
    for (book of books){
        if(book.id === bookID)
            return book;
    }
    return null;
}

function findBookIndex(bookID){
    let index = 0
    for (book of books){
        if(book.id === bookID)
            return index;
        
        index++;
    }

    return -1;
}