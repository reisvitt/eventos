import React from 'react';
import './App.css';

export default class Cadastro extends React.Component{

  constructor(props){
    super(props);

    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: ''
    };//fim this.state

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }//fim metodo construtor

  handleTextChange(e){
    this.setState({newCommentText: e.target.value})
  }//fim metodo handleTextChange

  render(){
    return(
      <div>
        <input className="nome" type={this.props.type} placeholder= {this.props.text} value = {this.state.newCommentText} 
          onChange = {this.handleTextChange} 
        />
        
      </div>
    );//fim return
  }//fim metodo render
}//fim classe Cadastro