import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from "../header/header.component";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit{
/*
To access data from url path
1) Activated Route
2) @input decorator
*/
Recipe:any={}
Rrecipes:any={}


constructor(private api:ApiService, private Aroute:ActivatedRoute){}
ngOnInit():void{
 
  this.Aroute.params.subscribe((res:any)=>{
    const {id} = res
    this.getRecipe(id)
    this.relatedRecipes()
  })
}

getRecipe(id:string){
  console.log("Inside get recipe")
  this.api.viewRecipeApi(id).subscribe({
    next:(res:any)=>{
      this.Recipe = res
      console.log(this.Recipe)
      console.log(typeof res)
    },
    error:(err:any)=>{
        console.log(err)
    }
  })
}

relatedRecipes(){
  this.api.getAllRecipesApi().subscribe((res:any)=>{
    console.log(res,typeof res);
    for(let x of this.Recipe.mealType){
      let p = res.filter((item:any)=>item.mealType.includes(x))
      this.Rrecipes = p.slice(0,4)
    }
  })
}

downloadRecipe(){
  const recipeDetails = {
    name:this.Recipe.name,
    cuisine:this.Recipe.cuisine
  }
  this.api.downloadRecipeApi(this.Recipe._id,recipeDetails).subscribe({

    next:(res:any)=> {
      console.log(res)
      this.generatePdf()
    },

    error:(err:any)=>{
      console.log(err)
      Swal.fire({
        title:'Oops',
        text:'Download Failed',
        icon:'error'
      })
    }
  })
}

generatePdf(){
  // create instance for the jspdf Class
  const pdf = new jsPDF()

  // heading
  pdf.setFontSize(16)
  pdf.setTextColor("green")
  pdf.text(this.Recipe.name,10,10)

  //body
  pdf.setFontSize(12)
  pdf.setTextColor("black")
  pdf.text(`cuisine: ${this.Recipe.cuisine}`,10,20)
  pdf.text(`Serving: ${this.Recipe.Serving}`,10,30)
  pdf.text(`Mode of Cooking: ${this.Recipe.difficulty}`,10,40)
  pdf.text(`Preparation Time: ${this.Recipe.prepTimeMinutes}`,10,50)
  pdf.text(`Cooking Time: ${this.Recipe.cookTimeMinutes}`,10,60)
  pdf.text(`Calories per Serving: ${this.Recipe.caloriesPerServing}`,10,70)

  //table creation
  let head = [['Ingredients','Instructions']]
  let body = []
  body.push([this.Recipe.ingredients, this.Recipe.instructions])
  // create table
  autoTable(pdf,{head,body, startY:100})
  //to open that pdf in new tab
  pdf.output('dataurlnewwindow')
  //download the pdf with the given name
  pdf.save(`${this.Recipe.name}-recipe-download.pdf`)
}

savedRecipes(){
  const {_id, name , cuisine , image} = this.Recipe
  this.api.savedRecipesApi({id:_id, name, cuisine, image}).subscribe({
    next:(res:any)=>{
      console.log(res)
      Swal.fire({
        title:'Wow',
        text:'Recipe saved successfully',
        icon:'success'
      })
    },

    error:(err:any)=>{
      console.log(err)

      if(err.status == 406){
        Swal.fire({
          title:'Oops',
          text:err.error,
          icon:'warning'

        })
      }
      else{
        Swal.fire({
          title:'Oops',
          text:"Something went wrong",
          icon:'error'

        })
      }
    }
  })
}



}

