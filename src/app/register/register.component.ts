import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private api:ApiService, private router:Router){}

  regsiterForm = new FormGroup({
    username:new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')])
  })

  register(){
    console.log(this.regsiterForm.value);
    if(this.regsiterForm.invalid){
      // alert('Please fill the form properly')
      Swal.fire({
        
        text:"Please fill the form properly",
        icon:'warning'
      })
    }
    else{
      this.api.registerApi(this.regsiterForm.value).subscribe({
        next:(res:any)=>{
          console.log(res)
          Swal.fire({
            title:'Login Successful',
            text:`welcome ${res.username}. Please login get full access`,
            icon:'success'
          })
          // alert(`Welscome ${res.username}. Login to Continue`)
          this.regsiterForm.reset()
          this.router.navigateByUrl('/login')
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
            this.regsiterForm.reset()
          }
          else{
            // alert('Something went wrong')
            Swal.fire({
              title:'Wow',
              text:`Something went wrong`,
              icon:'error'
            })
          }
        }
      })
    }
  }
}
