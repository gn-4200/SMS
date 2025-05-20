import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../Services/expense.service';
import { Expense } from '../models.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogueComponent } from '../Shared/confirm-dialogue/confirm-dialogue.component';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  imports:[CommonModule,
    
      
  ]
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  confirmation:boolean=false;
  constructor(private expenseService: ExpenseService,private router: Router,private matdialogue:MatDialog) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: value => {
        this.expenses = value;
        console.log('Expenses:', value);
      },
      error: err => console.error('Error fetching expenses:', err),
      complete: () => console.log('Get expenses completed.')
    });
  }

  createExpense(){
   this.router.navigate(["home/addExpense"]);
  }

  updateExpense(id: number, expense: Expense): void {
    this.router.navigate(["home/addExpense"],{
      state:{
        updateexpense:expense,mode:'Edit Expense'
      }
     });
    
  }

  deleteExpense(id: number): void {
    const dialogRef = this.matdialogue.open(ConfirmDialogueComponent,{
      width:"350px",
      height:"250px"

    });
  dialogRef.afterClosed().subscribe({
    next:(value)=>{
      this.confirmation=value;
      if(this.confirmation==true){
        this.expenseService.deleteExpense(id).subscribe({
          next: value => {
            console.log('Expense deleted:', value);
            this.getExpenses();
          },
          error: err => console.error('Error deleting expense:', err),
          complete: () => console.log('Delete expense completed.')
        });
        this.confirmation = false;
      }
    }
  });
  
    
  }
}
