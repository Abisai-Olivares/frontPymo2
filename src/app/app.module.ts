import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/admin/home/home.component';
import { WarehouseComponent } from './modules/admin/warehouse/warehouse.component';
import { HospitalComponent } from './modules/admin/hospital/hospital.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from './core/icons/icons.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HospitalDetailsComponent } from './modules/admin/hospital-details/hospital-details.component';
import { HospitalFormComponent } from './modules/dialogs/hospital-form/hospital-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalDetailsFormComponent } from './modules/dialogs/hospital-details-form/hospital-details-form.component';
import { SupplyFormComponent } from './modules/dialogs/supply-form/supply-form.component';
import { ToastrModule } from 'ngx-toastr';
import { MatTabsModule } from "@angular/material/tabs";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WarehouseComponent,
    HospitalComponent,
    HospitalDetailsComponent,
    HospitalFormComponent,
    HospitalDetailsFormComponent,
    SupplyFormComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    IconsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,  
    MatDividerModule,
    BrowserAnimationsModule,
    //MatFormFieldModule, ///
    //MatSelectModule,
    MatButtonModule,
  //  MatListModule,//
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,  
    ToastrModule.forRoot(),
    MatTabsModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
