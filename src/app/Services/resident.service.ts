import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resident } from '../models.model';
import { checkResident } from '../models.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  private url = 'http://localhost:5091/api/Resident';

  constructor(private http: HttpClient) {}

  getResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(this.url);
  }

  getResidentById(id: number): Observable<Resident> {
    return this.http.get<Resident>(`${this.url}/${id}`);
  }

  addResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(this.url, resident);
  }

  updateResident(id: number, resident: Resident): Observable<any> {
    return this.http.put(`${this.url}/${id}`, resident);
  }

  deleteResident(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
  checkResident(resident:checkResident):Observable<any>{
    return this.http.post(`${this.url}/checkResident`,resident);
  }
}
