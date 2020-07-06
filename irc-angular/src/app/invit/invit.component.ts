import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-invit',
  templateUrl: './invit.component.html',
  styleUrls: ['./invit.component.css']
})
export class InvitComponent implements OnInit {

  user: String;
  room: String;
  newArray: Array<{ data: string }> = [];
  nowArray: Array<{ room: string }> = [];

  constructor(private chatService: ChatService) {

    this.chatService.list()
      .subscribe(data => this.newArray.push(data));


    this.chatService.newRoom()
      .subscribe(data => this.nowArray.push(data));

  }


  ngOnInit(): void {
  }
  join() {
    if (this.user === undefined || this.room === undefined) {
      alert("erreur au niveau de username ou group");
    } else {
      this.chatService.joinRoom({ user: this.user, room: this.room });

    }
  }

  leave() {
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }

}
