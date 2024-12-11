import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipes',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './save-recipes.component.html',
  styleUrl: './save-recipes.component.css'
})
export class SaveRecipesComponent implements OnInit{

  allSavedRecipes:any[] = []
constructor(private api:ApiService){}
ngOnInit(): void {
  this.getSavedRecipes()
  
}

  getSavedRecipes(){
    this.api.getsavedRecipesApi().subscribe({
      next:(res:any)=>{
        console.log(res)
        this.allSavedRecipes= res
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  removeRecipe(id:string){
    console.log("Inside delete")
    this.api.removesavedRecipeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.getSavedRecipes()
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
}
