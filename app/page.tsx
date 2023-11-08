import type { Metadata } from "next";

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "./components/listings/ListingCard";
import getListings, { IListingsParams } from "./actions/getListings";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone"
};

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <main>
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => {
              return <ListingCard key={listing.id} data={listing} currentUser={currentUser} />;
            })}
          </div>
        </Container>
      </ClientOnly>
    </main>
  );
}
