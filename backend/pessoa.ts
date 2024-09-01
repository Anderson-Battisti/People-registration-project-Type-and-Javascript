import { Viagem } from "./viagem";

export class Pessoa
{
    id: number = 0;
    nome: string = "";
    cpf: string = "";
    idade: number = 0;
    cidade: string = "";
    siglaUf: string = "";
    viagens: Viagem[] = [];
}