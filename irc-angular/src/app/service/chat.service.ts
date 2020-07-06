import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  @Injectable()

  private url = 'http://localhost:8080';
  private socket;
  userData: object;



  constructor(private data: DataService) {
    this.socket = io(this.url);
  }

  list() {
    let observable = new Observable<{ data: string }>(observer => {
      this.socket.on('list', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  exist() {
    this.socket.on('exist', (data) => {
      alert(data.message)
    });
  }

  joinRoom(obj: object) {
    this.data.setUserData(obj);
    this.socket.emit('join', obj);
  }

  editRoom(data) {
    this.socket.emit('edit', data);
  }

  supprimeRoom(dat) {
    this.socket.emit('supprime', dat);
  }

  creatRoom(obj: object) {
    this.socket.emit('creat', obj);
  }

  newRoom() {
    let observable = new Observable<{ room: string }>(observer => {
      this.socket.on('newroom', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  newUserJoined() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  room() {
    let observable = new Observable<{ user: string, room: string, message: string }>(observer => {
      this.socket.on('group', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  user() {
    let observable = new Observable<{ data: string }>(observer => {
      this.socket.on('tout', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

}
