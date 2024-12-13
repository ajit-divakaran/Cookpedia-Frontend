import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allRecipes:any[]=[]
  allFeedbacks:any[]=[]
  // recipe_id:any = ""
  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    this.getAllRecipes()
    this.getApprovedMessage()
  }

  getAllRecipes(){
  this.api.getAllRecipesApi().subscribe({
    next:(result:any)=>{
      this.allRecipes = result.slice(0,3)
      console.log(this.allRecipes)
    },
    error:(err:any)=>{
      console.log(err)
    }
  })
}

viewRecipe(id:string){
  if(sessionStorage.getItem("token")){
    console.log("hello")
  console.log(id)
    this.router.navigateByUrl(`/view-recipe/${id}`)
  }
}

getApprovedMessage(){
  this.api.getAllApprovedTestimonialsAPI().subscribe((res:any)=>{
    this.allFeedbacks =res;
    console.log(res)
  })
}
}
