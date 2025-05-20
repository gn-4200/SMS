import { Component } from '@angular/core';
import { RouterOutlet , RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SMS';
  MenuItems : string[]=["Residents","Funds","Expenses","Summary"];
  ngoninit(){
    console.log(this.MenuItems);
  } 
}
