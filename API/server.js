import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

/* Padrão do prisma */
const prisma = new PrismaClient()

/*Padrão do express */
const app = express()
/*permite que o Express leia e interprete corretamente os dados JSON enviados nas requisições HTTP.  */
app.use(express.json())
//habilitar qualquer pagina acessar o backend
app.use(cors())

/* CRIAR O USUARIO */
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

/* Listar todos os usuarios */
app.get('/usuarios', async (req, res) => {

    //variavel do usuario
    let users = []

    //filtro
    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

/*Editar um usuario */
//variavel id no caminho
app.put('/usuarios/:id', async (req, res) => {
    //arquivo prisma, identificar a tabele user e update
    await prisma.user.update({
        //Quem vou editar?
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    //mesma coisa, buscar no arquivo onde deletar
    await prisma.user.delete({
        //quem deletar?
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso!" })
})

/*Porta utilizada*/
app.listen(3000)