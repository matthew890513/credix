import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CreditsService } from '../../../core/repositories/credits.service'

export interface Credit {
  id: number;
  amount: number;
  deliveryDate: string;
  paymentFrequency: string;
  status: string;
  customerId: number;
}

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: 'credits.component.html',
  styleUrls: ['credits.component.scss'],
})
export class CreditsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'amount',
    'deliveryDate',
    'paymentFrequency',
    'status',
    'customerId',
    'actions',
  ];
  dataSource = new MatTableDataSource<Credit>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private creditsService: CreditsService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadCredits();
  }

  loadCredits() {
    this.creditsService.getCredits().subscribe({
      next: (data: Credit[]) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error cargando créditos:', err);
      },
    });
  }

  viewDetails(credit: Credit) {
    console.log('View details for', credit);
  }
}
