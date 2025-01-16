import { Routes } from '@angular/router';
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { HomeComponent } from './home/home.component';
import { ViewAppointmentComponent } from './appointments/view-appointment/view-appointment.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Home route
    { path: 'appointments/add', component: AddAppointmentComponent }, // Route for AddAppointment
    { path: 'appointments/view', component: ViewAppointmentComponent },
    { path: 'appointments/edit/:id', component: EditAppointmentComponent },
    { path: '**', redirectTo: '' } // Wildcard route redirects to Hom
];
