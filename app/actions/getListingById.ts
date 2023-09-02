import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

/**
 * Asynchronously retrieves a specific listing from the database by its ID.
 *
 * @param {string} listingId - The ID of the listing to retrieve.
 * @returns {Promise<object|null>} The listing object if found, null otherwise.
 * @throws {Error} If there is an error during the database operation.
 */
 
export default async function getListingById(listingId?: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
