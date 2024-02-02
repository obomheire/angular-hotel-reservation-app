import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let reservationUUID =
      this.activatedRoute.snapshot.paramMap.get('reservationUUID');

    if (reservationUUID) {
      this.reservationService
        .getReservation(reservationUUID)
        .subscribe((reservation) => {
          if (reservation) this.reservationForm.patchValue(reservation);
        });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let reservationUUID =
        this.activatedRoute.snapshot.paramMap.get('reservationUUID');

      if (reservationUUID) {
        // Update
        this.reservationService
          .updateReservation(reservationUUID, reservation)
          .subscribe((reservation) => {
            console.log(reservation);
          });
      } else {
        // New
        this.reservationService
          .addReservation(reservation)
          .subscribe((reservation) => {
            console.log(reservation);
          });
      }

      this.router.navigate(['/list']);
    }
  }
}
