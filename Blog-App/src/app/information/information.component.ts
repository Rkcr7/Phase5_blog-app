import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  myDate =Date.now();
  id:any;
  data:any;
  constructor(
    private route:ActivatedRoute,private Apiservice:ApiService
  ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.getOne();
  }

  getOne(){
    this.Apiservice.getOne(this.id).subscribe(data=>
      {
        this.data=data;
        console.log(data);
      })
  }
}
