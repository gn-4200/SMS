import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from '../Services/token.service';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public constructor(private router:Router, private tokenservice:TokenService){}
  onlogout(){
    this.tokenservice.clearToken();
    this.router.navigate([""]);
  
  }
}
