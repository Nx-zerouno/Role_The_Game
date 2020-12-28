import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Missione } from '../../models/missione.model';

@Component({
  selector: 'app-missione-aggiungi',
  templateUrl: './missione-aggiungi.page.html',
  styleUrls: ['./missione-aggiungi.page.scss'],
})
export class MissioneAggiungiPage implements OnInit {

  //model
  user = {} as User;
  missione = {} as Missione;

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

  //metodo che aggiunge la missione nel database
  async inserisciMissione(missione: Missione){

    //controllo che l'utente abbia immesso tutti i campi richiesti
    if(this.formValidation()){

      //mostra il caricamento
      let loader = this.loadingCtrl.create({
        message: "Per favore attendi..."
      });
      (await loader).present();

      //aggiungo la missione nel database
      try {

        //creo il model missione e aggiungo l'id dell'utente che lo sta inserendo
        this.db.collection("missioni").add({
          "idUser":         (await this.afAuth.currentUser).uid,
    
          "titolo":           missione.titolo,
          "tipo":             missione.tipo,
          "descrizione":      missione.descrizione
        });
        
      } catch (error) {
        //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
        this.showToast(error);
      }

      //termina il caricamento
      (await loader).dismiss();

      //reindirizzamento alla home page
      this.navCtrl.navigateRoot("missione-lista");
    }
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
