import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  private messagesSubject = new Subject<string>();

  initializeWebSocketConnection(): Observable<string> {
    const serverUrl = 'http://localhost:9000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/messages', (message: any) => {
        this.messagesSubject.next(message.body);
      });
    }, (error: any) => {
      console.error('WebSocket Error:', error);
      this.messagesSubject.error(error);
    });

    return this.messagesSubject.asObservable();
  }

  sendMessage(message: string) {
    this.stompClient.send('/app/message', {}, message);
  }
}
