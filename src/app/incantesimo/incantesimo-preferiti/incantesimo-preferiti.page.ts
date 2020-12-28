import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Incantesimo } from '../../models/incantesimo.model';
import { stringify } from 'querystring';

import { Location } from '@angular/common';


@Component({
  selector: 'app-incantesimo-preferiti',
  templateUrl: './incantesimo-preferiti.page.html',
  styleUrls: ['./incantesimo-preferiti.page.scss'],
})
export class IncantesimoPreferitiPage implements OnInit {

  //model
  user = {} as User;
  incantesimo = {} as Incantesimo;

  //variabili di comodo
  incantesimi: any;
  collection: string = "incantesimi";

  constructor
  (
    private location: Location,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

    private db: AngularFirestore
  ) { }

  ngOnInit() {
  }

  //metodo che mostra la lista degli incantesimi creati dall'utente
  async ionViewWillEnter(){
    this.getIncantesimi();
  }

  //metodo che mi prende tutti gli incantesimi nei preferiti creati dall'utente in sessione
  async getIncantesimi(){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //mi prendo l'id dell'utente in sessione
    let userID = (await this.afAuth.currentUser).uid;

    //mi prendo tutti i document e li mostro nella view
    try {

      //seleziono la collezione degli incantesimi
      this.db.collection("incantesimi")
      .snapshotChanges()
      .subscribe(data =>{
        this.incantesimi = data.map(e => {
          return {

            //specifico quali campi voglio mostrare nella view lista (non mostrandoli tutti specifico solo quali mi servono)
            id:         e.payload.doc.id,
            preferito:  e.payload.doc.data()['preferito'],
            idUser:     e.payload.doc.data()['idUser'],
            nome:       e.payload.doc.data()['nome'],
            livello:    e.payload.doc.data()['livello'],
            scuola:     e.payload.doc.data()['scuola'],
          };
        }).filter(e => {

          //mi prendo solo gli incantesimi creati dall'utente in sessione
          return (e.idUser == userID);
        }).filter(i => {
            
            //prendo solo gli incantesimi aggiunti tra i preferiti
            return (i.preferito == "success");
        });
      });

      //termina il caricamento
      (await loader).dismiss();

    } catch (error) {
      //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
      this.showToast(error);
    }

  }

  //metodo che elimina l'incantesimo selezionato (attraverso il bottone slider nella view lista)
  async deleteIncantesimo(id: string){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo l'id dell'incantesimo, attraverso il link
    await this.db.doc("incantesimi/"+id).delete();

    //termina il caricamento
    (await loader).dismiss();

  }

  //metodo per aggiungere/rimuovere un incantesimo dai preferiti
  async aggiungiRimuoviPreferiti(id: any, incantesimoC: Incantesimo){

    //tolgo l'incantesimo dai preferiti
    if( incantesimoC.preferito == "success"){

      try {

        //registro il cambiamento nel db
        await this.db.doc("incantesimi/"+id).update({
          "preferito":  "danger"
        });

      } catch (error) {
        //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
        this.showToast(error);
      }
    }

    //inserisco l'incantesimo tra i preferiti
    else if(incantesimoC.preferito == "danger"){

      try {

        //registro il cambiamento nel db
        await this.db.doc("incantesimi/"+id).update({
          "preferito":  "success"
        });

      } catch (error) {
        //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
        this.showToast(error);
      }
    } 
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
