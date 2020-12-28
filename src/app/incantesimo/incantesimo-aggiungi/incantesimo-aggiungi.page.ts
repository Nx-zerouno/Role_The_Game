import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Incantesimo } from '../../models/incantesimo.model';

@Component({
  selector: 'app-incantesimo-aggiungi',
  templateUrl: './incantesimo-aggiungi.page.html',
  styleUrls: ['./incantesimo-aggiungi.page.scss'],
})
export class IncantesimoAggiungiPage implements OnInit {

  //model
  user = {} as User;
  incantesimo = {} as Incantesimo;

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

  //metodo che aggiunge l'incantesimo nel database
  async inserisciIncantesimo(incantesimo: Incantesimo){

    //controllo che l'utente abbia immesso tutti i campi richiesti
    if(this.formValidation()){

      //mostra il caricamento
      let loader = this.loadingCtrl.create({
        message: "Per favore attendi..."
      });
      (await loader).present();

      //aggiungo l'incantesimo nel database
      try {

        //creo il model incantesimo e aggiungo l'id dell'utente che lo sta inserendo
        this.db.collection("incantesimi").add({
          "idUser":         (await this.afAuth.currentUser).uid,
    
          "preferito":      "danger",
          "nome":           incantesimo.nome,
          "scuola":         incantesimo.scuola,
          "descrizione":    incantesimo.descrizione,
          "livello":        incantesimo.livello,
          "raggio":         incantesimo.raggio,
          "area":           incantesimo.area,
          "durata":         incantesimo.durata,
          "danno":          incantesimo.danno,
          "dadiVita":       incantesimo.dadiVita
        });
        
      } catch (error) {
        //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
        this.showToast(error);
      }

      //termina il caricamento
      (await loader).dismiss();

      //reindirizzamento alla home page
      this.navCtrl.navigateRoot("incantesimo-lista");
    }
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
