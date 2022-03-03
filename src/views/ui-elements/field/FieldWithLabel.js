import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";

const FieldWithLabel = ({
  id,
  label,
  onChange,
  placeholder,
  value,
  error,
  touched,
  disabled,
  as = "input",
}) => {
  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Field
        name={id}
        id={id}
        onChange={onChange}
        className={`form-control ${error && touched && "is-invalid"}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        as={as}
      />
      {error && touched ? <div className="text-danger">{error}</div> : null}
    </FormGroup>
  );
};

export default FieldWithLabel;
