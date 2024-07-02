import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PetRequestModel } from '../models/request.models';
import { PetResponseModel, APIResponseModel } from '../models/response.models';
import { BaseService } from './BaseService.services';

@Injectable({
  providedIn: 'root'
})
export class PetService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  getPet(petId: number): Observable<PetResponseModel> {
    return this.get<APIResponseModel<PetResponseModel>>(`pets/${petId}`)
      .pipe(
        map(response => response.data as PetResponseModel),
        catchError(this.handleError)
      );
  }

  getAllPetsByOwnerId(ownerId: number): Observable<PetResponseModel[]> {
    return this.get<APIResponseModel<PetResponseModel[]>>(`Pets/by-owner/${ownerId}`)
      .pipe(
        map(response => response.data as PetResponseModel[]),
        catchError(this.handleError)
      );
  }

  getAllPets(): Observable<PetResponseModel[]> {
    return this.get<APIResponseModel<PetResponseModel[]>>('pets')
      .pipe(
        map(response => response.data as PetResponseModel[]),
        catchError(this.handleError)
      );
  }

  createPet(pet: PetRequestModel): Observable<boolean> {
    return this.post<APIResponseModel<boolean>>('pets', pet)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  updatePet(pet: PetRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`pets/${pet.id}`, pet)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deletePet(petId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`pets/${petId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

}
