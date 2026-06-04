const express = require("express");

const router = express.Router();

const {
    listarNegocios,
    criarNegocio,
    atualizarNegocio,
    deletarNegocio
} = require("../controllers/negocioController");

router.get("/", listarNegocios);

router.post("/", criarNegocio);

router.put("/:id", atualizarNegocio);

router.delete("/:id", deletarNegocio);

module.exports = router;