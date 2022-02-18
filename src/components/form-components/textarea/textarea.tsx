import './textarea.scss'
import { useFormContext } from "react-hook-form";
import { BaseFormComponent } from '../base-form-component/base-form-component';

type Props = {
  onClick?: any;
  value?: string;
  placeholder?: string;
  label?: string;
  name: string;
  type?: string;
  rows?: number;
  autoComplete?: string;
  disabled?: boolean;
  className?: string;
  required?: any;
  readOnly?: boolean;
  defaultValue?: string;
};

export const Textarea = ({
  onClick,
  placeholder,
  label = '',
  name,
  rows = 3,
  autoComplete,
  disabled,
  className = '',
  required,
  readOnly }: Props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <BaseFormComponent
      name={name}
      label={label}
      required={required}
      className={`textarea ${className}`}
    >
      <textarea
        onClick={onClick}
        disabled={disabled}
        readOnly={readOnly}
        rows={rows}
        autoComplete={autoComplete}
        {...register(name, { required })}
        placeholder={placeholder}
        className={`base-input ${className} ${errors[name] ? 'error' : ''}`}
      />
    </BaseFormComponent>
  )
}