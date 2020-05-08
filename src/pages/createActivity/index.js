import React, { useState } from 'react'
import api from "../../services/api";
import { getToken } from "../../utils/auth";

import './styles.css'

const Activity = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [start_date, setStart_date] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [type, setType] = useState('');
  const [subscribed_users, setSubscribed_users] = useState('');
  const [event_id, setEvent_id] = useState('');
  const [price, setPrice] = useState('');
  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  document.title = "Atividade"

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Ativade Criada')
    const response = await api.post("/activity/create", {
      title,
      description,
      picture,
      start_date,
      end_date,
      type,
      subscribed_users,
      event_id,
      price,
      headers: {
        authorization: getToken('event-token')
      }
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

  return (
    <h1>Activity</h1>
  )
}


export default Activity