import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Incantesimo } from '../../models/incantesimo.model';

import { Location } from '@angular/common';

@Component({
  selector: 'app-incantesimo-consulta',
  templateUrl: './incantesimo-consulta.page.html',
  styleUrls: ['./incantesimo-consulta.page.scss'],
})
export class IncantesimoConsultaPage implements OnInit {

  //model
  user = {} as User;
  incantesimo = {} as Incantesimo;

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
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getIncantesimoById(this.id);
  }

  //metodo che mi prende l'incantesimo attraverso il suo id
  async getIncantesimoById(id: string){
    
    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo l'incantesimo e lo modifico
    this.db.doc("incantesimi/"+id)
    .valueChanges()
    .subscribe(data => {
      this.incantesimo.nome = data["nome"];
      this.incantesimo.scuola = data["scuola"];
      this.incantesimo.descrizione = data["descrizione"];
      this.incantesimo.livello = data["livello"];
      this.incantesimo.raggio = data["raggio"];
      this.incantesimo.area = data["area"];
      this.incantesimo.durata = data["durata"];
      this.incantesimo.danno = data["danno"];
      this.incantesimo.dadiVita = data["dadiVita"];
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
      document.getElementById("livello").removeAttribute("readonly");
      document.getElementById("nome").removeAttribute("readonly");
      document.getElementById("scuola").removeAttribute("readonly");
      document.getElementById("descrizione").removeAttribute("readonly");
      document.getElementById("raggio").removeAttribute("readonly");
      document.getElementById("area").removeAttribute("readonly");
      document.getElementById("durata").removeAttribute("readonly");
      document.getElementById("danno").removeAttribute("readonly");
      document.getElementById("dadiVita").removeAttribute("readonly");

      document.getElementById("modifica").setAttribute("disabled","false");
    }
    else if(this.modifica == true){
      this.modifica = false;

      //rendo i campi input non editabili
      document.getElementById("livello").setAttribute("readonly", "readonly");
      document.getElementById("nome").setAttribute("readonly", "readonly");
      document.getElementById("scuola").setAttribute("readonly", "readonly");
      document.getElementById("descrizione").setAttribute("readonly", "readonly");
      document.getElementById("raggio").setAttribute("readonly", "readonly");
      document.getElementById("area").setAttribute("readonly", "readonly");
      document.getElementById("durata").setAttribute("readonly", "readonly");
      document.getElementById("danno").setAttribute("readonly", "readonly");
      document.getElementById("dadiVita").setAttribute("readonly", "readonly");

      document.getElementById("modifica").setAttribute("disabled","true");
    }
  }

  //metodo che modifica l'incantesimo
  async editIncantesimo(incantesimo: Incantesimo){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //modifico l'incantesimo poi faccio l'update nel db
    try {

      //creo il model incantesimo e aggiungo l'id dell'utente che lo sta modificando
      await this.db.doc("incantesimi/"+this.id).update({
          "idUser":       (await this.afAuth.currentUser).uid,
          "nome":         incantesimo.nome,
          "scuola":       incantesimo.scuola,
          "descrizione":  incantesimo.descrizione,
          "livello":      incantesimo.livello,
          "raggio":       incantesimo.raggio,
          "area":         incantesimo.area,
          "durata":       incantesimo.durata,
          "danno":        incantesimo.danno,
          "dadiVita":     incantesimo.dadiVita
      });

    } catch (error) {
      //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
      this.showToast(error);
    }

    //disabilito i campi editabili e il bottone
    this.modifica = false;
    document.getElementById("livello").setAttribute("readonly", "readonly");
    document.getElementById("nome").setAttribute("readonly", "readonly");
    document.getElementById("scuola").setAttribute("readonly", "readonly");
    document.getElementById("descrizione").setAttribute("readonly", "readonly");
    document.getElementById("raggio").setAttribute("readonly", "readonly");
    document.getElementById("area").setAttribute("readonly", "readonly");
    document.getElementById("durata").setAttribute("readonly", "readonly");
    document.getElementById("danno").setAttribute("readonly", "readonly");
    document.getElementById("dadiVita").setAttribute("readonly", "readonly");
    document.getElementById("modifica").setAttribute("disabled","true");

    //termina il caricamento
    (await loader).dismiss();

    //reindirizzo alla lista degli incantesimi
    this.navCtrl.navigateRoot("/incantesimo-consulta/"+this.id);

  }

  //controllo sui campi richiesti con specificazione di quale errore occorre
  formValidation(){

    //nome
    if(!this.incantesimo.nome){
      this.showToast("Inserisci il nome dell'incantesimo");
      return false;
    }
  
    //scuola
    if(!this.incantesimo.scuola){
      this.showToast("Inserisci la scuola di appartentenza dell'incantesimo");
      return false;
    }

    //descrizione
    if(!this.incantesimo.descrizione){
      this.showToast("Inserisci la descrizione dell'incantesimo");
      return false;
    }

    //livello
    if(!this.incantesimo.livello){
      this.showToast("Inserisci il livello dell'incantesimo");
      return false;
    }

    //raggio
    if(!this.incantesimo.raggio){
      this.showToast("Inserisci il raggio dell'incantesimo");
      return false;
    }

    //area
    if(!this.incantesimo.area){
      this.showToast("Inserisci l'area dell'incantesimo");
      return false;
    }

    //durata
    if(!this.incantesimo.durata){
      this.showToast("Inserisci la durata dell'incantesimo");
      return false;
    }

    //danno
    if(!this.incantesimo.danno){
      this.showToast("Inserisci il danno dell'incantesimo");
      return false;
    }

    //dadi vita
    if(!this.incantesimo.dadiVita){
      this.showToast("Inserisci i dadi vita dell'incantesimo");
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
