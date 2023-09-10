"use client";

import { Reservation, User, Listing } from "@prisma/client";
import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Grid from "@/app/components/Grid";
import ListingCard from "@/app/components/listings/ListingCard";

interface ReservationsProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: User | null;
}

const ReservationsClient = ({ reservations, currentUser }: ReservationsProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Canceled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
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
              actionLabel={"Cancel guest Reservation"}
              currentUser={currentUser}
            />
          );
        })}
      </Grid>
    </Container>
  );
};
export default ReservationsClient;
