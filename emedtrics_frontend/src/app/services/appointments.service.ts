import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsService {
    private apiUrl = `${environment.apiUrl}/appointments`;

    constructor(private http: HttpClient) {}

    bookAppointment(appointmentData: any): Observable<any> {
        console.log('Appointment Data:', appointmentData);
        return this.http.post(this.apiUrl, appointmentData);
    }

    updateAppointment(id: number, data: any) {
        return this.http.put(`${this.apiUrl}/${id}`, data);
      }
    
    deleteAppointment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
