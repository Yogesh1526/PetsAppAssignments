import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { EditPetComponent } from './edit-pet/edit-pet.component';
import { PetTypeListComponent } from './pet-type-list/pet-type-list.component';
import { AddPetTypeComponent } from './add-pet-type/add-pet-type.component';
import { EditPetTypeComponent } from './edit-pet-type/edit-pet-type.component';
import { BreedListComponent } from './breed-list/breed-list.component';
import { AddBreedComponent } from './add-breed/add-breed.component';
import { EditBreedComponent } from './edit-breed/edit-breed.component';

const routes: Routes = [
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: 'appointments', component: AppointmentsComponent }, 
  { path: 'appointments/new', component: NewAppointmentComponent },
  { path: 'appointments/:id/edit', component: EditAppointmentComponent },
  { path: 'owners', component: OwnerListComponent }, 
  { path: 'owners/new', component: AddOwnerComponent },
  { path: 'owners/:id/edit', component: EditOwnerComponent },
  { path: 'pets', component: PetListComponent }, 
  { path: 'pets/new', component: AddPetComponent },
  { path: 'pets/:id/edit', component: EditPetComponent },
  { path: 'pet-types-list', component: PetTypeListComponent }, 
  { path: 'pet-types/new', component: AddPetTypeComponent },
  { path: 'pet-types/:id/edit', component: EditPetTypeComponent },
  { path: 'breed-list', component: BreedListComponent }, 
  { path: 'breed/new', component: AddBreedComponent },
  { path: 'breeds/:id/edit', component: EditBreedComponent },
  { path: '**', redirectTo: '/appointments', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
