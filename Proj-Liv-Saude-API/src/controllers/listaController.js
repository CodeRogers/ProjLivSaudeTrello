const connectionDB = require("../Database/connection");

module.exports = {
  async lista(req, resp) {
    const lista = {};

    try {
      lista.data = JSON.parse(
        JSON.stringify(await connectionDB("listas").select("*"))
      );
    } catch (erro) {
      resp.status(400).send({
        mensagem: "Erro ao listar",
        erro: erro,
      });
    }
    return resp.json(lista.data);
  },

  async create(req, resp) {
    const { titulo } = req.body;
    try {
      await connectionDB("listas").insert({ titulo: titulo });
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro ao criar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },

  async update(req, resp) {
    const { titulo } = req.body;
    const { id } = req.params;

    try {
      await connectionDB("listas")
        .update({
          titulo: titulo,
        })
        .where("id", id);
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro atualizar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },

  async delete(req, resp) {
    const { id } = req.params;
    try {
      await connectionDB("listas").delete().where("id", id);
    } catch (erro) {
      return resp.status(400).send({
        mensagem: "Erro ao deletar lista",
        erro,
      });
    }
    return resp.status(200).send();
  },
};
