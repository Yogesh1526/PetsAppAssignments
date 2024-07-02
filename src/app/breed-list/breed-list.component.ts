import { Component, OnInit } from '@angular/core';
import { PetBreedResponseModel } from '../models/response.models';
import { PetBreedService } from '../services/petBreed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.css'],
})
export class BreedListComponent implements OnInit {
  breeds: PetBreedResponseModel[] = [];
  filteredBreeds: PetBreedResponseModel[] = [];
  searchTerm: string = '';

  constructor(public service: PetBreedService, private router: Router) {}

  ngOnInit(): void {
    this.getAllBreeds();
  }

  getAllBreeds(): void {
    this.service.getAllPetBreeds().subscribe(
      (breeds: PetBreedResponseModel[]) => {
        this.breeds = breeds;
        this.filteredBreeds = this.breeds;
        this.filterBreeds();
      },
      (error) => {
        console.error('Error fetching breeds:', error);
      }
    );
  }

  goToNewBreed(): void {
    this.router.navigate(['/breed/new']);
  }

  filterBreeds(): void {
    const lowerCaseTerm = this.searchTerm.toLowerCase();
    this.filteredBreeds = this.breeds.filter((breed) =>
      breed.name.toLowerCase().includes(lowerCaseTerm)
    );
  }

  deleteBreed(id: number): void {
    if (confirm('Are you sure you want to delete this breed?')) {
      this.service.deletePetBreed(id).subscribe(
        () => {
          console.log('Breed deleted successfully');
          alert('Breed deleted successfully');
          this.getAllBreeds();
        },
        (error) => {
          console.error('Error deleting breed:', error);
          alert('Failed to delete breed');
        }
      );
    }
  }
}
