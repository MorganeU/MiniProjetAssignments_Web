import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nameUser: string = ''
  mdp: string = ''

  inscription = {
    identifiant: '',
    typeUser: '',
    imageUser: '',
    mdpUser: '',
    confirmUser: '',
    matiere: '',
    imageMatiere: '',
  }

  nameInscription: string = ''
  mdpInscription: string = ''
  mdpConfirmation: string = ''
  typeUser: string = 'Eleve'

  constructor(private http: HttpClient, private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
  }

  login() {
    this.assignmentsService.login(this.nameUser, this.mdp)
  }

  signin() {
    this.assignmentsService.signin(this.inscription)
  }

  isDataNotValid() {
    const { identifiant, typeUser, imageUser, mdpUser, confirmUser, matiere, imageMatiere } = this.inscription
    if (!identifiant ||!typeUser ||!imageUser ||!mdpUser ||!confirmUser ||!matiere ||!imageMatiere) {
      return true
    }
    if(mdpUser !== confirmUser) {
      return true
    }

    return false
  }


}
