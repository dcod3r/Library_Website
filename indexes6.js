console.log('ES6 version of project');

class book{
    constructor(name,author,type) {
        this.name=name;
        this.author=author;
        this.type=type;
    }
}

class display{
    validate(book){
        if(book.name.length<2 || book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    }

    add(book){
        let tableBody=document.getElementById('tableBody');
        let uiString=`
        <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`;
        tableBody.innerHTML+= uiString;
    }

    clear(){
        let libraryForm=document.getElementById('libraryForm');
        libraryForm.reset();
    }

    show(type,message){
        let boldText;
        if(type==='success'){
            boldText='Success: ';
        }
        else{
            boldText='Error: ';
        }
        let msg=document.getElementById('msg');
        msg.innerHTML=`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <strong>${boldText}</strong>${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        setTimeout(() => {
            msg.innerHTML="";
        }, 5000);
    }
}

let libraryForm=document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);
function libraryFormSubmit(e) {
    let name=document.getElementById('bookName').value;
    let author=document.getElementById('Author').value;
    let type;
    let fiction=document.getElementById('fiction');
    let programming=document.getElementById('programming');
    let cooking=document.getElementById('cooking');
    if(fiction.checked){
        type=fiction.value;
    }
    else if(programming.checked){
        type=programming.value;
    }
    else if(cooking.checked){
        type=cooking.value;
    }

    let books=localStorage.getItem("bookList");
    if(books==null){
        booksObj=[];
    }
    else{
        booksObj=JSON.parse(books);
    }

    let obj={
        name:name,
        author:author,
        type:type
    }
    booksObj.push(obj);

    let Book=new book(name,author,type);
    console.log(Book);

    localStorage.setItem("bookList",JSON.stringify(booksObj));

    let Display=new display();
    if(Display.validate(Book)){
        Display.add(Book);
        Display.clear();
        Display.show('success','Your book has been successfully added');
    }
    else{
        Display.show('danger','You cannot add yoyr book.');
    }
    e.preventDefault();
}

