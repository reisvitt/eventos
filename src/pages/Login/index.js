import React from 'react'

import './App.css';

import Campos from '../../components/Campos';
import Botao from '../../components/Botao';

export default class Login extends React.Component{

  //funcao do render: retornar o conteudo html do componente App
  render(){
    document.title = 'Login'
    //<Campos text = "DATA/NASCI" type = "date" />
    return(
      <div>
        <form onSubmit = {this.handleSubmit}>
          <Campos text = "Login"        type = "text" />
          <Campos text = "SENHA"        type = "password" />
          <Botao text = "Entrar"        alert = "logado" />
        </form>

      </div>
    );//fim return
  }//fim metodo render
}//fim classe App