import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersRef: CollectionReference;

  constructor(private firestore: Firestore) {
    this.ordersRef = collection(this.firestore, 'orders');
  }

  submitOrder(order: Order): Promise<any> {
    return addDoc(this.ordersRef, { ...order, createdAt: Date.now() });
  }
}
