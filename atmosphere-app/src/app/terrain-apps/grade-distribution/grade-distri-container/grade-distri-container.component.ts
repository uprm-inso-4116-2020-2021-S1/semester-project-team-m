import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';


// Website I got the code from
// https://github.com/sadupawan1990/excelreader/blob/master/src/app/excelsheet/excelsheet.component.ts
@Component({
  selector: 'app-grade-distri-container',
  templateUrl: './grade-distri-container.component.html',
  styleUrls: ['./grade-distri-container.component.css']
})
export class GradeDistriContainerComponent implements OnInit {
  columnsToDisplay = [
    'faculty',
    'department',
    'code',
    'section'
  ];

  dataSource: MatTableDataSource<any>;
  courses: any[] = [];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator; // For pagination
  @ViewChild(MatSort, {static: false}) sort: MatSort; // For Sort

  // table that will store the data from the spreadsheet
  table;
  row: number;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.row = -1;
  };

  ngOnInit() {
    this.http.get('assets/notas_2019-2020.xlsx', { responseType: 'blob' }).subscribe(data => {
      // make a file reader
      const reader: FileReader = new FileReader();
      // make file reader read the data object
      reader.readAsBinaryString(data);
      // when file reader loads call do
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /*
        selected the sheet at the given index. For our spreedsheet:
        0 is summer, 1 is first semester, 2 is second semester
        */
        const wsname: string = wb.SheetNames[1];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.table = XLSX.utils.sheet_to_json(ws, { header: 1 }); // to get 2d array pass 2nd parameter as object {header: 1}

        this.table.splice(0, 1) // remove first element
        this.table.forEach((row) => {
          console.log(row.length)
          // That warning is annoying
          this.courses.push({
            faculty: row[0],
            department: row[1],
            code: row[2],
            section: row[3]
          })
        })
        this.dataSource = new MatTableDataSource(this.courses);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      };
      
    },
      error => {
        console.log(error);
      })
  }

  DoSomethingWithRow(i: number) {
    this.row = i
  }

  goBack() {
    // this.onFinished.emit(false)
    this.router.navigate(['home/apps'])
  }
}
