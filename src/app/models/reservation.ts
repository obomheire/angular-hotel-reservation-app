export interface Reservation {
  reservationUUID: string;
  checkInDate: Date;
  checkOutDate: Date;
  guestName: string;
  guestEmail: string;
  roomNumber: number;
}
