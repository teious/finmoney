import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { AddForm} from '../pages/page1/add-form';
import {Transactions} from '../providers/transactions';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AddForm
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AddForm
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Transactions]
})
export class AppModule {}
