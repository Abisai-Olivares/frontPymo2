import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AssignedSuppliesRequest } from 'src/app/models/assignedSupplies';
import { Hospital } from 'src/app/models/hospital';
import { Supply } from 'src/app/models/suppliesWarehouse';
import { AssignedSuppliesService } from 'src/app/services/assigned_supplies-service/assigned_supplies.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { SuppliesWarehouseService } from 'src/app/services/supplies_warehouse-service/supplies_warehouse.service';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss']

})
export class HospitalFormComponent implements OnInit {
  isHospital: boolean = false;

  hospitalForm!: FormGroup;
  currentHospital!: Hospital;
  assignedSuppliesForm!: AssignedSuppliesRequest;
  supplyCounts: number[] = [];
  currentSupplies: Supply[] = [];

  constructor(
    public dialogRef: MatDialogRef<HospitalFormComponent>,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private suppliesService: SuppliesWarehouseService,
    private assignedSuppliesService: AssignedSuppliesService,
    private changeDetection: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this.initHospitalForm();
    this.loadSuppliesInWarehouse();
  }

  loadSuppliesInWarehouse() {
    this.suppliesService.getSuppliesWarehouse().subscribe({
      next: (response: Supply[]) => {
        this.currentSupplies = response;
      }
    })
  }

  initAssignedSupplies(): void {
    this.assignedSuppliesForm = {
      id_hospital: this.currentHospital.id,
      request: this.initializeSupplyRequests(),
    };
  }

  initializeSupplyRequests(): Supply[] {
    return this.currentSupplies.map((supply) => {
      return new Supply({
        id: supply.id,
        name: supply.name,
        count: 0,
      });
    });
  }

  updateSupplyCount(data: Event, positon: number): void {
    const inputValue = parseFloat((data.target as HTMLInputElement).value);
    this.assignedSuppliesForm.request[positon].count = inputValue;
  }

  initHospitalForm(): void {
    this.hospitalForm = this.fb.group({
      name: [''],
      cases: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  createHospital(): void {
    const hospital: Hospital = new Hospital(this.hospitalForm.value)

    this.hospitalService.createHospital(hospital).subscribe({
      next: (response: Hospital) => {
        this.currentHospital = structuredClone(response);
        this.initAssignedSupplies();
      }
    })
    this.isHospital = true;

  }

  createHospitalAssignment(): void {
    this.assignedSuppliesService.createAssignedSupplies(this.assignedSuppliesForm).subscribe({
      next: (response: AssignedSuppliesRequest) => {
        if (response) {
          this.dialogRef.close(this.currentHospital);

        }
      }
    })
  }



}
