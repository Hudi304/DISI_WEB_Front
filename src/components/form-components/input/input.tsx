import React from "react";
import './input.scss'
import { useFormContext } from "react-hook-form";
import { BaseFormComponent } from "../base-form-component/base-form-component";

type Props = {
  onClick?: any;
  value?: string;
  placeholder?: string;
  label?: string | JSX.Element;
  name: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  required?: any;
  readOnly?: boolean;
  defaultValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export const Input = ({
  onClick,
  placeholder,
  label,
  name,
  type,
  autoComplete,
  disabled,
  className = '',
  required,
  readOnly,
  prefix,
  suffix }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <BaseFormComponent
      name={name}
      label={label}
      required={required}
      className={className}
    >
      <>
        {prefix && (
          <div className="text-input-prefix">
            {prefix}
          </div>
        )}
        <input
          onClick={onClick}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          type={type}
          {...register(name, { required })}
          placeholder={placeholder}
          className={`base-input ${className} ${errors[name] ? 'error' : ''}`}
        />
        {suffix && (
          <div className="text-input-suffix">
            {suffix}
          </div>
        )}
      </>
    </BaseFormComponent>
  )
}