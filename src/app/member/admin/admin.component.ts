import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { DatashareService } from 'src/app/datashare.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('des',{static:false}) des : ElementRef
  @ViewChild('cPass',{static:false}) cPass : ElementRef
  @ViewChild('cName',{static : false}) cName : ElementRef
  @ViewChild('jdm',{static:false}) jdm : ElementRef

  name = "Admin";

  warn = ""

  positions = ["Administrator","HOD","Incharge","Technician"];

  mem_database = [];
  not_ass_incharge = [];
  not_ass_tech = [];
  not_ass_hod = [];
  lab_db = []
  dept_db = []

  peri = ["Computer","Printer"];

  n_member = false;
  n_labs = false;
  n_dept = false;
  n_problems = false;

  aMem = false;
  mMem = false;
  dMem = false;
  aLab = false;
  mLab = false;
  dLab = false;
  aDep = false;
  mDep = false;
  dDep = false;
  suc = false;

  constructor(public http:HttpClient,public route:Router,public share : DatashareService) { }

  ngOnInit() {

    this.name = this.share.name;

    if(!this.share.logged){
      this.route.navigate(['home']);
    }
  
      this.http.get("http://localhost:3000/getmembers")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.mem_database.push(ele.name)
        })
        console.log(this.mem_database)
      },

      (error)=>{
        console.log(error)
      }
    )

    
    
    
  }

  logout(){
    this.route.navigate(["home"]);
    this.share.logged = false;
  }

  member(){
    this.n_member = true;
    this.n_labs = false;
    this.n_dept = false;
    this.n_problems = false;
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  labs(){
    this.n_member = false;
    this.n_labs = true;
    this.n_dept = false;
    this.n_problems = false;
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  dept(){
    this.n_member = false;
    this.n_labs = false;
    this.n_dept = true;
    this.n_problems = false;
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  problems(){
    this.n_member = false;
    this.n_labs = false;
    this.n_dept = false;
    this.n_problems = true;
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  addMem(){
    this.aMem = true;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  addMemSer(name:string,position:string,pass:string){
    this.http.get("http://localhost:3000/insertMember/"+name+"/"+position+"/"+pass)
      .subscribe((data)=>{
        console.log(data[0].mes)
        this.mem_database.push(name)
        this.aMem = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  modMem(){
    this.aMem = false;
    this.mMem = true;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  upMemData(mem:string){
    console.log(this.des.nativeElement.value)
    this.http.get("http://localhost:3000/getMD/"+mem)
      .subscribe((data)=>{
        console.log(data)
        this.des.nativeElement.value = data[0].position
        this.cPass.nativeElement.value = data[0].password
        this.cName.nativeElement.value = data[0].name
      },
      
      (error)=>{
        console.log(error)
        this.des.nativeElement.value = ""
        this.cPass.nativeElement.value = ""
      }
    );
  }

  modMemSer(eName:string,cName:string,des:string,cPass:string){
    this.http.get("http://localhost:3000/updateMember/"+eName+"/"+cName+"/"+des+"/"+cPass)
      .subscribe((data)=>{
        console.log(data[0].mes)
        const ind = this.mem_database.indexOf(eName)
        this.mem_database[ind] = cName
        this.mMem = false;
        this.suc = true;
      },

      (error)=>{
        this.warn = "Try again"
        console.log(error)
      }
    );
  }

  delMem(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = true;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;
  }

  delMemSer(name:string){
    this.http.get("http://localhost:3000/deleteMember/"+name)
      .subscribe((data)=>{
        console.log(data[0].mes)
        if(data[0].mes=="success"){
          const ind = this.mem_database.indexOf(name)
          this.mem_database.splice(ind,1)
          this.dMem = false;
          this.suc = true;
        }
        else{
          this.jdm.nativeElement.innerHTML="Work is still assigned to this member!!!"
        }
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  addLab(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = true;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;

    this.not_ass_incharge = []
    this.not_ass_tech = []

    this.http.get("http://localhost:3000/getNotAsstech")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_tech.push(ele.name)
        })
        console.log(this.not_ass_tech)
      },

      (error)=>{
        console.log(error)
      }
    )

    this.http.get("http://localhost:3000/getNotAssInch")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_incharge.push(ele.name)
        })
        console.log(this.not_ass_incharge)
      },

      (error)=>{
        console.log(error)
      }
    )
  }

  addLabSer(lname:string,inch:string,tech:string,num:number){
    this.http.get("http://localhost:3000/addLab/"+lname+"/"+inch+"/"+tech+"/"+num)
      .subscribe((data)=>{
        console.log(data[0].mes)
        let ind = this.not_ass_incharge.indexOf(inch)
        this.not_ass_incharge.splice(ind,1)
        ind = this.not_ass_tech.indexOf(tech)
        this.not_ass_tech.splice(ind,1)
        this.aLab = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  modLab(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = true;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;

    this.lab_db = []
    this.not_ass_incharge = []
    this.not_ass_tech = []

    this.http.get("http://localhost:3000/getlabslist")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.lab_db.push(ele.name)
        })
        console.log(this.lab_db)
      },

      (error)=>{
        console.log(error)
      }
    )

    this.http.get("http://localhost:3000/getNotAsstech")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_tech.push(ele.name)
        })
        console.log(this.not_ass_tech)
      },

      (error)=>{
        console.log(error)
      }
    )

    this.http.get("http://localhost:3000/getNotAssInch")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_incharge.push(ele.name)
        })
        console.log(this.not_ass_incharge)
      },

      (error)=>{
        console.log(error)
      }
    )

  }

  modLabSer(lab:string,inch:string,tech:string){
    this.http.get("http://localhost:3000/updateLabs/"+lab+"/"+inch+"/"+tech)
      .subscribe((data)=>{
        console.log(data[0].mes)
        this.mLab = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  delLab(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = true;
    this.aDep = false;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;

    this.lab_db = []

    this.http.get("http://localhost:3000/getlabslist")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.lab_db.push(ele.name)
        })
        console.log(this.lab_db)
      },

      (error)=>{
        console.log(error)
      }
    )
  }

  delLabSer(name:string){
    this.http.get("http://localhost:3000/deleteLab/"+name)
      .subscribe((data)=>{
        console.log(data[0].mes)
        this.dLab = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  addDep(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = true;
    this.mDep = false;
    this.dDep = false;
    this.suc = false;

    this.not_ass_hod = []

    this.http.get("http://localhost:3000/getNotAssHOD")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_hod.push(ele.name)
        })
        console.log(this.not_ass_hod)
      },

      (error)=>{
        console.log(error)
      }
    )
  }

  addDepSer(name:string,hod:string){
    this.http.get("http://localhost:3000/insertDept/"+name+"/"+hod)
      .subscribe((data)=>{
        console.log(data[0].mes)
        this.aDep = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

  modDep(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = true;
    this.dDep = false;
    this.suc = false;

    this.not_ass_hod = []
    this.dept_db = []

    this.http.get("http://localhost:3000/getNotAssHOD")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.not_ass_hod.push(ele.name)
        })
        console.log(this.not_ass_hod)
      },

      (error)=>{
        console.log(error)
      }
    )

    this.http.get("http://localhost:3000/getDeptlist")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.dept_db.push(ele.name)
        })
        console.log(this.dept_db)
      },

      (error)=>{
        console.log(error)
      }
    )

  }

  modDepSer(dept:string,sp:string,pname:string){

    //If yu want to modify hod
    // this.http.get("http://localhost:3000/modDept/"+dept+"/"+hod)
    //   .subscribe((data)=>{
    //     console.log(data[0].mes)
    //     this.mDep = false;
    //     this.suc = true;
    //   },

    //   (error)=>{
    //     console.log(error)
    //   }
    // );

    this.http.get("http://localhost:3000/addPeriDept/"+dept+"/"+pname+"/"+sp)
      .subscribe((data)=>{
        if(data[0].mes=="success"){
          this.mDep = false;
          this.suc = true;
        }
      },
      
      (error)=>{
          console.log(error)
      })


  }

  delDep(){
    this.aMem = false;
    this.mMem = false;
    this.dMem = false;
    this.aLab = false;
    this.mLab = false;
    this.dLab = false;
    this.aDep = false;
    this.mDep = false;
    this.dDep = true;
    this.suc = false;

    this.dept_db = []

    this.http.get("http://localhost:3000/getDeptlist")
      .subscribe((data)=>{
        Object.values(data).forEach(ele=>{
          this.dept_db.push(ele.name)
        })
        console.log(this.dept_db)
      },

      (error)=>{
        console.log(error)
      }
    )
  }

  delDepSer(dept:string){
    this.http.get("http://localhost:3000/deleteDept/"+dept)
      .subscribe((data)=>{
        console.log(data[0].mes)
        this.dDep = false;
        this.suc = true;
      },

      (error)=>{
        console.log(error)
      }
    );
  }

}
