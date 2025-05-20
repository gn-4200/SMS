import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fund } from '../../models.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResidentService } from '../../Services/resident.service';
import { checkResident } from '../../models.model';
import { FundService } from '../../Services/fund.service';


@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css'],
  imports:[CommonModule,
      FormsModule
  ]
})
export class AddFundComponent {
  formSubmitted = false;
  newFund: any = {
    id: 0,
    month: new Date().getMonth() + 1,      
    year: new Date().getFullYear(),
    datePaid: new Date().getDate(),        
    paidTo: '',
    amount: 0,
    paidAmount: 0,
    outstanding: 0,
    residentname: "",
    houseNumber: ""
  };
  
  Addfund:Fund={
    id: this.newFund.id,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    datePaid: new Date().getDate(),
    paidTo: "",
    amount: 0,
    paidAmount: 0,
    outstanding: 0,
    residentId: 0
  };
  checkResident : checkResident={
    Name:"",
    houseNumber:""
  };
  title:string='';
  constructor(private router: Router,private ResidentService:ResidentService,private fundservice : FundService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.Addfund = navigation.extras.state['updatefund'];
      this.title = navigation.extras.state['mode'];
      
    }else{
      this.title="Add Fund";
    }
  }
  ngOnInit(){
    this.ResidentService.getResidentById(this.Addfund.residentId).subscribe({
      next:value=>{
        this.newFund.residentname= value.ownerName,    
        this.newFund.houseNumber=value.houseNumber  
      }
    });
    this.newFund = {
      id: this.Addfund.id,
      month: this.Addfund.month,
      year: this.Addfund.year,
      datePaid: this.Addfund.datePaid,
      paidTo: this.Addfund.paidTo,
      amount: this.Addfund.amount,
      paidAmount: this.Addfund.paidAmount,
      outstanding: this.Addfund.outstanding,
          
    };
    
  }
  onSubmit(form:any) {
    this.formSubmitted = true;

    if (form.invalid) {
      
      return;
    }
  else{
    if(this.title!="Add Fund"){

      this.newFund.outstanding = this.newFund.amount - this.newFund.paidAmount;
            this.checkResident.Name = this.newFund.residentname;
            this.checkResident.houseNumber=this.newFund.houseNumber;
                console.log(this.checkResident,"done");
           this.ResidentService.checkResident(this.checkResident).subscribe({
             next:(value)=>{
               this.Addfund.residentId = value.id;
               this.Addfund.month= this.newFund.month;
              this.Addfund.year= this.newFund.year;
              this.Addfund.datePaid= this.newFund.datePaid;
              this.Addfund.paidTo= this.newFund.paidTo;
              this.Addfund.amount= this.newFund.amount;
              this.Addfund.paidAmount= this.newFund.paidAmount;
              this.Addfund.outstanding= this.newFund.outstanding;
               console.log(this.Addfund);
           this.fundservice.updateFund(this.Addfund.id,this.Addfund).subscribe({
               next:(value)=>{
               console.log("added",value);
               this.router.navigate(['home/fund']);
                },
                 error:(err)=>{
                console.log("error",err);
                }
                 });   },
                  error:(err)=>{
               if(err.status == 404)
               alert("Resident Not Found");
               },
                complete:()=>{
                console.log("success");
                }
               }); 
    }else{

    
            this.newFund.outstanding = this.newFund.amount - this.newFund.paidAmount;
            this.checkResident.Name = this.newFund.residentname;
            this.checkResident.houseNumber=this.newFund.houseNumber;
                console.log(this.checkResident,"done");
           this.ResidentService.checkResident(this.checkResident).subscribe({
             next:(value)=>{
               this.Addfund.residentId = value.id;
               this.Addfund.month= this.newFund.month;
              this.Addfund.year= this.newFund.year;
              this.Addfund.datePaid= this.newFund.datePaid;
              this.Addfund.paidTo= this.newFund.paidTo;
              this.Addfund.amount= this.newFund.amount;
              this.Addfund.paidAmount= this.newFund.paidAmount;
              this.Addfund.outstanding= this.newFund.outstanding;
               console.log(this.Addfund);
           this.fundservice.addFund(this.Addfund).subscribe({
               next:(value)=>{
               console.log("added",value);
               this.router.navigate(['home/fund']);
                },
                 error:(err)=>{
                console.log("error",err);
                }
                 });   },
                  error:(err)=>{
               if(err.status == 404)
               alert("Resident Not Found");
               },
                complete:()=>{
                console.log("success");
                }
               }); 
              
              }
            }
          }
          Oncancel(){
    this.router.navigate(['home/expense']);
  }
}

