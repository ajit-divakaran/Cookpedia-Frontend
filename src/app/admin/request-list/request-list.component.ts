import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
    allFeedbacks:any=[]

    constructor(private api:ApiService){}
    ngOnInit(): void {
      this.getAllFeedbacks()
    }

  getAllFeedbacks(){
    this.api.getallFeedbackListAPI().subscribe((res:any)=>{
      this.allFeedbacks = res
      console.log(this.allFeedbacks)
    })
  }

  updateFeedback(id:string, status:string){
    this.api.updateFeedbackStatusAPI(id,status).subscribe((res:any)=>{
      this.getAllFeedbacks()
    })
  }
}
