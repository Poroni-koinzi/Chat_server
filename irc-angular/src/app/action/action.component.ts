import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  roumArray: Array<{ data: string }> = [];
  newArray: Array<{ room: string }> = [];
  ancienroom: string;
  newroom: string;
  line: string;
  room: string;

  constructor(private chatService: ChatService) {


    this.chatService.list()
      .subscribe(line => this.roumArray.push(line));

    this.chatService.newRoom()
      .subscribe(data => this.newArray.push(data));

  }


  ngOnInit(): void {
  }
  dialog(item) {
    this.ancienroom = item.line;
    this.newroom = prompt("nouveau nom");
    this.chatService.editRoom({ ancienroom: this.ancienroom, newroom: this.newroom });
    this.chatService.exist();
  }

  edit(item) {
    this.dialog(item);
  }

  supprime(item) {
    this.room = item.line;
    this.chatService.supprimeRoom({ room: this.room });
  }

}
