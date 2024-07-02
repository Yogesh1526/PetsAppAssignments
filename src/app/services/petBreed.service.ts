import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PetBreedRequestModel } from '../models/request.models';
import { PetBreedResponseModel, APIResponseModel } from '../models/response.models';
import { BaseService } from './BaseService.services';

@Injectable({
  providedIn: 'root'
})
export class PetBreedService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  getPetBreed(petBreedId: number): Observable<PetBreedResponseModel> {
    return this.get<APIResponseModel<PetBreedResponseModel>>(`PetBreeds/${petBreedId}`)
      .pipe(
        map(response => response.data as PetBreedResponseModel),
        catchError(this.handleError)
      );
  }

  getAllPetBreeds(): Observable<PetBreedResponseModel[]> {
    return this.get<APIResponseModel<PetBreedResponseModel[]>>('PetBreeds')
      .pipe(
        map(response => response.data as PetBreedResponseModel[]),
        catchError(this.handleError)
      );
  }

  createPetBreed(petBreed: PetBreedRequestModel): Observable<boolean> {
    return this.post<APIResponseModel<boolean>>('PetBreeds', petBreed)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  updatePetBreed(petBreed: PetBreedRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`PetBreeds/${petBreed.id}`, petBreed)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deletePetBreed(petBreedId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`PetBreeds/${petBreedId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

}
