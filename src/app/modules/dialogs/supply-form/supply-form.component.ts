import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supply } from 'src/app/models/suppliesWarehouse';
import { NotificationService } from 'src/app/services/service-notification/notification.service';
import { SuppliesWarehouseService } from 'src/app/services/supplies_warehouse-service/supplies_warehouse.service';

@Component({
  selector: 'app-supply-form',
  templateUrl: './supply-form.component.html',
  styleUrls: ['./supply-form.component.scss']
})
export class SupplyFormComponent implements OnInit {
  supplyForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<SupplyFormComponent>,
    private fb: FormBuilder,
    private suppliesService: SuppliesWarehouseService,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: Supply,

  ) {

  }
  ngOnInit(): void {
    this.initSupplyForm()
  }

  initSupplyForm(): void {
    this.supplyForm = this.fb.group({
      name: [''],
      count: [''],
    });
  }



  closeModal() {
    this.dialogRef.close();
  }
  sendSupply() {
    let suppy: Supply = new Supply(this.supplyForm.value);

    if (this.data) {
      this.data.count = suppy.count + this.data.count;
      suppy = this.data
    }
    if (suppy.name == '' || suppy.count < 0) {
      this.sendAlert(suppy)
      return
    }

    this.suppliesService.createSupply(suppy).subscribe({
      next: (response) => {
        if (response) {
          this.dialogRef.close(response);
        }
      }
    })

  }
  
  sendAlert(suppy: Supply) {
    if (suppy.name == '') {
      this.notification.showWarning('El insumo debe tener un nombre')
    }
    this.notification.showWarning('El insumo debe tener una cantidad')


  }

}
