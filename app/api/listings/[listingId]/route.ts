import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

/**
 * @description Deletes a listing by listingId.
 * @param {Request} request - The HTTP request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.listingId - The unique identifier of the listing to be deleted.
 * @returns {void}
 */

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId) {
    return new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(listing);
}
