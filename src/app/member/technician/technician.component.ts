import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { DatashareService } from 'src/app/datashare.service';

@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  name : string;

  all = false;
  select = false;
  await = false;
  comp = false;
  deptP = false;

  total_rsys = []
  total_ssys = []
  total_awsys = []
  total_solved = []
  dept_sys = []

  countPerPage = 10
  trpage = 1
  allrcount = 0

  tspage = 1
  allscount = 0

  tawpage = 1
  allawcount = 0

  tsolvedpage = 1
  allsolved = 0

  constructor(public http:HttpClient,public route:Router,public serve : DatashareService) { }

  ngOnInit() {
    this.name = this.serve.name;
    if(!this.serve.logged){
      this.route.navigate(['home']);
    }
  }

  logout(){
    this.route.navigate(["home"]);
    this.serve.logged = false;
  }

  all_problems(){
    this.all = true;
    this.select = false;
    this.await = false;
    this.comp = false;
    this.deptP = false;

    this.http.get("http://localhost:3000/getTotalReportedSystemCount/"+this.name)
      .subscribe((data)=>{
          this.allrcount = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.all_problemsSer(1)

  }

  all_problemsSer(p:any){
    this.trpage = p;

    this.http.get("http://localhost:3000/getReportedSystemsTechnician/"+p+"/"+this.name)
      .subscribe((data)=>{
        console.log(data)
        var length = Object.keys(data).length-1
        if(data[length].mes==="success"){
          this.total_rsys = []
          delete data[length]
          Object.values(data).forEach(ele=>{
            this.total_rsys.push(ele)
          })
          
        }
        console.log(this.total_rsys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  updateSta(tk:any,system:any,status:string,ele:any){
    this.http.get("http://localhost:3000/updateStatusTech/"+tk+"/"+system+"/"+status)
      .subscribe((data)=>{
        console.log(data)
        if(status=="in progress"){
          console.log(this.total_rsys)
          this.total_rsys = this.total_rsys.filter(function(value,index,arr){
            return value.system!=system;
          })
          console.log(this.total_rsys)
          //this.selected()
        }
        else if(status=="awaiting"){
          console.log(this.total_ssys)
          this.total_ssys = this.total_ssys.filter(function(value,index,arr){
            return value.system!=system;
          })
          console.log(this.total_ssys)
          //this.awaiting()
        }
        
      },

      (error)=>{
        console.log(error)
      }
    );
  } 

  selected(){
    this.all = false;
    this.select = true;
    this.await = false;
    this.comp = false;
    this.deptP = false;

    this.http.get("http://localhost:3000/getTotalSelectedSystemCount/"+this.name)
      .subscribe((data)=>{
          this.allscount = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.selectedSer(1)

  }

  selectedSer(p:any){
    this.tspage = p;

    this.http.get("http://localhost:3000/getSelectedSystemsTechnician/"+p+"/"+this.name)
      .subscribe((data)=>{
        console.log(data)
        var length = Object.keys(data).length-1
        if(data[length].mes==="success"){
          this.total_ssys = []
          delete data[length]
          Object.values(data).forEach(ele=>{
            this.total_ssys.push(ele)
          })
          
        }
        console.log(this.total_ssys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  awaiting(){
    this.all = false;
    this.select = false;
    this.await = true;
    this.comp = false;
    this.deptP = false;

    this.http.get("http://localhost:3000/getTotalAwaitSystemCount/"+this.name)
      .subscribe((data)=>{
          this.allawcount = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.awaitingSer(1)

  }

  awaitingSer(p:any){
    
    this.tawpage = p

    this.http.get("http://localhost:3000/getAwaitSystemsTechnician/"+p+"/"+this.name)
      .subscribe((data)=>{
        console.log(data)
        var length = Object.keys(data).length-1
        if(data[length].mes==="success"){
          this.total_awsys = []
          delete data[length]
          Object.values(data).forEach(ele=>{
            this.total_awsys.push(ele)
          })
        }
        console.log(this.total_awsys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  completed(){
    this.all = false;
    this.select = false;
    this.await = false;
    this.comp = true;
    this.deptP = false;

    this.http.get("http://localhost:3000/getTotalSolvedSystemCount/"+this.name)
      .subscribe((data)=>{
          this.allsolved = parseInt(data.toString(),10)
      },

      (error)=>{
        console.log(error)
      }
    );

    this.completedSer(1)

  }

  completedSer(p:any){

    this.tsolvedpage = p

    this.http.get("http://localhost:3000/getTotalSystemsTechnician/"+p+"/"+this.name)
      .subscribe((data)=>{
        console.log(data)
        var length = Object.keys(data).length-1
        if(data[length].mes==="success"){
          this.total_solved = []
          delete data[length]
          Object.values(data).forEach(ele=>{
            this.total_solved.push(ele)
          })
        }
        console.log(this.total_ssys)
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  deptSys(){
    this.all = false;
    this.select = false;
    this.await = false;
    this.comp = false;
    this.deptP = true;

    this.http.get("http://localhost:3000/getDeptTechSys/"+this.name)
      .subscribe((data)=>{
        this.dept_sys = []
        Object.values(data).forEach(ele=>{
          this.dept_sys.push(ele)
        })
      },
      (error)=>{
        console.log(error)
      });    

  }

  updateDeptSta(ssn:any,sd:any,sm:any,sta:any){
    this.http.get("http://localhost:3000/updateDeptPro/"+sd+"/"+ssn+"/"+this.name+"/"+sm+"/"+sta)
      .subscribe((data)=>{
        if(data[0].res=="success"){
          this.dept_sys = this.dept_sys.filter(function(value,index,arr){
            if(value.name==ssn)
            return value.status = sta;
          })
        }
      },
      (error)=>{
        console.log(error)
      })
  }

}
