import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../services/pet.services';
import { PetBreedService } from '../services/petBreed.service';
import { PetTypeService } from '../services/pettype.services';
import { PetBreedResponseModel, PetOwnerResponseModel, PetTypeResponseModel } from '../models/response.models';
import { PetOwnerService } from '../services/petowner.service';
import { PetRequestModel } from '../models/request.models';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  newForm: FormGroup;
  petTypes: PetTypeResponseModel[] = [];
  petBreeds: PetBreedResponseModel[] = [];
  owners: PetOwnerResponseModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private petService: PetService,
    private petTypeService: PetTypeService,
    private petBreedService: PetBreedService,
    private ownerService: PetOwnerService
  ) {
    this.newForm = this.formBuilder.group({
      name: ['', Validators.required],
      petTypeId: ['', Validators.required],
      petBreedId: ['', Validators.required],
      ownerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPetTypes();
    this.loadPetBreeds();
    this.loadOwners();
  }

  loadPetTypes(): void {
    this.petTypeService.getAllPetTypes().subscribe(types => {
      this.petTypes = types;
    });
  }
  
  loadPetBreeds(): void {
    this.petBreedService.getAllPetBreeds().subscribe(breeds => {
      this.petBreeds = breeds;
    });
  }

  loadOwners(): void {
    this.ownerService.getAllPetOwners().subscribe(owners => {
      this.owners = owners;
    });
  }

  onSubmit(): void {
    if (this.newForm.valid) {
      const pet: PetRequestModel = {
        id: 0,
        name: this.newForm.get('name')?.value,
        petTypeId: this.newForm.get('petTypeId')?.value,
        petBreedId: this.newForm.get('petBreedId')?.value,
        petOwnerId: this.newForm.get('ownerId')?.value
      };
      this.petService.createPet(pet).subscribe(() => {
        alert("Added Pets Successfully!!");
        this.router.navigate(['/pets']);
      });
    } else {
      this.markFormGroupTouched(this.newForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
