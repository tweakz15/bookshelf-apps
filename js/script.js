document.addEventListener("DOMContentLoaded", function () {
 
    const submitInput = document.getElementById("form-input");
 
    submitInput.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if (storageExist()){
        loadBook();
    }
});

document.addEventListener("onsavedbook", ()=>{
    console.log("Data Sudah Disimpan");
});

document.addEventListener("onloadedbook", ()=>{
    refreshBook();
});



