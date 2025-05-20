import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from '../models.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  private url = 'http://localhost:5091/api/MonthlyFund';

  constructor(private http: HttpClient) {}

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.url);
  }

  getFundById(id: number): Observable<Fund> {
    return this.http.get<Fund>(`${this.url}/${id}`);
  }

  addFund(fund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.url, fund);
  }

  updateFund(id: number, fund: Fund): Observable<any> {
    return this.http.put(`${this.url}/${id}`, fund);
  }

  deleteFund(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getfunds_month(month:number):Observable<any>{
      return this.http.get(`${this.url}/month/${month}`);
  }
}
