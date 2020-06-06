import React, { useState } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import MaskedInput from "../../components/FormComponents/MaskedInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import { saveActivity } from "../../services/endpoints";
import { Success, Error } from "../../components/Toast";
import Base from "../../template/Base";
import Title from "../../components/Theme/Title";
import { Col, Row } from "reactstrap";

import { moneyMask } from "../../utils/mask/moneyMask";

import "./styles.css";
import { useParams } from "react-router-dom";

const CreateActivity = (props) => {
  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const { id } = useParams();

  //document.title = "Atividade"

  const handleSubmit = async (form) => {
    //Colocar esse id no api.post para criar a atividade - event_id: '5eba856f1ec95c086063fda4',
    // Não sei ainda como pegar o id do evento diretamente pela pagina
    //So o usuario de vitor pode criar uma atividade nesse evento, porque ele eh o cordenador
    //login: reis@outlook.com, password: 123
    let price = 0;
    if (!form.price && form.price === "") {
      price = parseFloat(form.price.replace(/\D/g, "")) / 100;
    }

    saveActivity(id, {
      title: form.title,
      description: form.description,
      picture: form.picture || "",
      start_date: form.start_date,
      end_date: form.end_date,
      type: form.type || "",
      price: price || 0,
    })
      .then((response) => {
        Success("Atividade criada com Sucesso!");
        props.history.push(`/event/${id}`);
      })
      .catch((error) => {
        Error(`Error ao criar atividade: ${error.message}`);
      });
  };

  const onDrop = (picture) => {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  };
  /*
  const validate = () => {
    const errors = {};
    if (!title) {
      errors.title = "* Campo requerido";
    } else if (title.length > 15) {
      errors.title = "* Deve ter 15 caracteres ou menos";
    }
    return errors;
  };*/

  return (
    <Base>
      <Title title="Criação de Atividade" />
      <div className="form-content mt-5">
        {errorVisible ? (
          <label className="errorMessage">{erroMessage}</label>
        ) : null}
        <Formulary
          initialValues={{
            title: "",
            description: "",
            price: "",
          }}
          //validate={validate}
          onSubmit={handleSubmit}
          content={
            <Row>
              <Col xs={12}>
                <MyTextInput
                  label="* Nome da atividade"
                  name="title"
                  type="text"
                  placeholder="Nome da atividade"
                />
              </Col>
              <Col xs={12}>
                <MyTextAreaInput
                  label="Descrição"
                  name="description"
                  type="text"
                  placeholder="Descrição"
                />
              </Col>

              <Col xs={12}>
                <Row noGutters>
                  <Col xs={6} className="pr-1">
                    <Datepicker name="start_date" text="Início da atividade" />
                  </Col>
                  <Col xs={6} className="pl-1">
                    <Datepicker name="end_date" text="Fim da atividade" />
                  </Col>
                </Row>
              </Col>

              <Col xs={12}>
                <MaskedInput
                  label="Preço da atividade"
                  name="price"
                  type="text"
                  placeholder="Preço da atividade"
                  mask={moneyMask}
                />
              </Col>
            </Row>
          }
          button={<ButtonForm type="submit" text="Criar Atividade" />}
        />
      </div>
    </Base>
  ); //fim return
}; //fim

export default CreateActivity;
