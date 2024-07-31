import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Supply } from 'src/app/models/suppliesWarehouse';
import { SuppliesWarehouseService } from 'src/app/services/supplies_warehouse-service/supplies_warehouse.service';
import { SupplyFormComponent } from '../../dialogs/supply-form/supply-form.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit{
  supplies!:Supply[];
  inWarehouse!: number;
  constructor(
    private suppliesService: SuppliesWarehouseService,
    private dialog: MatDialog,
    private changeDetection:ChangeDetectorRef,

  ){}

  ngOnInit(): void {
      this.loadSuppliesInWarehouse();
  }

  loadSuppliesInWarehouse():void{
    this.suppliesService.getSuppliesWarehouse().subscribe({
      next:(respose:Supply[])=>{
        this.inWarehouse = respose.reduce((total, supply) => total + supply.count, 0);
        this.supplies = structuredClone(respose)
        this.changeDetection.detectChanges()
      }
    })
  }

  openSupplyFormDialog(supply?:Supply):void{
    const dialogRef = this.dialog.open(SupplyFormComponent,{
      height: '80%',
      width: '70%',
      data:supply,
    })
    dialogRef.afterClosed().subscribe(respose=>{
      if(respose){
        this.addSupplyifNew(respose)
        this.changeDetection.detectChanges();
      }

    })

  }

  addSupplyifNew(supply:Supply):void{
    const found = this.supplies.some((currentSupply: Supply) => {
      return currentSupply.id === supply.id;
  });
     if(!found){
    this.supplies.push(supply);
   }
  }


}
