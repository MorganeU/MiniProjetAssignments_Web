import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-assignments',
  templateUrl: './table-assignments.component.html',
  styleUrls: ['./table-assignments.component.css']
})
export class TableAssignmentsComponent implements OnInit, AfterViewInit {
  ajoutActive = false;
  assignments: Assignment[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  // pour la table
  displayedColumns: string[] = ['Nom', 'Date', 'Etat', 'Details'];
  rendu: string = '';
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  public data = new MatTableDataSource<Assignment>();
  // pour les filtres 
  search: string = '';
  filterendu: boolean | null = null;
  timeout: any = null;

  constructor(private assignmentService: AssignmentsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAssignments();
  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort) => {
      this.getAssignments()

    });
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.sort.direction, this.filterendu, this.search).subscribe((data) => {
      // le tableau des assignments est maintenant ici....
      this.assignments = data.docs;
      this.data = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
    });
  }

  getRendu(r: boolean) {
    if (r) this.rendu = 'Rendu'
    else this.rendu = 'Non rendu'
    return this.rendu
  }

  goToDetails(id: number) {
    this.router.navigate(['/assignment/' + id])
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  changeLimit() {
    this.getAssignments();
  }

  // filtres
  applyFilterNom(event: any) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.search = event.target.value.trim().toLocaleLowerCase();
      this.getAssignments();
    }, 500)
  }
  filterRenduChange(event: any) {
    if (event.value == 'true') this.filterendu = true
    if (event.value == 'false') this.filterendu = false
    if (event.value == 'reset') this.filterendu = null
    this.getAssignments()
  }
}
