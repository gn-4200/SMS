import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { RegisterService } from '../Services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[ReactiveFormsModule,  MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatCardModule]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
 

  constructor(private fb: FormBuilder,private router:Router,private registerservice:RegisterService) {
      
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     password: ['', [
  Validators.required,
  Validators.minLength(8),
  Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{8,}$/)
]],

      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Form Submitted:', this.registerForm.value);
      this.registerservice.registerUser(this.registerForm.value).subscribe({
        next:(value)=>{
              if(value.token){
                    this.router.navigate(["home"]);
              }
        },
        error:(err)=>{
          console.log("error",err);
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
