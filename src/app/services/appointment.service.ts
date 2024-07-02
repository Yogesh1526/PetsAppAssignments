import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppointmentRequestModel } from '../models/request.models';
import { AppointmentResponseModel, APIResponseModel } from '../models/response.models';
import { BaseService } from './BaseService.services';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends BaseService {

  constructor(public override http: HttpClient) {
    super(http);
  }
  
  getAppointment(appointmentId: number): Observable<AppointmentResponseModel> {
    return this.get<APIResponseModel<AppointmentResponseModel>>(`appointments/${appointmentId}`)
      .pipe(
        map(response => response.data as AppointmentResponseModel),
        catchError(this.handleError)
      );
  }

  getAllAppointments(): Observable<AppointmentResponseModel[]> {
    return this.get<APIResponseModel<AppointmentResponseModel[]>>('appointments')
      .pipe(
        map(response => response.data as AppointmentResponseModel[]),
        catchError(this.handleError)
      );
  }

  createAppointment(appointment: AppointmentRequestModel): Observable<boolean> {
    return this.post<APIResponseModel<boolean>>('appointments', appointment)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  updateAppointment(appointment: AppointmentRequestModel): Observable<boolean> {
    return this.put<APIResponseModel<boolean>>(`appointments/${appointment.id}`, appointment)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }

  deleteAppointment(appointmentId: number): Observable<boolean> {
    return this.delete<APIResponseModel<boolean>>(`appointments/${appointmentId}`)
      .pipe(
        map(response => response.data as boolean),
        catchError(this.handleError)
      );
  }


}
