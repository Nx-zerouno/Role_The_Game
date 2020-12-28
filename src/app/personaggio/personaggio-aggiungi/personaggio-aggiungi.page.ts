import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Personaggio } from '../../models/personaggio.model';

@Component({
  selector: 'app-personaggio-aggiungi',
  templateUrl: './personaggio-aggiungi.page.html',
  styleUrls: ['./personaggio-aggiungi.page.scss'],
})
export class PersonaggioAggiungiPage implements OnInit {

  //model
  user = {} as User;
  personaggio = {} as Personaggio;

  constructor
  (
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

    private db: AngularFirestore
  ) { }

  ngOnInit() {
  }

  //metodo che aggiunge il personaggio nel database
  async inserisciPersonaggio(personaggio: Personaggio){

    //controllo che l'utente abbia immesso tutti i campi richiesti
    if(this.formValidation()){

      //mostra il caricamento
      let loader = this.loadingCtrl.create({
        message: "Per favore attendi..."
      });
      (await loader).present();

      //aggiungo il personaggio nel database
      try {

        //creo il model personaggio e aggiungo l'id dell'utente che lo sta inserendo
        this.db.collection("personaggi").add({
          "idUser":         (await this.afAuth.currentUser).uid,
    
          "nome":           personaggio.nome,
          "razza":          personaggio.razza,
          "classe":         personaggio.classe,
          "livello":        personaggio.livello,
          "sesso":          personaggio.sesso,
          "eta":            personaggio.eta,
          "altezza":        personaggio.altezza,
          "peso":           personaggio.peso,
          "capelli":        personaggio.capelli,
          "occhi":          personaggio.occhi,
          "patria":         personaggio.patria
        });
        
      } catch (error) {
        //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
        this.showToast(error);
      }

      //termina il caricamento
      (await loader).dismiss();

      //reindirizzamento alla home page
      this.navCtrl.navigateRoot("personaggio-lista");
    }
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
