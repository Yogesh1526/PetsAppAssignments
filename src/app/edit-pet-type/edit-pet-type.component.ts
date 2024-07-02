import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PetTypeService } from '../services/pettype.services';
import { PetTypeResponseModel } from '../models/response.models';

@Component({
  selector: 'app-edit-pet-type',
  templateUrl: './edit-pet-type.component.html',
  styleUrls: ['./edit-pet-type.component.css'],
})
export class EditPetTypeComponent implements OnInit {
  editForm: FormGroup;
  petTypeId: number | null = null;
  petTypes: PetTypeResponseModel[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public service: PetTypeService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.petTypeId = +this.route.snapshot.params['id']; 
    this.service
      .getPetType(this.petTypeId)
      .subscribe((petType: PetTypeResponseModel) => {
        if (petType) {
          this.editForm.patchValue({
            id: petType.id,
            name: petType.name,
          });
        }
      });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.petTypeId) {
      const formData = {
        id: this.petTypeId,
        name: this.editForm.value.name, 
      };

      this.service.updatePetType(formData).subscribe(
        () => {
          console.log('Updated Pet Type data:', formData);
          alert('Pet Type Updated Successfully');
          this.router.navigate(['/pet-types-list']);
        },
        (error) => {
          console.error('Error updating pet type:', error);
          alert('Failed to update Pet Type');
        }
      );
    } else {
      Object.keys(this.editForm.controls).forEach((field) => {
        const control = this.editForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
