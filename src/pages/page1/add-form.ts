import {Component} from'@angular/core';
import {ViewController} from 'ionic-angular';
import {Transaction, TransactionObj} from '../../models/transaction';
import {TransactionService} from '../../providers/transaction';
import * as moment from 'moment';

@Component({
    templateUrl:'add-form.html'
})

export class AddForm{
transaction:Transaction;
obj:TransactionObj;
tipoTransacao:String;
    constructor(public viewCtrl: ViewController, public service:TransactionService){
       this.tipoTransacao = "receita"
       this.obj= new TransactionObj();
       this.obj.date = moment().toISOString();
    }



add(obj){
    if(this.tipoTransacao!="receita"){
        obj.value = 0 - obj.value;
    }

this.transaction = new Transaction(obj);
this.service.createTransaction(this.transaction);
this.close();
}

close(){
    this.viewCtrl.dismiss();
}
}