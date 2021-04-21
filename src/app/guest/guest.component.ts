import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  rep = false;
  tk = false;
  sta = false;

  tk_db : string;

  labs_db = []
  systems_db = []

  status_db = false
  db_sys : string;
  db_lab : string;
  db_tech : string;
  db_sta : string;
  db_rdate : string;
  db_sdate : string;
  db_mes : string;

  constructor(public http:HttpClient) { }

  ngOnInit() {
    
  }

  ngAfterViewInit(){

  }

  changed(lab:string){

    this.systems_db = []

    this.http.get("http://localhost:3000/getSystemslist/"+lab)
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.systems_db.push(ele.name)
        })
        console.log(this.systems_db)
      },

      (error)=>{
        console.log(error)
      }
    )

  }

  report(){
  
    this.rep = true;
    this.sta = false;
    this.tk = false;

    this.labs_db = []

    this.http.get("http://localhost:3000/getlabslist")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.labs_db.push(ele.name)
        })
        console.log(this.labs_db)
      },

      (error)=>{
        console.log(error)
      }
    )
  }

  reportSer(lab:string,sys:string,mes:string){
    this.http.get("http://localhost:3000/insertProblem/"+lab+"/"+sys+"/"+mes)
      .subscribe((data)=>{
        console.log(data[0])
        if(data[0].mes=="success"){
          this.tk = true;
          this.rep = false;
          this.tk_db = data[0].id;
        }
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  status(){
    
    this.rep = false;
    this.sta = true;
    this.tk = false;
    this.status_db = false;
  }

  statusSer(token:string){
    this.http.get("http://localhost:3000/getStatus/"+token)
      .subscribe((data)=>{
        if(data[1].mes===("success")){
          this.db_sys = data[0].system
          this.db_lab = data[0].lab
          this.db_tech = data[0].assigned_to
          this.db_sta = data[0].status
          this.db_rdate = data[0].date
          this.db_sdate = data[0].solved
          this.db_mes = data[0].problem
          this.status_db = true
        }
      },

      (error)=>{
        console.log(error)
      }
    );
  }

}
