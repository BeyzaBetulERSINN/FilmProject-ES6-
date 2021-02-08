const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);

    });

    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value; //title değerini alma
    const director = directorElement.value;// director değerini alma
    const url = urlElement.value; // url değerini alma

    if (title === "" || director === "" || url === ""){ //Girilen değerlerden herhangi biri boşsa
        // Hata 
        UI.displayMessages("Tüm alanları doldurun...","danger");

    }
    else {
        // Yeni Film Oluştururken
        const newFilm = new Film(title,director,url); //film.js deki constructor daki gibi oluşturuyorum.

        UI.addFilmToUI(newFilm); // Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme

        UI.displayMessages("Film başarıyla eklendi...","success");


    }


    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();//Bu formun submit edilmesini önlemek için 
}

function deleteFilm(e){

    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı...","success");

    }

}
function clearAllFilms(){

    if (confirm("Emin misiniz ?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();

    }
   

}