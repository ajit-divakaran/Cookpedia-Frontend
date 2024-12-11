import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLogin:boolean = false
  username:any = ""

  constructor(private router:Router){}

 ngOnInit() :void{
  if(sessionStorage.getItem('token')){
   
    this.username = sessionStorage.getItem('existingUser')
    // this.username = JSON.parse(sessionStorage.getItem('existingUser')|| "").username  //this happens because even before the data is accessed angular assigns null to the variable which throws error so assign "" to give initial value empty string so that the data type matches
    this.username = JSON.parse(this.username).username.charAt(0).toUpperCase() + JSON.parse(this.username).username.slice(1)
      this.isLogin = true

  }
  console.log(this.username)
  console.log(this.isLogin)
}

logout(){
  sessionStorage.clear()
  this.isLogin = false
  this.router.navigateByUrl('/')
}
}
