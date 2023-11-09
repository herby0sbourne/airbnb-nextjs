"use server";

import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathRoomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      locationValue,
      bathRoomCount,
      guestCount,
      roomCount,
      category,
      endDate,
      startDate
    } = params;

    const query: any = {
      userId: userId || undefined,
      category: category || undefined,
      roomCount: roomCount ? { gte: +roomCount } : undefined,
      guestCount: guestCount ? { gte: +guestCount } : undefined,
      bathRoomCount: bathRoomCount ? { gte: +bathRoomCount } : undefined,
      locationValue: locationValue || undefined
    };

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc"
      }
    });

    // const safeListing = listings.map((listing) => ({
    //   ...listing,
    //   createdAt: listing.createdAt.toISOString()
    // }));

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
