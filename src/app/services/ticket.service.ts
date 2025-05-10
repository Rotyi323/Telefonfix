import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private firestore: Firestore) {}

  addTicket(ticket: Ticket): Promise<any> {
    const ticketsRef = collection(this.firestore, 'tickets');
    return addDoc(ticketsRef, { ...ticket, createdAt: Date.now() });
  }

  getTickets(): Observable<Ticket[]> {
    const ticketsRef = collection(this.firestore, 'tickets');
    return collectionData(ticketsRef, { idField: 'id' }) as Observable<
      Ticket[]
    >;
  }

  deleteTicket(id: string): Promise<void> {
    const ticketDoc = doc(this.firestore, `tickets/${id}`);
    return deleteDoc(ticketDoc);
  }
  updateTicket(id: string, data: Partial<Ticket>): Promise<void> {
    const ref = doc(this.firestore, `tickets/${id}`);
    return updateDoc(ref, data);
  }
}
