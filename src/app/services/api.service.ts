import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl:string ='http://localhost:4001'
  constructor(private http:HttpClient) {}
  // get all recipes api  
  getAllRecipesApi(){
      return this.http.get(`${this.serverUrl}/all-recipes`)
    }

    //api to add testimonials
    addTestimonialApi(reqBody:any){
      return this.http.post(`${this.serverUrl}/add-testimonial`,reqBody)
    }
   
    // api to register a user
    registerApi(reqBody:any){
      return this.http.post(`${this.serverUrl}/register`,reqBody)
    }
    loginApi(reqBody:any){
      return this.http.post(`${this.serverUrl}/login`,reqBody)
    }

    appendToken(){
      let headers = new HttpHeaders()
      const token = sessionStorage.getItem("token")
      if(token){
        headers= headers.append("Authorization",`Bearer ${token}`)
          }
          return {headers}
    }
    viewRecipeApi(id:string){
      return this.http.get(`${this.serverUrl}/view-recipe/${id}`, this.appendToken())
    }

    //api to download recipe
    downloadRecipeApi(recipeId:string, recipeDetails:any){
      return this.http.post(`${this.serverUrl}/download-Recipe/${recipeId}`, recipeDetails, this.appendToken())
    }
    // api to add saved recipe
    savedRecipesApi(reqBody:any){
      return this.http.post(`${this.serverUrl}/save-recipe`, reqBody, this.appendToken())
    }
    
    // api to get all saved recipe
    getsavedRecipesApi(){
      return this.http.get(`${this.serverUrl}/get-allsaved-Recipes`, this.appendToken())
    }

    // api to delete saved item recipe
    removesavedRecipeApi(recipeId:string){
      return this.http.delete(`${this.serverUrl}/delete-savedrecipes/${recipeId}`, this.appendToken())
    }


    getUserDownloads(){
      return this.http.get(`${this.serverUrl}/user-downloads`, this.appendToken())
    }

    editUserAPI(reqBody:any){
      return this.http.post(`${this.serverUrl}/edit-user`,reqBody, this.appendToken())

    }

    allUsersAPI(){
      return this.http.get(`${this.serverUrl}/all-users`, this.appendToken())
    }


    allDownloadListAPI(){
      return this.http.get(`${this.serverUrl}/download-list`, this.appendToken())
    }
    
    getallFeedbackListAPI(){
      return this.http.get(`${this.serverUrl}/all-feedback`, this.appendToken())

    }

    updateFeedbackStatusAPI(feedBackId:string,status:string){
      return this.http.get(`${this.serverUrl}/feedback/${feedBackId}/update?status=${status}`, this.appendToken())
    }

    getAllApprovedTestimonialsAPI(){
      return this.http.get(`${this.serverUrl}/approved-feedback`, this.appendToken())

    }

    addRecipeAPI(reqBody:any){
      return this.http.post(`${this.serverUrl}/add-recipe`,reqBody, this.appendToken())
 
    }

}
