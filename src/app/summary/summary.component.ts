import { Component, OnInit } from '@angular/core';
import { Summary } from '../models.model';
import { SummaryService } from '../Services/summary.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  imports:[CommonModule]
})
export class SummaryComponent implements OnInit {

  summaries: Summary[] = [];

  constructor(private summaryService: SummaryService) {}

  ngOnInit(): void {
    this.getAllSummaries();
  }

  getAllSummaries(): void {
    this.summaryService.getSummaries().subscribe({
      next: (data) => {
        this.summaries = data;
      },
      error: (err) => {
        console.error('Error fetching summaries:', err);
      },
      complete: () => {
        console.log('Finished loading summaries');
      }
    });
  }
}
