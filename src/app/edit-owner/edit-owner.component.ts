import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../services/Address.services';
import { PetOwnerService } from '../services/petowner.service';
import {
  AddressRequestModel,
  PetOwnerRequestModel,
} from '../models/request.models';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css'],
})
export class EditOwnerComponent implements OnInit {
  editForm: FormGroup;
  ownerId: number;
  addressId: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private ownerService: PetOwnerService
  ) {}

  ngOnInit(): void {
    this.ownerId = +this.route.snapshot.params['id'];
    this.buildForm();
    this.loadOwnerDetails();
  }

  buildForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: [''],
    });
  }

  loadOwnerDetails(): void {
    this.ownerService.getPetOwner(this.ownerId).subscribe((owner) => {
      this.editForm.patchValue({
        name: owner.name,
        addressLine1: owner.address.line1,
        addressLine2: owner.address.line2,
        city: owner.address.city,
        state: owner.address.state,
        zip: owner.address.zip,
        country: owner.address.country,
        phoneNumber: owner.phoneNumber,
        emailAddress: owner.emailAddress,
      });
      this.addressId = owner.addressId;
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const addressData: AddressRequestModel = {
        id: this.addressId,
        line1: this.editForm.value.addressLine1,
        line2: this.editForm.value.addressLine2,
        city: this.editForm.value.city,
        state: this.editForm.value.state,
        zip: this.editForm.value.zip,
        country: this.editForm.value.country,
      };

      this.addressService.updateAddress(addressData).subscribe(
        (result) => {
          console.log('Address updated successfully:', result);

          const ownerData: PetOwnerRequestModel = {
            id: this.ownerId,
            name: this.editForm.value.name,
            addressId: addressData.id,
            phoneNumber: this.editForm.value.phoneNumber,
            emailAddress: this.editForm.value.emailAddress,
          };

          this.ownerService.updatePetOwner(ownerData).subscribe(
            (ownerResult) => {
              console.log('Owner updated successfully:', ownerResult);
              this.router.navigate(['/owners']);
            },
            (error) => {
              console.error('Error updating owner:', error);
            }
          );
        },
        (error) => {
          console.error('Error updating address:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.editForm);
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
}
