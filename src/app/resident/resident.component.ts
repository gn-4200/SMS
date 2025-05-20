import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../Services/resident.service';
import { Resident } from '../models.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../Shared/confirm-dialogue/confirm-dialogue.component';
@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.css'],
  imports:[CommonModule,RouterLink]
})
export class ResidentComponent{
  residents: Resident[] = [];
  confirmation:boolean=false;

  constructor(private residentService: ResidentService,private router:Router,
    private dialogue : MatDialog
  ) {}

  ngOnInit(): void {
    this.getResidents();
  }

  getResidents(): void {
    this.residentService.getResidents().subscribe({
      next: value => {
        this.residents = value;
        console.log("Residents:", value);
      },
      error: err => console.error("Error fetching residents", err),
      complete: () => console.log("Fetch residents completed.")
    });
  }

  createResident(resident: Resident): void {
    this.residentService.addResident(resident).subscribe({
      next: value => {
        console.log("Resident created:", value);
        this.getResidents();
      },
      error: err => console.error("Error creating resident", err),
      complete: () => console.log("Create resident completed.")
    });
  }

  updateResident(id: number, resident: Resident): void {
    this.router.navigate(["home/addResident"],{
      state:{
        Updateresident:resident,mode:"Edit Resident"
      }
    });
    
  }

  deleteResident(id: number): void {
    const dialogref = this.dialogue.open(ConfirmDialogueComponent,{
      width:"350px",
      height:"250px"
    });

  dialogref.afterClosed().subscribe({
    next:(value)=> {
      this.confirmation = value;
      if(this.confirmation){
        this.residentService.deleteResident(id).subscribe({
          next: value => {
            console.log("Resident deleted:", value);
            this.getResidents(); 
          },
          error: err => console.error("Error deleting resident", err),
          complete: () => console.log("Delete resident completed.")
        });
      }
    },
  });
    
  }
}
