import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent  implements OnInit{
allRecipes:any = []
searchRecipe:any =""
constructor(private api:ApiService){}

ngOnInit(): void {
this.getAllRecipes()
}

getAllRecipes(){
  this.api.getAllRecipesApi().subscribe((res:any)=>{
    this.allRecipes = res
    console.log(res)
  })
}

}
