import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetTypeService } from '../services/pettype.services';
import { PetBreedService } from '../services/petBreed.service';

@Component({
  selector: 'app-add-pet-type',
  templateUrl: './add-pet-type.component.html',
  styleUrls: ['./add-pet-type.component.css']
})
export class AddPetTypeComponent implements OnInit {
  newForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public service : PetTypeService) {
    this.newForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.newForm.valid) {
      this.service.createPetType(this.newForm.value).subscribe( res =>{
        console.log('Pet Type data:', this.newForm.value);
        alert("Pet Saved Successfully");
        this.router.navigate(['/pet-types-list']);
    })
    
    } else {
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
