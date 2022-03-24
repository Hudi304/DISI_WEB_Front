type MyProfileInputProps = {
  title: string;
  value: any;
  setValue: any;
};

export const MyProfileInput = ({ title, value = "", setValue }: MyProfileInputProps) => {
  return (
    <div className="grid grid-rows-2 p-4">
      <label>{title}</label>
      <input
        className="rounded-md"
        name="firstName"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

type MyProfileSelectProps = {
  title: string;
  onChange?: any;
  options: { value: any; label: any }[];
};

export const MyProfileSelect = ({ title, onChange, options = [] }: MyProfileSelectProps) => {
  return (
    <div className="grid grid-cols-2 p-4">
      <label>{title}</label>
      <select
        name="cars"
        id="cars"
        onChange={(e) => {
          console.log(e.target.value);
          onChange(e.target.value);
        }}
      >
        {options?.map((type, index) => {
          return <option value={type.value}>{type.label}</option>;
        })}
      </select>
    </div>
  );
};
