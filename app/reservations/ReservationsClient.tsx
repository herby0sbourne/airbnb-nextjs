"use client";

import { Reservation, User, Listing } from "@prisma/client";

import Grid from "../components/Grid";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import useCancel from "@/app/hooks/useCancel";

interface ReservationsProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: User | null;
}

const ReservationsClient = ({ reservations, currentUser }: ReservationsProps) => {
  const { deletingId, onCancel } = useCancel();

  return (
    <Container>
      <Heading title={"Reservations"} subtitle={"Bookings on your Properties"} />
      <Grid extClass="mt-10">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel={"Cancel Guest Reservation"}
              currentUser={currentUser}
            />
          );
        })}
      </Grid>
    </Container>
  );
};
export default ReservationsClient;
