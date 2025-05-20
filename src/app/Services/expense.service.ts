import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models.model';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private url = 'http://localhost:5091/api/MonthlyExpense';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.url);
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.url}/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.url, expense);
  }

  updateExpense(id: number, expense: Expense): Observable<any> {
    return this.http.put(`${this.url}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getexpense_month(month:number,year:number):Observable<any>{
    return this.http.get(`${this.url}/month/${month}/year/${year}`);
}
}
