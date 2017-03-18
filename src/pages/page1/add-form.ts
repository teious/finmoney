import {Component} from'@angular/core';
import {ViewController} from 'ionic-angular';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../providers/transaction';
import * as moment from 'moment';
@Component({
    templateUrl:'add-form.html'
})

export class AddForm{
transaction:Transaction
    constructor(public viewCtrl: ViewController, public service:TransactionService){}



add(){
this.transaction = new Transaction('salario', 2133, moment().format());
this.service.createTransaction(this.transaction);
}

close(){
    this.viewCtrl.dismiss();
}
}