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
  monthStart:String;
  monthEnd:String;
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
 this.monthStart = this.t.startOf('month').toISOString() ;
  this.monthEnd = this.t.endOf('month').subtract(1,'days').toISOString();
  console.log(this.monthStart);
  console.log(this.monthEnd);
   this.transactionService.getTransactionsByDate(this.monthStart, this.monthEnd).then((value:Transaction[])=> {
    this.items =value;
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
      this.t.subtract(1,'months');
      this.month = this.t.format('MMMM, YYYY') ;
      this.monthStart = this.t.startOf('month').toISOString() ;
  this.monthEnd = this.t.endOf('month').subtract(1,'days').toISOString();
     this.transactionService.getTransactionsByDate(this.monthStart, this.monthEnd).then((pvalue: Transaction[])=> {
         this.items = pvalue;
         this.saldo = 0;
       for(let i = 0; i < this.items.length; i++) {
 
      if(this.items[i].checked){

        this.saldo +=this.items[i].value;
      }
 
    }
   });
  }
 nextMonth(){
   this.t.add(1,'months');
   this.month = this.t.format('MMMM, YYYY');
    this.monthStart = this.t.startOf('month').toISOString() ;
  this.monthEnd = this.t.endOf('month').subtract(1,'days').toISOString();
     this.transactionService.getTransactionsByDate(this.monthStart, this.monthEnd).then((pvalue: Transaction[])=> {
         this.items = pvalue;
         this.saldo = 0;
       for(let i = 0; i < this.items.length; i++) {
 
      if(this.items[i].checked){

        this.saldo +=this.items[i].value;
      }
 
    }
   });

}
addItem(){
  let modal = this.modalCtrl.create(AddForm);
  modal.present();
}
}
