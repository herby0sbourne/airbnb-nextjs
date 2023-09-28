import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface UseTotalPriceProps {
  dateRange: DateRange;
  price: number;
}

const useTotalPrice = ({ dateRange, price }: UseTotalPriceProps) => {
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && price) {
        setTotalPrice(dayCount * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  return totalPrice;
};

export default useTotalPrice;