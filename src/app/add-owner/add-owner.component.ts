import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../services/Address.services';
import { PetOwnerService } from '../services/petowner.service';
import { AddressRequestModel, PetOwnerRequestModel } from '../models/request.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,private router: Router,
    private addressService: AddressService,
    private ownerService: PetOwnerService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['']
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const addressData: AddressRequestModel = {
        id:0,
        line1: this.contactForm.value.addressLine1,
        line2: this.contactForm.value.addressLine2,
        city: this.contactForm.value.city,
        state: this.contactForm.value.state,
        zip: this.contactForm.value.zip,
        country: this.contactForm.value.country
      };

      this.addressService.createAddress(addressData).subscribe(
        (addressResponse) => {
          console.log('Address saved successfully:', addressResponse);
            const ownerData: PetOwnerRequestModel = {
            id:0,
            name: this.contactForm.value.name,
            addressId: addressResponse.id, 
            phoneNumber: this.contactForm.value.phoneNumber,
            emailAddress: this.contactForm.value.emailAddress
          };
          this.ownerService.createPetOwner(ownerData).subscribe(
            (ownerResponse) => {
              console.log('Owner saved successfully:', ownerResponse);
              this.router.navigate(['/owners']);
              this.contactForm.reset();
            },
            (error) => {
              console.error('Error saving owner:', error);
            }
          );
        },
        (error) => {
          console.error('Error saving address:', error);
        }
      );

    } else {
      this.markFormGroupTouched(this.contactForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
