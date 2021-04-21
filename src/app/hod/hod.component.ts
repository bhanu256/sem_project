import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from 'src/app/datashare.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hod',
  templateUrl: './hod.component.html',
  styleUrls: ['./hod.component.css']
})
export class HodComponent implements OnInit {

  name : any;
  dept : any;

  peris_b = false;
  report_b = false;
  past_b = false;
  present_b = false;
  suc = false;

  sys = []
  tech = []
  sol_pro = []
  pre_pro = []

  tot_solved : number;
  tot_present : number;

  cur_solved_page = 1;
  cur_present_page = 1;

  countPerPage = 10;

  constructor(public route:Router,public serve : DatashareService,public http:HttpClient) { }

  ngOnInit() {
    this.name = this.serve.name + " Sir";
    if(!this.serve.logged){
      this.route.navigate(['home']);
    }

    this.http.get("http://localhost:3000/getHodDept/"+this.serve.name)
      .subscribe((data)=>{
        this.dept = data[0].name;
      },
      (error)=>{
        console.log(error)
      });

    this.http.get("http://localhost:3000/allSolved")
      .subscribe((data)=>{
        this.tot_solved = parseInt(data.toString())
      },
      (error)=>{
        console.log(error)
    });

    this.http.get("http://localhost:3000/allPresent")
      .subscribe((data)=>{
        this.tot_present = parseInt(data.toString())
      },
      (error)=>{
        console.log(error)
    });


  }

  logout(){
    this.route.navigate(["home"]);
    this.serve.logged = false;
  }

  peris(){
    this.peris_b = true;
    this.report_b = false;
    this.past_b = false;
    this.present_b = false;
    this.suc = false;

    this.http.get("http://localhost:3000/getDeptSys/"+this.dept)
      .subscribe((data)=>{
        this.sys = []
        Object.values(data).forEach(ele=>{
          this.sys.push(ele)
        })
      },
      (error)=>{
        console.log(error)
      });
  }

  report(){
    this.peris_b = false;
    this.report_b = true;
    this.past_b = false;
    this.present_b = false;
    this.suc = false;

    this.http.get("http://localhost:3000/getDeptSys/"+this.dept)
      .subscribe((data)=>{
        this.sys = []
        Object.values(data).forEach(ele=>{
          if(ele.status=="working"){
            this.sys.push(ele)
          }
        })

        if(this.sys.length>0){ 
          this.http.get("http://localhost:3000/getNames/technician")
            .subscribe((data)=>{
              this.tech = []
              Object.values(data).forEach(ele=>{
                this.tech.push(ele.name)
              })
            },
            (error)=>{
              console.log(error)
            })
          }
      },
      (error)=>{
        console.log(error)
      });

  }

  reportSer(ssn:any,stn:any,mes:any){
    this.http.get("http://localhost:3000/updateDeptPro/"+this.dept+"/"+ssn+"/"+stn+"/"+mes+"/"+"reported")
      .subscribe((data)=>{
        if(data[0].res=="success"){
          this.report_b = false
          this.suc = true;
        }
      },
      (error)=>{
        console.log(error)
      })
  }

  jsys(){
    return this.sys.filter(x => x.status == "working")
  }


  past(){
    this.peris_b = false;
    this.report_b = false;
    this.past_b = true;
    this.present_b = false;
    this.suc = false;

    this.pastSer(this.cur_solved_page)
  }

  pastSer(p:any){
    this.cur_solved_page = p;
    this.http.get("http://localhost:3000/getSolvedPages/"+p)
      .subscribe((data)=>{
        this.sol_pro = []
        Object.values(data).forEach(ele=>{
          this.sol_pro.push(ele)
        })
      },
      (error)=>{
        console.log(error)
      })
  }

  present(){
    this.peris_b = false;
    this.report_b = false;
    this.past_b = false;
    this.present_b = true;
    this.suc = false;

    this.presentSer(this.cur_present_page)
  }

  presentSer(p:any){
    this.cur_present_page = p;

    this.http.get("http://localhost:3000/getPresentPages/"+p)
      .subscribe((data)=>{
        this.pre_pro = []
        Object.values(data).forEach(ele=>{
          this.pre_pro.push(ele)
        })
      },
      (error)=>{
        console.log(error)
      })

  }

}
