import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  roomArray: Array<{ user: string, room: string, message: string }> = [];
  messageArray: Array<{ user: string, message: string }> = [];


  constructor(private chatService: ChatService) {


    this.chatService.room()
      .subscribe(data => this.roomArray.push(data));


    this.chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit(): void {
  }

}
