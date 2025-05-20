import { Component } from '@angular/core';
import { ExpenseCategory } from '../../models.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogueComponent } from '../../Shared/confirm-dialogue/confirm-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseCategoryService } from '../../Services/expense-category.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-categories',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-categories.component.html',
  styleUrl: './manage-categories.component.css'
})
export class ManageCategoriesComponent implements OnInit{
  categories: ExpenseCategory[] = [];
  
  newCategory: string = '';
  input:boolean=false;
  editingCategory: ExpenseCategory | null = null;
  constructor(private dialog :MatDialog,
              private expenseCategoryService:ExpenseCategoryService,
              private router:Router
  ){}
  ngOnInit(){
    this.getcategories(); 
  }
    getcategories(){
      console.log("error on method");
      this.expenseCategoryService.getCategories().subscribe({
        next:value=>{
          this.categories = value;
        },
        error:err=>{
          console.log("Error",err);
        }
      });
    }
  addCategory() {
    if (this.newCategory.trim()) {
      const newId = this.categories.length ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
      this.categories.push({ id: newId, name: this.newCategory.trim() });
      this.newCategory = '';
    }
  }

 deleteCategory(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
    width: "350px",
    height: "250px"
  });

  dialogRef.afterClosed().subscribe({
    next: value => {
      if (value) {
        this.expenseCategoryService.deleteCategory(id).subscribe({
          next: () => {
           this.editingCategory = null;
           this.getcategories();
            console.log(`Category with ID ${id} deleted.`);
            this.router.navigate(['home/addexpense']);
            
          },
          error: err => {
            console.error('Delete failed:', err);
          }
        });
      }
    }
  });
}


  editCategory(category: ExpenseCategory) {
    this.editingCategory = { ...category };
  }

 updateCategory() {
  if (this.editingCategory) {
    this.expenseCategoryService
      .updateCategory(this.editingCategory.id, this.editingCategory)
      .subscribe({
        next: () => {
        console.log('Category updated successfully.');
        this.editingCategory = null;
        this.getcategories();
        this.router.navigate(['home/addexpense']);
        },
        error: err => {
          console.error('Update failed:', err);
        }
      });
  }
}


  cancelEdit() {
    this.editingCategory = null;
    this.router.navigate(['home/addExpense']);
  }
  OnCancel(){
    console.log("Cancel Method");
    this.router.navigate(['home/addExpense']);
  }
}
