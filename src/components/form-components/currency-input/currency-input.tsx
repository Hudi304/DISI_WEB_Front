import "./currency-input.scss";
import NumberFormat from "react-number-format";
import { useFormContext } from "react-hook-form";
import { BaseFormComponent } from "../base-form-component/base-form-component";

type CurrencyInputProps = {
  placeholder?: string;
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
  required?: any;
  readOnly?: boolean;
  decimalScale?: number;
  prefix?: string;
};

export const CurrencyInput = ({ placeholder, label, name, disabled, className, required, readOnly, decimalScale = 2, prefix = "$" }: CurrencyInputProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const handleSelect = (value: string) => {
    setValue(name, value);
  };

  return (
    <BaseFormComponent
      name={name}
      label={label}
      required={required}
      className={className}
    >
      {/* <NumberFormat
        thousandSeparator={true}
        prefix={prefix}
        disabled={disabled}
        readOnly={readOnly}
        decimalScale={decimalScale}
        placeholder={placeholder}
        onValueChange={(values) => handleSelect(values.value)}
        {...register(name, { required })}
        className={`base-input ${className} ${errors[name] ? 'error' : ''}`}
      /> */}
    </BaseFormComponent>
  );
};
