import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PetOwnerRequestModel } from '../models/request.models';
import { PetOwnerResponseModel, APIResponseModel } from '../models/response.models';
import { BaseService } from './BaseService.services';

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  getPetOwner(petOwnerId: number): Observable<PetOwnerResponseModel> {
    return this.get<APIResponseModel<PetOwnerResponseModel>>(`petowners/${petOwnerId}`)
      .pipe(
        map(response => response.data as PetOwnerResponseModel),
        catchError(this.handleError)
      );
  }

  getAllPetOwners(): Observable<PetOwnerResponseModel[]> {
    return this.get<APIResponseModel<PetOwnerResponseModel[]>>('petowners')
      .pipe(
        map(response => response.data as PetOwnerResponseModel[]),
        catchError(this.handleError)
      );
  }

  createPetOwner(petOwner: PetOwnerRequestModel): Observable<boolean> {
    return this.post<APIResponseModel<boolean>>('petowners', petOwner)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  updatePetOwner(petOwner: PetOwnerRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`petowners/${petOwner.id}`, petOwner)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deletePetOwner(petOwnerId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`petowners/${petOwnerId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

}
