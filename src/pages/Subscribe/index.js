import React from 'react'

import './App.css';

import Campos from '../../components/Campos';
import Botao from '../../components/Botao';

import { Link } from "react-router-dom";

export default class index extends React.Component{

  //funcao do render: retornar o conteudo html do componente App
  render(){
    document.title = 'Cadastrar'
    //<Campos text = "DATA/NASCI" type = "date" />
    return(
      <div>
        <form onSubmit = {this.handleSubmit}>
          <Campos text = "NOME COMPLETO" />
          <Campos text = "SENHA"      type = "password" />
          <Campos text = "EMAIL"      type = "email" />
          <Campos text = "CPF"        type = "number" />
          <Link to= "/login">Login</Link>
         
        </form>

      </div>
    );//fim return
  }//fim metodo render
}//fim classe App