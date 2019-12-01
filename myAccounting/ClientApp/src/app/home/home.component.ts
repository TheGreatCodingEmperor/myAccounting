import { Component, OnInit } from '@angular/core';
import { ElFinderService } from '../service/el-finder.service';

export interface Ls{
  list:string[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  files = []
  private root = 'v1_';
  path = '';


  constructor(
    private elService: ElFinderService
  ) { }

  ngOnInit() {
    console.log(this.pathCombine('hello','world'));
    console.log(this.pathCombine('hello'));
    this.ls('');
  }

  pathCombine(path1:string,path2?:string){
    if(path2)return path1 + '/' + path2;
    else return '/' + path1;
  }

  hash(path:string){
    return btoa(path)+'0';
  }

  ls(file){
    let directory = this.pathCombine(this.path,file);  
    this.elService.ls<Ls>(this.root + this.hash(directory)).subscribe(
      lsRes=>{
        console.log(lsRes);
        this.files = lsRes.list;
      }
    );
  }

}
