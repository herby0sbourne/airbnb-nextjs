"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns/fp";
import { Range } from "react-date-range";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import CountrySelect, { CountrySelectValue } from "../FromInputs/CountrySelect";
import Heading from "@/app/components/Heading";
import Calender from "@/app/components/FromInputs/Calender";
import Counter from "@/app/components/FromInputs/Counter";

enum STEPS {
  LOCATION,
  DATE,
  INFO
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomsCount,
      bathRoomCount: bathroomCount
      // startDate: dateRange.startDate ? formatISO(dateRange.startDate) : undefined,
      // endDate: dateRange.endDate ? formatISO(dateRange.endDate) : undefined
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomsCount,
    router,
    searchModal,
    step
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you want to go" subtitle="Find the perfect location" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure every one is free!" />
        <Calender value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More infomation" subtitle="Find your perfec place" />
        <Counter
          title="Guests"
          subtitle="How many are coming?"
          value={guestCount}
          updateCount={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many you need?"
          value={roomsCount}
          updateCount={(value) => setRoomsCount(value)}
        />
        <Counter
          title="Bathroomms"
          subtitle="How many you need?"
          value={bathroomCount}
          updateCount={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};
export default SearchModal;
