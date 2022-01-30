import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/login/user.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  assignmentProf?: User;
  rendu: string = '';

  assignmentService: AssignmentsService

  imgMatiere=[
    {nom:"Comptabilité", url:"https://formation-cfr.fr/wp-content/uploads/2021/05/gestionnaire-comptable.jpg"},
    {nom:"Mathématiques", url:"https://www.super-bac.com/articles/wp-content/uploads/2020/07/E3C-maths-bac.jpeg"},
    {nom:"Anglais", url:"https://i0.wp.com/up2school.com/bac/wp-content/uploads/2019/05/Drapeau-Anglais.jpg?resize=800%2C531&ssl=1"},
    {nom:"Gestion d'entreprises", url:"https://m.radioactif.com/images/blog/806518_large.jpg"},
    {nom:"Informatique", url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINt3I3wKtG-IgPqycbIVLNBxXMi6wb491zg&usqp=CAU"},
  ]

  constructor(assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.assignmentService = assignmentService
  }

  ngOnInit(): void {
    console.log("DANS COMPOSANT DETAIL")
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans l'URL
    // le + force la conversion de string à number
    const id: number = +this.route.snapshot.params['id'];
    console.log("ID = " + id);

    this.assignmentService.getAssignment(id)
      .subscribe(data => {
        // on utilise this.assignmentTransmis puisque c'est la propriété
        // utilisée dans le template HTML
        this.assignmentTransmis = data?.assignment;
        this.assignmentProf = data?.prof
      })
  }

  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;

    if (this.assignmentTransmis) {
      this.assignmentService.updateAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log(reponse.message);
          // on est dans le subscribe, on est sur que la base de données a été
          // mise à jour....
          this.router.navigate(["/home"]);
        })
      // PAS BON SI ICI car on n'a pas la garantie que les données ont été updatées
      // this.router.navigate(["/home"]);
    }
  }

  onDeleteAssignment() {
    if (this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log(reponse.message);

          // pour faire disparaitre la boite qui affiche le détail
          this.assignmentTransmis = undefined;

          // on affiche liste. Comme on est dans le subscribe, on est sur
          // que les données sont à jour et que l'assignment a été supprimé !
          this.router.navigate(["/home"]);
        })
    }
  }

  onClickEdit() {
    // correspond à /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
      {
        queryParams: {
          nom: 'Buffa',
          prenom: 'Michel'
        },
        fragment: 'edit'
      });
  }

  isAdmin() {
    return this.authService.loggedIn;
  }

  getRendu(r: boolean) {
    if (r) this.rendu = 'rendu'
    else this.rendu = 'non rendu'
    return this.rendu
  }

  getUrlMatiere(){
    return this.imgMatiere.find(m => m.nom===this.assignmentTransmis?.matiere)?.url
  }
}
