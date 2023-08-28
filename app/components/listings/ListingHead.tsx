"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import useCountries from "@/app/hooks/useCountry";
import Heading from "@/app/components/Heading";
import HeartButton from "../HeartButton";

interface ListingHeaderProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser: User | null;
}

const ListingHead = ({ id, title, imageSrc, locationValue, currentUser }: ListingHeaderProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region} ${location?.label}`} />
      <div className="w-full h-[50vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt={title} fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};
export default ListingHead;
