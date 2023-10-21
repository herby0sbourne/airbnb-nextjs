import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

/**
 * A custom React hook for canceling actions associated with a specific API endpoint.
 *
 * @param {string} apiEndpoint - The endpoint URL for the API actions (e.g., '/api/listings').
 * @returns {{ deletingId: string, onCancel: (id: string) => Promise<void> }} - An object containing the deletingId state and onCancel function.
 *
 * @description
 * This hook provides functionality for canceling actions related to a specific API endpoint.
 * It takes an 'apiEndpoint' parameter, allowing dynamic configuration for different API endpoints.
 * The hook returns the current 'deletingId' and an 'onCancel' function, which can be used to perform
 * cancel actions such as deletion or cancellation of items associated with the provided endpoint.
 */

const UseCancel20 = (apiEndpoint: string) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        await axios.delete(`${apiEndpoint}/${id}`);
        toast.success("Successful");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.error || "Something went wrong");
      } finally {
        setDeletingId("");
      }
    },
    [apiEndpoint, router]
  );

  return { deletingId, onCancel };
};
export default UseCancel20;

// const { deletingId, onCancel } = useCancelAction("/api/listings");
// const { deletingId, onCancel } = useCancelAction("/api/reservations");
