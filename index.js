const express = require("express")
const app = express()
const RotasProfessores = require("./router/Professores.routes")
app.use(express.json())

app.use("/professores", RotasProfessores)


// ------ Rotas do curso ------


app.listen(3000, () => console.log("API no ar"))