import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  private apiUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  // CRUD

  getReservations(): Observable<Reservation[]> {
      console.log(this.apiUrl);
    return this.httpClient.get<Reservation[]>(
      `${this.apiUrl}/reservations/get-reservations`
    );
  }

  getReservation(id: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(`${this.apiUrl}/reservation/${id}`);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.post<void>(
      `${this.apiUrl}/reservations/create-reservation`,
      reservation
    );
  }

  deleteReservation(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/reservation/${id}`);
  }

  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${this.apiUrl}/reservation/${id}`,
      updatedReservation
    );
  }
}
