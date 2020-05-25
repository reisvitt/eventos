import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Input from "../FormComponents/MyTextInput";
import "react-tabs/style/react-tabs.css";
import Loading from "../Loading";
import AssistantCard from "./AssistantCard";
import { Button } from "../Button";
import "./styles.css";

const data = [
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },

  {
    name:
      "Vitor Reissadasdsadasdadsada sdsadsa aaaaaaads adsadasdasddasdasdsadasdsds",
    email: "reis@outlook.comsadsasadsadsadasdasdsadsadsadsadsdsadsadasdasasds",
  },
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },
  {
    name: "Vitor Reis",
    email: "reis@outlook.com",
  },
];

const Assistants = ({ event, ...props }) => {
  const [searchEmail, setSearchEmail] = useState("");
  const [assistants, setAssistants] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(false);

  const listAssistants = async () => {
    setLoading(true);
    // faz requisicao
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    // lista todos os assistants do evento
  };

  const searchAssistant = async () => {
    // busca assistente de acordo com o email
  };

  useEffect(() => {
    listAssistants();
  }, [assistants]);

  return (
    <div className="container-assistants" {...props}>
      <Tabs>
        <TabList>
          <Tab>Lista</Tab>
          <Tab>Adicionar</Tab>
        </TabList>

        <TabPanel>
          {loading && <Loading />}
          {assistants.map((assistant) => (
            <AssistantCard key={assistant.email} user={assistant} />
          ))}
        </TabPanel>
        <TabPanel>
          <div className="insert">
            <div className="div-form">
              <Input
                placeholder="Digite o email..."
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <Button onClick={() => console.log("buscar")} title="Buscar" />
            </div>
            {searching && <Loading />}
            {assistants && (
              <div className="result">
                {assistants.map((user) => (
                  <AssistantCard add user={user} />
                ))}
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Assistants;
