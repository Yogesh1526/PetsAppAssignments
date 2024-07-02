import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentResponseModel } from '../models/response.models';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  appointments: AppointmentResponseModel[] = [];
  
  filteredAppointments: AppointmentResponseModel[]=[];
  searchTerm: string = '';

  constructor(
    private router: Router, 
    private appointmentServices : AppointmentService

   ) { }

  ngOnInit(): void {
    this.getAllAppointment();
  }

  
  getAllAppointment(){
    this.appointmentServices.getAllAppointments().subscribe( (res: any[]) => {
       this.appointments = res;
       this.filteredAppointments = [...this.appointments]; 
    })
  }
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this Appointment?')) {
      this.appointmentServices.deleteAppointment(id).subscribe(
        () => {
          console.log('Appointment deleted successfully');
          alert('Appointment deleted successfully');
          this.getAllAppointment();
        },
        (error) => {
          console.error('Error deleting breed:', error);
          alert('Failed to delete breed');
        }
      );
    }
  }

  filterAppointments(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredAppointments = this.appointments.filter(appointment =>
        appointment.pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.petOwner.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAppointments = [...this.appointments];
    }
  }
  
  
}
