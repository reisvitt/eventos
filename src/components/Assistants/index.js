import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Loading from "../Loading";
import AssistantCard from "./AssistantCard";
import { Button } from "../Button";
import api from "../../services/api";
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
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const listAssistants = async () => {
    setLoading(true);
    setSearchResult([]);
    // faz requisicao
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    api
      .get(`/event/${event._id}/assistant/list`)
      .then((assistants) => {
        let temp = [];
        console.log("ASSISTANS", assistants);
        assistants.data.map((assistant) => {
          temp.push({
            name: assistant.name,
            email: assistant.email,
            id: assistant._id,
          });
        });

        setAssistants(temp);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("EEROR", error);
      });

    // lista todos os assistants do evento
  };

  const searchAssistant = async () => {
    setSearching(true);
    // busca assistente de acordo com o email
    api
      .post(`/event/${event._id}/assistant/user`, { email: searchEmail })
      .then((users) => {
        let temp = [];
        console.log("users", users);
        users.data.map((user) => {
          temp.push({
            name: user.name,
            email: user.email,
            id: user._id,
          });
        });

        setSearchResult(temp);
        setSearching(false);
      })
      .catch((error) => {
        setSearching(false);
        console.log("EEROR", error);
      });
  };

  useEffect(() => {
    listAssistants();
  }, []);

  return (
    <div className="container-assistants" {...props}>
      <Tabs>
        <TabList>
          <Tab>Lista</Tab>
          <Tab>Adicionar</Tab>
        </TabList>

        <TabPanel>
          {!loading ? (
            assistants.length > 0 ? (
              assistants.map((assistant) => (
                <AssistantCard
                  key={assistant.email}
                  user={assistant}
                  id={event._id}
                  reload={listAssistants}
                />
              ))
            ) : (
              <h4>Este evento não possui nenhum assistente</h4>
            )
          ) : (
            <Loading />
          )}
        </TabPanel>
        <TabPanel>
          <div className="insert">
            <div className="div-form">
              <input
                className="form-text-container"
                placeholder="Digite o email..."
                onChange={(e) => setSearchEmail(e.target.value)}
                style={{ margin: 0 }}
              />
              <Button onClick={() => searchAssistant} title="Buscar" />
            </div>
            {searching && <Loading />}
            {searchResult.length > 0 && (
              <div className="result">
                {searchResult.map((user) => (
                  <AssistantCard add user={user} id={event._id} />
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
