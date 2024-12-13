import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';

const routes: Routes = [
  // http://localhost:4200/admin
  {path:"",component:DashboardComponent,title:'Admin Dashboard'},
  {path:"download-list",component:DownloadListComponent,title:'Admin Download'},
  {path:"recipe-list",component:RecipeListComponent,title:'Admin Recipe'},
  {path:"user-list",component:UsersListComponent,title:'Admin UserList'},
  {path:"recipe-list",component:RecipeListComponent,title:'Admin RecipeList'},
  {path:"request-list",component:RequestListComponent,title:'Client Request List'},
  {path:"recipe/add",component:ManageRecipeComponent,title:'Add Recipe page'},
  {path:"recipe/:id/edit",component:ManageRecipeComponent,title:'Edit Recipe page'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
