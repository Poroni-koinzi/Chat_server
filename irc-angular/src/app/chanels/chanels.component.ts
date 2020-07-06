import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';


@Component({
  selector: 'app-chanels',
  templateUrl: './chanels.component.html',
  styleUrls: ['./chanels.component.css']
})
export class ChanelsComponent implements OnInit {

  room: String;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  creat() {
    this.chatService.creatRoom({ room: this.room });
    this.chatService.exist();
  }
}
