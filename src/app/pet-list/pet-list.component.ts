import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetResponseModel } from '../models/response.models';
import { PetService } from '../services/pet.services';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  pets: PetResponseModel[] = [];
  filteredPets: PetResponseModel[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private petService: PetService) {}

  ngOnInit(): void {
    this.fetchPets();
  }

  fetchPets(): void {
    this.petService.getAllPets().subscribe(pets => {
      this.pets = pets;
      this.filteredPets = [...this.pets];
    });
  }

  filterPets(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredPets = this.pets.filter(pet =>
      pet.name.toLowerCase().includes(search) ||
      pet.petType.name.toLowerCase().includes(search) || 
      pet.petBreed.name.toLowerCase().includes(search) || 
      pet.petOwner.name.toLowerCase().includes(search)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterPets();
  }

  goToNewPet(): void {
    this.router.navigate(['/pets/new']);
  }

  editPet(id: number): void {
    this.router.navigate([`/pets/${id}/edit`]);
  }

  deletePet(id: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => {
        console.log(`Deleted pet with ID ${id}`);
        this.fetchPets();
      }, error => {
        console.error('Error deleting pet:', error);
      });
    }
  }
}
