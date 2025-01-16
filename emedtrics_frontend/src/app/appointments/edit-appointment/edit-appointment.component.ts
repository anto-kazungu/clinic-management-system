import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-edit-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Edit Appointment</h1>
    <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
      <label for="patient_name">Patient Name:</label>
      <input id="patient_name" formControlName="patient_name" type="text" />
      <div *ngIf="appointmentForm.get('patient_name')?.invalid && appointmentForm.get('patient_name')?.touched">
        Patient Name is required.
      </div>

      <label for="provider_name">Provider Name:</label>
      <input id="provider_name" formControlName="provider_name" type="text" />
      <div *ngIf="appointmentForm.get('provider_name')?.invalid && appointmentForm.get('provider_name')?.touched">
        Provider Name is required.
      </div>

      <label for="date">Date:</label>
      <input id="date" formControlName="date" type="date" />
      <div *ngIf="appointmentForm.get('date')?.invalid && appointmentForm.get('date')?.touched">
        Date is required.
      </div>

      <label for="time">Time:</label>
      <input id="time" formControlName="time" type="time" />
      <div *ngIf="appointmentForm.get('time')?.invalid && appointmentForm.get('time')?.touched">
        Time is required.
      </div>

      <button type="submit" [disabled]="appointmentForm.invalid">Save Changes</button>
      <button type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
})
export class EditAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.appointmentForm = this.fb.group({
      patient_name: ['', Validators.required],
      provider_name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Extract the appointment ID from the route
    this.route.params.subscribe((params) => {
      this.appointmentId = +params['id']; // Ensure it's a number
      this.loadAppointmentData();
    });
  }

  loadAppointmentData(): void {
    // Fetch appointment details from the API
    this.http
      .get<any>(`${environment.apiUrl}/api/appointments/${this.appointmentId}`)
      .subscribe(
        (data) => {
          console.log('Fetched appointment data:', data);
          this.appointmentForm.patchValue({
            patient_name: data.patient_name,
            provider_name: data.provider_name,
            date: data.appointment_date,
            time: data.appointment_time,
          });
        },
        (error) => {
          console.error('Error fetching appointment data:', error);
        }
      );
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      // Update appointment via API
      this.http
        .put(`${environment.apiUrl}/api/appointments/${this.appointmentId}`, this.appointmentForm.value)
        .subscribe(
          () => {
            alert('Appointment updated successfully!');
            this.router.navigate(['/appointments/view']);
          },
          (error) => {
            console.error('Error updating appointment:', error);
          }
        );
    }
  }

  cancel() {
    this.router.navigate(['/appointments/view']);
  }
}

