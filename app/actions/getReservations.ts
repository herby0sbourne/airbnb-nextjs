import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

/**
 * This function retrieves reservations from the database based on the provided parameters.
 *
 * @param {Object} params - An object that may contain the following optional properties:
 * @param {string} [params.listingId] - The ID of the listing for which reservations are to be retrieved.
 * @param {string} [params.userId] - The ID of the user whose reservations are to be retrieved.
 * @param {string} [params.authorId] - The ID of the author whose listings' reservations are to be retrieved.
 *
 * If multiple parameters are provided, they will be used in conjunction to filter the reservations.
 * The function returns an array of reservations, each including its associated listing.
 * The reservations are ordered by their creation date in descending order.
 * @returns {Promise<Array<Object>>} A Promise that resolves to an array of reservations.
 * @throws {Error}  Will throw an error if the database query fails.
 */

export default async function getReservations(params: IParams) {
  try {
    const { userId, listingId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    // const safeReservations = reservations.map((reservation) => {
    //   return {
    //     ...reservation,
    //     createdAt: reservation.createdAt.toISOString(),
    //     startDate: reservation.startDate.toISOString(),
    //     endDate: reservation.endDate.toISOString(),
    //     listing: {
    //       ...reservation.listing,
    //       createdAt: reservation.listing.createdAt.toISOString()
    //     }
    //   };
    // });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
