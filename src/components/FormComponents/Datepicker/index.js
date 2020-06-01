import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { useField } from "formik";

const Datepicker = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="form-date">
      <div>
        <label className="form-date-label">{props.text}</label>
      </div>
      <DatePicker
        dropdownMode
        className="form-date-container"
        selected={field.value ? new Date(field.value) : null}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        placeholderText={props.text}
        onChange={(e) => helpers.setValue(e.toISOString())}
      />
      {meta.error ? <div className="form-error">{meta.error}</div> : null}
    </div>
  ); //fim return
}; //fim classe DatePicker

export default Datepicker;
