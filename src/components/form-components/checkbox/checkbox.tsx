import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import './checkbox.scss'

type Props = {
  label?: string
  name?: string
  value?: boolean
  disabled?: boolean;
  className?: string;
  readonly?: boolean;
  required?: boolean;
  onChange?: any;
  small?: boolean;
}

export const Checkbox: React.FC<Props> = React.memo(({
  label = '',
  name,
  readonly,
  className = '',
  disabled,
  value,
  required,
  small,
  onChange }) => {

  let formContect = useFormContext();
  const { register, setValue, control } = formContect || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name as string, e.target.checked, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <label className={`checkbox ${className} ${small ? "small" : ""}`}>
      {name ? (
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field }) =>
            <input
              type="checkbox"
              {...register(name)}
              checked={field.value}
              disabled={disabled}
              readOnly={readonly}
              onChange={handleChange}
              onClick={ (e)=> {e.stopPropagation()}}
              className="checkbox-input"
            />
          }
        />
      ) : (
        <input
          type="checkbox"
          checked={value}
          disabled={disabled}
          readOnly={readonly}
          onChange={onChange}
          onClick={ (e)=> {e.stopPropagation()}}
          className="checkbox-input"
        />
      )}
      <span className="checkbox-label" onClick={(event) => {
        event.stopPropagation();
      }}>
        {label}
      </span>
    </label>
  );
});