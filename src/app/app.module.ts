/*import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuSolverComponent } from './sudoku-solver/sudoku-solver.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuSolverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/*import { MatTableModule, MatSortModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from '@angular/material/toolbar';*/
import { RouterModule, Routes } from '@angular/router';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

//import 'hammerjs'

import { AppComponent } from './app.component';
import { Browser } from 'protractor';
//import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
//import { DepartmentTableComponent } from './components/department-table/department-table.component';
import { SudokuSolverComponent } from './components/sudoku-solver/sudoku-solver.component';
/*import { EmployeeService } from './services/employee.service';
import { DepartmentService } from './services/department.service';
import { SudokuSolverService } from './services/sudoku-solver.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SudokuCellComponent } from './components/sudoku-cell/sudoku-cell.component';*/



const routes: Routes = [
// { path: '', redirectTo: '/welcome', pathMatch: 'full' },
//  { path: 'employee', component: EmployeesTableComponent },
//  { path: 'department', component: DepartmentTableComponent },
  { path: 'sudoku-solver', component: SudokuSolverComponent }/*,
  { path: '**', component: AppComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }*/
];



@NgModule({
  declarations: [
    AppComponent,
//    EmployeesTableComponent,
//    DepartmentTableComponent,
    SudokuSolverComponent//,
//    SudokuCellComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
/*    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    NgbModule.forRoot()*/
  ],
providers: [/*EmployeeService, DepartmentService, SudokuSolverService*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
