//criar 4 rotas
//get /pessoa
// get /pessoa/id
//post /pessoa
//put /pessoa/:id
//delete /pessoa/:id

//post /pessoa/:id/adicionarviagem (body dados da viagem)
//post /pessoa/:id/removerviagem/:posicao

import { Pessoa } from "./pessoa";
import express, { Express, Request, Response } from "express";
import cors from "cors";

let server: Express = express();
const serverPort = 3500;    
let contId = 1;
let pessoas: Pessoa[] = [];

server.use(cors());
server.use(express.json());

server.get("/persons", async(req: Request, res: Response): Promise<Response> =>
{
    if (pessoas.length > 0)
    {
        return res.status(200).json(pessoas);
    }
    else
    {
        return res.status(400).json("Não há pessoas cadastradas.");
    }
});

server.get("/persons/getPersonsById/:codigo", async(req: Request, res: Response): Promise<Response> =>
{
    let codigo = Number(req.params.codigo);

    if (pessoas.length > 0)
    {
        if (pessoas[codigo] != null && pessoas[codigo] != undefined)
        {
            return res.status(200).json(pessoas[codigo]);              
        }
        else
        {
            return res.status(400).json("Não há pessoas com esse ID")
        }
    }
    else
    {
        return res.status(400).json("Não há pessoas cadastradas"); 
    }
});

server.post("/persons/postPerson", async function (req: Request, res: Response): Promise<Response>
{
    let pessoa = new Pessoa();
    pessoa.id = (contId++);
    pessoa.nome = req.body.nome;
    pessoa.cpf = req.body.cpf;
    pessoa.idade = req.body.idade;
    pessoa.cidade = req.body.cidade;
    pessoa.siglaUf = req.body.siglaUf;

    pessoas.push(pessoa);

    return res.status(200).json(pessoa);
});

server.put("/persons/updatePerson/:codigo", async function(req: Request, res: Response): Promise<Response>
{
    let codigo = Number(req.params.codigo);

    pessoas[codigo].nome = req.body.nome;
    pessoas[codigo].cpf = req.body.cpf;
    pessoas[codigo].idade = req.body.idade;           //NECESSÁRIO VALIDAR FUNCAO
    pessoas[codigo].cidade = req.body.cidade;
    pessoas[codigo].siglaUf = req.body.siglaUf;
    
    return res.status(200).json(pessoas[codigo]);
});

server.delete("/persons/deletePerson/:codigo", async function(req: Request, res: Response): Promise<Response>
{
    let codigo = Number(req.params.codigo);

    if (codigo >= 0 && codigo < pessoas.length)
    {
        let pessoa = pessoas[codigo];
        delete pessoas[codigo];
        return res.status(200).json(pessoa);
    }
    else
    {
        let erro = 
        {
            "codigo" : codigo,
            "erro" : "Pessoa não encontrada"
        }
        return res.status(400).json(erro);
    }
});


server.listen(serverPort, () =>
{
    console.log("Server started on port " + serverPort);
});


