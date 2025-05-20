import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Resident } from '../../models.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResidentService } from '../../Services/resident.service';

@Component({
  selector: 'app-add-resident',
  standalone: true, // REQUIRED if using imports here
  imports: [FormsModule, CommonModule],
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent {
  formSubmitted = false;

  newResident: Resident = {
    id: 0,
    ownerName: '',
    phoneNumber: '',
    street: '',
    houseNumber: ''
  };
title:string='';
  constructor(private router: Router,private residentservice:ResidentService) {
    const Navigation = this.router.getCurrentNavigation();
    if(Navigation?.extras?.state){
      this.newResident = Navigation?.extras?.state['Updateresident'],
      this.title = Navigation?.extras?.state['mode']
    }else{
      this.title = "Add Resident";
    }
  }

  onSubmit(form: any) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }else{
      if(this.title != "Add Resident"){
        this.residentservice.updateResident(this.newResident.id, this.newResident).subscribe({
          next: value => {
            console.log("Resident updated:", value);
            this.router.navigate(['home/resident']);
          },
          error: err => console.error("Error updating resident", err),
          complete: () => console.log("Update resident completed.")
        });

      }else{

      
      this.residentservice.addResident(this.newResident).subscribe({
        next:(value)=>{
          console.log("Resident added",value);
          this.router.navigate(['home/resident']);
        },
        error:(err)=>{
          console.log("Error",err);
        },
        complete:()=>{
          console.log("Success");
        }
      });

    }
}
   
  }
  Oncancel(){
    this.router.navigate(['home/resident']);
  }
}
