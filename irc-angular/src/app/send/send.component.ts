import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  user: String;
  room: String;
  messageText: string;
  userData: object;

  constructor(private chatService: ChatService, private data: DataService) {
  }


  sendMessage() {
    this.data.userData.subscribe(u => this.userData = u);
    this.user = this.userData['user'];
    this.room = this.userData['room'];
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
  }

  ngOnInit(): void {
  }

}
