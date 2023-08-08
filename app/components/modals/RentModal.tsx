"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Counter from "../FromInputs/Counter";
import FormInput from "../FromInputs/FormInput";
import { categories } from "../Navbar/Categories";
import ImageUpload from "../FromInputs/ImageUpload";
import CategoryInput from "../FromInputs/CategoryInput";
import CountrySelect from "../FromInputs/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: ""
    }
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathRoomCount = watch("bathRoomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describe your place" subtitle="Pick a category" />
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon }) => {
          return (
            <div key={label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === label}
                label={label}
                icon={icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guest find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue("location", value)} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basic about your place" subtitle="What amenities do you have?" />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          updateCount={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          updateCount={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many Bathrooms do you have?"
          value={bathRoomCount}
          updateCount={(value) => setCustomValue("bathRoomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Add photo of your place"}
          subtitle={"Show guests what your place looks like!"}
        />
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <FormInput
          id="title"
          label="Title"
          disabled={isLoading}
          errors={errors}
          register={register}
          required
        />
        <hr />
        <FormInput
          id="description"
          label="Description"
          disabled={isLoading}
          errors={errors}
          register={register}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title={"Now, set your price"} subtitle={"How much you charge per night"} />
        <FormInput
          id={"price"}
          label={"Price"}
          formatPrice
          errors={errors}
          type="number"
          disabled={isLoading}
          register={register}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your Home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};
export default RentModal;
