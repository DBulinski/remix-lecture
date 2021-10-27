import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  defaultValue: string;
  label: string;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  disabled?: boolean;
}

export function Input({ label, error, multiline, ...inputProps }: InputProps) {
  return (
    <div className="input">
      <label htmlFor={inputProps.name}>{label}</label>
      {multiline ? (
        <textarea id={inputProps.name} rows={8} {...inputProps} />
      ) : (
        <input id={inputProps.name} {...inputProps} />
      )}
      {error && (
        <div className="validation-message">This field is required</div>
      )}
    </div>
  );
}
