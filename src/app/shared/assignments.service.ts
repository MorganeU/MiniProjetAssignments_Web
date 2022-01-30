import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';
import { User } from '../login/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments: Assignment[] = [];
  // user: User|null = null
  // loggedin = false
  user: User|null = {_id: '61f67f1c9703020b7d4c0505',username:'profAnglais', password:'prof',role:'Professeur',matiere:'Anglais'}
  loggedin = true

  constructor(private loggingService: LoggingService,private http: HttpClient, private router: Router, private snackbar: MatSnackBar) { }

  url = "http://localhost:8010/api/assignments";
  // url = "https://api-intense2022.herokuapp.com/api/assignments";

  login(username: string, password: string) {
    const user_payload = { username, password }
    let url = 'http://localhost:8010/api/auth/login'
    this.http.post<any>(url, user_payload).subscribe(result => {
      if(result.err) {
        console.error(result.err)
        this.snackbar.open(result.err, '', {
          duration: 3000
        })
      } else {
        console.log(result.user);
        this.router.navigate(['/home'])
        this.loggedin = true
        this.user=result.user
      }
    })
  }

  logout(){
    this.user=null
    this.loggedin=false
    this.router.navigate(['/login'])
  }

  getAssignments(): Observable<Assignment[]> {
    // return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page: number, limit: number, dateSort?: string, filterRendu?: any, search?: string): Observable<any> {
    let url = `${this.url}?page=${page}&limit=${limit}`
    if (dateSort) url += `&dateSort=${dateSort}`
    if (filterRendu != null && filterRendu != undefined) url += `&filterRendu=${filterRendu}`
    if (search) url += `&search=${search}`
    url += `&userId=${this.user?._id}`
    return this.http.get<any>(url);
  }

  getAssignment(id: number): Observable<{assignment: Assignment, prof: User} | undefined> {
    return this.http.get<{assignment: Assignment, prof: User}>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, "ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // pour le moment rien de spécial à faire
    // mais plus tard -> requête PUT sur un web service
    // pour mettre à jour une BD distante...

    //return of(`Assignment ${assignment.nom} modifié`);
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {

    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    //return of(`Assignment ${assignment.nom} supprimé`);
    return this.http.delete(this.url + "/" + assignment._id);
  }

  // version naive qui ne renvoie rien
  // on en peut pas savoir quand tous les add auront été faits
  peuplerBD() {
    bdInitialAssignments.forEach(assignment => {
      const a = new Assignment();

      a.nom = assignment.nom;
      a.dateDeRendu = new Date(assignment.dateDeRendu);
      a.rendu = assignment.rendu;
      a.id = assignment.id;

      this.addAssignment(a)
        .subscribe(reponse => {
          console.log(assignment.nom + " inséré dans la BD");
        })
    })
  }

  // version non naïve
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment: any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.note = (a.rendu) ? a.note : undefined;
      nouvelAssignment.remarques = a.remarques;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

}
