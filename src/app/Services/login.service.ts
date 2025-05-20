import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:5091/api/Auth/login';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  loginUser(form: any): Observable<any> {
    return this.http.post(this.url, form).pipe(
      tap((response: any) => {
        this.tokenService.setToken(response.token);
      })
    );
  }
}
