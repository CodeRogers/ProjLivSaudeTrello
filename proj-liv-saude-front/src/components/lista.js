import React, { useEffect, useState } from "react";
import api from "../services/api";
import Card from "./card";

import style from "../styles/lista.module.css"

function Lista() {
  const [lista, setLista] = useState([]);
  const [tituloLista, setTituloLista] = useState("");
  const [tituloCard, setTituloCard] = useState("");

  useEffect(() => {
    async function getLista() {
      try {
        const { data } = await api.get("/listas");
        setLista(data);
      } catch (err) {
        return err;
      }
    }
    getLista();
  }, [tituloLista, tituloCard]);

  async function handleListaSubmit(e) {
    e.preventDefault();
    const listaData = {
      titulo: tituloLista,
    };
    try {
      await api.post("/cadastraLista", listaData);
    } catch (err) {
      return console.log(err);
    }
    setTituloLista("");
  }

  async function handleListaUpdate(e, idLista) {
    e.preventDefault();

    const listaData = {
      titulo: tituloLista,
    };
    
    try {
      await api.put(`/lista/${idLista}`, listaData);
    } catch (err) {
      return console.log(err);
    };
    setTituloLista("");
  }

  async function handleDelete(e, idLista, tituloLista) {
    e.preventDefault();
    try {
      await api.delete(`/lista/${idLista}`);
    } catch (err) {
      return console.log(err);
    }
    setLista((state) => state.filter((lista) => lista.id !== idLista));
    alert(`Lista ${idLista}, ${tituloLista} deletado com sucesso`);
  }

  async function handleCardSubmit(e, listaId) {
    e.preventDefault();
    const cardData = {
      titulo: tituloCard,
      listas_id: listaId,
    };
    try {
      await api.post("/cadastraCard", cardData);
    } catch (err) {
      return console.log(err);
    }
    setTituloCard("");
  }

  return (
    <div>
      <div class={style.navbar}>
        <h1>Trello</h1>
      </div>
      <div className={style.containerList}>
        {lista.map((lista) => (
          <div className={style.list} key={lista.id}>
            
            <span>{lista.titulo}</span>

            <div>
              <form>
                <label>Titulo Lista: </label>
                <input
                  onChange={(e) => setTituloLista(e.target.value)}
                  type="text"
                  required
                  defaultValue={lista.titulo}
                ></input>

                <button onClick={(e) => handleListaUpdate(e, lista.id)}>
                  Editar
                </button>
                
                <button onClick={(e) => handleDelete(e, lista.id, lista.titulo)}>
                  Excluir
                </button>
              </form>
              
              
              
            </div>

            <div>
              <Card idLista={lista.id} />
              <form>
                <label>Novo Card: </label>
                <input
                  onChange={(e) => setTituloCard(e.target.value)}
                  type="text"
                  required
                ></input>

                <button onClick={(e) => handleCardSubmit(e, lista.id)}>
                  Inserir
                </button>
              </form>
            </div>
            
          </div>
        ))}
        <form>
          <label>Nova Lista: </label>
          <input
            onChange={(e) => setTituloLista(e.target.value)}
            type="text"
            required
          ></input>

          <button onClick={(e) => handleListaSubmit(e)}>Inserir</button>
        </form>
      </div>
    </div>
  );
}

export default Lista;
