import React from "react";
import './base-form-component.scss'
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string | JSX.Element;
  required: boolean;
  className?: string;
  children: React.ReactNode;
}

export const BaseFormComponent: React.FC<Props> = ({ name, label, required, children, className = '' }) => {
  const { formState: { errors } } = useFormContext();

  return (
    <div className={`base-form-component ${className} ${errors[name] ? 'error' : ''}`}>
      {label &&
        <label
          className="component-label"
          htmlFor={name}
        >
          {label}
          {required && <span className="text-primary-400 ml-0.5">*</span>}
        </label>
      }
      {children}
      <div className="error-message">{errors[name] && errors[name].message}</div>
    </div>
  );
}