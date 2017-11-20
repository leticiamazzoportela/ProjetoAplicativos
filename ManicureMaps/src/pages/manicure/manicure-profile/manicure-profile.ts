import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghendlerProvider } from '../../../providers/imghendler/imghendler'
import { ManicureProvider } from '../../../providers/user/manicure'
import firebase from 'firebase';

/**
 * Generated class for the ManicureProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manicure-profile',
  templateUrl: 'manicure-profile.html',
})
export class ManicureProfilePage {
  avatar: string;
  displayName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: ManicureProvider,
    public zone: NgZone, public alertCtrl: AlertController, public imghandler: ImghendlerProvider) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['ok']
    });
    let alert = this.alertCtrl.create({
      title: 'Editar Nome',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nome'
      }],
      buttons: [{
        text: 'cancel',
        role: 'cancel',
        handler: data => {
        }
      },
      {
        text: 'Edit',
        handler: data => {
          if (data.nickname) {
            (
              this.userservice.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Atualizado com sucesso');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.nickname
                  })
                }
                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Deu bosta');
                  statusalert.present();
                }
              })
            )
          }
        }
      }]
    });
    alert.present();
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['ok']
    });
    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Atualizado com sucesso');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
          statusalert.setTitle('Failed');
          statusalert.setSubTitle('Deu bosta');
          statusalert.present();
      })
    })
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot('ManicureLoginPage');
    })
  }

}
