import React, { useEffect, useState } from "react";
import api from "../services/api";

import style from "../styles/card.module.css"

function Card({ idLista }) {
  const [card, setCard] = useState([]);
  const [cardUpdate, setCardUpdate] = useState({ titulo: "", listas_id: "" });

  useEffect(() => {
    async function getCard() {
      try {
        const { data } = await api.get("/cards");
        setCard(data);
      } catch (err) {
        return err;
      }
    }
    getCard();
  }, [cardUpdate, card]);

  async function handleUpdate(e, idCard, tituloCard, listaId) {
    e.preventDefault();

    if (cardUpdate.titulo === "")
      setCardUpdate((cardUpdate.titulo = tituloCard));

    if (cardUpdate.listas_id === "")
      setCardUpdate((cardUpdate.listas_id = listaId));

    try {
      await api.put(`/card/${idCard}`, cardUpdate);
    } catch (err) {
      return console.log(err);
    }
    setCardUpdate({ titulo: "", listas_id: "" });
  }

  async function handleDelete(e, idCard, tituloCard) {
    e.preventDefault();
    try {
      await api.delete(`/card/${idCard}`);
    } catch (err) {
      return console.log(err);
    }
    setCard((state) => state.filter((card) => card.id !== idCard));
    alert(`Card ${tituloCard} deletado com sucesso`);
  }

  return (
    <div>
      {card
        .filter((card) => card.listas_id === idLista)
        .map((card) => (
          <div key={card.id}>

            <div class={style.containerCard}>
              <span>{card.titulo}</span>
              <div class={style.card}>
                <form>
                  <label>Titulo card: </label>
                  <input
                    onChange={(e) =>
                      setCardUpdate({ ...cardUpdate, titulo: e.target.value })
                    }
                    type="text"
                    required
                    defaultValue={card.titulo}
                  ></input>

                  <label>Id da lista: </label>
                  <input
                    onChange={(e) =>
                      setCardUpdate({ ...cardUpdate, listas_id: e.target.value })
                    }
                    type="number"
                    required
                    defaultValue={card.listas_id}
                  ></input>

                  <button
                    onClick={(e) =>
                      handleUpdate(e, card.id, card.titulo, card.listas_id)
                    }
                  >
                    Editar
                  </button>
                </form>
              </div>
            </div>

            <button onClick={(e) => handleDelete(e, card.id, card.titulo)}>
              Excluir
            </button>
          </div>
        ))}
    </div>
  );
}

export default Card;
