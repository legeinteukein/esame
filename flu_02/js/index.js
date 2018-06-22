// Daniele Tabellini @fupete © 2017 MIT License
// P5js retrieve data from Google Spreadsheets/JSON & make OOP | Firenze, IT | 4.2017
// Educational purpose, made for DSII2017 lab @UniRSM
// P5js gdoc example inspired on Gist https://gist.github.com/claytical/6a929f14964c867e07d8 by @claytical
// link del doc google spreasheets, deve essere pubblico su web,
// va copiato la parte di indice nell'url nel formato sotto:
// https://spreadsheets.google.com/feeds/list/
// + KEY_URL + /od6/public/values?alt=json
// carica da online
//https://docs.google.com/spreadsheets/d/e/2PACX-1vS7dhImG_eMZCQCmziTDAlphP2lvsZQHtYwQIh_b1WCrWnvoGrGFFH3wi_sYYRP4zvozVaBZiLXJlHI/pubhtml
//https://docs.google.com/spreadsheets/d/e/2PACX-1vS7dhImG_eMZCQCmziTDAlphP2lvsZQHtYwQIh_b1WCrWnvoGrGFFH3wi_sYYRP4zvozVaBZiLXJlHI/pubhtml
//1dYj_UHjd_WXFqHBNzIAWvk8UhDTEQ-RuzU_cFr2fxBc


var url = "https://spreadsheets.google.com/feeds/list/1dYj_UHjd_WXFqHBNzIAWvk8UhDTEQ-RuzU_cFr2fxBc/1/public/values?alt=json";
//var url = "https://spreadsheets.google.com/feeds/list/2PACX-1vQXBXKP9_a0jsq_GpOjSyjP1gI2LexMCMBWoqvaKynNJVd2mrsQZbas7ClWFBJawcCk6MKNh-by8OGN/od6/public/values?alt=json";
// oppure carica da file locale File/Save As...
//var url = "2010datidati/data/values.json";
var ogg = []; // < array di oggetti/classi
var grid = 0;
var ruota = true;

var valueClick = 1;



function setup() {
  pixelDensity(displayDensity());
  createCanvas(windowWidth, windowHeight);
  loadJSON(url, gotSpreadsheet, 'jsonp');   // richiedi i dati formato JSON e poi chiama la funzione gotSpreadsheet

  rectMode(CORNER);
  textFont("Raleway");


} // setup()
function draw() {



  // piccolo loop per verificare di avere i dati, stampa su schermo cerchi con i colori presenti nel google doc
  grid = width/(ogg.length+1);
  background(0,0,10);
  var co = color(0, 100, 80);

//  text("OBJECTS : " + ogg.length, 10,20); // < stampa il numero oggetti in alto a sx




 //stroke('grey');
 //noFill();
 //rect(190, 50, 50, 50);
 //fill(co);
 var t1 = text("2015", 200, 70);



//stroke('red');
//noFill();
//rect(390, 50, 50, 50);
//fill(co);
var t2 = text("2010", 400, 70);

//stroke('red');
//noFill();
// rect(590, 50, 50, 50);
  //fill(co);
  var t3 = text("2005", 600, 70);




  for (var i=0; i<ogg.length; i++) {   // (muovi e) mostra tutti gli oggetti
   // ogg[i].muovi();,
    ogg[i].mostra();
   }







} // draw()










function gotSpreadsheet(datiEsterni) {
  console.log(datiEsterni.feed.entry.length); // < debug, numero righe della tabella
  for (var i = 0; i < datiEsterni.feed.entry.length; i++) {
    // costruzione dell'oggetto singolo, la riga
    var c = {
                  // dati, nomi delle colonne, i parametri
                  //età  -  anni2015
                  "anni2015": datiEsterni.feed.entry[i].gsx$anni2015.$t,
                  //speranza di vita -  speranzadivita2015
                  "speranzadivita2015": datiEsterni.feed.entry[i].gsx$speranzadivita2015.$t,
                  //morti -  morti2015
                  "morti2015": datiEsterni.feed.entry[i].gsx$morti2015.$t,
                   //età  -  anni2010
                  "anni2010": datiEsterni.feed.entry[i].gsx$anni2010.$t,
                  //speranza di vita -  speranzadivita2010
                  "speranzadivita2010": datiEsterni.feed.entry[i].gsx$speranzadivita2010.$t,
                  //morti -  morti2010
                  "morti2010": datiEsterni.feed.entry[i].gsx$morti2010.$t,
                   //età  -  anni2005
                  "anni2005": datiEsterni.feed.entry[i].gsx$anni2005.$t,
                  //speranza di vita -  speranzadivita2005
                  "speranzadivita2005": datiEsterni.feed.entry[i].gsx$speranzadivita2005.$t,
                  //morti -  morti2005
                  "morti2005": datiEsterni.feed.entry[i].gsx$morti2005.$t,

              }


             //printLn(c);


    console.log(c); // < debug, verifica oggetto 1x1
    // e ora generiamo un nuovo oggetto classe "Oggetto"
  ogg.push(new Oggetto(i, c.anni2015, c.speranzadivita2015, c.morti2015,));
  // ogg.push(c);
  }
} // gotSpreadsheet(colori)
// DEFINIZIONE DELLA CLASSE OGGETTI "Oggetto"





function Oggetto(_id, _anni, _speranzav, _morti,/* _saturation, _brightness, _morti, _forma*/) {
  // DATI E COSTRUTTORE
  this.id = Number(_id); // < Number() converte in numero intero la stringa
  this.anni2015 = _anni;
  // < Number() converte in numero intero la stringa
  this.speranzadivita2015 = _speranzav;
  this.morti2015 =_morti;

  this.mostra = function() {

    noStroke();
    fill(255);
    textAlign(LEFT, CENTER);
    push();
    translate(grid + (this.id * grid),height/3);


    text(this.anni2015,-40,10,);

    rotate(PI/2);
    fill(255, 24, 10);
    text(this.morti2015,30,00);
    fill(25, 204, 100);
    text(this.speranzadivita2015,30,30);


    // disegna barrette
    rotate(3*PI/2);
    fill(25, 204, 100);
    rect(-38, 60, 10, this.speranzadivita2015);


    fill(255, 24, 10);
    rect(-8, 60, 10, this.morti2015);

    pop();

  }
}

// prova funzione per cambiiare dati per anno
//NON FUNZIONA

thi.mousePressed = function(){
  if (mouseX >= 50 && mouseX <= 100 && mouseY >=50  && mouseY <= 50) {
    push();


fill('red');
 rect(70, 70, 50, 50);




  }
}


//function mousePressed() {}


// se ridimensiona la finestra ricalcola width e height canvas
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
