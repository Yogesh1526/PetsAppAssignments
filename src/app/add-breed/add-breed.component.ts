import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetTypeResponseModel } from '../models/response.models';
import { PetTypeService } from '../services/pettype.services';
import { PetBreedService } from '../services/petBreed.service';
import { PetBreedRequestModel } from '../models/request.models';

@Component({
  selector: 'app-add-breed',
  templateUrl: './add-breed.component.html',
  styleUrls: ['./add-breed.component.css']
})
export class AddBreedComponent implements OnInit {
  newForm: FormGroup;
  petTypes: PetTypeResponseModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private petTypeService: PetTypeService,
    private petBreedService: PetBreedService
  ) {
    this.newForm = this.fb.group({
      petTypeId: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPetTypes();
  }

  loadPetTypes(): void {
    this.petTypeService.getAllPetTypes().subscribe(
      (petTypes: PetTypeResponseModel[]) => {
        this.petTypes = petTypes;
      },
      (error) => {
        console.error('Error fetching pet types:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.newForm.valid) {
      const petTypeId = this.newForm.value.petTypeId;
      const name = this.newForm.value.name;

      const newBreedRequest : PetBreedRequestModel = {
        petTypeId: petTypeId,
        name: name,
        id: 0
      };

      this.petBreedService.createPetBreed(newBreedRequest).subscribe(
        () => {
          console.log('Breed added successfully');
          alert('Breed added successfully');
          this.router.navigate(['/breed-list']);
        },
        (error) => {
          console.error('Error adding breed:', error);
          alert('Failed to add breed');
        }
      );
    } else {
      this.newForm.markAllAsTouched();
    }
  }
}
