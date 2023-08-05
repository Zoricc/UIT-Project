document.querySelector(".kontakt-forma").addEventListener("submit", submitForm);

window.onload = checkFilm;

function submitForm(e){
    e.preventDefault();

    let ime = document.getElementById("ime").value;
    let prezime = document.getElementById("prezime").value;
    let naslov = document.getElementById("naslov").value;
    let poruka = document.getElementById("poruka").value;

    //document.querySelector(".kontakt-forma").reset();

    sendEmail(ime, prezime, naslov, poruka);
}

function sendEmail(ime, prezime, naslov, poruka){
    Email.send({
        Host: "smtp.gmail.com",
        Username: "jscriptmailsender@gmail.com",
        Password: "+v$^KjGHfTY9%[Rr",
        To: "markozoric53@gmail.com",
        From: "jscriptmailsender@gmail.com",
        Subject: `${ime} ${prezime} -- ${naslov}`,
        Body: `Naslov: ${naslov} <br/> Ime: ${ime} <br/> Prezime: ${prezime} <br/>  Poruka: ${poruka}`,
    }).then((message) => alert("Poruka uspešno poslata"));
}


function setFilm(element){
    window.localStorage.setItem("film", element.innerText.split('\n')[0]);
    window.open("rezervacije.html", "_self");
}

function checkFilm(){

    let movies = ["5zdBG-iGfes", "8g18jFHCLXk", "JfVOs4VSpmA", "PDejpiMuuSI", "CaimKeDcudo", "9ix7TUGVYIo", 
    "aXNJCPe7lcg", "0D2sJiseGQA", "4zH5iYM4wJo", "Q81Yf46Oj3s", "beToTslH17s", "BIhNsAtPbPI"];

    var film = localStorage.getItem("film");
    var options = document.getElementById("Film").options;
    for(var i = 0; i < options.length; i++){
        console.log(options[i].innerText);
        if(options[i].innerText == film){
            document.getElementById("Film").selectedIndex=i;
            document.getElementById("film-za-rezervaciju").src = "img/film"+ (+i + +1)+".jpg";
            document.getElementById("youtube-player").src = "https://www.youtube.com/embed/"+movies[i];
        }
    }
    
}

function changeImg(film){
    let movies = ["5zdBG-iGfes", "8g18jFHCLXk", "JfVOs4VSpmA", "PDejpiMuuSI", "CaimKeDcudo", "9ix7TUGVYIo", 
    "aXNJCPe7lcg", "0D2sJiseGQA", "4zH5iYM4wJo", "Q81Yf46Oj3s", "beToTslH17s", "BIhNsAtPbPI"];
    document.getElementById("film-za-rezervaciju").src = "img/film"+film.value+".jpg";
    document.getElementById("youtube-player").src = "https://www.youtube.com/embed/"+movies[film.value- +1];
}

function validate(){
    var valid = true;
    var inputs = document.getElementsByTagName('input');
    console.log(inputs)
    for (index = 0; index < inputs.length; index++) {
        if(!inputs[index].checkValidity()){
            valid = false;
            console.log(inputs[index].checkValidity());
            console.log(valid);
            inputs[index].classList.add("input-validate");
        }
    }
    if(valid) {
        rezervisi();  
    }  
}

function rezervisi(){
    if (localStorage.getItem("broj_rezervacije") === null) {
        localStorage.setItem("broj_rezervacije", 0);
    }

    var email = document.getElementById("email").value;
    var phone = document.getElementById("telefon").value;
    var film = document.getElementById("Film").options[document.getElementById("Film").value-1].innerText.replace(/\s/g, "_");
    var vreme = document.querySelector('input[name="vreme"]:checked').value;
    var broj_karata = document.getElementById("broj-karata").value;

    broj_rezervacije = window.localStorage.getItem("broj_rezervacije");

    broj_rezervacije = +broj_rezervacije + +1;

    console.log(email, phone, film, vreme, broj_karata);
    
    window.localStorage.setItem("rezervacija"+ +broj_rezervacije, email + " " + phone + " " + film + " " + vreme + " " + broj_karata);

    localStorage.setItem("broj_rezervacije", broj_rezervacije);

    alert("Karte uspesno rezervisane");
}

function kreirajTabelu() {
    const table = document.getElementById("lista-rezervacija");

    for(i = 1; i <= window.localStorage.getItem("broj_rezervacije"); i++){
        try {
            let rezervacija = window.localStorage.getItem("rezervacija"+ +i).split(" ");
        var email = rezervacija[0];
        var phone = rezervacija[1]+rezervacija[2]+rezervacija[3]+rezervacija[4];
        var film = rezervacija[5];
        var vreme = rezervacija[6]+":00";
        var broj_karata = rezervacija[7];

        let row = table.insertRow();
        row.insertCell(0).innerHTML = email;
        row.insertCell(1).innerHTML = phone;
        row.insertCell(2).innerHTML = film;
        row.insertCell(3).innerHTML = vreme;
        row.insertCell(4).innerHTML = broj_karata;
        row.insertCell(5).innerHTML = '<button class="glow-on-hover" onclick="ukloni('+i+')" id="row' + i +'">Ukloni</button>'} 
        catch (error) {
            console.error("pogresan_broj_rezervacije");
        }
        
    }
}

function ukloni(i){
    console.log("row"+i);
    button = document.getElementById("row"+i);
    cell = button.parentNode;
    row = cell.parentNode;
    row.parentNode.removeChild(row);
    window.localStorage.removeItem("rezervacija"+i);
}

function ukloniSVE(){
    document.getElementById('lista-rezervacija').innerHTML = "";
    localStorage.clear();
}

function open_close() {
    var x = document.getElementsByClassName("ddclosed")[0];
    if (x.className == "ddclosed") {
        x.className += " ddopen";
    }
    else{
        x.className = "ddclosed"
    }
}