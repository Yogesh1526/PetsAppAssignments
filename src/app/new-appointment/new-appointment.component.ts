import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { PetOwnerService } from '../services/petowner.service';
import { PetService } from '../services/pet.services';
import { AppointmentRequestModel } from '../models/request.models';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
})
export class NewAppointmentComponent implements OnInit {
  newForm!: FormGroup;
  owners: any[] = [];
  pets: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private ownerService: PetOwnerService, // Inject OwnerService
    private petService: PetService, // Inject PetService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadOwners(); // Load owners when component initializes
  }

  buildForm(): void {
    this.newForm = this.formBuilder.group({
      date: ['', Validators.required],
      reason: ['', Validators.required],
      ownerId: [null, Validators.required], // Add ownerId field to form
      petId: [null, Validators.required], // Add petId field to form
    });
  }

  loadOwners(): void {
    this.ownerService.getAllPetOwners().subscribe(
      (owners: any[]) => {
        this.owners = owners;
      },
      (error: any) => {
        console.error('Error fetching owners:', error);
      }
    );
  }

  onChangeOwner(): void {
    const ownerId = this.newForm.get('ownerId')?.value;
    if (ownerId) {
      this.petService.getAllPetsByOwnerId(ownerId).subscribe(
        (pets: any[]) => {
          this.pets = pets;
        },
        (error: any) => {
          console.error('Error fetching pets:', error);
        }
      );
    } else {
      this.pets = [];
    }
  }

  onSubmit(): void {
    if (this.newForm.valid) {
      const appt: AppointmentRequestModel = {
        appointmentDate: this.date?.value,
        id: 0,
        petId: this.petId?.value,
        petOwnerId: this.ownerId?.value,
        reason: this.reason?.value
      };
      this.appointmentService.createAppointment(appt).subscribe(
        (response: any) => {
          console.log('Appointment created successfully!', response);
          this.newForm.reset();
          this.router.navigate(['/appointments']); // Navigate to appointments list after successful creation
        },
        (error: any) => {
          console.error('Error creating appointment:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.newForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get petId() {
    return this.newForm.get('petId');
  }

  get ownerId() {
    return this.newForm.get('ownerId');
  }

  get date() {
    return this.newForm.get('date');
  }

  get reason() {
    return this.newForm.get('reason');
  }
}
