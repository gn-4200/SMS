import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../Services/dashboard.service';
import { Expense, Fund, Resident, Summary } from '../models.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Residents:Resident[]=[];
  Funds:Fund[]=[];
  Expenses:Expense[]=[];
  Summary:any;
  TotalFund:number=0;
  TotalExpense:number=0;
    constructor(private dashboradservice:DashboardService){}
    ngOnInit(): void {
      this.getdata();
    }
    getdata(){
      const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();
  console.log(currentDate);
      this.dashboradservice.getDashboardSummary( currentMonth,currentYear).subscribe({
        next:(data)=>{
          this.Residents=data.residents;
          this.Expenses=data.expenses;
          this.Funds=data.funds;
          this.Summary=data.summary;
          this.TotalFund = this.Funds.reduce((sum, fund) => sum + fund.paidAmount, 0);
      this.TotalExpense = this.Expenses.reduce((sum, expense) => sum + expense.amount, 0);
        },
        error:(err)=>{
          console.log("erro",err);
        },
        complete:()=>{
          console.log("Completed");
        }

      });
      
    }
}
