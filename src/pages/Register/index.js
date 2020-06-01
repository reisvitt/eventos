import React, { useState } from "react";
import Base from "../../template/Base";

import Formulary from "../../components/FormComponents/Formulary";
import MyTextInput from "../../components/FormComponents/MyTextInput";
import MaskedInput from "../../components/FormComponents/MaskedInput";
import ButtonForm from "../../components/FormComponents/ButtonForm";

import { cpfMask } from "../../utils/mask/cpfMask";
import { unMask } from "../../utils/mask/unMask";
import { useAuthContext } from "../../store/Auth";

import * as Yup from "yup";

import Title from "../../components/Theme/Title";

import "./styles.css";

/* Need fix */
const Subscribre = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const { SignUp } = useAuthContext();

  document.title = "Cadastrar"; // title da pagina

  const handleSubmit = async (e) => {
    //const name_user = e.name.split(" ", 2);


    const cpfUnmask = unMask(e.cpf);

    const user = {
      name: e.name,
      email: e.email,
      cpf: cpfUnmask,
      password: e.password,
    };
    
    await SignUp(user)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // printar toast de error
        console.log(error);
      });
  };

  // validador CPF
  function validateCpf(strCPF) {
    strCPF = strCPF.split("-").join("").split(".").join("");
    var Sum;
    var Rest;
    var i;
    Sum = 0;
    if (
      strCPF == "00000000000" ||
      strCPF == "11111111111" ||
      strCPF == "22222222222" ||
      strCPF == "33333333333" ||
      strCPF == "44444444444" ||
      strCPF == "55555555555" ||
      strCPF == "66666666666" ||
      strCPF == "77777777777" ||
      strCPF == "88888888888" ||
      strCPF == "99999999999"
    )
      return false;

    for (i = 1; i <= 9; i++)
      Sum = Sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Rest = (Sum * 10) % 11;

    if (Rest == 10 || Rest == 11) Rest = 0;
    if (Rest != parseInt(strCPF.substring(9, 10))) return false;

    Sum = 0;
    for (i = 1; i <= 10; i++)
      Sum = Sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Rest = (Sum * 10) % 11;

    if (Rest == 10 || Rest == 11) Rest = 0;
    if (Rest != parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  const validate = () => {
    const errors = {};
    let name_user = name.split(" ", 2);

    if (!name) {
      errors.name = "* Campo requerido";
    } else if (!name_user[1]) {
      errors.name = "* Digite o nome e sobrenome";
    }
    if (!password) {
      errors.password = "* Campo requerido";
    } else if (password.length < 8) {
      errors.password = "* A senha deve ter no mínimo 8 caracteres";
    }
    if (!email) {
      errors.email = "* Campo requerido";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "* Endereço de email inválido";
    }
    if (!cpf) {
      errors.cpf = "* Campo requerido";
    } else if (cpf.length < 11 || !validateCpf(unMask(cpf))) {
      errors.cpf = "* CPF inválido";
    }
    return errors;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("* Campo requerido")
      .matches(/[a-zA-Z0-9' 'a-zA-Z0-9]/),
    password: Yup.string()
      .required("* Campo requirido")
      .min(8, `* A senha deve ter no mínimo 8 caracteres"`),
    email: Yup.string()
      .email("* Endereço de email inválido")
      .required("* Campo requerido"),
    cpf: Yup.string().min(14, "* CPF inválido").required("* Campo requerido"),
  });

  return (
    <Base>
      <Title title="Cadastro de Usuário" />
      <div className="form-content">
        <Formulary
          initialValues={{
            name: "",
            password: "",
            email: "",
            cpf: "",
          }}
          //validate={validate}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          content={
            <>
              <MyTextInput
                label="* Nome Completo"
                name="name"
                type="text"
                placeholder="Nome Completo"
              />
              <MyTextInput
                label="* Senha"
                name="password"
                type="password"
                placeholder="Senha"
              />
              <MyTextInput
                label="* Email"
                name="email"
                type="text"
                placeholder="exemplo@email.com"
              />
              <MaskedInput
                label="* CPF"
                name="cpf"
                placeholder="CPF"
                mask={cpfMask}
              />
            </>
          }
          button={<ButtonForm type="submit" text="Cadastrar" />}
        />
      </div>
    </Base>
  ); //fim return
}; //fim classe Subscribe

export default Subscribre;
