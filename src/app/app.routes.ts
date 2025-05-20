import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseComponent } from './expense/expense.component';
import { FundComponent } from './fund/fund.component';
import { SummaryComponent } from './summary/summary.component';
import { ResidentComponent } from './resident/resident.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { AddFundComponent } from './fund/add-fund/add-fund.component';
import { AddResidentComponent } from './resident/add-resident/add-resident.component';
import { ConfirmDialogueComponent } from './Shared/confirm-dialogue/confirm-dialogue.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ManageCategoriesComponent } from './expense/manage-categories/manage-categories.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:"confirm",component:ConfirmDialogueComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"home",component:HomeComponent,
        children:[
            {path:"",component:DashboardComponent},
            {path:"expense",component:ExpenseComponent},
            {path:"fund",component:FundComponent},
            {path:"summary",component:SummaryComponent},
            {path:"resident",component:ResidentComponent},
            {path:"addExpense",component:AddExpenseComponent},
            {path:"managecategory",component:ManageCategoriesComponent},
            {path:"addFund",component:AddFundComponent},
            {path:"addResident",component:AddResidentComponent},
        ],canActivate:[AuthGuard]
    }
    
];
