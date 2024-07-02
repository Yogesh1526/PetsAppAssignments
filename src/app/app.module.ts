import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetTypeListComponent } from './pet-type-list/pet-type-list.component';
import { EditPetTypeComponent } from './edit-pet-type/edit-pet-type.component';
import { AddPetTypeComponent } from './add-pet-type/add-pet-type.component';
import { BreedListComponent } from './breed-list/breed-list.component';
import { AddBreedComponent } from './add-breed/add-breed.component';
import { EditBreedComponent } from './edit-breed/edit-breed.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    EditAppointmentComponent,
    NewAppointmentComponent,
    OwnerListComponent,
    AddOwnerComponent,
    EditOwnerComponent,
    PetListComponent,
    AddPetComponent,
    EditPetComponent,
    PetTypeListComponent,
    EditPetTypeComponent,
    AddPetTypeComponent,
    BreedListComponent,
    AddBreedComponent,
    EditBreedComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
