import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { PetOwnerService } from '../services/petowner.service';
import { PetService } from '../services/pet.services';
import { AppointmentRequestModel } from '../models/request.models';
import { AppointmentResponseModel, PetOwnerResponseModel, PetResponseModel } from '../models/response.models';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  editForm: FormGroup;
  owners: PetOwnerResponseModel[] = [];
  pets: PetResponseModel[] = [];
  appointmentId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private ownerService: PetOwnerService,
    private petService: PetService
  ) {
    this.editForm = this.fb.group({
      ownerId: ['', Validators.required],
      petId: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.appointmentId = +this.route.snapshot.params['id'];
    this.loadOwners(); // Load owners when component initializes
  }

  loadOwners(): void {
    this.ownerService.getAllPetOwners().subscribe((owners: PetOwnerResponseModel[]) => {
      this.owners = owners;
      // After loading owners, check if there's a selected ownerId in the form
        // If ownerId is selected, load appointment details and pets for that owner
        this.loadAppointmentAndPets();
    });
  }

  loadAppointmentAndPets(): void {
    // Load appointment details first
    this.appointmentService.getAppointment(this.appointmentId).subscribe((appointment: AppointmentResponseModel) => {
      if (appointment) {
               // Once appointment details are loaded, load pets for the selected owner
        this.loadPets(appointment);
      }
    });
  }

  loadPets(appointment: AppointmentResponseModel): void {
    this.petService.getAllPetsByOwnerId(appointment.petOwnerId).subscribe(
      (pets: PetResponseModel[]) => {
        this.pets = pets;
        this.editForm.patchValue({
          ownerId: appointment.petOwnerId,
          petId: appointment.petId,
          date: appointment.appointmentDate,
          reason: appointment.reason
        });
      },
      (error: any) => {
        console.error('Error fetching pets:', error);
      }
    );
  }
  loadOnlyPets(ownerId:number): void {
    this.petService.getAllPetsByOwnerId(ownerId).subscribe(
      (pets: PetResponseModel[]) => {
        this.pets = pets;
       
      },
      (error: any) => {
        console.error('Error fetching pets:', error);
      }
    );
  }

  onChangeOwner(): void {
    const ownerId = this.editForm.get('ownerId')?.value;
    if (ownerId) {
      this.loadOnlyPets(ownerId);
    } else {
      this.pets = [];
    }
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const appt: AppointmentRequestModel = {
        appointmentDate: this.date?.value,
        id: this.appointmentId,
        petId: this.petId?.value,
        petOwnerId: this.ownerId?.value,
        reason: this.reason?.value
      };
      this.appointmentService.updateAppointment(appt).subscribe(() => {
        console.log('Appointment updated successfully');
        this.router.navigate(['/appointments']);
      }, error => {
        console.error('Error updating appointment:', error);
        // Handle error here (e.g., show error message)
      });
    }
  }

  get petId() {
    return this.editForm.get('petId');
  }

  get ownerId() {
    return this.editForm.get('ownerId');
  }

  get date() {
    return this.editForm.get('date');
  }

  get reason() {
    return this.editForm.get('reason');
  }
}
