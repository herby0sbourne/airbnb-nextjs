import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IUserFavourite {
  listingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ listingId, currentUser }: IUserFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavourite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavourite) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (e) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavourite, listingId, loginModal, router]
  );

  return {
    hasFavourite,
    toggleFavourite
  };
};

export default useFavourite;
