import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetRequestModel } from '../models/request.models';
import { PetResponseModel } from '../models/response.models';
import { PetService } from '../services/pet.services';
import { PetBreedService } from '../services/petBreed.service';
import { PetTypeService } from '../services/pettype.services';
import { PetOwnerService } from '../services/petowner.service';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  editForm: FormGroup;
  petTypes: any[] = [];
  petBreeds: any[] = [];
  owners: any[] = [];
  petId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService,
    private petTypeService: PetTypeService,
    private petBreedService: PetBreedService,
    private ownerService: PetOwnerService
  ) {
    this.editForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      petTypeId: ['', Validators.required],
      petBreedId: ['', Validators.required],
      ownerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.petId = this.route.snapshot.params['id'];
    this.loadPet();
    this.loadPetTypes();
    this.loadPetBreeds();
    this.loadOwners();
  }

  loadPet(): void {
    this.petService.getPet(this.petId).subscribe((pet: PetResponseModel) => {
      this.editForm.patchValue({
        id: pet.id,
        name: pet.name,
        petTypeId: pet.petTypeId,
        petBreedId: pet.petBreedId,
        ownerId: pet.petOwnerId
      });
    });
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
    if (this.editForm.valid) {
      const pet: PetRequestModel = {
        id: this.petId,
        name: this.editForm.get('name')?.value,
        petTypeId: this.editForm.get('petTypeId')?.value,
        petBreedId: this.editForm.get('petBreedId')?.value,
        petOwnerId: this.editForm.get('ownerId')?.value
      };

      this.petService.updatePet(pet).subscribe(() => {
        alert("Update Pets Successfully!!");
        this.router.navigate(['/pets']);
      });
    } else {
      this.markFormGroupTouched(this.editForm);
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
