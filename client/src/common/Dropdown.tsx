import React, { CSSProperties } from 'react';

interface DropdownProps {
  currentValue: string;
  options: { value: string | number; label: string }[];
  onChange: (value: string) => void;
  style?: CSSProperties;
}

export function Dropdown(props: DropdownProps) {
  return (
    <select style={props.style} value={props.currentValue} onChange={(e) => props.onChange(e.target.value)}>
      {props.options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
