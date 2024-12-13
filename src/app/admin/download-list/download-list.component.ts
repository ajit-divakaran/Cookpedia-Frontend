import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent implements OnInit {
allDownloadList:any = []

constructor(private api:ApiService){}

ngOnInit(): void {
  this.getAllDownloadList()
}

getAllDownloadList (){
  this.api.allDownloadListAPI().subscribe((res:any)=>{
  this.allDownloadList = res
  console.log(this.allDownloadList)
})}
}
