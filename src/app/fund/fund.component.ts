import { Component, OnInit } from '@angular/core';
import { FundService } from '../Services/fund.service';
import { Fund } from '../models.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ResidentService } from '../Services/resident.service';
import { Resident } from '../models.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../Shared/confirm-dialogue/confirm-dialogue.component';
import { Fund_Resident } from '../models.model';
@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.css'],
  imports:[CommonModule,
             RouterLink,
             
  ]
})
export class FundComponent implements OnInit {
  funds: Fund[] = [];
 NewFunds:Fund_Resident[]=[];

  UpdatedFund : Fund_Resident= {
    id: 0,
    month:0,
    year: 0,
    datePaid: 0,
    paidTo: "",
    amount: 0,
    paidAmount:0,
    outstanding: 0,
    residentId: 0,
    ResidentName: "" 
   };
  confirmation:boolean=false;
  constructor(private fundService: FundService,
    private cd:ChangeDetectorRef,
    private residentservice:ResidentService,
    private router:Router,
    private dialogue:MatDialog
  ) {}

  ngOnInit(): void {
    this.getFunds();
        
  }
  getFunds(): void {
    this.fundService.getFunds().subscribe({
      next: value =>{ 
        this.funds = value;
        this.getresident();
        console.log("values =", value);
      },
      error: err => console.error("error", err),
      complete: () => console.log("Request completed.") 
    });
  }
  updatefunds(id:number,fund:Fund_Resident){
    this.router.navigate(["home/addFund"],{
      state:{
        updatefund:fund,mode:"Edit Fund"
      }
    });
    
    this.getFunds();
    }
    deletefund(fund:Fund_Resident){
    
    const dialogueref = this.dialogue.open(ConfirmDialogueComponent,{
        width:"350px",
      height:"250px"
      });
      dialogueref.afterClosed().subscribe({
        next:(value) =>{
          this.confirmation = value;
          if(this.confirmation){
            
            this.fundService.deleteFund(fund.id).subscribe({
              next: value => {
                
                console.log("values =", value)
                this.cd.detectChanges();
                this.getFunds();
              },
            error: err => console.error("error", err),
            complete: () => console.log("Request completed.")
            });
            this.getFunds();
          }
        },
      });
      
    }
    createFund(fund:Fund){
        this.fundService.addFund(fund).subscribe({
          next: value => console.log("values =", value),
          error: err => console.error("error", err),
          complete: () => console.log("Request completed.")
        });
        this.getFunds();
    }
    getresident(){
      this.funds.forEach(element => {
        this.residentservice.getResidentById(element.residentId).subscribe({
          next:value=>{
            this.UpdatedFund.ResidentName = value.ownerName;
            this.UpdatedFund.id = element.id;
            this.UpdatedFund.residentId = element.residentId;
            this.UpdatedFund.amount = element.amount;
            this.UpdatedFund.datePaid = element.datePaid;
            this.UpdatedFund.month = element.month;
            this.UpdatedFund.outstanding = element.outstanding;
            this.UpdatedFund.paidAmount = element.paidAmount;
            this.UpdatedFund.paidTo = element.paidTo;
            this.UpdatedFund.year = element.year;
            this.NewFunds.push(this.UpdatedFund);
            console.log(this.UpdatedFund);
            }
        });
      });
    }
    
}
