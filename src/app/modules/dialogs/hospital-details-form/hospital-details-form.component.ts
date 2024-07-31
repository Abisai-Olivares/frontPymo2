import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssignedSupplies } from 'src/app/models/assignedSupplies';
import { DeliveryOfSupplies } from 'src/app/models/deliveryOfSupplies';
import { ResponseHospitalDetails } from 'src/app/models/responseModel/responseHospitalDetails';
import { AssignedSuppliesService } from 'src/app/services/assigned_supplies-service/assigned_supplies.service';
import { DeliveryOfSuppliesService } from 'src/app/services/delivery_of_supplies-service/delivery_of_supplies.service';

@Component({
  selector: 'app-hospital-details-form',
  templateUrl: './hospital-details-form.component.html',
  styleUrls: ['./hospital-details-form.component.scss']
})
export class HospitalDetailsFormComponent implements OnInit {
  deliveryForm!: FormGroup;
  deliveryArray: DeliveryOfSupplies[] = [];
  supplies!: AssignedSupplies[];
  constructor(
    private fb: FormBuilder,
    private deliverySevice: DeliveryOfSuppliesService,
    private assignedService: AssignedSuppliesService,
    private dialogRed: MatDialogRef<HospitalDetailsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResponseHospitalDetails,
  ) { }

  ngOnInit(): void {
    this.supplies = structuredClone(this.data.historyAssignedSupples)
  }

  initDeliverySupplie(idSupply: string, count: number): void {
    count = isNaN(count) ? 0 : count;
    this.deliveryForm = this.fb.group({
      count: count,
      delivered: new Date(),
      hospital: this.data.historyAssignedSupples[1].hospital,
      assignedSupplies: this.supplies.find((supply: AssignedSupplies) => supply.suppliesWarehouse.id == idSupply),
    })
  }


  pushFormArray(data: Event, positon: string): void {
    const inputValue: number = parseFloat((data.target as HTMLInputElement).value);
    this.initDeliverySupplie(positon, inputValue);
    let newDelivery = this.deliveryForm.value as DeliveryOfSupplies;
    if (this.deliveryArray.length === 0) {
      this.deliveryArray.push(newDelivery);
      return;
    }
    let indexDelivery = this.deliveryArray.findIndex((delivery: DeliveryOfSupplies) => delivery.assignedSupplies.id == newDelivery.assignedSupplies.id);
    if (indexDelivery > -1) {
      this.deliveryArray[indexDelivery].count = newDelivery.count;
      return;
    }
    this.deliveryArray.push(newDelivery);

  }

  closeDialog(): void {
    this.dialogRed.close();
  }
  createHospital(): void {
    this.deliverySevice.createDeliveryOfSupplies(this.deliveryArray).subscribe({
      next: (response => {
        if (response) {
          this.updateCountSupplies()
        }
      })
    })
  }
  updateCountSupplies(): void {
    this.subtractCount()
    this.assignedService.updateSuppliesWarehouse(this.supplies).subscribe({
      next: (res => {
        if (res) {
          this.dialogRed.close(true)
        }
      })
    })
  }

  subtractCount(): void {
    this.deliveryArray.forEach(delivery => {
      this.supplies.forEach(supply => {
        if (delivery.assignedSupplies.suppliesWarehouse.id === supply.suppliesWarehouse.id) {
          supply.count = supply.count - delivery.count
        }
      })
    })

  }
}
