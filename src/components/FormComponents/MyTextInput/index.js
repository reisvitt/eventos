import React from "react";
import { useField } from 'formik';
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
