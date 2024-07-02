import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PetOwnerService } from '../services/petowner.service';
import {
  PetBreedResponseModel,
  PetOwnerResponseModel,
} from '../models/response.models';
@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  owners: PetOwnerResponseModel[] = []; 
  filteredOwners: PetOwnerResponseModel[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private ownerService: PetOwnerService) {}

  ngOnInit(): void {
    this.fetchOwners();
  }

  fetchOwners(): void {
    this.ownerService.getAllPetOwners().subscribe({
      next: (owners: any[]) => {
        this.owners = owners;
        this.filteredOwners = [...this.owners]; 
      },
      error: (error) => {
        console.error('Error fetching owners:', error);
      },
    });
  }

  filterOwners(): void {
    const search = this.searchTerm.toLowerCase();
    ``;
    this.filteredOwners = this.owners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(search) ||
        owner.address.line1.toLowerCase().includes(search) ||
        owner.address.city.toLowerCase().includes(search) ||
        owner.phoneNumber.includes(search) ||
        owner.emailAddress.toLowerCase().includes(search)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterOwners();
  }

  goToNewOwner(): void {
    this.router.navigate(['/owners/new']); 
  }

  editOwner(id: number): void {
    this.router.navigate([`/owners/${id}/edit`]); 
  }

  deleteOwner(id: number): void {
    if (confirm('Are you sure you want to delete this owner?')) {
      this.ownerService.deletePetOwner(id).subscribe(
        () => {
          console.log('Owner deleted successfully');
          alert('Owner deleted successfully');
          this.fetchOwners();
        },
        (error) => {
          console.error('Error deleting owner:', error);
          alert('Failed to delete owner');
        }
      );
    }
  }
  
}
