import { Controller, useFormContext } from "react-hook-form";
import './select.scss'
import { BaseFormComponent } from "../base-form-component/base-form-component";
import { Icon, ICONS } from "components/icon/icon";
import ReactSelect, { MenuPlacement } from "react-select";


type Option = {
  value: any;
  label: string | React.ReactNode;
  disabled?: boolean;
}

type Props = {
  options: Option[]
  optionRender?: (option: Option) => JSX.Element,
  valueRender?: (option: Option) => JSX.Element,
  placeholder?: string;
  label: string;
  name: string;
  className?: string;
  disabled?: boolean;
  required?: any;
  readOnly?: boolean;
}

export const Select: React.FC<Props> = ({ options,
  optionRender,
  valueRender,
  placeholder,
  label,
  name,
  className = '',
  disabled,
  required,
  readOnly = false
}) => {
  const { setValue, control, formState: { errors } } = useFormContext();

  const handleSelect = (option: any) => {
    setValue(name || '', option.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <BaseFormComponent
      name={name}
      label={label}
      required={required}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => {
          return (
            <SimpleSelect options={options}
              name={name}
              value={field.value}
              onChange={handleSelect}
              onBlur={field.onBlur}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder}
              optionRender={optionRender}
              valueRender={valueRender}
              errors={errors}
            />
          )
        }}
      />
    </BaseFormComponent>
  );
};

type SimpleSelectProps = {
  name?: string;
  options: Option[];
  hideIcon?: boolean;
  value: any;
  onChange: (option: Option) => void;
  onBlur?: any;
  readOnly?: boolean;
  disabled?: boolean;
  optionRender?: (option: Option) => JSX.Element,
  valueRender?: (option: Option) => JSX.Element,
  placeholder?: string;
  errors?: any;
  className?: string;
  inputStyles?: any;
  menuPlacement?: MenuPlacement | undefined;
}

export const SimpleSelect = ({
  name = '',
  options,
  value,
  onChange,
  disabled,
  readOnly = false,
  onBlur,
  optionRender,
  valueRender,
  menuPlacement = 'auto',
  placeholder,
  hideIcon = false,
  errors = {},
  className = '',
  inputStyles = {}
}: SimpleSelectProps) => {
  const CustomOption = (props: any) => {
    const { data, innerProps } = props;
    return (
      <div {...innerProps} className={`select-option ${props.isSelected ? "selected" : ""} ${props.isDisabled ? "disabled" : ""}`}>
        {optionRender ? optionRender(data) : data.label}
      </div>
    );
  }

  const customStyles = {
    control: (base: any, state: any) => {
      return {
        ...base,
        height: "100%",
        border: state.isFocused ? '1px solid var(--secondary-500)' : '1px solid #ced4da',
        boxShadow: state.isFocused ? "inset 0 0 0 1px var(--secondary-500)" : "none",
        ...inputStyles
      }
    },
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  }

  return (
    <ReactSelect
      classNamePrefix="select"
      styles={customStyles}
      className={className}
      onBlur={onBlur}
      menuPlacement={menuPlacement}
      placeholder={placeholder}
      isDisabled={disabled || readOnly}
      value={options.find(option => option.value === value)}
      isOptionDisabled={option => option.disabled || false}
      onChange={(option: any) => onChange(option)}
      options={options}
      isSearchable={false}
      components={{
        Option: CustomOption,
        IndicatorSeparator: () => null,
        DropdownIndicator: () => hideIcon ? null : <Icon className="mr-1" size={5} icon={ICONS.CHEVRON_DOWN} />
      }}
      menuPortalTarget={document.querySelector("body")}
    />
  )
};
