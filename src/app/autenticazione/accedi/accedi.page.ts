import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-accedi',
  templateUrl: './accedi.page.html',
  styleUrls: ['./accedi.page.scss'],
})
export class AccediPage implements OnInit {

  user = {} as User;

  constructor
  (
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  //metodo per loggare nella piattaforma con annessi popup di spiegazione dell'errore
  async login(user: User){
    if(this.formValidation()){
      
      //mostra il caricamento
      let loader = this.loadingCtrl.create({
        message: "Per favore attendi..."
      });
      (await loader).present();

      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
          console.log(data);

          //reindirizzamento alla home page
          this.navCtrl.navigateForward("home");
        });
      } catch (e) {
        this.showToast(e);
      }

      //termina il caricamento
      (await loader).dismiss();
    }
  }

  //controllo sui campi richiesti con specificazione di quale errore occorre
  formValidation(){
    if(!this.user.email){
      this.showToast("Immetti l'email");
      return false;
    }

    if(!this.user.password){
      this.showToast("Immetti la password");
      return false;
    }

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
