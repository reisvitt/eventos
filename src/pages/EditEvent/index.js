import React, { useState, useEffect } from "react";
import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MyTextAreaInput from "../../components/FormComponents/MyTextAreaInput";
import Datepicker from "../../components/FormComponents/Datepicker";
import ButtonForm from "../../components/FormComponents/ButtonForm";
import { saveEvent, getEvent } from "../../services/endpoints";
import Base from "../../template/Base";
import Title from "../../components/Theme/Title";
import { Success, Error } from "../../components/Toast";
import { useParams } from "react-router-dom";
import JS from "../../assets/js.png";
import Loading from "../../components/Loading";
import * as Yup from "yup";
import { Switch } from "@material-ui/core";
import { unMask } from "../../utils/mask/unMask";
import { Row, Col } from "reactstrap";

import "./styles.css";

const EditEvent = (props) => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  const { id } = useParams();

  const [erroMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const [saving, setSaving] = useState(false);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [slider, setSlider] = useState(false);

  const toggle = () => setSlider(!slider);

  document.title = "Criar Evento"; // title of page

  useEffect(() => {
    // pegar as informações do BD
    setLoading(true);
    getEvent(id)
      .then((evento) => {
        console.log("EVENTO", evento.data);

        setEvent({
          accountable: evento.data.accountable || "",
          address: evento.data.address || "",
          description: evento.data.description || "",
          start_date: evento.data.start_date || "",
          end_date: evento.data.end_date || "",
          title: evento.data.title || "",
          payment_address: evento.data.payment_address || "",
          picture: evento.data.picture || JS,
          start_subscribe: evento.data.start_subscribe || "",
          end_subscribe: evento.data.end_subscribe || "",
          price: evento.data.price || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERRO AO CARREGAR DADOS:", error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (form) => {
    const price = unMask(form.price);

    setSaving(true);
    saveEvent({
      title: form.title,
      start_date: form.start_date,
      end_date: form.end_date,
      picture: form.picture || "",
      address: [{ address: form.address, contact: "", email: "" }],
      start_subscribe: form.start_subscribe,
      end_subscribe: form.end_subscribe,
      accountable: form.accountable,
      description: form.description,
      price: price || 0,
      is_available: true,
      payment_address: [],
    })
      .then((response) => {
        Success("Evento atualizado com sucesso!");
        setSaving(false);
        props.history.push("/");
      })
      .catch((error) => {
        Error(`Falha ao atualizar evento: ${error.message}`);
        setSaving(false);
      });
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .max(100, "Máximo 100 caracteres!")
      .required("Campo requerido"),
    start_date: Yup.date(),
    end_date: Yup.date().min(
      Yup.ref("start_date"),
      "O final do evento não pode ser antes de seu inicio!"
    ),
    start_subscribe: Yup.date().max(
      Yup.ref("end_date"),
      "O inicio das incrições precisa ser antes do fim do evento!"
    ),
    end_subscribe: Yup.date()
      .min(
        Yup.ref("start_subscribe"),
        "O final das inscrições não pode ser antes de seu inicio!"
      )
      .max(
        Yup.ref("end_date"),
        "O final das inscriçõe precisa ser antes do final do evento!"
      ),
  });

  console.log("SLIDER", slider);

  return (
    <Base>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title title="Editar Evento" />
          <div className="form-content mt-5">
            {errorVisible ? (
              <label className="errorMessage">{erroMessage}</label>
            ) : null}
            <Formulary
              initialValues={event}
              validationSchema={schema}
              onSubmit={handleSubmit}
              content={
                <Row>
                  <Col xs={12}>
                    <MyTextInput
                      label="* Nome do Evento"
                      name="title"
                      key="title"
                      type="text"
                      placeholder="Nome do evento"
                    />
                  </Col>
                  <Col xs={12}>
                    <Row>
                      <Col xs={12} sm={6} lg={3}>
                        <Datepicker
                          text="Início do evento"
                          name="start_date"
                          type="text"
                        />
                      </Col>
                      <Col xs={12} sm={6} lg={3}>
                        <Datepicker
                          name="end_date"
                          type="text"
                          text="Fim do evento"
                        />
                      </Col>

                      <Col xs={12} sm={6} lg={3}>
                        <Datepicker
                          name="start_subscribe"
                          type="text"
                          text="Início das inscrições"
                        />
                      </Col>
                      <Col xs={12} sm={6} lg={3}>
                        <Datepicker
                          name="end_subscribe"
                          type="text"
                          text="Fim das inscrições"
                        />
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} className="mb-2">
                    <label>Este evento será pago?: </label>

                    <label
                      style={{ color: slider ? "" : `#4d4faa`, marginLeft: 10 }}
                    >
                      Não
                    </label>
                    <Switch
                      color="primary"
                      onChange={(e) => toggle()}
                      value={slider}
                    />
                    <label style={{ color: !slider ? "" : `#4d4faa` }}>
                      Sim
                    </label>
                  </Col>
                  {slider && (
                    <Col xs={12} className="d-flex justify-content-end">
                      <Col xs={11} className="mb-3">
                        <Col className="p-0">
                          <h2>Valores</h2>
                        </Col>
                        <Row>
                          <Col xs={4}>
                            <MyTextInput
                              label="Valor para estudante"
                              name="payment"
                              type="text"
                              placeholder="Ex: R$ 45,00"
                            />
                          </Col>
                          <Col xs={4}>
                            <MyTextInput
                              label="Valor para Professor"
                              name="payment"
                              type="text"
                              placeholder="Ex: R$ 45,00"
                            />
                          </Col>
                          <Col xs={4}>
                            <MyTextInput
                              label="Outro"
                              name="payment"
                              type="text"
                              placeholder="Ex: R$ 45,00"
                            />
                          </Col>
                        </Row>

                        <Col className="p-0">
                          <h2>Informações para pagamento</h2>
                        </Col>
                        <Row>
                          <Col xs={12}>
                            <MyTextInput
                              label="Endereço para pagamento"
                              name="address"
                              type="text"
                              placeholder="Local do evento"
                            />
                          </Col>
                          <Col xs={12} md={6}>
                            <MyTextInput
                              label="Contato"
                              name="contact"
                              type="text"
                              placeholder="Telefone/Celular"
                            />
                          </Col>
                          <Col xs={12} md={6}>
                            <MyTextInput
                              label="Email"
                              name="email"
                              type="text"
                              placeholder="Endereço de email"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  )}

                  <Col xs={12}>
                    <MyTextInput
                      label="Setor responsável"
                      name="accountable"
                      type="text"
                      placeholder="Ex: Colegiado de Ciência da Computação/Departamento de Ciências Exatas e da Terra"
                    />
                  </Col>
                  <Col xs={12}>
                    <MyTextAreaInput
                      label="Descrição do evento"
                      name="description"
                      type="text"
                      placeholder="Descrição"
                    />
                  </Col>
                </Row>
              }
              button={<ButtonForm type="submit" text="Salvar alterações" />}
            />
          </div>
        </>
      )}
    </Base>
  ); //fim return
}; //fim classe EditEvent

export default EditEvent;
