import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import './radio.scss'

type Props = {
  label: string
  name: string
  value?: string;
  disabled?: boolean;
  className?: string;
  readonly?: boolean;
  required?: boolean;
  onChange?: any;
}

export const Radio: React.FC<Props> = React.memo(({
  label,
  name,
  readonly,
  className = '',
  disabled,
  required,
  onChange }) => {

  let formContect = useFormContext();
  const { register, control } = formContect || {};

  return (
    <label className={`radio ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={() =>
          <input
            type="radio"
            {...register(name)}
            disabled={disabled}
            readOnly={readonly}
            onChange={onChange}
            className="radio-input"
          />
        }
      />
      <span onClick={(event) => {
        event.stopPropagation();
      }}>
        {label}
      </span>
    </label>
  );
});