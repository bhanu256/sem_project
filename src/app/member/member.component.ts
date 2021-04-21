import { Component, OnInit, NgModule } from '@angular/core';
import { DatashareService } from '../datashare.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit {

  name : "#";

  incharge = "C";

  preNameList = [];

  warn = ""

  constructor(public share:DatashareService, public router:Router,public http:HttpClient) { }

  ngOnInit() {
    this.share.logged = false;
  }

  auth(np:any,user:any,pass:any){
    this.share.incharge=this.incharge;
    

    this.http.get("http://localhost:3000/auth/"+np+"/"+user+"/"+pass)
      .subscribe((data)=>{
        console.log(Object(data).status)
        if(Object(data).status=="success"){
          this.router.navigate(["member/"+np]);
          this.share.name = user;
          this.share.logged = true;
        }
        else{
          this.warn = "Wrong username or password"
          this.share.logged = false;
          console.log("error")
        }
      },
      
      (error)=>{
        console.log(error)
      }
    );
  }

  getNames(pp:any){

    console.log(pp)

    this.http.get("http://localhost:3000/getNames/"+pp)
      .subscribe((data)=>{
        this.preNameList = []
        Object.values(data).forEach(ele=>{
          this.preNameList.push(ele.name)
        })
        console.log(this.preNameList)
      },
      
      (error)=>{
        console.log(error)
      }
    );
  }
}
