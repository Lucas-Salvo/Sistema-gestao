import express from "express";
import cors from "cors";
import {prisma} from "../src/lib/prisma.ts";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/usuarios", async (req, res) => {
    const Usuarios = await prisma.usuarios.findMany()
    res.json(Usuarios)
})

app.post("/usuarios", async (req, res) => {
    const {nome, email, senha, cpf} = req.body
    const novoUsuario = await prisma.usuarios.create({
        data: {
            nome,
            email,
            senha,
            cpf
        }
    })
    res.json(novoUsuario)
})

app.put("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    const {nome, email, senha, cpf} = req.body
    const atualisarUsuario = await prisma.usuarios.update({
        where: {id: Number(id)},
        data: {
            nome,
            email,
            senha,
            cpf
        }
    })
    res.json(atualisarUsuario)
})

app.delete("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    const deletarUsuario = await prisma.usuarios.delete({
        where: {id: Number(id)}
    })
    res.json(deletarUsuario)
})

app.get("/tarefas", async (req, res) => {
    const Usuarios = await prisma.tarefas.findMany()
    res.json(Usuarios)
})

app.post("/tarefas", async (req, res) => {
    const {descrição, prazo} = req.body
    const novoUsuario = await prisma.tarefas.create({
        data: {
            descrição,
            prazo
        }
    })
    res.json(novoUsuario)
})

app.put("/tarefas/:id", async (req, res) => {
    const {id} = req.params
    const {descrição, prazo} = req.body
    const atualisarUsuario = await prisma.tarefas.update({
        where: {id: Number(id)},
        data: {
            descrição,
            prazo
        }
    })
    res.json(atualisarUsuario)
})

app.delete("/tarefas/:id", async (req, res) => {
    const {id} = req.params
    const deletarUsuario = await prisma.tarefas.delete({
        where: {id: Number(id)}
    })
    res.json(deletarUsuario)
})

app.listen(PORT, () => {
    console.log("API funcionando")
})