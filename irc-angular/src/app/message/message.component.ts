import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messageArray: Array<{ user: string, message: string }> = [];
  roomArray: Array<{ user: string, room: string, message: string }> = [];
  toutArray: Array<{ data: string }> = [];

  constructor(private chatService: ChatService) {

    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.chatService.user()
      .subscribe(line => this.toutArray.push(line));


    this.chatService.room()
      .subscribe(data => this.roomArray.push(data));

    this.chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));


    this.chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit(): void {
  }

}
