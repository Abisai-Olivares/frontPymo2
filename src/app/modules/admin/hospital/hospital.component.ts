import {  ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HospitalFormComponent } from '../../dialogs/hospital-form/hospital-form.component';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  detalles: string = 'Detalles del hospital';
  currentHospitals: Hospital[] = []
  isDialogOpen = false;
  dataSource = new MatTableDataSource<Hospital>(this.currentHospitals);
  totalElements: number = 0;
  filterValue: string = '';
  displayedColumns: string[] = ['name', 'cases', 'id',];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private hospitalService: HospitalService,
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadHospitals()
  }


  navigateToHospitalDetails(hospitalId: string): void {
    this.router.navigate(['/detalles-hospital', hospitalId]);
  }

  loadHospitals(): void {
    this.hospitalService.getHospitals().subscribe({
      next: (response: Hospital[]) => {
        this.currentHospitals = response;
        this.dataSource = new MatTableDataSource(this.currentHospitals);
        this.changeDetection.detectChanges();
        this.dataSource.paginator = this.paginator
      },
      error: (error: any) => {
      }
    });

  }
  openHospitalFormDialog(): void {
    const dialogRef = this.dialog.open(HospitalFormComponent, {
      height: '80%',
      width: '70%',
    })

    dialogRef.afterClosed().subscribe((res: Hospital) => {
      if (res) {
        this.currentHospitals.push(res);
        this.dataSource = new MatTableDataSource(this.currentHospitals);
        this.changeDetection.detectChanges();
        this.dataSource.paginator = this.paginator

      }
    })


  }


}