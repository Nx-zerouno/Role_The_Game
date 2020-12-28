import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Missione } from '../../models/missione.model';

import { Location } from '@angular/common';

@Component({
  selector: 'app-missione-consulta',
  templateUrl: './missione-consulta.page.html',
  styleUrls: ['./missione-consulta.page.scss'],
})
export class MissioneConsultaPage implements OnInit {

  //model
  user = {} as User;
  missione = {} as Missione;

  //variabili di comodo
  id: any;
  modifica: boolean;

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
    this.modifica = false;
    this.id = this.actRoute.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.getMissioneById(this.id);
  }

  //metodo che mi prende la missione attraverso il suo id
  async getMissioneById(id: string){
    
    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo la missione e lo modifico
    this.db.doc("missioni/"+id)
    .valueChanges()
    .subscribe(data => {
      this.missione.titolo = data["titolo"];
      this.missione.tipo = data["tipo"];
      this.missione.descrizione = data["descrizione"];

    });

    //termina il caricamento
    (await loader).dismiss();
  }

  //metodo che abilita / disabilita la modifica dei campi
  async abilitaDisabilitaModifica(){

    //se clicco per la prima volta su modifica mi sblocca i campi, se ci riclicco me li blocca
    if(this.modifica == false){
      this.modifica = true;

      //rendo i campi input editabili
      document.getElementById("titolo").removeAttribute("readonly");
      document.getElementById("tipo").removeAttribute("readonly");
      document.getElementById("descrizione").removeAttribute("readonly");

      document.getElementById("modifica").setAttribute("disabled","false");
    }
    else if(this.modifica == true){
      this.modifica = false;

      //rendo i campi input non editabili
      document.getElementById("titolo").setAttribute("readonly", "readonly");
      document.getElementById("tipo").setAttribute("readonly", "readonly");
      document.getElementById("descrizione").setAttribute("readonly", "readonly");

      document.getElementById("modifica").setAttribute("disabled","true");
    }
  }

  //metodo che modifica la missione
  async editMissione(missione: Missione){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //modifico la missione poi faccio l'update nel db
    try {

      //creo il model missione e aggiungo l'id dell'utente che lo sta modificando
      await this.db.doc("missioni/"+this.id).update({
          "idUser":             (await this.afAuth.currentUser).uid,
          "titolo":             missione.titolo,
          "tipo":               missione.tipo,
          "descrizione":        missione.descrizione,
          
      });

    } catch (error) {
      //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
      this.showToast(error);
    }

    //disabilito i campi editabili e il bottone
    this.modifica = false;
    document.getElementById("titolo").setAttribute("readonly", "readonly");
    document.getElementById("tipo").setAttribute("readonly", "readonly");
    document.getElementById("descrizione").setAttribute("readonly", "readonly");

    document.getElementById("modifica").setAttribute("disabled","true");

    //termina il caricamento
    (await loader).dismiss();

    //reindirizzo alla consultazione della missione
    this.navCtrl.navigateRoot("/missione-consulta/"+this.id);

  }

  //controllo sui campi richiesti con specificazione di quale errore occorre
  formValidation(){

    //titolo
    if(!this.missione.titolo){
      this.showToast("Inserisci il titolo della missione");
      return false;
    }
  
    //tipo
    if(!this.missione.tipo){
      this.showToast("Inserisci il tipo primaria/secondaria della missione");
      return false;
    }

    //descrizione
    if(!this.missione.descrizione){
      this.showToast("Inserisci la descrizione della missione");
      return false;
    }
  
    //è andato tutto a buon fine
    return true;
  }

  //mostra popup di errore
  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }

}
