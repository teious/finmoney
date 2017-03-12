import { Component } from '@angular/core';

import { NavController, IonicModule } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  items
  constructor(public navCtrl: NavController) {
    
    
    this.items = [
        {title: 'item1'},
        {title: 'item2'},
        {title: 'item3'},
        {title: 'item4'},
        {title: 'item5'},
        {title: 'item6'}
    ];
  }
    removeItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        this.items.splice(i, 1);
      }
 
    }
 
  }

}
