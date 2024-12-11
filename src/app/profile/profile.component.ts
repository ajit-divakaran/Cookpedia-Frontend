import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  allUserDownloadList:any =[]
  profileImage:string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIn-gE6j6sjvg0ekFgFBIzVP5VdN3aBu9dLg&s"

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.UserDownlaods()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profilePic){
      this.profileImage = user.profilePic;
    }
  }

  UserDownlaods(){
    this.api.getUserDownloads().subscribe((res:any)=>{
      this.allUserDownloadList = res
      console.log(this.allUserDownloadList)
    })
  }
  
  getFile(event:any){
    let uploadFile = event.target.files[0]
    // convert file to url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImage = event.target.result
      
    }
  }

  updateProfile(){
    console.log("Inside profile update")
    this.api.editUserAPI({profilePic:this.profileImage}).subscribe((res:any)=>{
      sessionStorage.setItem("existingUser",JSON.stringify(res))
      this.profileImage = res.profilePic
      alert("Profile Updated successfully !!!")
    })
  }
}
