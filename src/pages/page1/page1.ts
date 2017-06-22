import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { ReceitaForm } from './receita-form';
import { DespesaForm } from './despesa-form';
import { TransactionService } from '../../providers/transaction';
import { Transaction } from '../../models/transaction';
import 'moment/src/locale/pt-br';
import 'moment/locale/pt-br';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 implements OnInit {
  loading = false;
  tipoSaldo: String;
  items: Transaction[];
  month: string;
  monthStart: String;
  monthEnd: String;
  t: any;
  saldoTotal: number;
  saldoMensal: number;
  allItems: Transaction[];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public transactionService: TransactionService) {
    this.tipoSaldo = "mensal"
    this.saldoTotal = 0;
    this.saldoMensal = 0;
    this.t = moment();
    this.t.locale('pt-br');
    this.month = this.t.format('MMMM, YYYY');

  }
  ngOnInit() {
    this.transactionService.getTransactions()
      .then((value: Transaction[]) => {
        this.allItems = value;
        for (let transaction of this.allItems) {
          if (transaction.checked) this.saldoTotal += transaction.value;
        }
      });

    this.monthStart = this.t.startOf('month').toISOString();
    this.monthEnd = this.t.endOf('month').subtract(1, 'days').toISOString();

    this.transactionService
      .getTransactionsByDate(this.monthStart, this.monthEnd)
      .then((value: Transaction[]) => {
        this.items = value;
        for (let item of this.items) {
          if (item.checked) this.saldoMensal += item.value;
        }
      });
  }


  removeItem(item) {


    if (item.checked) {
      this.saldoMensal -= item.value;
      this.saldoTotal -= item.value;
    }
    this.transactionService.deleteTransaction(item);





  }
  checkItem(item) {

    if (item.checked) {
      item.checked = false;
      this.saldoMensal -= item.value;
      this.saldoTotal -= item.value;
    } else {
      item.checked = true;
      this.saldoMensal += item.value;
      this.saldoTotal += item.value;
    }

    this.transactionService
      .updateTransaction(item);
  }

  prevMonth() {

    this.t.subtract(1, 'months');
    this.month = this.t.format('MMMM, YYYY');
    this.monthStart = this.t.startOf('month').toISOString();
    this.monthEnd = this.t.endOf('month').subtract(1, 'days').toISOString();

    this.transactionService
      .getTransactionsByDate(this.monthStart, this.monthEnd)
      .then((value: Transaction[]) => {

        this.items = value;
        this.saldoMensal = 0;

        for (let item of this.items) {
          if (item.checked) this.saldoMensal += item.value;
        }

      });

  }

  nextMonth() {

    this.t.add(1, 'months');
    this.month = this.t.format('MMMM, YYYY');
    this.monthStart = this.t.startOf('month').toISOString();
    this.monthEnd = this.t.endOf('month').subtract(1, 'days').toISOString();

    this.transactionService
      .getTransactionsByDate(this.monthStart, this.monthEnd)
      .then((value: Transaction[]) => {

        this.items = value;
        this.saldoMensal = 0;

        for (let item of this.items) {
          if (item.checked) this.saldoMensal += item.value;
        }

      });

  }

  addDespesa() {

    let modal = this.modalCtrl.create(DespesaForm);
    modal.present();
    modal.onDidDismiss(() => {
      this.transactionService
        .getTransactionsByDate(this.monthStart, this.monthEnd)
        .then((value: Transaction[]) => {
          this.items = value;
          this.saldoMensal = 0;
          for (let item of this.items) {
            if (item.checked) this.saldoMensal += item.value;
          }
        });

    });
  }

  addReceita() {

    let modal = this.modalCtrl.create(ReceitaForm);
    modal.present();
    modal.onDidDismiss(() => {
      this.transactionService
        .getTransactionsByDate(this.monthStart, this.monthEnd)
        .then((value: Transaction[]) => {
          this.items = value;
          this.saldoMensal = 0;
          for (let item of this.items) {
            if (item.checked) this.saldoMensal += item.value;
          }
        });

    });
  }

  refresh() {
    this.loading = true;
    this.transactionService.getTransactions()
      .then((value: Transaction[]) => {
        this.allItems = value;
        this.saldoTotal = 0;
        for (let transaction of this.allItems) {
          if (transaction.checked) this.saldoTotal += transaction.value;
        }
      });
    this.transactionService
      .getTransactionsByDate(this.monthStart, this.monthEnd)
      .then((value: Transaction[]) => {
        this.items = value;
        this.saldoMensal = 0;
        for (let item of this.items) {
          if (item.checked) this.saldoMensal += item.value;
        }
        this.loading = false;
      });

  }
}
