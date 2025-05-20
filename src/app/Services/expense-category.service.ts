import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseCategory } from '../models.model';
@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {
  private url = 'http://localhost:5091/api/ExpenseCategory';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(this.url);
  }

  getCategoryById(id: number): Observable<ExpenseCategory> {
    return this.http.get<ExpenseCategory>(`${this.url}/${id}`);
  }

  addCategory(category: ExpenseCategory): Observable<ExpenseCategory> {
    return this.http.post<ExpenseCategory>(this.url, category);
  }

  updateCategory(id: number, category: ExpenseCategory): Observable<any> {
    return this.http.put(`${this.url}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
