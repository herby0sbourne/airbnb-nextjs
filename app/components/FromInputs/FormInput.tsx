'use client';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
}

const FormInput = ({
  id,
  label,
  type,
  disabled,
  required,
  errors,
  formatPrice,
  register,
}: FormInputProps) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-neutral-500 absolute top-5 left-2" />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
        className={`peer w-full pt-6 font-light font-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? 'pl-9' : ' pl-4'} 
        ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0] 
        ${formatPrice ? 'left-9' : 'left-4'}
        ${errors[id] ? 'border-rose-500' : 'text-zinc-400'}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        `}
        htmlFor=""
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
