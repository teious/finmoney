import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  items:[{title:string,checked:string}];
  month:string;
t;
  constructor(public navCtrl: NavController) { 
  
  this.t = moment();
  this.t.locale('pt-br');
  this.month = this.t.format('MMMM') ;
    this.items = [
        {title: 'item1',checked:'checkmark-circle-outline'},
        {title: 'item2',checked:'checkmark-circle-outline'},
        {title: 'item3',checked:'checkmark-circle-outline'},
        {title: 'item4',checked:'checkmark-circle-outline'},
        {title: 'item5',checked:'checkmark-circle-outline'},
        {title: 'item6',checked:'checkmark-circle-outline'}
    ];
  }
    removeItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        this.items.splice(i, 1);
          console.log(item.checked);
      }
 
    }
  }
  checkItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        if(item.checked == 'checkmark-circle-outline'){
        this.items[i].checked ='checkmark-circle';
    }else{
      this.items[i].checked='checkmark-circle-outline';
    }
      }
 
    }
  }
  prevMonth(){
      this.t.add(-1,'months');
      
      this.month = this.t.format('MMMM') ;
      console.log(this.month);
  }
 nextMonth(){
   this.t.add(1,'months');
   this.month = this.t.format('MMMM');
   console.log(this.month);

}

}
