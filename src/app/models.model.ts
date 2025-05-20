export interface ExpenseCategory {
    id: number;
    name: string;
    description?: string;
  }

  export interface Expense {
    id: number;
    amount: number;
    month: number;
    year: number;
    description: string;
    expenseDate: number;
    categoryId: number;
  }
  export interface Fund_Resident{
      id: number;
    month: number;
    year: number;
    datePaid: number;
    paidTo: string;
    amount: number;
    paidAmount: number;
    outstanding: number;
    ResidentName: string;
    residentId: number;
    };
  

  export interface Fund {
    
    id: number;
    month: number;
    year: number;
    datePaid: number;
    paidTo: string;
    amount: number;
    paidAmount: number;
    outstanding: number;
    residentId: number;
  }
  export interface checkResident{
    Name : string;
    houseNumber:string;
  };
  
  export interface Resident {
    id: number;
    ownerName: string;
    phoneNumber: string;
    street: string;
    houseNumber: string;
  }
  
  export interface Summary {
    id: number;
    month: number;
    year: number;
    openningBalance: number;
    totalFund: number;
    expense: number;
    closingBalance: number;
  }

export interface Category {
  id: number;
  name: string;
}