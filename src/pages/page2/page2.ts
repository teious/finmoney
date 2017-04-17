import { Component } from '@angular/core';

import {Contribution} from '../../models/contribution';

import {VGBL} from '../../models/vgbl';
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
submited:boolean = false;
obj:Contribution;
vgbl:VGBL;
constructor(){
  this.obj  = new Contribution();
}

calculate(obj:Contribution){
this.submited = true;
this.vgbl = new VGBL(obj);
}
calculateVGBL(){
 this.vgbl.total = this.obj.value * Math.pow(1+this.vgbl.rentability/100, this.vgbl.years); 
}
}