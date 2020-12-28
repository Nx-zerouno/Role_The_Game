import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';

import { User } from '../../models/user.model';
import { TiraDadi } from '../../models/tiraDadi.model';

import { Location } from '@angular/common';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-tira-dadi',
  templateUrl: './tira-dadi.page.html',
  styleUrls: ['./tira-dadi.page.scss'],
})
export class TiraDadiPage implements OnInit {

  //model
  user = {} as User;
  tiraDadi = {} as TiraDadi;

  //variabili di comodo
  public storicoTiriVisualizza:boolean = true;
  id: any;
  tiri: any;

  constructor
  (
    private location: Location,
    private actRoute: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

    private db: AngularFirestore
  ) 
  {
    //valori di default se l'utente non clicca nulla e preme subito roll.
    this.tiraDadi.qtDadi="1";
    this.tiraDadi.tpDadi="d20";
    this.tiraDadi.modificatore="0";

    this.tiraDadi.risultato = "-";
  }

  async ngOnInit() {
    
  }

  //genera un tiro di dadi casuale in base all'input immesso dall'utente
  async roll(tiraDadi: TiraDadi){
    
    //creo un tiro casuale e lo registro nel model TiraDadi
    this.creaTiro(tiraDadi)

    //mostra nella view il tiro appena effettuato facendo un "refresh" del singolo elemento
    document.getElementById("display").setAttribute("visibility","false");
    document.getElementById("display").setAttribute("visibility","true");
  }

  //metodo che genera un tiro casuale e AGGIORNA IL MODEL TiraDadi IN LOCALE 
  async creaTiro(tiraDadi: TiraDadi){

    //dall'utente mi arriva qtDadi, tpDadi, modificatori,
    var max:        number;   
    var modInt:     number = +tiraDadi.modificatore;
    var numDadInt:  number = +tiraDadi.qtDadi;
    var segno;

    //identifico il tipo di dado e lo converto in un valore numerico
    switch (tiraDadi.tpDadi) {
      case "d4":
        max = 4;
        break;
      
      case "d6":
        max = 6;
        break;
    
      case "d8":
        max = 8;
        break;

      case "d12":
        max = 12;
        break;


      case "d20":
        max = 20;
        break;

      case "d100":
        max = 100;
        break;

      default:
        break;
    }

    //se il modificatore è positivo aggiungo il segno "+"
    if(modInt >= 0){segno="+";}else{segno="";}

    //creo randomicamente il risultato del tiro e lo strasformo in una stringa
    var tiroRisultatoInt = (numDadInt*(Math.floor(Math.random() * (max-1) + 1)))+modInt;
    var risultatoS = tiraDadi.qtDadi+tiraDadi.tpDadi+segno+tiraDadi.modificatore+" "+"="+" "+tiroRisultatoInt;

    //assemblo il risultato finale del tiro (IN FORMA 3d6+5 = 15)
    var tiroCompletoS = risultatoS;

    //risultato è solo il tiro con il risultato senza la data
    this.tiraDadi.risultato = tiroCompletoS;

  }
  

}
