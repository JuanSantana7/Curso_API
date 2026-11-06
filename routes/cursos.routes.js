const express = require("express")
const router = express.Router()
const db = require("../db")
const { route } = require("./professore.routes")


router.get("/", async (req, res) => {
    const [cursos] = await db.execute("SELECT * FROM curso")
    return res.json(cursos)
})

router.post("/", async (req, res) =>{
    const {nome, descricao, professorID} = req.body

    if(!nome || !descricao || !professorID) {
        return res.status(400).json({ error: "nome, descricao, professorID são obrigatorios" })
    }

    const [resultado] = await db.execute("INSERT INTO curso (nome, descricao, professor_id) VALUES (?,?,?)",
        [nome, descricao, professorID]
    )
    return res.status(201).json({id: resultado.insertId, nome, descricao })
})

router.delete("/id", async (req, res) => {
    const id = req.params.id //pegar o id da url

    const [resultado] = await db.execute(
        "DELETE FROM curso WHERE id = ?",
        [id]
    )

    if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Curso não encontrado!" })
    }

    return res.status(204).end
})