import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nameUser:string=''
  mdp:string=''

  constructor(private http: HttpClient, private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
  }

  login(){
    this.assignmentsService.login(this.nameUser,this.mdp)
  }

}
