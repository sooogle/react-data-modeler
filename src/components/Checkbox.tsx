import React from 'react'
import { useField } from 'formik'

interface CheckboxProps {
  label: string;
  name: string;
  onChange?: (checked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  const { label, onChange, ...other } = props;
  const [field] = useField({ ...other, type: 'checkbox'});
  return (
    <div className="custom-control custom-switch">
      <input type="checkbox" className="custom-control-input" id={field.name} {...field} {...other} />
      <label className="custom-control-label" htmlFor={field.name}><small>{label}</small></label>
    </div>
  );
}

export default Checkbox;