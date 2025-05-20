import { Component } from '@angular/core';
import { ExpenseService } from '../../Services/expense.service';
import { ExpenseCategoryService } from '../../Services/expense-category.service';
import { Expense } from '../../models.model';
import { Category } from '../../models.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddExpenseComponent {

  newExpense: Expense = {
    id: 0,
    amount: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    description: '',
    expenseDate: new Date().getDate(),
    categoryId: 0
  };

  expenses: Expense[] = [];
  categories: Category[] = [];
  title: string = '';

  constructor(
    private expenseService: ExpenseService,
    private expnsecategory:ExpenseCategoryService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.newExpense = navigation.extras.state['updateexpense'];
      this.title = navigation.extras.state['mode'];
    } else {
      this.title = "Add Expense";
    }

    
  }
ngOnInit(){
  this.loadCategories();
}
  loadCategories() {
    this.expnsecategory.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Failed to load categories", err);
      }
    });
  }

  addExpense(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.title !== "Add Expense") {
      this.expenseService.updateExpense(this.newExpense.id, this.newExpense).subscribe({
        next: value => {
          console.log('Expense updated:', value);
          this.router.navigate(["home/expense"]);
        },
        error: err => console.error('Error updating expense:', err),
        complete: () => console.log('Update expense completed.')
      });
    } else {
      this.expenseService.addExpense(this.newExpense).subscribe({
        next: (data) => {
          this.expenses.push(data);
          this.resetExpenseForm(form);
          this.router.navigate(["home/expense"]);
        },
        error: (err) => {
          console.error('Error adding expense:', err);
          alert('Failed to add expense. Please try again.');
        }
      });
    }
  }

  resetExpenseForm(form: NgForm) {
    form.resetForm({
      id: 0,
      amount: 0,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      description: '',
      expenseDate: 1,
      categoryId: 0
    });
  }

  openCategoryManager() {
    this.router.navigate(['/home/managecategory']);
  }
  Oncancel(){
    this.router.navigate(['home/expense']);
  }
}
