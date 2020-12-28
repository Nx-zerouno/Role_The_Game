import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Missione } from '../../models/missione.model';
import { stringify } from 'querystring';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-missione-lista',
  templateUrl: './missione-lista.page.html',
  styleUrls: ['./missione-lista.page.scss'],
})
export class MissioneListaPage implements OnInit {

  //model
  user = {} as User;
  missione = {} as Missione;

  //variabili di comodo
  missioni: any;
  collection: string = "missioni";

  listaMissioniLocale: any;

  constructor
  (
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

    private db: AngularFirestore
  ) { }

  async ngOnInit() {
    this.missioni = await this.getMissioniLocale();
  }

  //metodo per aggiornare la lista in locale delle missioni
  async getMissioniLocale(){

    //mi prendo l'id dell'utente in sessione
    let userID = (await this.afAuth.currentUser).uid;
    
    //aggiorno la lista in locale facendo una query al db
    const listaMissioni = await this.db.collection("missioni")
      .valueChanges().pipe(first()).toPromise();
    this.missioni = listaMissioni;

    //eseguo un ulteriore filtraggio che riguarda solo le missioni create dall'utente in sessione
    let missioni2 = this.missioni.filter(missA => {
      if(missA.idUser == userID){
        return missA;
      }
    });

    return missioni2;
  }

  //metodo che mostra la lista delle missioni creati dall'utente
  async ionViewWillEnter(){
    this.getMissioni();
  }

  //metodo che mi prende tutte le missioni create dall'utente in sessione
  async getMissioni(){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //mi prendo l'id dell'utente in sessione
    let userID = (await this.afAuth.currentUser).uid;

    //mi prendo tutti i document e li mostro nella view
    try {

      //seleziono la collezione delle missioni
      this.db.collection("missioni")
      .snapshotChanges()
      .subscribe(data =>{
        this.missioni = data.map(e => {
          return {

            //specifico quali campi voglio mostrare nella view lista (non mostrandoli tutti specifico solo quali mi servono)
            id:                       e.payload.doc.id,
            idUser:                   e.payload.doc.data()['idUser'],
            idMissione:               e.payload.doc.data()['idMissione'],
            titolo:                   e.payload.doc.data()['titolo'],
            tipo:                     e.payload.doc.data()['tipo'],
            descrizione:              e.payload.doc.data()['descrizione']
          
          };
        }).filter(e => {

          //mi prendo solo le missioni creati dall'utente in sessione
          return (e.idUser == userID)
        });
      });

      //termina il caricamento
      (await loader).dismiss();

    } catch (error) {
      //se avviene un qualche tipo di errore imprevisto, lo stampo su un popup
      this.showToast(error);
    }

  }

  //metodo che elimina la missione selezionata (attraverso il bottone slider nella view lista personaggi)
  async deleteMissione(id: string){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo l'id della missione, attraverso il link
    await this.db.doc("missioni/"+id).delete();

    //termina il caricamento
    (await loader).dismiss();

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
