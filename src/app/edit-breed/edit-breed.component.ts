import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetBreedResponseModel, PetTypeResponseModel } from '../models/response.models';
import { PetBreedService } from '../services/petBreed.service';
import { PetTypeService } from '../services/pettype.services';

@Component({
  selector: 'app-edit-breed',
  templateUrl: './edit-breed.component.html',
  styleUrls: ['./edit-breed.component.css']
})
export class EditBreedComponent implements OnInit {
  editForm: FormGroup;
  petBreedId: number | null = null;
  petTypes: PetTypeResponseModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private petBreedService: PetBreedService,
    private petTypeService: PetTypeService
  ) {
    this.editForm = this.fb.group({
      petTypeId: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.petBreedId = +this.route.snapshot.params['id'];

    this.loadPetTypes();
    this.loadPetBreed();
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

  loadPetBreed(): void {
    if (this.petBreedId) {
      this.petBreedService.getPetBreed(this.petBreedId).subscribe(
        (petBreed: PetBreedResponseModel) => {
          if (petBreed) {
            this.editForm.patchValue({
              petTypeId: petBreed.petTypeId,
              name: petBreed.name
            });
          }
        },
        (error) => {
          console.error('Error fetching pet breed:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.petBreedId) {
      const petTypeId = this.editForm.value.petTypeId;
      const name = this.editForm.value.name;
      const updateBreedRequest = {
        id: this.petBreedId,
        petTypeId: petTypeId,
        name: name
      };

      this.petBreedService.updatePetBreed(updateBreedRequest).subscribe(
        () => {
          console.log('Breed updated successfully');
          alert('Breed updated successfully');
          this.router.navigate(['/breed-list']);
        },
        (error) => {
          console.error('Error updating breed:', error);
          alert('Failed to update breed');
        }
      );
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}
