import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Personaggio } from '../../models/personaggio.model';

import { Location } from '@angular/common';

@Component({
  selector: 'app-personaggio-consulta',
  templateUrl: './personaggio-consulta.page.html',
  styleUrls: ['./personaggio-consulta.page.scss'],
})
export class PersonaggioConsultaPage implements OnInit {

  //model
  user = {} as User;
  personaggio = {} as Personaggio;

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
    this.getPersonaggioById(this.id);
  }

  //metodo che mi prende il personaggio attraverso il suo id
  async getPersonaggioById(id: string){
    
    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo il personaggio e lo modifico
    this.db.doc("personaggi/"+id)
    .valueChanges()
    .subscribe(data => {
      this.personaggio.nome = data["nome"];
      this.personaggio.razza = data["razza"];
      this.personaggio.classe = data["classe"];
      this.personaggio.livello = data["livello"];
      this.personaggio.sesso = data["sesso"];
      this.personaggio.eta = data["eta"];
      this.personaggio.altezza = data["altezza"];
      this.personaggio.peso = data["peso"];
      this.personaggio.capelli = data["capelli"];
      this.personaggio.occhi = data["occhi"];
      this.personaggio.patria = data["patria"];
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
      document.getElementById("nome").removeAttribute("readonly");
      document.getElementById("razza").removeAttribute("readonly");
      document.getElementById("classe").removeAttribute("readonly");
      document.getElementById("livello").removeAttribute("readonly");
      document.getElementById("sesso").removeAttribute("readonly");
      document.getElementById("eta").removeAttribute("readonly");
      document.getElementById("altezza").removeAttribute("readonly");
      document.getElementById("peso").removeAttribute("readonly");
      document.getElementById("capelli").removeAttribute("readonly");
      document.getElementById("occhi").removeAttribute("readonly");
      document.getElementById("patria").removeAttribute("readonly");

      document.getElementById("modifica").setAttribute("disabled","false");
    }
    else if(this.modifica == true){
      this.modifica = false;

      //rendo i campi input non editabili
      document.getElementById("nome").setAttribute("readonly", "readonly");
      document.getElementById("razza").setAttribute("readonly", "readonly");
      document.getElementById("classe").setAttribute("readonly", "readonly");
      document.getElementById("livello").setAttribute("readonly", "readonly");
      document.getElementById("sesso").setAttribute("readonly", "readonly");
      document.getElementById("eta").setAttribute("readonly", "readonly");
      document.getElementById("altezza").setAttribute("readonly", "readonly");
      document.getElementById("peso").setAttribute("readonly", "readonly");
      document.getElementById("capelli").setAttribute("readonly", "readonly");
      document.getElementById("occhi").setAttribute("readonly", "readonly");
      document.getElementById("patria").setAttribute("readonly", "readonly");

      document.getElementById("modifica").setAttribute("disabled","true");
    }
  }

  //metodo che modifica il personaggio
  async editPersonaggio(personaggio: Personaggio){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //modifico il personaggio poi faccio l'update nel db
    try {

      //creo il model personaggio e aggiungo l'id dell'utente che lo sta modificando
      await this.db.doc("personaggi/"+this.id).update({
          "idUser":       (await this.afAuth.currentUser).uid,
          "nome":         personaggio.nome,
          "razza":        personaggio.razza,
          "classe":       personaggio.classe,
          "livello":      personaggio.livello,
          "sesso":        personaggio.sesso,
          "eta":          personaggio.eta,
          "altezza":      personaggio.altezza,
          "peso":         personaggio.peso,
          "capelli":      personaggio.capelli,
          "occhi":        personaggio.occhi,
          "patria":       personaggio.patria
      });

    } catch (error) {
      //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
      this.showToast(error);
    }

    //disabilito i campi editabili e il bottone
    this.modifica = false;
    document.getElementById("nome").setAttribute("readonly", "readonly");
    document.getElementById("razza").setAttribute("readonly", "readonly");
    document.getElementById("classe").setAttribute("readonly", "readonly");
    document.getElementById("livello").setAttribute("readonly", "readonly");
    document.getElementById("sesso").setAttribute("readonly", "readonly");
    document.getElementById("eta").setAttribute("readonly", "readonly");
    document.getElementById("altezza").setAttribute("readonly", "readonly");
    document.getElementById("peso").setAttribute("readonly", "readonly");
    document.getElementById("capelli").setAttribute("readonly", "readonly");
    document.getElementById("occhi").setAttribute("readonly", "readonly");
    document.getElementById("patria").setAttribute("readonly", "readonly");

    document.getElementById("modifica").setAttribute("disabled","true");

    //termina il caricamento
    (await loader).dismiss();

    //reindirizzo alla consultazione del personaggio
    this.navCtrl.navigateRoot("/personaggio-consulta/"+this.id);

  }

  //controllo sui campi richiesti con specificazione di quale errore occorre
  formValidation(){

    //nome
    if(!this.personaggio.nome){
      this.showToast("Inserisci il nome del personaggio");
      return false;
    }
  
    //razza
    if(!this.personaggio.razza){
      this.showToast("Inserisci la razza del personaggio");
      return false;
    }

    //classe
    if(!this.personaggio.classe){
      this.showToast("Inserisci la classe del personaggio");
      return false;
    }

    //livello
    if(!this.personaggio.livello){
      this.showToast("Inserisci il livello del personaggio");
      return false;
    }

    //sesso
    if(!this.personaggio.sesso){
      this.showToast("Specifica il sesso del personaggio");
      return false;
    }

    //eta
    if(!this.personaggio.eta){
      this.showToast("Inserisci l'età del personaggio");
      return false;
    }

    //altezza
    if(!this.personaggio.altezza){
      this.showToast("Inserisci l'altezza del personaggio");
      return false;
    }

    //peso
    if(!this.personaggio.peso){
      this.showToast("Inserisci il peso del personaggio");
      return false;
    }

    //colore capelli
    if(!this.personaggio.capelli){
      this.showToast("Inserisci il colore dei capelli del personaggio");
      return false;
    }

    //colore occhi
    if(!this.personaggio.occhi){
      this.showToast("Inserisci il colore degli occhi del personaggio");
      return false;
    }

    //patria
    if(!this.personaggio.patria){
      this.showToast("Inserisci la patria del personaggio");
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
