import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-rankingpage',
  templateUrl: './rankingpage.component.html',
  styleUrls: ['./rankingpage.component.css']
})
export class RankingpageComponent implements OnInit {
  wpms = [];
  num  = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getdata().subscribe(values =>{
      for (let i = 0; i < values.length; i++) {
        this.wpms.push(values[i]);
        this.num.push(i);
      }
    })

  }

}
