import React from "react";
import { useField } from "formik";
import { moneyMask } from "../../../utils/mask/moneyMask";

const TextInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log("FIELD", field)
  console.log("meta", meta)
  console.log("helpers", helpers)
  console.log("props", props)
  return (
    <>
      <label className="form-text-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input {...props} {...field} onChange={(e) => helpers.setValue(props.mask(e.target.value)) }
      />
      {meta.touched && meta.error ? (
        <div className="form-error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default class MaskedInput extends React.Component {
  constructor(props) {
    super(props);
    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: "",
    }; //fim this.state
  } //fim metodo construtor

  render() {
    return (
      <TextInput
        {...this.props}
        className="form-text-container"
        label={this.props.label}
        name={this.props.name}
        placeholder={this.props.placeholder}    
      />
    ); //fim return
  } //fim metodo render
} //fim da classe MyTextInput
