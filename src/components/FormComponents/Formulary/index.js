import React from "react";
import { Formik, Form, Field } from "formik";
import "./styles.css";

export default class Formulary extends React.Component {
  constructor(props) {
    super(props);
    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: "",
    }; //fim this.state
  } //fim metodo construtor

  render() {
    return (
      <div className="form-container">
        <Formik
          initialValues={this.props.initialValues}
          onSubmit={this.props.onSubmit}
          validate={ this.props.validate && this.props.validate}
          validationSchema={this.props.validationSchema && this.props.validationSchema}
        >
          <Form>
            {this.props.content}
            {this.props.button}
          </Form>
        </Formik>
      </div>
    ); //fim return
  } //fim metodo render
} //fim classe Formulary
