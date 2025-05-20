import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from '../models.model';
@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private url = 'http://localhost:5091/api/MonthlySummary';

  constructor(private http: HttpClient) {}

  getSummaries(): Observable<Summary[]> {
    return this.http.get<Summary[]>(this.url);
  }

  getSummaryById(id: number): Observable<Summary> {
    return this.http.get<Summary>(`${this.url}/${id}`);
  }

  addSummary(summary: Summary): Observable<Summary> {
    return this.http.post<Summary>(this.url, summary);
  }

  updateSummary(id: number, summary: Summary): Observable<any> {
    return this.http.put(`${this.url}/${id}`, summary);
  }

  deleteSummary(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  getsummary_month_year(month:number,year:number):Observable<any>{
    return this.http.get(`${this.url}/month/${month}/year/${year}`);
}
}
