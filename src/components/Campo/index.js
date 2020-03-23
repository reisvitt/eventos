import React from "react";
import "./styles.css";

export default class Cadastro extends React.Component {
  constructor(props) {
    super(props);

    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: ""
    }; //fim this.state
  } //fim metodo construtor

  render() {
    return (
      <div className="campo-container">
        <div>
          <label>{this.props.text}</label>
        </div>

        <input
          className="input"
          type={this.props.type}
          value={this.props.value}
          placeholder={this.props.text}
          onChange={this.props.onChange}
        />
      </div>
    ); //fim return
  } //fim metodo render
} //fim classe Cadastro
