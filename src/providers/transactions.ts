import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';

/*
  Generated class for the Transactions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Transactions {

  data: any;
  db:any;
  remote:any;

  constructor(public http: Http) {
      this.db = new PouchDB('finmoney');
      this.remote = 'http://localhost:5984/finmoney';

      let options = {
        live: true,
        retry: true,
        continuous: true
      };
      this.db.sync(this.remote, options);
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
createTransaction(transaction){

}
updateTransaction(transactions){
 
  }
 
  deleteTransaction(transactions){
 
  }
 
  handleChange(change){
 
  }
}
