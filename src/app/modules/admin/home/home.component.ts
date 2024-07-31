import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital } from 'src/app/models/hospital';
import { ResponseHospitalsAnalysis } from 'src/app/models/responseModel/responseHospitalsAnalysis';
import { ResponseProductMostAssigned } from 'src/app/models/responseModel/responseproductMostAssigned';
import { AssignedSuppliesService } from 'src/app/services/assigned_supplies-service/assigned_supplies.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hospitalsAnalysis!: ResponseHospitalsAnalysis[];
  mostCases: Hospital = new Hospital();
  mostProductAssigned: ResponseProductMostAssigned = new ResponseProductMostAssigned();

  dataSource = new MatTableDataSource<ResponseHospitalsAnalysis>(this.hospitalsAnalysis);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name_hospital', 'cases', 'percentage_deliveries'];


  totalElements: number = 0;
  filterValue: string = '';
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(
    private diaglo: MatDialog,
    private hospitalService: HospitalService,
    private assignedService: AssignedSuppliesService,
    private changeDetection: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.loadHospitalMostCases();
    this.loadHospitalsAnalysis();
    this.loadProductMostAssigned()

  }

  loadHospitalsAnalysis(): void {
    this.hospitalService.getHospitalAnalysis().subscribe({
      next: (res: ResponseHospitalsAnalysis[]) => {
        this.hospitalsAnalysis = structuredClone(res);
        this.dataSource = new MatTableDataSource(this.hospitalsAnalysis);
        this.changeDetection.detectChanges();
        this.dataSource.paginator = this.paginator

      }
    })
  }

  loadHospitalMostCases(): void {
    this.hospitalService.getHospitalMostCases().subscribe({
      next: (res: Hospital) => {
        this.mostCases = structuredClone(res);
        this.changeDetection.detectChanges();
      }
    })
  }

  loadProductMostAssigned() {
    this.assignedService.getproductMostAssigned().subscribe({
      next: (res: ResponseProductMostAssigned) => {
        this.mostProductAssigned = structuredClone(res);
      }
    })

  }

  roundToInteger(value: number): number {
    return Math.round(value);
  }

}
