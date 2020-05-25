import React, { useState } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import api from "../../services/api";

import { moneyMask } from "../../utils/mask/moneyMask";
import { getToken } from "../../utils/auth";

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
  const[moneyPrice, setMoneyPrice] = useState('')
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


    const onDrop = (picture) => {

      this.setState({
        pictures: this.state.pictures.concat(picture),
      });
    }

    const validate = () => {
      const errors = {};
      if (!title) {
        errors.title = '* Campo requerido';
      } else if (title.length > 15) {
        errors.title = '* Deve ter 15 caracteres ou menos';
      }
      return errors;
    };

    return (
      <div className="form-content">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <h1 className="title-form">
          <strong>Criação de Atividade</strong>
        </h1>
        <Formulary
          initialValues={{
            title: '',
            description: '',
            price: '',
          }}
          validate={validate}
          onSubmit={handleSubmit}
          content={
            <>
              <MyTextInput
                label="* Nome da atividade"
                name="title"
                type="text"
                placeholder="Nome da atividade"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <MyTextAreaInput
                label="Descrição"
                name="description"
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <div className="row">
                <div className="col">
                  <Datepicker
                    selected={start_date}
                    onChange={date => {
                      setStart_date(date)
                    }
                    }
                    text="Início da atividade"
                  />
                </div>
                <div className="col">
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
              <MyTextInput
                label="Preço da atividade"
                name="price"
                type="text"
                placeholder="Preço da atividade"
                value={moneyMask(moneyPrice)}
                onChange={(e) => {
                  setMoneyPrice(e.target.value);
                  let value = parseFloat(e.target.value.replace(/\D/g, '')) / 100;
                  setPrice(value);
                }}
              />
            </>
          }
          button={
            <ButtonForm
              type="submit"
              text="Criar Atividade"
            />
          }
        />
      </div>
    ); //fim return
  }; //fim classe CreateActivity
}
  export default CreateActivity;