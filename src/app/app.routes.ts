import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SaveRecipesComponent } from './save-recipes/save-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'', component:HomeComponent,title:'Home Page'},
    {path:'login', component:LoginComponent,title:'Login page'},
    {path:'register', component:RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path:'about', component:AboutComponent,title:'About page'},
    {path:'contact', component:ContactComponent},
    {path:'recipes', component:RecipesComponent,title:'Recipe page'},
    {path:'saved-recipes', component:SaveRecipesComponent},
    {path:'view-recipe/:id', component:ViewRecipeComponent},
    {path:'**', component:PagenotFoundComponent},

];
