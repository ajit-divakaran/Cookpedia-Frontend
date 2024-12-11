import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private api:ApiService, private router:Router){}

  loginForm = new FormGroup({
   
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')])
  })

  login(){
    
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      Swal.fire({
        title:'Oops',
        text:'Please fill the form completely',
        icon:'info'
      })}
      else{
        this.api.loginApi(this.loginForm.value).subscribe({
          next:(res:any)=>{
            console.log(res)
            Swal.fire({
              title:'Success',
              text:'Login Successful',
              icon:"success"

            })
            this.loginForm.reset()
            sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
            sessionStorage.setItem("token",res.token)
            if(res.existingUser.role == 'user'){
              this.router.navigateByUrl('/')
            }
            else{
              //admin panel
            }
          },
          error:(err:any)=>{
            console.log(err)
            if(err.status == 406){
              // alert(err.error)
              Swal.fire({
                title:'Error',
                text:err.error,
                icon:'error'
              })
              this.loginForm.reset()
          }
          else{
            // alert('Something went wrong')
            Swal.fire({
              title:'Wow',
              text:`Something went wrong`,
              icon:'error'
            })
          }}
        })
      }
    
  }

}
