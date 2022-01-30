import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  remarques: string = ''

  matieres = ["Mathématiques", "Informatique", "Anglais", "Gestion d'entreprises", "Comptabilité"]
  matiereSelectionnee = ''

  constructor(private assignmentService: AssignmentsService, private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 100000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.remarques = this.remarques;
    newAssignment.matiere = this.assignmentService.user?.matiere ?? '';


    this.assignmentService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        // maintenant il faut qu'on affiche la liste !!!
        this.router.navigate(["/home"]);
      });

    this.snackbar.open(this.nomDevoir+" a été ajouté", '', {
      duration: 3000
    })
  }
}
