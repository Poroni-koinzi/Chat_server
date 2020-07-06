import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from "@angular/material/icon";
import { ChanelsComponent } from './chanels/chanels.component';
import { MessageComponent } from './message/message.component';
import { InvitComponent } from './invit/invit.component';
import { ChatService } from './service/chat.service';
import { DataService } from './service/data.service';
import { SendComponent } from './send/send.component';
import { ActionComponent } from './action/action.component';
import { PersonComponent } from './person/person.component';

@NgModule({
  declarations: [
    AppComponent,
    ChanelsComponent,
    MessageComponent,
    InvitComponent,
    SendComponent,
    ActionComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    HttpModule,
    FormsModule,
  ],
  providers: [ChatService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
