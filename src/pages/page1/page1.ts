import { Component, OnInit} from '@angular/core';
import { NavController, PopoverController} from 'ionic-angular';
import * as moment from 'moment';
import{AddForm} from './add-form';
import {Transactions} from '../../providers/transactions'
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 implements OnInit {
  items:[{title:string,value:number,checked:boolean,date:Date}];
  month:string;
t;
saldo:number;
a:any;
  constructor(public navCtrl: NavController, public popoverCtrl:PopoverController, public transactionService:Transactions) { 
  this.saldo = 0;
  this.t = moment();
  this.t.locale('pt-br');
  this.month = this.t.format('MMMM, YY') ;

  }
  ngOnInit(){
   this.transactionService.getTransactions().then((value)=> {
    console.log(value);
     this.a = value;
   });
  
    console.log(this.t.format());

this.items = [
        {title: 'salario',value: 8000.2, checked:true, date:this.t.toDate()},
        {title: 'jogos online',value: -2000, checked:false, date: this.t.toDate()},
        {title: 'motel',value: -2000, checked:false, date: this.t.toDate()},
        {title: 'baladas',value: -2000, checked:false, date: this.t.toDate()},
        {title: 'combustivel',value: -2000, checked:false, date: this.t.toDate()},
        {title: 'pasta de dente',value: -2000, checked:false, date: this.t.toDate()}
    ];
    for(let i = 0; i < this.items.length; i++) {
 
      if(this.items[i].checked){

        this.saldo += this.items[i].value;
      }
 
    }
  
  }
    removeItem(item){
    for(let i = 0; i < this.items.length; i++) {
 
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
addItem(event){
  let popover = this.popoverCtrl.create(AddForm);
  popover.present({
    ev: event
  });
}
}
