const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const negocioRoutes = require("./routes/negocioRoutes");

app.use("/negocios", negocioRoutes);

app.get("/", (req, res) => {
    res.json({
        startup: "Candeeiro",
        slogan: "Iluminando oportunidades locais."
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta 3000`);
});