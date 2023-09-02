"use client";

import { Range } from "react-date-range";
import Calender from "../FromInputs/Calender";
import Button from "../Button";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}

const ListingReservation = ({
  price,
  totalPrice,
  disabled,
  disabledDates,
  onChangeDate,
  dateRange,
  onSubmit
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600"> night</div>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};
export default ListingReservation;
