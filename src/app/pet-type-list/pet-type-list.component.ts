import { Component, OnInit } from '@angular/core';
import { PetTypeService } from '../services/pettype.services';
import { PetTypeResponseModel } from '../models/response.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-type-list',
  templateUrl: './pet-type-list.component.html',
  styleUrls: ['./pet-type-list.component.css'],
})
export class PetTypeListComponent implements OnInit {
  petTypes: PetTypeResponseModel[] = [];
  filteredPetTypes: PetTypeResponseModel[] = [];
  searchTerm: string = '';

  constructor(public service: PetTypeService,private router: Router) {}

  ngOnInit(): void {
    this.getAllPetsType();
  }

  getAllPetsType() {
    this.service.getAllPetTypes().subscribe((res) => {
      this.petTypes = res;
      this.filteredPetTypes = [...this.petTypes];
    });
  }

  goToNewPet(): void {
    this.router.navigate(['/pet-types/new']);
  }

  filterPetTypes(): void {
    this.filteredPetTypes = this.petTypes.filter((petType) =>
      petType.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  
  deletePetType(id: number): void {
    if (confirm('Are you sure you want to delete this Pet Type?')) {
      this.service.deletePetType(id).subscribe(
        () => {
          console.log('Pet Type deleted successfully');
          alert('Pet Type deleted successfully');
          this.getAllPetsType();
        },
        (error) => {
          console.error('Error deleting pet type:', error);
          alert('Failed to pet type');
        }
      );
    }
  }
 
}
