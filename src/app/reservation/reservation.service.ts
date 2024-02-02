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
    return this.httpClient.get<Reservation[]>(
      `${this.apiUrl}/reservations/get-reservations`
    );
  }

  getReservation(reservationUUID: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(
      `${this.apiUrl}/reservations/get-reservation/${reservationUUID}`
    );
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(
      `${this.apiUrl}/reservations/create-reservation`,
      reservation
    );
  }

  deleteReservation(reservationUUID: string): Observable<Reservation> {
    return this.httpClient.delete<Reservation>(
      `${this.apiUrl}/reservations/delete-reservation/${reservationUUID}`
    );
  }

  updateReservation(
    reservationUUID: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.httpClient.patch<void>(
      `${this.apiUrl}/reservations/update-reservation/${reservationUUID}`,
      updatedReservation
    );
  }
}
