import {Component} from'@angular/core';
import {ViewController} from 'ionic-angular'
@Component({
    templateUrl:'add-form.html'
})

export class AddForm{
    constructor(public viewCtrl: ViewController){}



addItem(){
    
}

close(){
    this.viewCtrl.dismiss();
}
}