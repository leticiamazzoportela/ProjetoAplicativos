import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

/**
 * Generated class for the ManicureMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manicure-main',
  templateUrl: 'manicure-main.html',
})
export class ManicureMainPage {

  tab1: string = "ManicureProfilePage";
  tab2: string = "ListManicurePage";
  tab3: string = "ChatPage";


}
