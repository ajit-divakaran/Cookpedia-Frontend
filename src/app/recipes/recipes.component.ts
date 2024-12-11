import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent,FormsModule,SearchPipe,NgxPaginationModule,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  allRecipes:any[]=[]
  dataset:any[]=[]
  searchkey:string = "" 
  p: number = 1;

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesApi().subscribe({
      next:(result:any)=>{
        this.allRecipes = result
        this.dataset = result
        console.log(this.allRecipes)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  filterCuisineType(cuisineType:any){
    this.allRecipes = this.dataset.filter((item)=>item.cuisine == cuisineType)
  }

  filterMealType(mealType:any){
    this.allRecipes = this.dataset.filter((item)=> item.mealType.includes(mealType))
  }
}
