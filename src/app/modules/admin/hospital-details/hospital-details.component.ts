import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseHospitalDetails } from 'src/app/models/responseModel/responseHospitalDetails';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { HospitalDetailsFormComponent } from '../../dialogs/hospital-details-form/hospital-details-form.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HospitalDetailsComponent implements OnInit {

  isDelivery!: boolean;
  hospitalDetails: ResponseHospitalDetails = new ResponseHospitalDetails();
  hospitalId!: string;

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private changeDetection: ChangeDetectorRef,
    private dialog: MatDialog,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hospitalId = params.get('id') as string;
    });
    this.loadHospitalDetails();
  }

  loadHospitalDetails(): void {
    this.hospitalService.getHospitalDetails(this.hospitalId).subscribe({
      next: (response: ResponseHospitalDetails) => {
        this.hospitalDetails = structuredClone(response);
        this.changeDetection.detectChanges();

      }
    })
  }

  openDeliveryDialog(): void {
    const dialogRef = this.dialog.open(HospitalDetailsFormComponent, {
      height: '80%',
      width: '70%',
      data: this.hospitalDetails,

    })
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.loadHospitalDetails();
      }

    })

  }

  roundToDate(value: Date): number {
    return value.getDate();
  }
  goBack() {
    this.location.back();

  }

}
