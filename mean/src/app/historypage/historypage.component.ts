import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-historypage',
  templateUrl: './historypage.component.html',
  styleUrls: ['./historypage.component.css']
})
export class HistorypageComponent implements OnInit {

  value = []
  num = []

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.value = []
    this.num = []
    const helper = new JwtHelperService();
    var token = localStorage.authToken;
    const decoded= helper.decodeToken(token);
    this.authService.gethistory(`${decoded._id}`).subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
        this.value.push(data[i]);
        this.num.push(i);
      }


    })
  }


  setdata(datas){
    this.authService.delhistory(datas).subscribe(datass =>{
      this.ngOnInit()

    })
  }

}
