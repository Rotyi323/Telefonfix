import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { ProductService } from '../../services/product.service';
import { Ticket } from '../../models/ticket.model';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  ticketForm!: FormGroup;
  tickets: Ticket[] = [];
  products: Product[] = [];
  editingTicketId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      productId: ['', Validators.required],
    });

    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });

    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  getProductName(id: string): string {
    return (
      this.products.find((p) => String(p.id) === id)?.name ||
      'ismeretlen készülék'
    );
  }

  submitTicket() {
    if (this.ticketForm.valid) {
      const ticketData: Ticket = {
        ...this.ticketForm.value,
        createdAt: Date.now(),
      };

      if (this.editingTicketId) {
        this.ticketService
          .updateTicket(this.editingTicketId, ticketData)
          .then(() => {
            this.resetForm();
          });
      } else {
        this.ticketService.addTicket(ticketData).then(() => {
          this.resetForm();
        });
      }
    }
  }

  deleteTicket(id: string) {
    this.ticketService.deleteTicket(id);
  }

  editTicket(ticket: Ticket) {
    this.editingTicketId = ticket.id!;
    this.ticketForm.patchValue({
      name: ticket.name,
      email: ticket.email,
      message: ticket.message,
      productId: ticket.productId,
    });
  }

  resetForm() {
    this.ticketForm.reset();
    this.editingTicketId = null;
  }
}
