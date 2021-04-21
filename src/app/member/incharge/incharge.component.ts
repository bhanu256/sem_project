import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatashareService } from 'src/app/datashare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incharge',
  templateUrl: './incharge.component.html',
  styleUrls: ['./incharge.component.css']
})
export class InchargeComponent implements OnInit {

  name : any;

  inch = "C"; //temp

  @Input() incha : any;

  comp = false;
  awaits = false;

  total_sys = []
  await_sys = []

  countPerPage = 10;
  page = 1;
  awaitpage = 1;
  allcount = 0;
  awaitcount = 0;

  list_status = ["working","reported"]


  constructor(public http:HttpClient,public share:DatashareService,public route:Router) {
    this.inch=this.share.name;
    this.name = this.share.name;
  }

  ngOnInit() {
    if(!this.share.logged){
      this.route.navigate(['home']);
    }
    console.log(this.incha);
  }

  logout(){
    this.route.navigate(["home"]);
    this.share.logged = false;
  }

  all(){
    this.comp = true;
    this.awaits = false;


    this.http.get("http://localhost:3000/getTotalSystemCount/"+this.inch)
      .subscribe((data)=>{
          this.allcount = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.allSer(1)
  }

  allSer(p:any){
    this.page = p;

    this.http.get("http://localhost:3000/getSystemsIncharge/"+p+"/"+this.inch)
      .subscribe((data)=>{
        console.log(data)
        if(data[10].mes==="success"){
          this.total_sys = []
          delete data[10]
          Object.values(data).forEach(ele=>{
            this.total_sys.push(ele)
          })
        }
        console.log(this.total_sys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  awaiting(){
    this.awaits = true;
    this.comp = false;


    this.http.get("http://localhost:3000/getAwaitSystemCount/"+this.inch)
      .subscribe((data)=>{
          this.awaitcount = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.awaitingSer(1)
  }

  awaitingSer(p:any){
    this.awaitpage = p;

    this.http.get("http://localhost:3000/getAwaitSystemsIncharge/"+p+"/"+this.inch)
      .subscribe((data)=>{
        console.log(data)
        var length = Object.keys(data).length-1
        if(data[length].mes==="success"){
          this.await_sys = []
          delete data[length]
          Object.values(data).forEach(ele=>{
            this.await_sys.push(ele)
          })
        }
        console.log(this.await_sys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  updateSta(name:string,asta:string){
    this.http.get("http://localhost:3000/updateStatusSys/"+name+"/"+asta)
      .subscribe((data)=>{
        console.log(data)
        console.log(this.await_sys)
          this.await_sys = this.await_sys.filter(function(value,index,arr){
            return value.name!=name;
          })
          console.log(this.await_sys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

}
