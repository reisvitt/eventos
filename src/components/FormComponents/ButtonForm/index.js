import React from "react";
import "./styles.css";

export default class ButtonForm extends React.Component {
    constructor(props) {
        super(props);
        //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
        this.state = {
            newCommentText: ""
        }; //fim this.state
    } //fim metodo construtor

    render() {
        return (
            <button type={this.props.type} className="form-button">
                {this.props.text}
            </button>
        ); //fim return
    } //fim metodo render
} //fim da classe MyTextInput
