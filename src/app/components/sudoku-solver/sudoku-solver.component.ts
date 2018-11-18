import { Component, OnInit } from '@angular/core';

/*interface Сell {
  variants: number[],
  cellSelected: boolean,
  highlightTable: boolean
};*/

interface Cell3x3Staistics {
  id: number,
  rows:number[],
  columns:number[]
};

interface Twin {
  value1:number, 
  value2:number, 
  i1:number, 
  j1:number, 
  i2:number, 
  j2:number
};

interface Triple {
  value1:number, 
  value2:number, 
  i1:number, 
  j1:number, 
  i2:number, 
  j2:number
};

interface Quadruple {
  value1:number, 
  value2:number, 
  i1:number, 
  j1:number, 
  i2:number, 
  j2:number
};

@Component({
  selector: 'sudoku-solver',
  templateUrl: './sudoku-solver.component.html',
  styleUrls: ['./sudoku-solver.component.css', './gamestyle.css', './style-bundle.css', '/sudoku.css']
})
export class SudokuSolverComponent implements OnInit {

  value_attr_d = [
    {viewBox: "0 0 12 30.8", width: 12, height: 30,
     d: 'M8.954 30V3.545h-.267c-.738.41-6.706 4.655-7.71 5.311V5.883c.635-.41 6.767-4.758 7.977-5.476h2.789V30h-2.79z'},
    {viewBox: "0 0 20 31.4", width: 20, height: 31,
     d: 'M.12 9.57C.16 4.462 4.057.791 9.41.791c5.209 0 9.187 3.568 9.187 8.224 0 3.076-1.415 5.475-6.275 10.664l-7.998 8.53v.247h15.012V31H.284v-1.969L10.62 17.854c4.122-4.43 5.168-6.193 5.168-8.736 0-3.302-2.81-5.865-6.44-5.865-3.814 0-6.46 2.584-6.5 6.316v.02H.12v-.02z'},
    {viewBox: "0 0 21 32", width: 21, height: 32,
     d: 'M6.698 16.932v-2.42h3.466c3.814 0 6.46-2.338 6.46-5.722 0-3.22-2.646-5.537-6.317-5.537-3.67 0-6.255 2.174-6.542 5.537H1.038C1.366 3.95 5.037.792 10.41.792c5.045 0 9.064 3.404 9.064 7.67 0 3.568-2.05 6.173-5.496 6.932v.266c4.225.472 6.85 3.281 6.85 7.342 0 4.86-4.491 8.613-10.295 8.613-5.722 0-9.926-3.404-10.11-8.182H3.13c.246 3.322 3.322 5.721 7.382 5.721 4.286 0 7.424-2.645 7.424-6.214 0-3.711-2.912-6.008-7.65-6.008H6.699z'},
    {viewBox: "0 0 24 30.9", width: 24, height: 30,
     d: 'M15.855 30v-6.686H.987v-2.563C3.633 16.281 7.283 10.6 14.563.366h4.02v20.426h4.43v2.522h-4.43V30h-2.728zM3.92 20.628v.184h11.935V3.052h-.184C10.03 10.744 7.099 15.338 3.92 20.629z'},
    {viewBox: "0 0 21 31.4", width: 21, height: 31,
     d: 'M10.553 30.615c-5.373 0-9.474-3.445-9.782-8.264H3.52c.308 3.322 3.322 5.783 7.055 5.783 4.327 0 7.424-3.097 7.424-7.445 0-4.347-3.097-7.444-7.363-7.444-2.912 0-5.496 1.415-6.747 3.692H1.222l1.6-16.53h16.14V2.93H5.037l-.985 10.787h.267c1.415-1.846 3.876-2.912 6.768-2.912 5.68 0 9.72 4.08 9.72 9.802 0 5.866-4.245 10.008-10.254 10.008z'},
    {viewBox: "0 0 22 32", width: 22, height: 32,
     d: 'M10.964 31.595c-4 0-7.158-1.99-9.003-5.64C.648 23.638-.01 20.582-.01 16.83-.008 6.76 4.135.792 11.17.792c4.901 0 8.613 2.953 9.454 7.567h-2.871c-.739-3.076-3.323-5.045-6.624-5.045-5.312 0-8.347 4.963-8.409 13.74h.246c1.292-3.322 4.553-5.454 8.43-5.454 5.618 0 9.76 4.183 9.76 9.843 0 5.886-4.285 10.152-10.191 10.152zm-.041-2.482c4.204 0 7.403-3.281 7.403-7.567 0-4.368-3.097-7.506-7.383-7.506-4.225 0-7.485 3.158-7.485 7.3 0 4.41 3.24 7.773 7.465 7.773z'},
    {viewBox: "0 0 20 30.8", width: 20, height: 30,
     d: 'M3.017 30L16.696 3.155V2.93H.29V.407h19.277v2.625L6.01 30z'},
    {viewBox: "0 0 22 32", width: 22, height: 32,
     d: 'M10.533 31.615c-6.193 0-10.48-3.527-10.48-8.593 0-3.834 2.584-6.87 6.46-7.567v-.246c-3.22-.759-5.311-3.343-5.311-6.583 0-4.573 3.876-7.834 9.33-7.834 5.456 0 9.332 3.24 9.332 7.834 0 3.22-2.071 5.804-5.291 6.583v.246c3.855.697 6.46 3.732 6.46 7.567 0 5.086-4.286 8.593-10.5 8.593zm0-2.42c4.532 0 7.67-2.604 7.67-6.357 0-3.671-3.117-6.173-7.67-6.173-4.532 0-7.65 2.523-7.65 6.173 0 3.753 3.118 6.357 7.65 6.357zm0-14.95c3.896 0 6.562-2.174 6.562-5.393 0-3.343-2.666-5.64-6.562-5.64-3.897 0-6.563 2.297-6.563 5.64 0 3.199 2.666 5.393 6.563 5.393z'},
    {viewBox: "0 0 23 32", width: 23, height: 32,
     d: 'M10.897 31.595c-4.983 0-8.613-2.974-9.454-7.547h2.871c.718 3.015 3.22 5.045 6.624 5.045 5.23 0 8.203-4.779 8.408-13.064.02-.205-.102-.471-.123-.676H19.1c-1.271 3.26-4.552 5.434-8.428 5.434-5.66 0-9.762-4.163-9.762-9.803C.91 5.1 5.175.792 11.102.792c4 0 7.157 2.01 9.003 5.68 1.313 2.298 1.969 5.333 1.969 9.106 0 10.028-4.102 16.017-11.177 16.017zm.226-13.248c4.245 0 7.485-3.2 7.485-7.28 0-4.39-3.22-7.794-7.465-7.794-4.224 0-7.403 3.302-7.403 7.63 0 4.285 3.035 7.444 7.383 7.444z'}];

  cells: any[][];


  constructor() {
    this.cells = [];

    for(let i: number = 0; i < 9; i++) {
      this.cells[i] = [];
      for(let j: number = 0; j < 9; j++) {
        this.cells[i][j] = {
          variants: [1,2,3,4,5,6,7,8,9],
          cellSelected: false,
          highlightTable: false,
          new: false
        };
      }
    }
  }

  ngOnInit() {
  }

  start(){
    console.log("start");
    // show all the variants
    this.showAllTheVariants();
    // select conflicts in row, column and 3x3 cell
    this.selectConflicts();
    // delete conflicts in row, column and 3x3 cell
    this.removeConflicts();

    // 
  }

  showAllTheVariants(){
    console.log("showAllTheVariants");

  }

  selectConflicts(){
    console.log("selectConflicts");

  }

  removeConflicts(){
    console.log("removeConflicts");

    let newFound:boolean;

//    do{
      console.log("NEXT LOOP");
      newFound = false;
      for(let i: number = 0; i < 9; i++) {
        for(let j: number = 0; j < 9; j++) {
          let variants:number[] = this.cells[i][j].variants;
//          console.log("i="+i+" j="+j+" "+variants.length);
          if (variants.length == 1 && this.cells[i][j].new==true){
//            console.log("  i="+i+" j="+j+" "+variants[0]);
            if ( this.removeDuplicates(i, j, variants[0])){
              newFound = true;
            }
          }
          this.cells[i][j].new = false;
        };
      }
      console.log("removeConflicts newFound="+newFound);
//      this.snapshot();

/*      if (newFound == false){
        if (this.checkCellRowsAndColumns()){
          newFound = true;    
        }
      }
      this.snapshot();*/

/*      if (this.checkCellTwins()){
        newFound = true;
      }*/

      // check for 8 in row, column and 3x3 cell - cycle
      if (this.checkFor8()){
        newFound = true;
      }
//      this.snapshot();


//    } while(newFound);
  }

  snapshot(){
    for(let i: number = 0; i < 9; i++) {
      for(let j: number = 0; j < 9; j++) {
        console.log("i="+i+" j="+j+" "+this.cells[i][j].variants.toString());
      }
    }
  }

// if some value inside whole row only in some 3x3 cell possible
// remove the value in other rows inside 3x3 cell
  checkRows(){
    console.log("checkRows()");

    
  }

// if some value inside whole column only in some 3x3 cell possible
// remove the value in other columns inside 3x3 cell
  checkColumns(){
    console.log("checkColumns()");
    for(let j: number = 0; j < 9; j++) {// column

      // TODO make column statistics as separate function
      let columnStatistics: { id:number, rows:number[] }[] = //new Array(9);
      [
        { "id": 1, "rows": [] },
        { "id": 2, "rows": [] },
        { "id": 3, "rows": [] },
        { "id": 4, "rows": [] },
        { "id": 5, "rows": [] },
        { "id": 6, "rows": [] },
        { "id": 7, "rows": [] },
        { "id": 8, "rows": [] },
        { "id": 9, "rows": [] }
      ];

      for(let i: number = 0; i < 9; i++) {// row
        let variants:number[] = this.cells[i][j].variants;
        if (variants.length > 1){
          variants.forEach(function (num:number) {
//                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
            if (columnStatistics[num-1].rows.indexOf(i) == -1){
              columnStatistics[num-1].rows.push(i);
            }
          });                
        }        
      }

// check if all values inside some column belong to the same 3x3 cell
// if true - remove the value from other columns inside the 3x3 cell
      columnStatistics.forEach(function ( value ){
        if (value.rows.length > 0){
          let min:number = value.rows[0];
          let max:number = value.rows[value.rows.length-1];
//          console.log("columnStatistics j="+j+" id="+value.id+" min="+min+" max="+max);
          if ((min == 0 || min == 1) && (max == 1 || max == 2)){
//            console.log("  only cell 0");
            this.correctCell3x3(value.id, j, 0);
          }
          if ((min == 3 || min == 4) && (max == 4 || max == 5)){
//            console.log("  only cell 1");
            this.correctCell3x3(value.id, j, 1);
          }
          if ((min == 6 || min == 7) && (max == 7 || max == 8)){
//            console.log("  only cell 2");
            this.correctCell3x3(value.id, j, 2);
          }
        }
      }, this);

    }
  }

  correctCell3x3(id:number, columnIndex:number, cell3x3index:number){
    console.log("correctCell3x3 id="+id+" columnIndex="+columnIndex+" "+cell3x3index);

    let colIndex1:number, colIndex2:number;
    switch(columnIndex){
      case 0: colIndex1 = 1, colIndex2 = 2; break;
      case 1: colIndex1 = 0, colIndex2 = 2; break;
      case 2: colIndex1 = 0, colIndex2 = 1; break;
      case 3: colIndex1 = 4, colIndex2 = 5; break;
      case 4: colIndex1 = 3, colIndex2 = 5; break;
      case 5: colIndex1 = 3, colIndex2 = 4; break;
      case 6: colIndex1 = 7, colIndex2 = 8; break;
      case 7: colIndex1 = 6, colIndex2 = 8; break;
      case 8: colIndex1 = 6, colIndex2 = 7; break;
    }

    for (let i:number = 0; i < 3; i++){
      console.log(" i="+(i+cell3x3index*3));
//      let variants:number[];
      this.correctCell(id, this.cells[i+cell3x3index*3][colIndex1].variants);
      this.correctCell(id, this.cells[i+cell3x3index*3][colIndex2].variants);
    }
  }

  correctCell(id:number, variants:number[]){
    if (variants.length > 1){
      console.log("  correctCell id="+id+" "+variants.toString());
      let index = variants.indexOf(id);
      //      console.log("value="+value+" id1="+id1+" id2="+id2+"  j2="+j2+" index="+index);
      if (index > -1){
      //        console.log("  value="+value);
        /*variants = */variants.splice(index, 1);
      }
    }
  }

  collectCell3x3Statistics1(i:number, j:number, cell3x3Staistics:Cell3x3Staistics[]){
    console.log("collectCell3x3Statistics1() i="+i+" j="+j);

    for(let ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
      for(let jj: number = 0; jj < 3; jj++) {

        let variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
        if (variants.length > 1){
          variants.forEach(function (num:number) {
//                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
            if (cell3x3Staistics[num-1].rows.indexOf(i*3+ii) == -1){
              cell3x3Staistics[num-1].rows.push(i*3+ii);
            }
            if (cell3x3Staistics[num-1].columns.indexOf(j*3+jj) == -1){
              cell3x3Staistics[num-1].columns.push(j*3+jj);
            }
          });                
        }
      }
    }
//        console.log("checkCellRowsAndColumns i="+i+" j="+j+" ");
/*    for (var k:number = 0; k<cell3x3Staistics.length; k++){
      if (cell3x3Staistics[k].rows.length == 1 || cell3x3Staistics[k].columns.length == 1){
        console.log("    CANDIDATE TO REMOVE k="+(k+1)+" rows="+cell3x3Staistics[k].rows+"   cols="+cell3x3Staistics[k].columns);
      }
    }*/
  }

  collectCell3x3Statistics(){
    console.log("collectCell3x3Statistics()");

    for(let i: number = 0; i < 3; i++) {
      for(let j: number = 0; j < 3; j++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));

        let cell3x3Staistics: { id: number, rows: number[], columns: number[] }[] = //new Array(9);
        [
          { "id": 1, "rows": [], "columns": [] },
          { "id": 2, "rows": [], "columns": [] },
          { "id": 3, "rows": [], "columns": [] },
          { "id": 4, "rows": [], "columns": [] },
          { "id": 5, "rows": [], "columns": [] },
          { "id": 6, "rows": [], "columns": [] },
          { "id": 7, "rows": [], "columns": [] },
          { "id": 8, "rows": [], "columns": [] },
          { "id": 9, "rows": [], "columns": [] }
        ];

        this.collectCell3x3Statistics1(i, j, cell3x3Staistics);// move inside of two next func
        this.correctRowsInCells3x3(i, j, cell3x3Staistics);
        this.correctColumnsInCells3x3(i, j, cell3x3Staistics);


      }
    }
  }

  correctColumnsInCells3x3(i:number, j:number, cell3x3Staistics:Cell3x3Staistics[]){
    console.log("correctColumnsInCells3x3() i="+i+" j="+j);

    for (let k:number = 0; k<cell3x3Staistics.length; k++){
/*      if (cell3x3Staistics[k].rows.length == 1 || cell3x3Staistics[k].columns.length == 1){
        console.log("    CANDIDATE TO REMOVE k="+(k+1)+" rows="+cell3x3Staistics[k].rows+"   cols="+cell3x3Staistics[k].columns);
      }*/

      if (cell3x3Staistics[k].columns.length == 1){// clean (k+1) in the same column in others 3x3 cells
//        console.log("      columns="+cell3x3Staistics[k].columns);
        for (let iii:number = 0; iii < 3; iii++){
//          console.log("        iii="+iii+"  i="+i);
          if (iii != i){
//            console.log("        before loop");
            for(let ii: number = 0; ii < 3; ii++){

//              console.log("        length="+this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants.length);
              if (this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].variants.length > 1){
                if (this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].variants.indexOf(k+1) > -1){
                  if (this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].new == false){

//                    console.log("      WANT TO REMOVE "+(k+1)+" j="+cell3x3Staistics[k].columns[0]+" i="+(iii*3+ii));
                    let removed1 = this.splice1( this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].variants, k+1);
                    if (removed1){
                      if (this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].variants.length == 1){
                        this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].new = true;
                      }
                      console.log("        REMOVED "+(k+1)+" j="+cell3x3Staistics[k].columns[0]+" i="+(iii*3+ii));
//                      removed = true;
                    }
                  }
                }
              }

            }
          }
        }
      }

    }
  }

  correctRowsInCells3x3(i:number, j:number, cell3x3Staistics:Cell3x3Staistics[]){
//    console.log("correctRowsInCells3x3() i="+i+" j="+j);

    for (let k:number = 0; k<cell3x3Staistics.length; k++){
/*      if (cell3x3Staistics[k].rows.length == 1 || cell3x3Staistics[k].columns.length == 1){
        console.log("    CANDIDATE TO REMOVE k="+(k+1)+" rows="+cell3x3Staistics[k].rows+"   cols="+cell3x3Staistics[k].columns);
      }*/
      if (cell3x3Staistics[k].rows.length == 1){// clean (k+1) in the same row in others 3x3 cells
//        console.log("      rows="+cell3x3Staistics[k].rows);
        for (let jjj:number = 0; jjj < 3; jjj++){
          if (jjj != j){
            for(let jj: number = 0; jj < 3; jj++){
              if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.length > 1){
                if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.indexOf(k+1) > -1){
                  if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].new == false){

//                    console.log("      WANT TO REMOVE "+(k+1)+" i="+cell3x3Staistics[k].rows[0]+" j="+(jjj*3+jj));
                    let removed1 = this.splice1( this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants, k+1);
                    if (removed1){
                      if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.length == 1){
                        this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].new = true;
                      }
                      console.log("        REMOVED "+(k+1)+" i="+cell3x3Staistics[k].rows[0]+" j="+(jjj*3+jj));
//                      removed = true;
                    }
                  }
                }
              }                            
            }
          }
        }
      }
    }
  }

// if there some value inside 3x3 cell in only row or only column, then 
// remove the value inside other cells in the same row or column
/*  checkCellRowsAndColumns():boolean{
    var removed = false;

    for(var i: number = 0; i < 3; i++) {
      for(var j: number = 0; j < 3; j++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));



        let cell3x3Staistics: { id: number, rows: number[], columns: number[] }[] = //new Array(9);
        [
          { "id": 1, "rows": [], "columns": [] },
          { "id": 2, "rows": [], "columns": [] },
          { "id": 3, "rows": [], "columns": [] },
          { "id": 4, "rows": [], "columns": [] },
          { "id": 5, "rows": [], "columns": [] },
          { "id": 6, "rows": [], "columns": [] },
          { "id": 7, "rows": [], "columns": [] },
          { "id": 8, "rows": [], "columns": [] },
          { "id": 9, "rows": [], "columns": [] }
        ];
/*        var cell3x3Staistics:Cell3x3Staistics[] = new Array(9);
        cell3x3Staistics.forEach(function (stat:Cell3x3Staistics){
          stat.rows = new Array();
          stat.columns = new Array();
        });*/
/*        for (var k:number=0; k<cell3x3Staistics.length; k++){
          console.log("k="+k);
          console.log(cell3x3Staistics[k]);
          cell3x3Staistics[k].rows = new Array();
          console.log(cell3x3Staistics[k].rows);
          console.log(cell3x3Staistics[k].rows.length);
        }* /

        console.log("START checkCellRowsAndColumns i="+i+" j="+j);

        for(var ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
          for(var jj: number = 0; jj < 3; jj++) {

            var variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
            if (variants.length > 1){
              variants.forEach(function (num:number) {
//                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
                if (cell3x3Staistics[num-1].rows.indexOf(i*3+ii) == -1){
                  cell3x3Staistics[num-1].rows.push(i*3+ii);
                }
                if (cell3x3Staistics[num-1].columns.indexOf(j*3+jj) == -1){
                  cell3x3Staistics[num-1].columns.push(j*3+jj);
                }
              });                
            }
          }
        }
        console.log("checkCellRowsAndColumns i="+i+" j="+j+" ");
        for (var k:number = 0; k<cell3x3Staistics.length; k++){
          if (cell3x3Staistics[k].rows.length == 1 || cell3x3Staistics[k].columns.length == 1){
            console.log("    CANDIDATE TO REMOVE k="+(k+1)+" rows="+cell3x3Staistics[k].rows+"   cols="+cell3x3Staistics[k].columns);
          }
/*          if (cell3x3Staistics[k].rows.length == 1){// clean (k+1) in the same row in others 3x3 cells
            console.log("      rows="+cell3x3Staistics[k].rows);
            for (let jjj:number = 0; jjj < 3; jjj++){
              if (jjj != j){
                for(let jj: number = 0; jj < 3; jj++){
                  if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.length > 1){
                    if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.indexOf(k+1) > -1){
                      if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].new == false){

                        console.log("      WANT TO REMOVE "+(k+1)+" i="+cell3x3Staistics[k].rows[0]+" j="+(jjj*3+jj));
                        let removed1 = this.splice1( this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants, k+1);
                        if (removed1){
                          if (this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].variants.length == 1){
                            this.cells[cell3x3Staistics[k].rows[0]][jjj*3+jj].new = true;
                          }
                          console.log("        REMOVED "+(k+1)+" i="+cell3x3Staistics[k].rows[0]+" j="+(jjj*3+jj));
                          removed = true;
                        }
                      }
                    }
                  }
                  
                  
                }
              }
            }
          }* /
          if (cell3x3Staistics[k].columns.length == 1){// clean (k+1) in the same column in others 3x3 cells
            console.log("      columns="+cell3x3Staistics[k].columns);
            for (let iii:number = 0; iii < 3; iii++){
              console.log("        iii="+iii+"  i="+i);
              if (iii != i){
                console.log("        before loop");
                for(let ii: number = 0; ii < 3; ii++){

                  console.log("        length="+this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants.length);
                  if (this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants.length > 1){
                    if (this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants.indexOf(k+1) > -1){
                      if (this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].new == false){

                        console.log("      WANT TO REMOVE "+(k+1)+" j="+cell3x3Staistics[k].columns[0]+" i="+(iii*3+ii));
                        let removed1 = this.splice1( this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants, k+1);
                        if (removed1){
                          if (this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].variants.length == 1){
                            this.cells[cell3x3Staistics[k].columns[0]][iii*3+ii].new = true;
                          }
                          console.log("        REMOVED "+(k+1)+" j="+cell3x3Staistics[k].columns[0]+" i="+(iii*3+ii));
                          removed = true;
                        }
                      }
                    }
                  }



/*
                  if (this.splice1( this.cells[iii*3+ii][cell3x3Staistics[k].columns[0]].variants, k+1)){
                    console.log("REMOVED "+(k+1)+" i="+(iii*3+ii)+" j="+cell3x3Staistics[k].columns[0]);
                    removed = true;
                  }
* /



                }
              }
            }
          }

        }
        
      }
    }    

    return removed;
  }*/

  findTriples(){// 3 value located only in 3 cells - for rows, for columns, for cells 3x3

  }

  findQuartets(){// 4 value located only in 4 cells - for rows, for columns, for cells 3x3

  }

  // twin is unique pair of values at the same row or column or cell 3x3
  findTwins(){
    // find twins in rows
    this.findTwinsRows();
    // find twins in columns
    this.findTwinsColumns();
    // find twins in cells 3x3
    this.findTwinsCells3x3();
  }

  findTwinsRows(){
    console.log("findTwinsRows");
    for(let i: number = 0; i < 9; i++) {// row
      let rowStatistics: { id: number, columns: number[] }[] = //new Array(9);
      [
        { "id": 1, "columns": [] },
        { "id": 2, "columns": [] },
        { "id": 3, "columns": [] },
        { "id": 4, "columns": [] },
        { "id": 5, "columns": [] },
        { "id": 6, "columns": [] },
        { "id": 7, "columns": [] },
        { "id": 8, "columns": [] },
        { "id": 9, "columns": [] }
      ];

      for(let j: number = 0; j < 9; j++) {// column
        let variants:number[] = this.cells[i][j].variants;
        if (variants.length > 1){
          variants.forEach(function (num:number) {
//                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
            if (rowStatistics[num-1].columns.indexOf(j) == -1){
              rowStatistics[num-1].columns.push(j);
            }
          });                
        }        
      }

      let twins = rowStatistics.filter((a:{ id: number, columns: number[] }) => a.columns.length === 2);
      twins.forEach(function(value){
//        console.log("i= "+i+" twins id="+value.id+" "+value.columns.toString());
      });

      if (twins.length > 1){
//        console.log("twins.length="+twins.length);
        for (let k:number = 0; k < twins.length; k++){
          for (let l:number = k + 1; l < twins.length; l++){
//            console.log("k="+k+" l="+l);
            if (twins[k].columns.toString() == twins[l].columns.toString()){
              console.log("  TWINS ROWS FOUND "+twins[k].id + " "+twins[l].id+" ROW="+i);
              this.cleanTwin(i,twins[k].id,twins[l].id,twins[k].columns[0],twins[k].columns[1]);// convert hidden twin into bare twin
            }
          }
        }
      }
    }
  }

  cleanTwin(rowNum:number, id1:number, id2:number, j1:number, j2:number){// convert hidden twin into bare twin

    // clean rest of cell[i,j]
    console.log("cleanTwin "+this.cells[rowNum][j1].variants.toString()+" "+this.cells[rowNum][j2].variants.toString());

    let variants = this.cells[rowNum][j1].variants;
//    console.log("00 "+variants.toString());
    for (let i:number = variants.length-1; i>=0; i--){
      let value = variants[i];
      let index = variants.indexOf(value);
//      console.log("value="+value+" id1="+id1+" id2="+id2+"  j1="+j1+" index="+index);
      if (value != id1 && value != id2){
//        console.log("  value="+value);
        /*variants = */variants.splice(variants.indexOf(value), 1);
      }
    }
//    console.log("11 "+variants.toString());

    /*let*/ variants = this.cells[rowNum][j2].variants;
//    console.log("00 "+variants.toString());
    for (let i:number = variants.length-1; i>=0; i--){
      let value = variants[i];
      let index = variants.indexOf(value);
//      console.log("value="+value+" id1="+id1+" id2="+id2+"  j2="+j2+" index="+index);
      if (value != id1 && value != id2){
//        console.log("  value="+value);
        /*variants = */variants.splice(variants.indexOf(value), 1);
      }
    }
//    console.log("11 "+variants.toString());

/*    variants.forEach(function(value){
      console.log("j1="+j1+" value="+value+" id1="+id1+" id2="+id2);
      if (value != id1 && value != id2){
        console.log("j1="+j1+" value="+value);
        variants.splice(variants.indexOf(value), 1);
//        SudokuSolverComponent.splice1(this.cells[rowNum][j1].variants, value);
      }
    }, this);*/

/*    this.cells[rowNum][j2].variants.forEach(function(value){
      if (value != id1 && value != id2){
        console.log("j2="+j2+" value="+value);
        this.cells[rowNum][j2].variants.splice(this.cells[rowNum][j2].variants.indexOf(value), 1);
//        this.splice1(this.cells[rowNum][j2].variants, value);
      }
    }, this);*/
  }

  findTwinsColumns(){
    console.log("findTwinsColumns");
    for(let j: number = 0; j < 9; j++) {// column

      // TODO make column statistics as separate function
      let columnStatistics: { id: number, rows: number[] }[] = //new Array(9);
      [
        { "id": 1, "rows": [] },
        { "id": 2, "rows": [] },
        { "id": 3, "rows": [] },
        { "id": 4, "rows": [] },
        { "id": 5, "rows": [] },
        { "id": 6, "rows": [] },
        { "id": 7, "rows": [] },
        { "id": 8, "rows": [] },
        { "id": 9, "rows": [] }
      ];

      for(let i: number = 0; i < 9; i++) {// row
        let variants:number[] = this.cells[i][j].variants;
        if (variants.length > 1){
          variants.forEach(function (num:number) {
//                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
            if (columnStatistics[num-1].rows.indexOf(i) == -1){
              columnStatistics[num-1].rows.push(i);
            }
          });                
        }        
      }

      let twins = columnStatistics.filter((a:{ id: number, rows: number[] }) => a.rows.length === 2);
      twins.forEach(function(value){
//        console.log("j= "+j+" twins id="+value.id+" "+value.rows.toString());
      });

      if (twins.length > 1){
//        console.log("twins.length="+twins.length);
        for (let k:number = 0; k < twins.length; k++){
          for (let l:number = k + 1; l < twins.length; l++){
//            console.log("k="+k+" l="+l);
            if (twins[k].rows.toString() == twins[l].rows.toString()){
              console.log("  TWINS COLUMNS FOUND "+twins[k].id + " "+twins[l].id+" COLUMN="+j);
              console.log("  SWITCH ON cleanTwin !!!");
//              this.cleanTwin(j,twins[k].id,twins[l].id,twins[k].rows[0],twins[k].rows[1]);
            }
          }
        }
      }
    }
    
  }

  findTwinsCells3x3(){
    console.log("findTwinsCells3x3");
    for(let i: number = 0; i < 3; i++) {
      for(let j: number = 0; j < 3; j++) {
        let cells3x3Statistics: { id: number, cells3x3: number[] }[] = //new Array(9);// numbers in cells 3x3
        [
          { "id": 1, "cells3x3": [] },
          { "id": 2, "cells3x3": [] },
          { "id": 3, "cells3x3": [] },
          { "id": 4, "cells3x3": [] },
          { "id": 5, "cells3x3": [] },
          { "id": 6, "cells3x3": [] },
          { "id": 7, "cells3x3": [] },
          { "id": 8, "cells3x3": [] },
          { "id": 9, "cells3x3": [] }
        ];

        for(let ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
          for(let jj: number = 0; jj < 3; jj++) {

            let variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
            if (variants.length > 1){// skip full-defined unique values
              variants.forEach(function (num:number) {
    //                console.log("  num="+num+" "+(i*3+ii)+" "+(j*3+jj));
                if (cells3x3Statistics[num-1].cells3x3.indexOf(ii*3+jj) == -1){
                  cells3x3Statistics[num-1].cells3x3.push(ii*3+jj);
                }
              });                
            }
          }
        }


        let twins = cells3x3Statistics.filter((a:{ id: number, cells3x3: number[] }) => a.cells3x3.length === 2);
        twins.forEach(function(value){
//          console.log("j= "+j+" twins id="+value.id+" "+value.cells3x3.toString());
        });
  
        if (twins.length > 1){
          console.log("twins.length="+twins.length);
          for (let k:number = 0; k < twins.length; k++){
            for (let l:number = k + 1; l < twins.length; l++){
//              console.log("k="+k+" l="+l);
              if (twins[k].cells3x3.toString() == twins[l].cells3x3.toString()){
                console.log("  TWINS CELLS3x3 FOUND "+twins[k].id + " "+twins[l].id+" i="+i+" j="+j+" k="+k+" l="+l);
//                console.log("  SWITCH ON cleanTwin !!!");
  //              this.cleanTwin(j,twins[k].id,twins[l].id,twins[k].rows[0],twins[k].rows[1]);


// a la cleanTwin here
                for(let ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
                  for(let jj: number = 0; jj < 3; jj++) {

                    let variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
                    if (variants.indexOf(twins[k].id) > -1 && variants.indexOf(twins[l].id) > -1){
                      for (let iii:number = variants.length-1; iii>=0; iii--){
                        let value = variants[iii];
                        let index = variants.indexOf(value);
                  //      console.log("value="+value+" id1="+id1+" id2="+id2+"  j2="+j2+" index="+index);
                        if (value != twins[k].id && value != twins[l].id){
                  //        console.log("  value="+value);
                          /*variants = */variants.splice(variants.indexOf(value), 1);
                        }
                      }
                    }
                  }
                }




              }
            }
          }
        }        



      }
    }



  }

// NOT USED
/*  checkCellTwins():boolean{// find twins inside cell 3x3 (2 cells have 2 identical values) - bare twins 
    let optimised = false;

    for(let i: number = 0; i < 3; i++) {
      for(let j: number = 0; j < 3; j++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));

        let twins: Twin[] = new Array();
        console.log("START twins.length="+twins.length);
        let twinFound:boolean = false;

        for(let ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
          for(let jj: number = 0; jj < 3; jj++) {

            let twinFound:boolean = false;
            let variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
            //        console.log("  j="+j);
            if (variants.length == 2){// twin cell found
              console.log("  twin   "+variants[0]+"  "+variants[1]+" "+(i*3+ii)+"  "+(j*3+jj));
              console.log("twins.length="+twins.length);
              twins.forEach(function (twin) {
                if (twin.value1 == variants[0] && twin.value2 == variants[1]){
                  if (twin.i2 == -1){
                    twin.i2 = ii;
                    twin.j2 = jj;
                    twinFound = true;
                  }
                  else{
                    console.log("ERROR: 3rd twin found!!!")
                  }
                }
              });
              if (twinFound == false){
                let newTwin:Twin = {value1: variants[0], value2: variants[1], i1:ii, j1:jj, i2:-1, j2:-1};
                twins.push(newTwin);
              }
            }
          }
        }
        if (twinFound){
          console.log("twinFound !!!");
          twins.forEach(function (twin) {
            console.log("  "+twin.value1+"  "+twin.value2+"  "+twin.i1+" "+twin.j1+"  "+twin.i2+"  "+twin.j2);

          });
        }
        else{
          console.log("twin NOT Found !!!");
        }

      }
    }

    return optimised;
  }*/

  splice1(variants:number[], num:number):boolean{
    if (variants.length > 1){
      let index:number = variants.indexOf(num);
      if (index > -1){// num found in array - remove it
        variants.splice(index, 1);
//        console.log("splice true num="+num);
//          console.log("      splice new found "+variants[0])
        return true;
      }
    }
    return false;
  }
  
  splice(variants:number[], num:number):boolean{
    if (variants.length > 1){
      let index:number = variants.indexOf(num);
      if (index > -1){// num found in array - remove it
        variants.splice(index, 1);
//        console.log("splice true num="+num);
        if (variants.length == 1){// new value found
//          console.log("      splice new found "+variants[0])
          return true;
        }
      }
    }
    return false;
  }



  removeDuplicates1(){
    let newFound:boolean;

    do{
      console.log("removeDuplicates1");
      newFound = false;
      for(let i: number = 0; i < 9; i++) {
        for(let j: number = 0; j < 9; j++) {
          let variants:number[] = this.cells[i][j].variants;
//          console.log("i="+i+" j="+j+" "+variants.length);
          if (variants.length == 1 && this.cells[i][j].new==true){
//            console.log("  i="+i+" j="+j+" "+variants[0]);
            if ( this.removeDuplicates(i, j, variants[0])){
              newFound = true;
            }
          }
          this.cells[i][j].new = false;
        };
      }
      console.log("removeConflicts newFound="+newFound);
    } while(newFound);
//    this.snapshot();
  }



  removeDuplicates(ii:number, jj:number, num:number):boolean{

    let newFound:boolean = false;

    for(let i: number = 0; i < 9; i++) {// remove duplicates in column jj
      if ( i != ii ){// skip itself
        if (this.splice( this.cells[i][jj].variants, num)){
          this.cells[i][jj].new = true;
          newFound = true;
        }
      }
    }
  
    for(let j: number = 0; j < 9; j++) {// remove duplicates in row ii
      if ( j != jj ){// skip itself
        if (this.splice( this.cells[ii][j].variants, num)){
          this.cells[ii][j].new = true;
          newFound = true;
        }  
      }
    }

    for(let i: number = ii-ii%3; i < ii-ii%3+3; i++) {
      for(let j: number = jj-jj%3; j < jj-jj%3+3; j++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));
        if ( i != ii && j != jj ){// skip itself
          if (this.splice( this.cells[i][j].variants, num)){
            this.cells[i][j].new = true;
            newFound = true;
          }
        }
      }
    }
//    console.log("    removeDuplicates "+newFound);

    return newFound;
  }

  checkFor8():boolean{// check if only 1 cell can have concrete value in row, column, cell 3x3
    console.log("checkFor8");
    let newFound:boolean = false;


// step 1 - find unique value in rows
    for(let i: number = 0; i < 9; i++) {
//      console.log("i="+i);
      let variantsColumn = [
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0}
      ];
      for(let j: number = 0; j < 9; j++) {// collect statistics inside row i
        let variants:number[] = this.cells[i][j].variants;
//        console.log("  j="+j);
        if (variants.length > 1 || this.cells[i][j].new==true){// skip full-defined old cells
          for(let k: number=1; k<=9; k++){
//            console.log("  k="+k);
            if (variants.indexOf(k)>-1){
              variantsColumn[k-1].counter++;
              variantsColumn[k-1].j = j;
//              console.log("    variantsColumn["+(k-1)+"]="+variantsColumn[k-1].counter);
            }
          }
        }
      }
//      console.log("i="+i+" variantsColumn["+j+"]="+variantsColumn[j]);
      for(let m:number = 0; m<9; m++){// analyze collected statistics inside row i
//        console.log("   variantsColumn["+m+"].counter = "+variantsColumn[m].counter);
        if (variantsColumn[m].counter==1){
//          console.log("    NEW UNIQUE VALUE FOUND "+variantsColumn[m].counter + " i="+i+" j="+variantsColumn[m].j+" m+1="+(m+1));
          this.cells[i][variantsColumn[m].j].variants = [m+1];
          this.cells[i][variantsColumn[m].j].new = true;
          newFound = true;
        }
      }
    }

// step 2 - find unique value in columns
    for(let i: number = 0; i < 9; i++) {
  //      console.log("i="+i);
      let variantsRow = [
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0},
        {counter: 0, j: 0}
      ];
      for(let j: number = 0; j < 9; j++) {// collect statistics inside column i
        let variants:number[] = this.cells[j][i].variants;
  //        console.log("  j="+j);
        if (variants.length > 1 || this.cells[j][i].new==true){// skip full-defined old cells
          for(let k: number=1; k<=9; k++){
  //            console.log("  k="+k);
            if (variants.indexOf(k)>-1){
              variantsRow[k-1].counter++;
              variantsRow[k-1].j = j;
  //              console.log("    variantsRow["+(k-1)+"]="+variantsRow[k-1].counter);
            }
          }
        }
      }
  //      console.log("i="+i+" variantsRow["+j+"]="+variantsRow[j]);
      for(let m:number = 0; m<9; m++){// analyze collected statistics inside column i
  //        console.log("   variantsRow["+m+"].counter = "+variantsRow[m].counter);
        if (variantsRow[m].counter==1){
  //          console.log("    NEW UNIQUE VALUE FOUND "+variantsRow[m].counter + " i="+i+" j="+variantsRow[m].j+" m+1="+(m+1));
          this.cells[variantsRow[m].j][i].variants = [m+1];
          this.cells[variantsRow[m].j][i].new = true;
          newFound = true;
        }
      }
    }
  

// step 3 - find unique value in 3x3 cells


    for(let i: number = 0; i < 3; i++) {
      for(let j: number = 0; j < 3; j++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));
        let variantsCell = [
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0},
          {counter: 0, i:0, j: 0}
        ];
        for(let ii: number = 0; ii < 3; ii++) {// collect statistics inside cell 3x3
          for(let jj: number = 0; jj < 3; jj++) {

            let variants:number[] = this.cells[i*3+ii][j*3+jj].variants;
            //        console.log("  j="+j);
            if (variants.length > 1 || this.cells[i*3+ii][j*3+jj].new==true){// skip full-defined old cells
              for(let k: number=1; k<=9; k++){
            //            console.log("  k="+k);
                if (variants.indexOf(k)>-1){
                  variantsCell[k-1].counter++;
                  variantsCell[k-1].i = i*3+ii;
                  variantsCell[k-1].j = j*3+jj;
            //              console.log("    variantsRow["+(k-1)+"]="+variantsRow[k-1].counter);
                }
              }
            }
          }
        }

        for(let m:number = 0; m<9; m++){// analyze collected statistics inside cell 3x3
          //        console.log("   variantsColumn["+m+"].counter = "+variantsColumn[m].counter);
          if (variantsCell[m].counter==1){
          //          console.log("    NEW UNIQUE VALUE FOUND "+variantsColumn[m].counter + " i="+i+" j="+variantsColumn[m].j+" m+1="+(m+1));
            this.cells[variantsCell[m].i][variantsCell[m].j].variants = [m+1];
            this.cells[variantsCell[m].i][variantsCell[m].j].new = true;
            newFound = true;
          }
        }
      }
    }

    return newFound;
  }

  clean(){
    for(let i: number = 0; i < 9; i++) {
      for(let j: number = 0; j < 9; j++) {
        this.cells[i][j].variants = [1,2,3,4,5,6,7,8,9];
      }
    }
  }

  toggle(i:number, j:number){
//    console.log("0 toggle i="+i+" j="+j+" "+this.cells[i][j].cellSelected);

    for(let ii:number = 0; ii < 9; ii++) {// clear old selection
      for(let jj:number = 0; jj < 9; jj++) {
        this.cells[ii][jj].cellSelected = false;
        this.cells[ii][jj].highlightTable = false;
      }
    }

    this.cells[i][j].cellSelected = true;

    for(let ii:number = 0; ii < 9; ii++) {
      this.cells[ii][j].highlightTable = true;
    }
  
    for(let jj:number = 0; jj < 9; jj++) {
      this.cells[i][jj].highlightTable = true;
    }

    for(let ii:number = i-i%3; ii < i-i%3+3; ii++) {
      for(let jj:number = j-j%3; jj < j-j%3+3; jj++) {
//        console.log("3 toggle i1="+i1+" j1="+j1+" "+(i1+ii)+" "+(j1+jj));
        this.cells[ii][jj].highlightTable = true;
      }
    }

// TODO check conflicts and set style

//    console.log("4 toggle i="+i+" j="+j+" "+this.cells[i][j].cellSelected);
  }

  cellSet(num: number){
    for(let i: number = 0; i < 9; i++) {
      for(let j: number = 0; j < 9; j++) {
        if (this.cells[i][j].cellSelected == true){
          this.cells[i][j].variants = [num+1];
          this.cells[i][j].new = true;
        }
      }
    }
  }

  findVariant(variants:number[], num:number):string{
    if (variants.indexOf(num) == -1){
      return " ";
    }
    return num.toString(10);
  }

  example1(){
    let exampleCells = [
      { i: 0, j: 1, num: 5},
      { i: 0, j: 5, num: 6},
      { i: 0, j: 6, num: 9},
      { i: 0, j: 7, num: 2},
      { i: 1, j: 0, num: 7},
      { i: 1, j: 4, num: 1},
      { i: 2, j: 3, num: 9},
      { i: 2, j: 5, num: 8},
      { i: 2, j: 7, num: 1},
      { i: 2, j: 8, num: 7},
      { i: 3, j: 0, num: 9},
      { i: 3, j: 5, num: 5},
      { i: 3, j: 6, num: 2},
      { i: 3, j: 7, num: 8},
      { i: 4, j: 2, num: 5},
      { i: 4, j: 3, num: 7},
      { i: 4, j: 8, num: 9},
      { i: 5, j: 0, num: 4},
      { i: 5, j: 5, num: 2},
      { i: 5, j: 6, num: 3},
      { i: 6, j: 0, num: 6},
      { i: 6, j: 2, num: 1},
      { i: 7, j: 1, num: 7},
      { i: 7, j: 3, num: 2},
      { i: 7, j: 4, num: 4},
      { i: 7, j: 5, num: 1},
      { i: 7, j: 6, num: 8},
      { i: 8, j: 0, num: 2},
      { i: 8, j: 2, num: 9},
      { i: 8, j: 5, num: 7},
      { i: 8, j: 7, num: 3},
      { i: 8, j: 8, num: 1}
    ]

    this.example(exampleCells);
  }

  example2(){
    let exampleCells = [
      { i: 0, j: 3, num: 4},
      { i: 0, j: 4, num: 6},
      { i: 0, j: 5, num: 5},
      { i: 0, j: 7, num: 8},
      { i: 1, j: 2, num: 9},
      { i: 1, j: 7, num: 1},
      { i: 1, j: 8, num: 5},
      { i: 2, j: 1, num: 5},
      { i: 2, j: 3, num: 9},
      { i: 2, j: 4, num: 1},
      { i: 2, j: 8, num: 3},
      { i: 3, j: 0, num: 3},
      { i: 3, j: 1, num: 8},
      { i: 3, j: 4, num: 7},
      { i: 3, j: 5, num: 4},
      { i: 3, j: 7, num: 5},
      { i: 4, j: 0, num: 9},
      { i: 4, j: 1, num: 1},
      { i: 4, j: 3, num: 6},
      { i: 4, j: 5, num: 8},
      { i: 4, j: 7, num: 3},
      { i: 5, j: 0, num: 5},
      { i: 5, j: 2, num: 6},
      { i: 5, j: 3, num: 2},
      { i: 6, j: 6, num: 8},
      { i: 7, j: 0, num: 7},
      { i: 7, j: 4, num: 8},
      { i: 7, j: 5, num: 9},
      { i: 7, j: 7, num: 2},
      { i: 7, j: 8, num: 6},
      { i: 8, j: 2, num: 3},
      { i: 8, j: 8, num: 4}
    ]

    this.example(exampleCells);
  }

  example3(){
    let exampleCells = [
      { i: 0, j: 1, num: 8},
      { i: 0, j: 2, num: 1},
      { i: 0, j: 5, num: 2},
      { i: 0, j: 6, num: 7},
      { i: 1, j: 4, num: 3},
      { i: 1, j: 5, num: 1},
      { i: 2, j: 0, num: 5},
      { i: 2, j: 2, num: 3},
      { i: 2, j: 3, num: 7},
      { i: 2, j: 5, num: 8},
      { i: 2, j: 7, num: 2},
      { i: 3, j: 6, num: 8},
      { i: 3, j: 7, num: 6},
      { i: 4, j: 0, num: 1},
      { i: 4, j: 3, num: 2},
      { i: 4, j: 5, num: 6},
      { i: 4, j: 8, num: 3},
      { i: 5, j: 1, num: 3},
      { i: 5, j: 2, num: 5},
      { i: 6, j: 1, num: 5},
      { i: 6, j: 3, num: 8},
      { i: 6, j: 5, num: 7},
      { i: 6, j: 6, num: 3},
      { i: 6, j: 8, num: 9},
      { i: 7, j: 3, num: 9},
      { i: 7, j: 4, num: 2},
      { i: 8, j: 2, num: 4},
      { i: 8, j: 3, num: 6},
      { i: 8, j: 6, num: 2},
      { i: 8, j: 7, num: 5}
    ]

    this.example(exampleCells);
  }


  example4(){
    let exampleCells = [
      { i: 0, j: 0, num: 1},
      { i: 0, j: 2, num: 8},
      { i: 0, j: 8, num: 5},
      { i: 1, j: 7, num: 2},
      { i: 2, j: 3, num: 4},
      { i: 2, j: 5, num: 3},
      { i: 2, j: 7, num: 9},
      { i: 3, j: 0, num: 7},
      { i: 3, j: 1, num: 2},
      { i: 3, j: 4, num: 6},
      { i: 3, j: 5, num: 8},
      { i: 4, j: 2, num: 9},
      { i: 4, j: 6, num: 6},
      { i: 5, j: 3, num: 1},
      { i: 6, j: 1, num: 3},
      { i: 6, j: 6, num: 4},
      { i: 7, j: 0, num: 8},
      { i: 7, j: 1, num: 9},
      { i: 7, j: 3, num: 7},
      { i: 8, j: 3, num: 2},
      { i: 8, j: 4, num: 1},
      { i: 8, j: 6, num: 5}
    ]

    this.example(exampleCells);
  }

  example5hardest(){// from  Arto Inkala. 20 tips
    let exampleCells = [
      { i: 0, j: 0, num: 8},

      { i: 1, j: 2, num: 3},
      { i: 1, j: 3, num: 6},

      { i: 2, j: 1, num: 7},
      { i: 2, j: 4, num: 9},
      { i: 2, j: 6, num: 2},

      { i: 3, j: 1, num: 5},
      { i: 3, j: 5, num: 7},

      { i: 4, j: 4, num: 4},
      { i: 4, j: 5, num: 5},
      { i: 4, j: 6, num: 7},

      { i: 5, j: 3, num: 1},
      { i: 5, j: 7, num: 3},

      { i: 6, j: 2, num: 1},
      { i: 6, j: 7, num: 6},
      { i: 6, j: 8, num: 8},

      { i: 7, j: 2, num: 8},
      { i: 7, j: 3, num: 5},
      { i: 7, j: 7, num: 1},

      { i: 8, j: 1, num: 9},
      { i: 8, j: 6, num: 4}
    ]

    this.example(exampleCells);
  }



  example(exampleCells){

    for (let k:number = 0; k<exampleCells.length; k++){
      this.cells[exampleCells[k].i][exampleCells[k].j].variants = [exampleCells[k].num];
      this.cells[exampleCells[k].i][exampleCells[k].j].new = true;
    }
  }

}
