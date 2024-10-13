import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : searchParams.get("last");
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: stays, isLoading: isFetchingStays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { stays, isFetchingStays, confirmedStays, numDays };
};
