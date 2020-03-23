import React from "react";
import "../App.css";

import { Link } from "react-router-dom";

export default class Botao extends React.Component {
  constructor(props) {
    super(props);

    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {}; //fim this.state

    this.handleSubmit = this.handleSubmit.bind(this);
  } //fim metodo construtor

  handleSubmit(e) {
    if (this.props.alert == "Cadastro Realizado!") {
      alert(this.props.alert);
    } //fim if

    //define rota
    /*if(this.props.route == "login"){
      <Link to= "/login">Login</Link>
    }//fim if*/

    e.preventDefault(); //previne a atualizacao da pagina
  } //fim metodo handleSubmit

  render() {
    return (
      <div>
        <button> {this.props.text}</button>
      </div>
    ); //fim return
  } //fim metodo render
} //fim classe Cadastro
