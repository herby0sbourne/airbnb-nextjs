import ListingClient from "./ListingClient";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getListingById from "@/app/actions/getListingById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import { Metadata } from "next";

interface IParams {
  listingId?: string;
}

export async function generateMetadata({ params }: { params: IParams }): Promise<Metadata> {
  const listing = await getListingById(params.listingId);

  return {
    title: listing?.title || "Listing Property",
    description: listing?.description || "Best property in the area"
  };
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params.listingId);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};
export default ListingPage;
