const connectionDB = require("../Database/connection");

module.exports = {
  async lista(req, resp) {
    const lista = {};

    try {
      lista.data = await connectionDB("cards").select("*");
    } catch (erro) {
      resp.status(400).send({
        mensagem: "Erro ao listar",
        erro: erro,
      });
    }
    return resp.json(lista.data);
  },

  async create(req, resp) {
    const { listas_id, titulo } = req.body;
    try {
      await connectionDB("cards").insert({
        titulo: titulo,
        listas_id: listas_id,
      });
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro ao criar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },

  async update(req, resp) {
    const { titulo, listas_id } = req.body;
    const { id } = req.params;

    const idList = await connectionDB("listas")
      .select("id")
      .where("id", listas_id)
      .first();

    if (!idList) {
      return resp.status(400).send({ mensage: "Id da Lista inexistente" });
    }

    try {
      await connectionDB("cards")
        .update({
          titulo: titulo,
          listas_id: listas_id,
        })
        .where("id", id);
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro ao criar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },

  async delete(req, resp) {
    const { id } = req.params;
    try {
      await connectionDB("cards").delete().where("id", id);
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro ao deletar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },
};
