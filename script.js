var bazaPytanLatwe = [
    ["Na jaką chorobę psychiczną cierpi Kanye West?", "ADHD", "Schizofrenia", "Zaburzenie obsesyjno-kompulsyjne", "Choroba afektywna dwubiegunowa", 4],
    ["Który z raperów nie należał do grupy hip-hopowej Wu-Tang Clan?", "Nas", "Raekwon", "RZA", "Ghostface Killah", 1],
    ["Jak nazywa się lider i główny wokalista zespołu Radiohead?", "Fred Durst", "Roger Daltrey", "Thom Yorke", "Jack White", 3],
    ["Który z Beatles'ów grał na perkusji?", "John Lennon", "George Harrison", "Paul McCartney", "Ringo Starr", 4],
    ["Który z tych albumów zespołu Pink Floyd został wydany najpóźniej?", "The Wall", "Wish You Were Here", "The Dark Side of the Moon", "Animals", 1],
    ["Z ilu strun składa się standardowa gitara basowa?", "4", "5", "6", "7", 1]
];

var bazaPytanSrednie = [
    ["Z jakiego kraju pochodzi zespół a-ha, autorzy hitu Take on Me?", "Szwecja", "Norwegia", "Wielka Brytania", "Belgia", 2],
    ["W którym z tych filmów nie zagrał David Bowie?", "Prestiż", "Człowiek, który spadł na ziemię", "Labirynt", "Inni", 4],
    ["Ile lat miała Britney Spears, kiedy jej hit „Baby One More Time” ukazał się w 1998 roku?", "16", "17", "18", "19", 2],
    ["Który z tych pianistów jest przedstawicielem impresjonizmu?", "Claude Debussy", "Fryderyk Chopin", "Franz Liszt", "Ignacy Jan Paderewski", 1],
    ["Guy Berryman, Jon Buckland, Will Champion, Chris Martin to członkowie jakiego zespołu?", "Kiss", "Journey", "U2", "Coldplay", 4]
];

var bazaPytanTrudne = [
    ["Na jakim instrumencie grał Huey z Huey Lewis and the News?", "Harmonijka", "Gitara basowa", "Saksofon", "Flet", 1],
    ["Jaki gatunek muzyczny reprezentuje duet Beach House?", "Death metal", "Dream pop", "EDM", "Emo rap", 2],
    ["Której zasady nie musiały przestrzegać osoby uczestniczące w nagraniach albumu Kanye Westa pod tytułem My Beautiful Dark Twisted Fantasy?", "Zakaz robienia zdjęć", "Zakaz używania gitary akustycznej", "Zakaz noszenia hipsterskich kapeluszy", "Zakaz wnoszenia plecaków", 4],
    ["Ile oktaw obejmował zakres głosu wokalisty zespołu Queen, Freddie'ego Mercury'ego?", "2", "3", "4", "5", 3],
    ["Który symbol matematyczny nie znajduje się w żadnej nazwie albumu wokalisty Eda Sheerana?", "Dodawanie", "Odejmowanie", "Mnożenie", "Dzielenie", 2]
];

class Pytanie {
    constructor(poziomTrudnosci) {
//        this.pytanie = "Ile diamentów potrzeba, aby wytworzyć pełną diamentową zbroję?";
//        this.odpowiedz1 = "24"
//        this.odpowiedz2 = "25"
//        this.odpowiedz3 = "26"
//        this.odpowiedz4 = "27"
//        this.popOdpowiedz = 1;
        this.poziomTrudnosci = poziomTrudnosci;
        var bazaPytanAktualna;
        if (poziomTrudnosci==1) { //latwe pytania
            bazaPytanAktualna = bazaPytanLatwe;
        }
        else if (poziomTrudnosci==2) { //srednie pytania
            bazaPytanAktualna = bazaPytanSrednie;
        }
        else if (poziomTrudnosci==3) { //trudne pytania
            bazaPytanAktualna = bazaPytanTrudne;
        }
        else { //to sie nie powinno zdarzyc, just in case
            bazaPytanAktualna = bazaPytanLatwe;
        }

        //1-latwe, 2-srednie, 3-trudne
        var liczbaPytanwSumie;

        liczbaPytanwSumie = bazaPytanAktualna.length;
//        console.log(liczbaPytanwSumie);
        this.id = Math.floor(Math.random() * liczbaPytanwSumie); //generuje losową liczbę od 0 do (tyle ile jest pytań - 1), to jest id pytania, unikalne dla kazdego pytania wsrod pytan o tej samym poziomie trudnosci

        this.pytanie = bazaPytanAktualna[this.id][0];
        this.odpowiedz1 = bazaPytanAktualna[this.id][1];
        this.odpowiedz2 = bazaPytanAktualna[this.id][2];
        this.odpowiedz3 = bazaPytanAktualna[this.id][3];
        this.odpowiedz4 = bazaPytanAktualna[this.id][4];
        this.popOdpowiedz = bazaPytanAktualna[this.id][5];
    }
}

//robi sie gdy uzytkownik wcisnie przycisk zaczynajacy gre
function beginGame() {
    var startButton = document.getElementById("start-button");
    startButton.style.opacity = "0";

    //po polowie sekundy
    setTimeout(function() {
        startButton.style.visibility = "hidden";
        //pokazuje z powrotem rzeczy ukryte
        var main = document.getElementById("wrapper");
        main.style.visibility = "visible";
        main.style.opacity = "1";

        var strzalka = document.getElementById("strzalka");
        strzalka.style.visibility = "visible";
        strzalka.style.opacity = "1";
    }, 500);

}

//robi sie przy odpaleniu strony
function start() {
    wygenerujPytanie();
    printPytanie();
    updateProgizBoku();
    updateNapisPytanieZaX();
}

//odpala sie przy rozpoczeciu gry ponownie, po przegranej rozgrywce
function restartGame() {
//    alert("Oh shit, here we go again");

    //resetowanie do poczatkowych wartosci zmiennych
    pytania = [];
    nrPytania = 1;
    zuzytePolNaPol = false;
    zuzytyTelefon = false;
    zuzytaPublicznosc = false;
    jestAktualniePolNaPol = false;
    nrPozostalejOdpPoPolNaPol = 0;

    //zmiana do poczatkowego koloru tych przyciskow (zeby nie byly zielone czy czerwone)
    boxOdpowiedz1.style.background = "#06065e";
    boxOdpowiedz2.style.background = "#06065e";
    boxOdpowiedz3.style.background = "#06065e";
    boxOdpowiedz4.style.background = "#06065e";

    //ten przycisk ma znowu pierwotny napis i znowu tylko powoduje zamkniecie dialogu (a nie zrestartowanie gry)
    var przyciskDialogu = document.getElementById("powrot-z-dialogu");
    setTimeout(function() {
        przyciskDialogu.innerHTML = "Powrót";
    }, 500); //zmiana napisu sie dzieje dopiero po pol sekundy, gdyz przez ten okres czasu przycisk jest jeszcze widoczny w czasie wygaszania dialogu
    przyciskDialogu.onclick = function() {
        zamknijDialog();
    };

    //usun klase "zuzyte", zeby te przyciski kol ratunkowych nie byly takie przyciemnione
    document.getElementById("pol-na-pol").classList.remove("zuzyte");
    document.getElementById("telefon").classList.remove("zuzyte");
    document.getElementById("publicznosc").classList.remove("zuzyte");

    //te same rzeczy co sie na poczatku robia
    wygenerujPytanie();
    printPytanie();
    updateProgizBoku();
    updateNapisPytanieZaX();

}

//var pytanie1 = new Pytanie(69);

var pytania = [];

var nrPytania = 1;

var zuzytePolNaPol = false;
var zuzytyTelefon = false;
var zuzytaPublicznosc = false;

var jestAktualniePolNaPol = false; //czy aktualnie sa dostepne 2 odpowiedzi (czyli czy gracz uzyl w aktualnym pytaniu kolo pol na pol). To jest resetowane za kazdym razem jak sie przechodzi do nowego pytania. Jest po to, zeby przy telefonie do przyjaciela i publicznosci nie pokazywalo odpowiedzi ktore nie sa juz dostepne.

var nrPozostalejOdpPoPolNaPol = 0; //to jest tez po to samo jak wyzej. Jest resetowane do zera przy przejsciu do nastepnego pytania (tak na wszelki wypadek)

var jestDialog = false; //czy aktualnie jest na ekranie dymek (np telefon do przyjaciela czy publicznosc)

var jestAnimacja = false; //czy w tym momencie jest wykonywana animacja klikniecia odpowiedzi

var jestPrawyPasek = false; //czy aktualnie jest na ekranie ten pasek ktory wyjezdza z prawej strony, mowiacy jakie sa progi pieniezne (to ma zastosowanie tylko na urzadzeniach mobilnych, gdzie ten pasek jest na poczatku niewidoczny i mozna go wysunac)

//zlap elementy (divy) html
var boxPytanie = document.getElementById("pytanie");
var boxOdpowiedz1 = document.getElementById("odp1");
var boxOdpowiedz2 = document.getElementById("odp2");
var boxOdpowiedz3 = document.getElementById("odp3");
var boxOdpowiedz4 = document.getElementById("odp4");

function wygenerujPytanie() {

    var pytaniePotencjalne; //to taka temp zmienna

    do {
        //latwe pytania - od 1 do 4
        if((nrPytania>=1)&&(nrPytania<=4)) {
            pytaniePotencjalne = new Pytanie(1); //wylosuj pytanie randomowe latwe
        }
        //srednie pytania - od 1 do 4
        else if((nrPytania>=5)&&(nrPytania<=8)) {
            pytaniePotencjalne = new Pytanie(2); //wylosuj pytanie randomowe srednie
        }
        //latwe pytania - od 1 do 4
        else if((nrPytania>=9)&&(nrPytania<=12)) {
            pytaniePotencjalne = new Pytanie(3); //wylosuj pytanie randomowe trudne
        }
        //to nie powinno sie zdarzyc
        else {
            alert("no cos sie zjebalo");
        }
    } while(juzByloPytanie(pytaniePotencjalne));
    //jesli pytanie juz sie pojawilo to wylosuj jeszcze raz, az do skutku

    pytania.push(pytaniePotencjalne); //dodaj nowe pytanie do arraya

    console.log("poziom turdnosci tego pytanka: "+pytania[nrPytania-1].poziomTrudnosci);
    console.log("nr pytank tego: "+nrPytania);
}


//sprawdza czy dane wylosowane pytanie juz bylo wczesniej
function juzByloPytanie(pytanieMozliwe) {
    var liczbaPytan = pytania.length;

    //sprawdzamy po kolei kazde pytanie ktore bylo na razie czy jest takie samo
    for(var i=0; i<liczbaPytan; i++) {
        if ((pytanieMozliwe.id==pytania[i].id)&&(pytanieMozliwe.poziomTrudnosci==pytania[i].poziomTrudnosci)) {
            return true; //jesli id pytania wylosowanego z jakims poprzednim sie zgadza oraz maja ten sam poziom trudnosci (czyli to te same pytania) return true czyli ze juz bylo
        }
    }

    return false; //jesli zadne sie nie powtarza no to znaczy ze false

}

function printPytanie() {
    //pokaz na ekranie pytanie i odpowiedzi zgodnie z nrPytania (-1 jest bo nrPytania zaczyna sie od 1 a index arraya od 0)
    boxPytanie.innerHTML = pytania[nrPytania-1].pytanie;
    boxOdpowiedz1.innerHTML = pytania[nrPytania-1].odpowiedz1;
    boxOdpowiedz2.innerHTML = pytania[nrPytania-1].odpowiedz2;
    boxOdpowiedz3.innerHTML = pytania[nrPytania-1].odpowiedz3;
    boxOdpowiedz4.innerHTML = pytania[nrPytania-1].odpowiedz4;
}

function updateProgizBoku() {
    var progi = []; //tworzymy arraya ze wszystkimi divami ktore maja te progi z boku zeby zmieniac ich zawartosc
//    var i;
    for(i=1; i<=12; i++) {
        progi[i] = document.getElementById("prog"+i); //tutaj lapiemy te divy po kolei
    }
//    progi[5].innerHTML = "nowl";
    progi[nrPytania].classList.add("aktualny"); //numer pytania zmien wyglad na aktualne pytanie


    //dla kazdego pytania ktore juz przeszlismy (mniejsze niz numer obecnego) dajemy design osiagniety i dla pewnosci usuwamy aktualny
    for (i=1; i<nrPytania; i++) {
        progi[i].classList.add("osiagniety");
        progi[i].classList.remove("aktualny");
    }

    //to jest wtedy kiedy jest dopiero pierwsze pytanie, sluzy to temu, ze gdy gra jest resetowana (ktos przegral i zaczyna rozgrywke od nowa), aktualizuja sie wszystkie klasy i dzieki temu wszystkie te klocki wygladaja tak jak powinny, czyli tak jak jest oryginalnie w pliku html zapisane
    if (nrPytania==1) {
        progi[12].className = "prog gwarantowany";
        progi[11].className = "prog";
        progi[10].className = "prog";
        progi[9].className = "prog";
        progi[8].className = "prog";
        progi[7].className = "prog gwarantowany";
        progi[6].className = "prog";
        progi[5].className = "prog";
        progi[4].className = "prog";
        progi[3].className = "prog";
        progi[2].className = "prog gwarantowany";
        progi[1].className = "prog aktualny";
    }
}

function updateNapisPytanieZaX() {
    var napis = document.getElementById("pytanie-za-x");
    var prog = document.getElementById("prog" + nrPytania); //bierzesz prog z tyloma pieniedzmi w srodku, ile jest pytanie
    napis.innerHTML = ("Pytanie za " + prog.innerHTML);
}

function wyswietlDialogPoddania() {
    var wiadomoscDialog = "Czy na pewno chcesz się poddać?";
    var contentDiva = "Tak";
    var dialog = document.getElementById("dialog");
    var htmlDialogu = "<span id='pole-na-tekst'>Czy na pewno chcesz się poddać?</span><br><div id='poddac-tak' onclick='poddajeSie();'>Tak</div><div id='poddac-nie' onclick='niePoddajeSie();'>Nie</div>";

    dialog.innerHTML = htmlDialogu;

    pokazDialog();
}

function poddajeSie() {
    zamknijDialog();
    if (document.body.clientWidth < 768) {
        slide();
    }

    var dialog = document.getElementById("dialog");
    setTimeout(function() {
        dialog.innerHTML = '<span id="pole-na-tekst"></span><br><div id="powrot-z-dialogu" onclick="zamknijDialog();">Powrót</div>';
        //reset tego diva (dialogu) do domyslnego

        var poleNaTekst = document.getElementById("pole-na-tekst");

        // pobierz diva (z paska bocznego) z progiem który zawiera w sobie kwotę którą już wygrałeś (czyli aktualne pytanie minus 1)
        var prog = document.getElementById("prog" + (nrPytania-1));

        //ustaw kwote wygrana, czyli pobierz zawartosc tego diva (jesli sie udalo zczytac, czyli jesli nrPytania nie byl rowny 1, bo wtedy by pobralo diva "prog0", a nie ma takiego. Jesli wlasnie jest pierwsze pytanie, to ustawia wygrana na 0 zl)
        var wygrana;
        if (prog!=null) {
            wygrana = prog.innerHTML;
        } else {
            //alert("no siema");
            wygrana = "0 zł";
        }

        poleNaTekst.innerHTML = 'Gratulacje! Twoja wygrana to<br><br><span style="font-size: 24px; font-weight: 700;">' + wygrana + '</span>';
        //ustaw wiadomosc w divie

        var przyciskWDialogu = document.getElementById("powrot-z-dialogu");
        przyciskWDialogu.innerHTML = "Zagraj jeszcze raz";
        przyciskWDialogu.onclick = function() {
            restartGame();
            zamknijDialog();
        };
        //ustaw przycisk w dialogu, zeby mial odpowiedni napis oraz zeby restartowal gre

        pokazDialog();
    }, 500);
}

function niePoddajeSie() {
    zamknijDialog();

    var dialog = document.getElementById("dialog");
    setTimeout(function() {
        //przywrocenie domyslnego widoku dialogu
        dialog.innerHTML = '<span id="pole-na-tekst"></span><br><div id="powrot-z-dialogu" onclick="zamknijDialog();">Powrót</div>';
    }, 500);
}

//ta funkcja jest wywoływana po kliknięciu na przycisk odpowiedzi (o numerze num)
function klikOdp(num) {
    if ((!jestDialog)&&(!jestAnimacja)&&(!jestPrawyPasek)) {
        if (num>=1&&num<=4) {
            if (num==pytania[nrPytania-1].popOdpowiedz) {
                clickAnimacja(num);
                setTimeout(function() {
                    poprawnaOdpowiedz();
                }, 6500);
            } else {
                clickAnimacja(num)
                setTimeout(function() {
                    zlaOdpowiedz();
                }, 8500);
            }
        }
    }
}

function poprawnaOdpowiedz() {
//    alert("jest gites");
    if (nrPytania < 12) {
        jestAktualniePolNaPol = false;
        nrPozostalejOdpPoPolNaPol = 0;
        nrPytania++;
        wygenerujPytanie();
        printPytanie();
        updateProgizBoku();
        updateNapisPytanieZaX();
        naprawPoPolNaPol();
    } else { //wygrana miliona zlociszy
//        alert("gratki mordo, wygrales talon");
        naprawPoPolNaPol();

        var poleNaTekst = document.getElementById("pole-na-tekst");
        poleNaTekst.innerHTML = 'Gratulacje! Twoja wygrana to<br><br><span style="font-size: 24px; font-weight: 700;">1000000 zł</span>';
        //ustaw wiadomosc w divie

        var przyciskWDialogu = document.getElementById("powrot-z-dialogu");
        przyciskWDialogu.innerHTML = "Zagraj jeszcze raz";
        przyciskWDialogu.onclick = function() {
            restartGame();
            zamknijDialog();
        };
        //ustaw przycisk w dialogu, zeby mial odpowiedni napis oraz zeby restartowal gre

        pokazDialog();
    }
}

function zlaOdpowiedz() {
//    alert("oopsie :(")
    naprawPoPolNaPol();

    var poleNaTekst = document.getElementById("pole-na-tekst");
    poleNaTekst.innerHTML = 'Niestety, przegrałeś. Twoja ostateczna wygrana to<br><br><span style="font-size: 24px; font-weight: 700;">' + ostatecznaWygranaKwota() + " zł</span>";
    //ustaw wiadomosc w divie

    var przyciskWDialogu = document.getElementById("powrot-z-dialogu");
    przyciskWDialogu.innerHTML = "Zagraj jeszcze raz";
    przyciskWDialogu.onclick = function() {
        restartGame();
        zamknijDialog();
    };
    //ustaw przycisk w dialogu, zeby mial odpowiedni napis oraz zeby restartowal gre

    pokazDialog();
}

function ostatecznaWygranaKwota() {
    //funkcja zwraca ile pieniedzy ostatecznie wygrywasz po tym jak odpowiesz w koncu zle na pytanie (a nie kiedy sie poddasz)
    var kwota;
    if (nrPytania>12) {
        kwota = 1000000;
    }
    else if (nrPytania>7) {
        kwota = 40000;
    }
    else if (nrPytania>2) {
        kwota = 1000;
    }
    else {
        kwota = 0;
    }
    return kwota;
}

//animacja klikniecia odpowiedzi
function clickAnimacja(num) {
    jestAnimacja = true; //rozpoczecie animacji

    var box;
    if (num==1) {
        box = boxOdpowiedz1;
    }
    else if (num==2) {
        box = boxOdpowiedz2;
    }
    else if (num==3) {
        box = boxOdpowiedz3;
    }
    else if (num==4) {
        box = boxOdpowiedz4;
    }

    var popBox; //box z poprawna odpowiedzia (gdyby ta wybrana przez usera byla zla)
    var nrPopOdp = pytania[nrPytania-1].popOdpowiedz;
    if (nrPopOdp==1) {
        popBox = boxOdpowiedz1;
    }
    else if (nrPopOdp==2) {
        popBox = boxOdpowiedz2;
    }
    else if (nrPopOdp==3) {
        popBox = boxOdpowiedz3;
    }
    else if (nrPopOdp==4) {
        popBox = boxOdpowiedz4;
    }

    setTimeout(function() {
        box.style.background = "#06069e";
    }, 250);

    setTimeout(function() {
        box.style.background = "#06065e";
    }, 1000);

    setTimeout(function() {
        box.style.background = "#06069e";
    }, 2000);

    setTimeout(function() {
        box.style.background = "#06065e";
    }, 2750);

    setTimeout(function() {
        if(num==pytania[nrPytania-1].popOdpowiedz){
            //poprawna odp
            box.style.background = "#008800";
        } else {
            //niepoprawna odp
            box.style.background = "#880000";
            setTimeout(function() {
                popBox.style.background = "#008800";
                //pokaz ktora odp byla poprawna
            }, 2000);
        }
    }, 3750);

    if (num==pytania[nrPytania-1].popOdpowiedz) {
        //jesli jest poprawna odpowiedz wybrana
        setTimeout(function() {
            box.style.background = "#06065e";
            jestAnimacja = false; //koniec animacji
        }, 6500);
    } else {
        //jesli zla odpowiedz jest wybrana
        console.log("noeluwina zla odp");
        setTimeout(function() {
//            box.style.background = "#06065e";
//            popBox.style.background = "#06065e";
            jestAnimacja = false; //koniec animacji
        }, 8500);
        //to trwa o 2 sekundy dluzej, bo musi byc jeszcze pokazana (oprocz wybranej odpowiedzi) ktora odpowiedz byla prawidlowa (co zajmuje 2 dodatkowe sekundy, jak widac wyzej)
    }
}

function slide() {
    if ((!jestDialog)&&(!jestAnimacja)) {
        var ilekasyDiv = document.getElementById("ilekasy");
        var strzalkaDiv = document.getElementById("strzalka");
        //jesli nie ma transformacji to przesun, jesli jest usun transformacje (przesuniecie)
        if (ilekasyDiv.style.transform == "") {
            ilekasyDiv.style.transform = "translate(-100%,0)";
            strzalkaDiv.innerHTML = "&#9658;" //zmiana strzalki
            jestPrawyPasek = true;// zmiana zmiennej, czyli jest pasek
        } else {
            ilekasyDiv.style.transform = "";
            strzalkaDiv.innerHTML = "&#9664;" //zmiana strzalki
            jestPrawyPasek = false; //zmiana tej zmiennej czyli nie ma paska
        }
    }
}

function polNaPol(element) {
    if(!zuzytePolNaPol) {
        if ((!jestDialog)&&(!jestAnimacja)&&(!jestPrawyPasek)) {
            var poprawnaOdpowiedz = pytania[nrPytania-1].popOdpowiedz; //tak dla ulatwienia

            var pozostalaOdpowiedz;
            do {
                pozostalaOdpowiedz = Math.floor(Math.random()*4)+1;
            } while(pozostalaOdpowiedz==poprawnaOdpowiedz);
            //wylosuj liczbe od 1 do 4 (nr zlej odpowiedzi ktora nie odpadnie) no chyba ze to jest poprawna odpowiedz, to losuj do skutku

            //odrzuc boxy ktore nie sa ani poprawna odpowiedzia, ani wylosowana pozostala odpowiedzia
            if ((poprawnaOdpowiedz!=1)&&(pozostalaOdpowiedz!=1)) {
                boxOdpowiedz1.innerHTML = "";
                boxOdpowiedz1.onclick = "";
            }
            if ((poprawnaOdpowiedz!=2)&&(pozostalaOdpowiedz!=2)) {
                boxOdpowiedz2.innerHTML = "";
                boxOdpowiedz2.onclick = "";
            }
            if ((poprawnaOdpowiedz!=3)&&(pozostalaOdpowiedz!=3)) {
                boxOdpowiedz3.innerHTML = "";
                boxOdpowiedz3.onclick = "";
            }
            if ((poprawnaOdpowiedz!=4)&&(pozostalaOdpowiedz!=4)) {
                boxOdpowiedz4.innerHTML = "";
                boxOdpowiedz4.onclick = "";

            }

            jestAktualniePolNaPol = true;
            nrPozostalejOdpPoPolNaPol = pozostalaOdpowiedz;
            zuzytePolNaPol = true;
            element.classList.add("zuzyte");
        }
    }
}

//zeby z powrotem dalo sie klikac w boxy po uzyciu pol na pol
function naprawPoPolNaPol() {
    boxOdpowiedz1.onclick = function() {klikOdp(1)};
    boxOdpowiedz2.onclick = function() {klikOdp(2)};
    boxOdpowiedz3.onclick = function() {klikOdp(3)};
    boxOdpowiedz4.onclick = function() {klikOdp(4)};
}

function telefon(element) {
    if (!zuzytyTelefon){
        if ((!jestDialog)&&(!jestAnimacja)&&(!jestPrawyPasek)) {
            var nrPoprawnejOdpowiedzi = pytania[nrPytania-1].popOdpowiedz;
            var nrRandZlejOdpowiedzi;
            do {
                var rand4 = Math.floor(Math.random()*4)+1;
                nrRandZlejOdpowiedzi = rand4;
            } while(nrRandZlejOdpowiedzi==nrPoprawnejOdpowiedzi);
            //wylosuj liczbe od 1 do 4 tak dlugo az bedzie rozna od numeru poprawnej odpowiedzi
            if(jestAktualniePolNaPol) {
                nrRandZlejOdpowiedzi = nrPozostalejOdpPoPolNaPol;
            }
            //jesli bylo uzyte kolo pol na pol w tym samym pytaniu, to oczywiscie ta zla odpowiedz musi byc tą drugą pozostałą, no bo inaczej nie ma to sensu

            var rand = Math.floor(Math.random()*10)+1; //losowa liczba od 1 do 10
            console.log("rand od 1 do 10: " + rand);

            var literkaPopOdp;
            if(nrPoprawnejOdpowiedzi==1) literkaPopOdp="A";

            // do tej zmiennej jest przypisana tresc pooprawnej odpowiedzi
            var trescPopOdp;
            if(nrPoprawnejOdpowiedzi==1) {
                trescPopOdp = pytania[nrPytania-1].odpowiedz1;
            }
            if(nrPoprawnejOdpowiedzi==2) {
                trescPopOdp = pytania[nrPytania-1].odpowiedz2;
            }
            if(nrPoprawnejOdpowiedzi==3) {
                trescPopOdp = pytania[nrPytania-1].odpowiedz3;
            }
            if(nrPoprawnejOdpowiedzi==4) {
                trescPopOdp = pytania[nrPytania-1].odpowiedz4;
            }
            console.log("trescpopodp: " + trescPopOdp);

            //do tej zmiennej jest przypisana tresc losowej zlej odpowiedzi (w przypadku gdy przyjaciel jednak sie pomyli)
            var trescRandZlejOdp;
            if(nrRandZlejOdpowiedzi==1) {
                trescRandZlejOdp = pytania[nrPytania-1].odpowiedz1;
            }
            if(nrRandZlejOdpowiedzi==2) {
                trescRandZlejOdp = pytania[nrPytania-1].odpowiedz2;
            }
            if(nrRandZlejOdpowiedzi==3) {
                trescRandZlejOdp = pytania[nrPytania-1].odpowiedz3;
            }
            if(nrRandZlejOdpowiedzi==4) {
                trescRandZlejOdp = pytania[nrPytania-1].odpowiedz4;
            }
            console.log("tresc zlej odp: " + trescRandZlejOdp);

            var wiadomoscDialog;

            var tempRand = Math.floor(Math.random()*4)+1;
            //losowa liczba calkowita od 1 do 4 (do określenia czy ma sie pokazac dobra czy zla odpowiedz)
            console.log("temp rand (od 1 do 4): " + tempRand);

            console.log("poziom trudnosci: " + pytania[nrPytania-1].poziomTrudnosci);
            //latwe pytania
            if(pytania[nrPytania-1].poziomTrudnosci==1) {
                switch(rand) {
                    case 1: case 2: case 3: case 4:
                        //100% pewnosci
                        wiadomoscDialog = 'Jestem pewien, że "' + trescPopOdp + '" to poprawna odpowiedz.';
                        break;
                    case 5: case 6: case 7:
                        //75% pewnosci
                        if(tempRand==1) {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescRandZlejOdp + ' to prawidłowa odpowiedź.';
                        } else {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescPopOdp + '" to prawidłowa odpowiedź.';
                        }
                        break;
                    case 8: case 9:
                        //50% pewnosci
                        if((tempRand==1)||(tempRand==2)) {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescRandZlejOdp + '".';
                        } else {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescPopOdp + '".';
                        }
                        break;
                    case 10:
                        //25% pewnosci (czyli nie wiadomo)
                        wiadomoscDialog = "Niestety, nie mam pojęcia, nic mi to pytanie nie mówi.";
                        break;
                }

            }

            //srednie pytania
            else if(pytania[nrPytania-1].poziomTrudnosci==2) {
                switch(rand) {
                    case 1: case 2: case 3:
                        //100% pewnosci
                        wiadomoscDialog = 'Jestem pewien, że "' + trescPopOdp + '" to poprawna odpowiedz.';
                        break;
                    case 4: case 5:
                        //75% pewnosci
                        if(tempRand==1) {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescRandZlejOdp + ' to prawidłowa odpowiedź.';
                        } else {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescPopOdp + '" to prawidłowa odpowiedź.';
                        }
                        break;
                    case 6: case 7: case 8:
                        //50% pewnosci
                        if((tempRand==1)||(tempRand==2)) {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescRandZlejOdp + '".';
                        } else {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescPopOdp + '".';
                        }
                        break;
                    case 9: case 10:
                        //25% pewnosci (czyli nie wiadomo)
                        wiadomoscDialog = "Niestety, nie mam pojęcia, nic mi to pytanie nie mówi.";
                        break;
                }
            }
            //trudne pytania
            else if(pytania[nrPytania-1].poziomTrudnosci==3) {
                switch(rand) {
                    case 1:
                        //100% pewnosci
                        wiadomoscDialog = 'Jestem pewien, że "' + trescPopOdp + '" to poprawna odpowiedz.';
                        break;
                    case 2: case 3:
                        //75% pewnosci
                        if(tempRand==1) {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescRandZlejOdp + ' to prawidłowa odpowiedź.';
                        } else {
                            wiadomoscDialog = 'Wydaje mi się, że "' + trescPopOdp + '" to prawidłowa odpowiedź.';
                        }
                        break;
                    case 4: case 5: case 6: case 7:
                        //50% pewnosci
                        if((tempRand==1)||(tempRand==2)) {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescRandZlejOdp + '".';
                        } else {
                            wiadomoscDialog = 'Trudno powiedzieć, ale strzelałbym w odpowiedź "' + trescPopOdp + '".';
                        }
                        break;
                    case 8: case 9: case 10:
                        //25% pewnosci (czyli nie wiadomo)
                        wiadomoscDialog = "Niestety, nie mam pojęcia, nic mi to pytanie nie mówi.";
                        break;
                }
            }
            //to sie nie powinno zdarzyc
            else {
                alert("oopsie, chyba mamy jakiegos errora :(")
            }

            var poleNaTekst = document.getElementById("pole-na-tekst");
            poleNaTekst.innerHTML = wiadomoscDialog;
            //ustaw wiadomosc w divie

            console.log("wiadomosc: " + wiadomoscDialog);

            pokazDialog();
            zuzytyTelefon = true;
            element.classList.add("zuzyte");
        }
    }

}

function pokazDialog() {
    var dialog = document.getElementById("dialog");
    jestDialog = true;

    dialog.style.visibility = "visible";
    dialog.style.opacity = "1";

    document.getElementById("main").style.opacity = "0.2"; //przyciemnij tlo, czyli
    document.getElementById("ilekasy-css").style.opacity = "0.2"; //te progi z boku tez warto przyciemnic cnie

}

function zamknijDialog() {
    var dialog = document.getElementById("dialog");
    jestDialog = false;

//    dialog.style.visibility = "hidden";
    dialog.style.opacity = "0";
    document.getElementById("main").style.opacity = "1";
    document.getElementById("ilekasy-css").style.opacity = "1";
    setTimeout(function() {
        dialog.style.visibility = "hidden";
    }, 500); //po pol sekundy juz nie jest widoczne i nie przeszkadza w klikaniu odpowiedzi
}

function publicznosc(element) {
    if (!zuzytaPublicznosc) {
        if ((!jestDialog)&&(!jestAnimacja)&&(!jestPrawyPasek)) {
            var odp1Procent = 0;
            var odp2Procent = 0;
            var odp3Procent = 0;
            var odp4Procent = 0;

            var wiadomoscDialog;
            var bonusPopOdp; //to okresla, ile procent jest "zapewnionych" co najmniej dla poprawnej odpowiedzi (to zalezy od poziomu trudnosci)
            //ogolnie ten algorytm dziala tak, ze poprawna odpowiedz otrzymuje x procent z gory, a reszta procent (100%-x%) zostaje rozdzielona losowo za pomoca funkcji nizej


            if(!jestAktualniePolNaPol) {
                //przydzielenie bonusu w zaleznosci od poziomu trudnosci
                switch(pytania[nrPytania-1].poziomTrudnosci) {
                    case 1:
                        bonusPopOdp = 30;
                        break;
                    case 2:
                        bonusPopOdp = 20;
                        break;
                    case 3:
                        bonusPopOdp = 10;
                        break;
                    default:
                        //to sie nie powinno zdarzyc
                        bonusPopOdp = 0;
                        break;
                }
                console.log("poziom trudnosci: "+pytania[nrPytania-1].poziomTrudnosci);
                console.log("bonus pop odp: "+ bonusPopOdp);

                if(pytania[nrPytania-1].popOdpowiedz==1) {
                    odp1Procent = bonusPopOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==2) {
                    odp2Procent = bonusPopOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==3) {
                    odp3Procent = bonusPopOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==4) {
                    odp4Procent = bonusPopOdp;
                }

                console.log("odp1:"+odp1Procent+"odp2:"+odp2Procent+"odp3:"+odp3Procent+"odp4:"+odp4Procent);

                //wylosuj 4 liczby, aby ich suma dopelnila do tych 100 (wliczajac bonus)
                var randoms = fourRandomNumbersWithSum(100-bonusPopOdp);
                //no i tutaj dodaj te liczby do wynikow (jeden z tych wynikow ma juz bonus)
                odp1Procent += randoms[0];
                odp2Procent += randoms[1];
                odp3Procent += randoms[2];
                odp4Procent += randoms[3];
            } else {
                //jesli sa dostepne tylko 2 odpowiedzi (czyli bylo po na pol w tym pytaniu)

                switch(pytania[nrPytania-1].poziomTrudnosci) {
                    case 1:
                        bonusPopOdp = 60;
                        break;
                    case 2:
                        bonusPopOdp = 45;
                        break;
                    case 3:
                        bonusPopOdp = 30;
                        break;
                    default:
                        //to sie nie powinno zdarzyc
                        bonusPopOdp = 0;
                        break;
                }

                var tempProcentZlejOdp = Math.random()*(100-bonusPopOdp); //losuj ile % ma miec ta zla odpowiedz, moze miec max (100-bonus)%

                console.log(tempProcentZlejOdp);

                if(nrPozostalejOdpPoPolNaPol==1) {
                    odp1Procent = tempProcentZlejOdp;
                }
                else if(nrPozostalejOdpPoPolNaPol==2) {
                    odp2Procent = tempProcentZlejOdp;
                }
                else if(nrPozostalejOdpPoPolNaPol==3) {
                    odp3Procent = tempProcentZlejOdp;
                }
                else if(nrPozostalejOdpPoPolNaPol==4) {
                    odp4Procent = tempProcentZlejOdp;
                }

                //ta poprawna odpwiedz ma miec tyle, zeby suma obu odpowiedzi byla rowna 100
                if(pytania[nrPytania-1].popOdpowiedz==1) {
                    odp1Procent = 100 - tempProcentZlejOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==2) {
                    odp2Procent = 100 - tempProcentZlejOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==3) {
                    odp3Procent = 100 - tempProcentZlejOdp;
                }
                else if(pytania[nrPytania-1].popOdpowiedz==4) {
                    odp4Procent = 100 - tempProcentZlejOdp;
                }

                console.log("odp1:"+odp1Procent+"odp2:"+odp2Procent+"odp3:"+odp3Procent+"odp4:"+odp4Procent);
            }

            //zaokraglenie do 2 miejsc po przecinku
            odp1Procent = Math.round(odp1Procent*100)/100;
            odp2Procent = Math.round(odp2Procent*100)/100;
            odp3Procent = Math.round(odp3Procent*100)/100;
            odp4Procent = Math.round(odp4Procent*100)/100;

            wiadomoscDialog = "Głosowanie publiczności:<br><br>Odp A: " + odp1Procent + "%<br>Odp B: " +odp2Procent + "%<br>Odp C: " + odp3Procent + "%<br>Odp D: " + odp4Procent + "%";

            var poleNaTekst = document.getElementById("pole-na-tekst");
            poleNaTekst.innerHTML = wiadomoscDialog;
            //ustaw wiadomosc w divie
            console.log("odp1:"+odp1Procent+"odp2:"+odp2Procent+"odp3:"+odp3Procent+"odp4:"+odp4Procent);

            pokazDialog();
            zuzytaPublicznosc = true;
            element.classList.add("zuzyte");
        }
    }
}

//generuje 4 losowe liczby, ktorych suma jest stala
function fourRandomNumbersWithSum(sum) {
    var tablica = [];
    var temp1, temp2, temp3, temp4;
    //4 losowe liczby od 0 do 1
    temp1 = Math.random();
    temp2 = Math.random();
    temp3 = Math.random();
    temp4 = Math.random();
    sumaTemp = temp1 + temp2 + temp3 + temp4;

    //przeskalowanie losowych liczb, zeby suma sie zgadzala
    tablica[0] = temp1/sumaTemp*sum;
    tablica[1] = temp2/sumaTemp*sum;
    tablica[2] = temp3/sumaTemp*sum;
    tablica[3] = temp4/sumaTemp*sum;
    console.log(tablica[0]+ " " + tablica[1]+" "+tablica[2]+" "+tablica[3]);
    return tablica;
}

window.onload = start;
