import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './BaseService.services';
import { APIResponseModel, AddressResponseModel } from '../models/response.models';
import { AddressRequestModel } from '../models/request.models';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }

  getAddress(addressId: number): Observable<AddressResponseModel> {
    return this.get<APIResponseModel<AddressResponseModel>>(`addresses/${addressId}`)
      .pipe(
        map(response => response.data as AddressResponseModel),
        catchError(this.handleError)
      );
  }

  createAddress(address: AddressRequestModel): Observable<AddressResponseModel> {
    return this.post<APIResponseModel<AddressResponseModel>>('addresses', address)
      .pipe(
        map(response => response.data as AddressResponseModel),
        catchError(this.handleError)
      );
  }

  updateAddress(address: AddressRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`addresses/${address.id}`, address)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deletePetOwner(addressId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`addresses/${addressId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }
}
