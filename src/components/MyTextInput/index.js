import React from "react";
import { Formik, Form, useField } from 'formik';
import "./styles.css";

const TextInput = ({ label, ...props }) => {
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
}

export default class MyTextInput extends React.Component {
    constructor(props) {
        super(props);

        //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
        this.state = {
            newCommentText: ""
        }; //fim this.state
    } //fim metodo construtor

    render() {
        return (
            <TextInput
                label={this.props.label}
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
            />
        ); //fim return
    } //fim metodo render
} //fim da classe MyTextInput
