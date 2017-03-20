import { Component, OnInit} from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import * as moment from 'moment';
import{AddForm} from './add-form';
import {TransactionService} from '../../providers/transaction'
import {Transaction} from '../../models/transaction';
import 'moment/src/locale/pt-br';
import 'moment/locale/pt-br';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 implements OnInit {
  items:Transaction[];
  month:string;
t;
saldo:number;
a:Transaction[];
  constructor(public navCtrl: NavController, public modalCtrl:ModalController, public transactionService:TransactionService) { 
  this.saldo = 0;
  this.t = moment();
  this.t.locale('pt-br');
  this.month = this.t.format('MMMM, YYYY') ;

  }
  ngOnInit(){
   this.transactionService.getTransactions().then((value)=> {
    console.log(value);
     this.a = value;
     console.log(this.a);
     
this.items = this.a;
       for(let i = 0; i < this.items.length; i++) {
 
      if(this.items[i].checked){

        this.saldo +=this.items[i].value;
      }
 
    }
   });
  
    console.log(this.t.format());

  
  
  }
    removeItem(item){
    for(let i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
          if(item.checked){
          this.saldo -= item.value;
        }
        this.transactionService.deleteTransaction(this.items[i]);
      
      }
 
    }
  }
  checkItem(item){
     let i:number;
    for(i = 0; i < this.items.length; i++) {
 
      if(this.items[i] == item){
        if(item.checked == false){
        this.items[i].checked =true;
        this.saldo +=this.items[i].value;
        this.transactionService.updateTransaction(this.items[i]);
    }else{
      this.items[i].checked=false;
      this.saldo -= this.items[i].value;
      this.transactionService.updateTransaction(this.items[i]);
    }
      }
      
    }
  }
  prevMonth(){
      this.t.add(-1,'months');
      
      this.month = this.t.format('MMMM, YY') ;
      console.log(this.t.format());
  }
 nextMonth(){
   this.t.add(1,'months');
   this.month = this.t.format('MMMM, YY');
   console.log(this.t.format());

}
addItem(){
  let modal = this.modalCtrl.create(AddForm);
  modal.present();
}
}
