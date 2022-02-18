import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import './multi-select.scss'
import { SelectorIcon } from '@heroicons/react/solid'
import { BaseFormComponent } from "../base-form-component/base-form-component";
import { Listbox, Transition } from "@headlessui/react";
import { Chip } from "components/chip/chip";
import { Checkbox } from "../checkbox/checkbox";

type Option = {
  value: any;
  label: string;
}

type Props = {
  options: Option[]
  placeholder?: string;
  label: string;
  className?: string;
  name: string;
  disabled?: boolean;
  required?: any;
}

export const MultiSelect: React.FC<Props> = ({ options,
  placeholder,
  label,
  name,
  disabled,
  className = '',
  required, }) => {

  const { setValue, control, formState: { errors } } = useFormContext();

  const getOptionFromValue = (value: any) => {
    return options.find(option => option.value === value) || options[0];
  }

  const handleSelect = (option?: Option, currentValues?: string[]) => {
    if (option && currentValues) {
      let selectedOptions = currentValues ? [...currentValues] : [];
      if (selectedOptions.includes(option.value)) {
        selectedOptions = selectedOptions.filter((opt) => opt !== option.value);
      } else {
        selectedOptions.push(option.value);
      }
      setValue(name, selectedOptions, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      console.log('must provide option');
    }
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
            <div className="multi-select">
              <Listbox value={getOptionFromValue(field?.value)} onChange={handleSelect}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative base-input w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {field?.value?.length > 0 ? field.value.map((item: any) =>
                        <Chip
                          key={item}
                          onDelete={(event) => handleSelect(options.find((opt) => opt.value === item), field.value)}
                          label={options.find((opt: any) => opt.value === item)?.label || ""}
                        />) : placeholder}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full z-50 py-1 mt-1 top-12 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {options.map((option, optionIndex) => (
                        <div
                          key={option.value}
                          className="option"
                          onClick={() => handleSelect(option, field.value)}
                        >
                          <Checkbox
                            label={option.label}
                            value={field?.value?.includes(option.value)}
                            onChange={() => handleSelect(option, field.value)}
                          />
                        </div>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          )
        }}
      />
    </BaseFormComponent >
  );
};

