import { Listing, User } from "@prisma/client";

import Grid from "./../components/Grid";
import Heading from "../components/Heading";
import Container from "./../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you liked " />
      <Grid extClass="mt-10">
        {listings.map((listing) => {
          return <ListingCard key={listing.id} data={listing} currentUser={currentUser} />;
        })}
      </Grid>
    </Container>
  );
};
export default FavoritesClient;
