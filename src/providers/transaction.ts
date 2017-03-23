import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import {Transaction} from '../models/transaction'

/*
  Generated class for the Transactions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TransactionService {

  data: any;
  db:any;
  remote:any;
  databydate: any;
  

  constructor(public http: Http) {
      this.db = new PouchDB('finmoney');
      this.remote = 'http://127.0.1.1:5984/finmoney';

      let options = {
        live: true,
        retry: true,
        continuous: true
      };
      this.db.sync(this.remote, options);
}
getTransactionsByDate(startKey:String, endKey:String){

  return new Promise(resolve => {
 
    this.db.allDocs({
      startkey: startKey,
      endkey: endKey,
      include_docs: true
 
    }).then((result) => {
 
        this.data = [];
        result.rows.map((row) => {
        this.data.push(row.doc);
      });
 
      resolve(this.data);
 
    }).catch((error) => {
 
      console.log(error);
 
    }); 
 
  });
}
getTransactions(){
 if (this.data) {
    return Promise.resolve(this.data);
     
  }

  return new Promise(resolve => {
 
    this.db.allDocs({
      include_docs: true
 
    }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
        this.data.push(row.doc);
      });
 
      resolve(this.data);
 
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        this.handleChange(change);
      });
 
    }).catch((error) => {
 
      console.log(error);
 
    }); 
 
  });
}
createTransaction(transaction:Transaction){
  this.db.post(transaction);
}
updateTransaction(transaction: Transaction){
 this.db.put(transaction).catch((err)  =>{
    console.log(err);
 });
}
 
deleteTransaction(transaction){
  this.db.remove(transaction).catch((err)=>{
  console.log(err);
 });
}
 
handleChange(change){
  let changedDoc = null;
  let changedIndex = null;
 
  this.data.forEach((doc, index) => {
 
    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }
 
  });
 
  //A document was deleted
  if(change.deleted){
    this.data.splice(changedIndex, 1);
  } 
  else {
 
    //A document was updated
    if(changedDoc){
      this.data[changedIndex] = change.doc;
    } 
 
    //A document was added
    else {
      this.data.push(change.doc); 
    }
 
  }
 
}

}
