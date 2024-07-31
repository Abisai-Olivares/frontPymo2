import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/admin/home/home.component';
import { HospitalComponent } from './modules/admin/hospital/hospital.component';
import { WarehouseComponent } from './modules/admin/warehouse/warehouse.component';
import { HospitalDetailsComponent } from './modules/admin/hospital-details/hospital-details.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'home',
  },
  {
    path:'home',
    pathMatch:'full',
    component:HomeComponent,
  },
  {
    path:'hospital',
    pathMatch:'full',
    component:HospitalComponent,
  },
  {
    path:'warehouse',
    pathMatch:'full',
    component:WarehouseComponent,
  },
  {
    path:'detalles-hospital/:id',
    pathMatch:'full',
    component:HospitalDetailsComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
