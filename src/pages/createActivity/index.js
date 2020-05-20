import React, { useState } from "react";
import Campo from "../../components/Campo";
import Datepicker from "../../components/Datepicker";
import api from "../../services/api";
import { getToken } from "../../utils/auth";

import ImageUploader from 'react-images-upload';

import './styles.css'
import { useParams } from "react-router-dom";


const CreateActivity = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [type, setType] = useState('');
  const [subscribed_users, setSubscribed_users] = useState('');
  // const [event_id, setEvent_id] = useState('');
  const [price, setPrice] = useState('');
  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const { id } = useParams();

  document.title = "Atividade"

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Atividade Criada')
    //Colocar esse id no api.post para criar a atividade - event_id: '5eba856f1ec95c086063fda4',
    // Não sei ainda como pegar o id do evento diretamente pela pagina
    //So o usuario de vitor pode criar uma atividade nesse evento, porque ele eh o cordenador
    //login: reis@outlook.com, password: 123
    const response = await api.post(`/event/${id}/activity`, {
      title,
      description,
      picture: '',
      start_date,
      end_date,
      type: '',
      // subscribed_users: [{}],
      price,
      headers: {
        authorization: getToken('event-token')
      },
      
    })
    if (response.status === 201) {
      props.history.push('/');
      alert('Atividade criada com sucesso!')
    } else {
      setErrorMessage(response.data.error);
      setErrorVisible(true);
      setTimeout(() => {
        setErrorVisible(false);
      }, 5000);
    }
  }


  const constructor = (props)=> {
    this.super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }


  const onDrop = (picture)=> {

    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Criar Atividade</h1>

        <form onSubmit={handleSubmit}>
          <Campo
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            text="Nome da atividade"
          />
          <Campo
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            text="Descrição"
          />
          <div class="row">
            <div class="col">
              <Datepicker
                selected={start_date}
                onChange={date => {
                  setStart_date(date)
                }
                }
                text="Início da atividade"
              />
            </div>
            <div class="col">
              <Datepicker
                selected={end_date}
                onChange={date => {
                  setEnd_date(date)
                }
                }
                text="Fim da atividade"
              />
            </div>
          </div>
          <Campo
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            text="Preço da atividade"
          />
          <div className="container-link">
            <button type="submit" className="link">
              Cadastrar atividade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;