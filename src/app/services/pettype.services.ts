import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PetTypeRequestModel } from '../models/request.models';
import { PetTypeResponseModel, APIResponseModel } from '../models/response.models';
import { BaseService } from './BaseService.services';

@Injectable({
  providedIn: 'root'
})
export class PetTypeService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  getPetType(petTypeId: number): Observable<PetTypeResponseModel> {
    return this.get<APIResponseModel<PetTypeResponseModel>>(`pettypes/${petTypeId}`)
      .pipe(
        map(response => response.data as PetTypeResponseModel),
        catchError(this.handleError)
      );
  }

  getAllPetTypes(): Observable<PetTypeResponseModel[]> {
    return this.get<APIResponseModel<PetTypeResponseModel[]>>('pettypes')
      .pipe(
        map(response => response.data as PetTypeResponseModel[]),
        catchError(this.handleError)
      );
  }

  createPetType(petType: PetTypeRequestModel): Observable<boolean> {
    return this.post<APIResponseModel<boolean>>('pettypes', petType)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  updatePetType(petType: PetTypeRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`pettypes/${petType.id}`, petType)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deletePetType(petTypeId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`pettypes/${petTypeId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }
}
