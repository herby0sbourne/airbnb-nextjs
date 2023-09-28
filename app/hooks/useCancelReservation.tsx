import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UseCancelReservation = () => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Reservation Canceled");
        router.refresh();
      } catch (e) {
        toast.error("Something went wrong");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return {
    deletingId,
    onCancel
  };
};
export default UseCancelReservation;
