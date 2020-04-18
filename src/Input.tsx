import React from "react"
import { useField, FieldConfig } from "formik"

function Input(props: FieldConfig<string | number>) {
  const [field, meta] = useField(props)
  return (
    <>
      <input className={"form-control form-control-sm " + (meta.touched && meta.error ? "is-invalid" : "")}
        {...field} {...props} />
      {meta.touched && meta.error && <div className='invalid-feedback'>{meta.error}</div>}
    </>
  )
}

export default Input