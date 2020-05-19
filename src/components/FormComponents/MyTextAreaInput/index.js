import React from "react";
import { useField } from 'formik';
import "./styles.css";

const TextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label className="form-text-area-label" htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="form-error">{meta.error}</div>
            ) : null}
        </>
    );
}

export default class MyTextAreaInput extends React.Component {
    constructor(props) {
        super(props);
        //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
        this.state = {
            newCommentText: ""
        }; //fim this.state
    } //fim metodo construtor

    render() {
        return (
            <TextAreaInput
                className="form-text-area-container"
                value={this.props.value}
                label={this.props.label}
                name={this.props.name}
                type={this.props.type}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
            />
        ); //fim return
    } //fim metodo render
} //fim da classe MyTextInput
