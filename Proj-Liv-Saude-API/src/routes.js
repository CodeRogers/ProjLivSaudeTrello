const express = require("express");
const routes = express.Router();
const cardController = require("./controllers/cardController");
const listaController = require("./controllers/listaController");

routes
  // .get("/home", homeController.home)
  .post("/cadastraLista", listaController.create)
  .get("/listas", listaController.lista)
  .put("/lista/:id", listaController.update)
  .delete("/lista/:id", listaController.delete)

  .post("/cadastraCard", cardController.create)
  .get("/cards", cardController.lista)
  .put("/card/:id", cardController.update)
  .delete("/card/:id", cardController.delete);

module.exports = routes;