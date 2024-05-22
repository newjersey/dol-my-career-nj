import { useState } from "react";
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

interface Props {
  inputName: string;
  options: {id: string, label: string}[];
  defaultValues?: string[];
  inputLabel?: string;
}
export const FilterFormMulti = ({
  defaultValues = [],
  inputLabel,
  inputName,
  options
}: Props) => {
  const { control } = useFormContext();
  const lowerCaseValues = defaultValues.map(value => value.toLowerCase());
  const selectedValues = options.filter(option => lowerCaseValues.includes(option.id));
  const [selected, setSelected] = useState(selectedValues);

  const handleChange = (data: {id: string, label: string}[]) => {
    setSelected(data);
  }

  return (
    <div className="field-group">
      {inputLabel && (
        <div className="label-container">
          <label htmlFor={inputName}>
            {inputLabel}
          </label>
        </div>
      )}
      <div className="input-wrapper">
        <Controller
          control={control}
          name={inputName}
          render={({ field: { onChange, ...props } }) => (
            <Autocomplete
              {...props}
              multiple
              id={inputName}
              onChange={(_, data) => {
                onChange(data)
                handleChange(data)
              }}
              options={options}
              getOptionLabel={(option) => option.label}
              getOptionSelected={(option, value) => {
                return value.id === option.id
              }}
              value={selected}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="filter-input"
                  variant="outlined"
                />
              )}
            />
          )}
        />
      </div>
    </div>
  )
}