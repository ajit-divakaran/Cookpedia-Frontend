import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
demoEmail:string = "xyz@gmail.com"

constructor(private api:ApiService){}

testimonialGroup = new FormGroup({
  name:new FormControl("",Validators.required),
  email:new FormControl("",Validators.required),
  message:new FormControl("",Validators.required)

})

addTestimonial(){
  console.log(this.testimonialGroup.value)

  if(this.testimonialGroup.invalid){
    alert('Please fill the form completely')
  }
  else{
    this.api.addTestimonialApi(this.testimonialGroup.value).subscribe({
      next:(result: any) =>{
        console.log(result);
        alert('Testimonial added successfully')
        this.testimonialGroup.reset()

      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
}
