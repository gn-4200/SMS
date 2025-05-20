import { Injectable } from '@angular/core';
import { Observable, forkJoin,catchError,of} from 'rxjs';
import { ResidentService } from './resident.service';
import { ExpenseService } from './expense.service';
import { FundService } from './fund.service';
import { SummaryService } from './summary.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(
    private residentService: ResidentService,
    private expenseService: ExpenseService,
    private fundService: FundService,
    private summaryservice:SummaryService
  ) {}

  getDashboardSummary(month: number, year: number): Observable<any> {
    return forkJoin({
      residents: this.residentService.getResidents().pipe(
        catchError(error => {
          console.error('Residents fetch failed', error);
          return of([]); // return empty array or default data
        })
      ),
      expenses: this.expenseService.getexpense_month(month, year).pipe(
        catchError(error => {
          console.error('Expenses fetch failed', error);
          return of([]); // or default value like 0
        })
      ),
      funds: this.fundService.getfunds_month(month).pipe(
        catchError(error => {
          console.error('Funds fetch failed', error);
          return of([]); // or 0 if you're expecting number
        })
      ),
      summary: this.summaryservice.getsummary_month_year(month, year).pipe(
        catchError(error => {
          console.error('Summary fetch failed', error);
          return of(null); // or default summary object
        })
      )
    });
  }
}
