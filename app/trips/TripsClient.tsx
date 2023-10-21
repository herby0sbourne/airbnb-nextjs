"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Listing, Reservation, User } from "@prisma/client";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import useCancel from "@/app/hooks/useCancel";

interface TripsProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: User | null;
}

const TripsClient = ({ reservations, currentUser }: TripsProps) => {
  const { deletingId, onCancel } = useCancel();

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been and where your going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Trip Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};
export default TripsClient;
