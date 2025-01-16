import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentsService } from '../../services/appointments.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-appointment',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './add-appointment.component.html',
    styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent {
    appointmentForm: FormGroup;

    constructor(private fb: FormBuilder, private appointmentsService: AppointmentsService) {
        this.appointmentForm = this.fb.group({
            patient_name: ['', Validators.required],
            provider_name: ['', Validators.required],
            appointment_date: ['', Validators.required],
            appointment_time: ['', Validators.required],
            reason: ['']
        });
    }

    onSubmit() {
      if (this.appointmentForm.valid) {
          console.log('Form Data:', this.appointmentForm.value); // Debugging
          this.appointmentsService.bookAppointment(this.appointmentForm.value).subscribe(
              (response) => console.log('Success:', response),
              (error) => console.error('Error:', error)
          );
      }
  }
}

