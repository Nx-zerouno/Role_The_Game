import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../../models/user.model';
import { Personaggio } from '../../models/personaggio.model';
import { stringify } from 'querystring';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-personaggio-lista',
  templateUrl: './personaggio-lista.page.html',
  styleUrls: ['./personaggio-lista.page.scss'],
})
export class PersonaggioListaPage implements OnInit {

  //model
  user = {} as User;
  personaggio = {} as Personaggio;

  //variabili di comodo
  personaggi: any;
  collection: string = "personaggi";

  listaPersonaggiLocale: any;

  constructor
  (
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,

    private db: AngularFirestore
  ) { }

  async ngOnInit() {
    this.personaggi = await this.getPersonaggiLocale();
  }

  //metodo per aggiornare la lista in locale dei personaggi
  async getPersonaggiLocale(){

    //mi prendo l'id dell'utente in sessione
    let userID;
    try {
      if(await this.afAuth.currentUser == null){
        this.navCtrl.navigateRoot("login");
      }
        userID = (await this.afAuth.currentUser).uid;
    } catch (error) {
      this.navCtrl.navigateRoot("login");
    }
    
    
    //aggiorno la lista in locale facendo una query al db
    const listaPersonaggi = await this.db.collection("personaggi")
      .valueChanges().pipe(first()).toPromise();
    this.personaggi = listaPersonaggi;

    //eseguo un ulteriore filtraggio che riguarda solo i personaggi creati dall'utente in sessione
    let personaggi2 = this.personaggi.filter(persA => {
      if(persA.idUser == userID){
        return persA;
      }
    });

    return personaggi2;
  }

  //metodo che mostra la lista dei personaggi creati dall'utente
  async ionViewWillEnter(){
    this.getPersonaggi();
  }

  //metodo che mi prende tutti i personaggi creati dall'utente in sessione
  async getPersonaggi(){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //mi prendo l'id dell'utente in sessione
    let userID;
    try {
      if(await this.afAuth.currentUser == null){
        this.navCtrl.navigateRoot("login");
      }
        userID = (await this.afAuth.currentUser).uid;
    } catch (error) {
      this.navCtrl.navigateRoot("login");
    }
    
    

    //mi prendo tutti i document e li mostro nella view
    try {

      //seleziono la collezione dei personaggi
      this.db.collection("personaggi")
      .snapshotChanges()
      .subscribe(data =>{
        this.personaggi = data.map(e => {
          return {

            //specifico quali campi voglio mostrare nella view lista (non mostrandoli tutti specifico solo quali mi servono)
            id:                       e.payload.doc.id,
            idUser:                   e.payload.doc.data()['idUser'],
            idPersonaggio:            e.payload.doc.data()['idPersonaggio'],
            nome:                     e.payload.doc.data()['nome'],
            razza:                    e.payload.doc.data()['razza'],
            classe:                   e.payload.doc.data()['classe'],
            livello:                  e.payload.doc.data()['livello'],
            sesso:                    e.payload.doc.data()['sesso'],
            eta:                      e.payload.doc.data()['eta'],
            altezza:                  e.payload.doc.data()['altezza'],
            peso:                     e.payload.doc.data()['peso'],
            capelli:                  e.payload.doc.data()['capelli'],
            occhi:                    e.payload.doc.data()['occhi'],
            patria:                   e.payload.doc.data()['patria'],
            
          };
        }).filter(e => {

          //mi prendo solo i personaggi creati dall'utente in sessione
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

  //metodo che elimina il personaggio selezionato (attraverso il bottone slider nella view lista personaggi)
  async deletePersonaggio(id: string){

    //mostra il caricamento
    let loader = this.loadingCtrl.create({
      message: "Per favore attendi..."
    });
    (await loader).present();

    //prendo l'id dell'incantesimo, attraverso il link
    await this.db.doc("personaggi/"+id).delete();

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
