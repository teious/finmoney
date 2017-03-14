import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as moment from 'moment';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  items:[{title:string,value:number,checked:boolean,date:string}];
  month:string;
t;
saldo:number;
  constructor(public navCtrl: NavController) { 
  this.saldo = 0;
  this.t = moment();
  this.t.locale('pt-br');
  this.month = this.t.format('MMMM, YY') ;
  
    this.items = [
        {title: 'salario',value: 8000.2, checked:false, date: '13/03/2017'},
        {title: 'jogos online',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'motel',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'baladas',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'combustivel',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'pasta de dente',value: -2000, checked:false, date: '13/03/2017'}
    ];
  }
    removeItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        this.items.splice(i, 1);

        if(item.checked){
          this.saldo -= item.value;
        }
      }
 
    }
  }
  checkItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        if(item.checked == false){
        this.items[i].checked =true;
        this.saldo += item.value;
    }else{
      this.items[i].checked=false;
      this.saldo -= item.value;
    }
      }
      
    }
  }
  prevMonth(){
      this.t.add(-1,'months');
      
      this.month = this.t.format('MMMM, YY') ;
      console.log(this.month);
  }
 nextMonth(){
   this.t.add(1,'months');
   this.month = this.t.format('MMMM, YY');
   console.log(this.month);

}

}
