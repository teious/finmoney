import { Component } from '@angular/core';

import {Contribution} from '../../models/contribution';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
obj:Contribution
constructor(){
  this.obj  = new Contribution();
}

add(obj:Contribution){
this.obj = obj
}
}