import React from "react";
import { FormGroup, Label } from "reactstrap";
import { Field } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FieldWithDatePicker.scss";

const FieldWithDatePicker = ({
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
      <DatePicker
        name={id}
        selected={(value && new Date(value)) || null}
        onChange={(val) => {
          onChange(id, val);
        }}
        className="field-with-date-picker"
      />
      {error && touched ? <div className="text-danger">{error}</div> : null}
    </FormGroup>
  );
};

export default FieldWithDatePicker;
