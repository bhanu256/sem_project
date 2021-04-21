import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from 'src/app/datashare.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  name : any;

  count_b = false;
  past_b = false;
  present_b = false;

  total_count : number;
  total_working : number;
  total_not : number;

  labs = []
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

  counts(){
    this.count_b = true;
    this.past_b = false;
    this.present_b = false;

    this.http.get("http://localhost:3000/systemCounts")
      .subscribe((data)=>{
        this.labs = []
        this.total_count = 0
        this.total_working = 0
        this.total_not = 0
        Object.values(data).forEach(ele=>{
          this.labs.push(ele)
          this.total_count += parseInt(ele.count)
          this.total_working += ele.working
          this.total_not += ele.not
        })
      },
      (error)=>{
        console.log(error)
      })
  }

  past(){
    this.count_b = false;
    this.past_b = true;
    this.present_b = false;

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
    this.count_b = false;
    this.past_b = false;
    this.present_b = true;

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
