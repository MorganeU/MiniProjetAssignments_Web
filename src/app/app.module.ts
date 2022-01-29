import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY } from '@angular/material/snack-bar';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { TableAssignmentsComponent } from './assignments/table-assignments/table-assignments.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  {
    path: "",
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "home",
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    component: AddAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "assignment/:id",
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    TableAssignmentsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule, MatSelectModule, MatSnackBarModule,
    BrowserAnimationsModule, MatButtonToggleModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    FormsModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule,
    MatCheckboxModule, MatSlideToggleModule, HttpClientModule,
    MatTableModule, MatSortModule, MatFormFieldModule, MatTabsModule,
    RouterModule.forRoot(routes), MatStepperModule, ReactiveFormsModule
  ],
  exports: [
    MatSortModule, MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY, useValue: { duration: 2500 }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
