import React from 'react';
import './styles.scss';

const Modal = ({id='modal' , onClose= () => {}, children}) => {

  const handleOutSideClick = (e) => {
    if(e.target.id == id) onClose();
  }

  return(
    //vai deixar a tela escura 
  <div id="modal" className="modal" onClick={handleOutSideClick} >
    <div className="container">
      
      <h1>Para continuar faça seu Login</h1>
      
      <p>Usuário</p>
        <input type="text" name="" placeholder="Insira seu nome de usuário"></input>
        <p>Senha</p>
        <input type="password" name="" placeholder="Insira sua senha"></input>
        <a href="#">Esqueceu sua senha?</a>
        <a href="#">Não é cadastrado?</a>


      <div class="modal-buttons">
        <button type="button" class="btn btn-primary">Login</button>
        <h1></h1>
				<button type="button" class="btn btn-default" onClick={onClose} data-dismiss="modal">Fechar</button>
			</div>
    </div>
  </div>
  );
};

export default Modal;