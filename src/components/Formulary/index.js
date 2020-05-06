import React from "react";
import Datepicker from "../../components/Datepicker";
import { Formik, Form, useField } from 'formik';
import "./styles.css";
import { isThisHour } from "date-fns";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
      <>
          <label htmlFor={props.id || props.name}>{label}</label>
          <input className="text-input" {...field} {...props} />
          {meta.touched && meta.error ? (
              <div className="error">{meta.error}</div>
          ) : null}
      </>
  );
};

export default class Formulary extends React.Component {
  constructor(props) {
    super(props);
    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: ""
    }; //fim this.state
  } //fim metodo construtor

  render() {
    return (
      <div className="form-container">
        <Formik
        initialValues={this.props.initialValues}
        validate={this.props.validate}
        onSubmit={this.props.onSubmit}
        >
          <Form>
              {this.props.contents}
              {this.props.button}               
          </Form>
        </Formik>
      </div>
    ); //fim return
  } //fim metodo render
} //fim classe Formulary
