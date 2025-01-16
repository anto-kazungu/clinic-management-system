import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-view-appointments',
  standalone: true,
  template: `
    <h1>Booked Appointments</h1>
    <table>
      <thead>
        <tr>
          <th>Patient ID</th>
          <th>Patient Name</th>
          <th>Provider Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let appointment of appointments">
          <td>{{ appointment.appointment_id }}</td>
          <td>{{ appointment.patient_name }}</td>
          <td>{{ appointment.provider_name }}</td>
          <td>{{ appointment.appointment_date }}</td>
          <td>{{ appointment.appointment_time }}</td>
          <td>{{ appointment.reason }}</td>
          <td>{{ appointment.status }}</td>
          <td>{{ appointment.created_at }}</td>
          <td>
            <button (click)="editAppointment(appointment.appointment_id)">Edit</button>
            <button (click)="deleteAppointment(appointment.appointment_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styleUrls: ['./view-appointment.component.scss'], // Optional
  imports: [CommonModule]
})
export class ViewAppointmentComponent implements OnInit {
  appointments: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.http.get<any[]>(`${environment.apiUrl}/api/appointments`).subscribe(
      (data) => (this.appointments = data),
      (error) => console.error('Error fetching appointments:', error)
    );
  }

  editAppointment(appointmentId: number) {
    this.router.navigate(['/appointments/edit', appointmentId]);
  }

  deleteAppointment(appointmentId: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.http.delete(`${environment.apiUrl}/api/appointments/${appointmentId}`).subscribe(
        () => {
          this.appointments = this.appointments.filter(
            (appt) => appt.appointment_id !== appointmentId
          );
          alert('Appointment deleted successfully!');
        },
        (error) => {
          console.error('Error deleting appointment:', error);
        }
      );
    }
  }
}
