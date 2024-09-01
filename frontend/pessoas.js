const apiUrl = "http://localhost:3500";

async function listarPessoas()
{
    const requestOptions = {
        method : "GET",
        redirect : "follow"
    };

    let result = await fetch(apiUrl + "/persons");
    let pessoas = await result.json();

    if (pessoas != "Não há pessoas cadastradas.")
    {
        html = "";

        for (let i = 0; i < pessoas.length; i++)
        {
            let pessoa = pessoas[i];
            let editar = `<button class="btn btn-secondary" onclick="atualizarPessoa(${i})">Editar</button>`
            let excluir = `<button class="btn btn-danger" onclick="excluirPessoa(${i})">Excluir</button>`
            
            if (pessoa != null)
            {
                html += `<tr>
                            <td style="display: flex; gap: 5px; flex-direction: column;">${editar}${excluir}</td>
                            <td>${pessoa.id}</td>
                            <td>${pessoa.nome}</td>
                            <td>${pessoa.cpf}</td>
                            <td>${pessoa.idade}</td>
                            <td>${pessoa.cidade}</td>
                            <td>${pessoa.siglaUf}</td>
                        </tr>`;
            }  
        }
        document.getElementById("table-body").innerHTML = html;
    }
    else
    {
        document.getElementById("table-body").innerHTML = "";
    }
    
}

async function cadastrarPessoa()
{ 
    let id = pegarParametro("id");
    let method = id == null ? "POST" : "PUT";
    let url = id == null ? "/persons/postPerson" : "/persons/updatePerson/" + id;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let pessoa = 
    {
        "nome" : document.getElementById("nomePessoa").value,
        "cpf" : document.getElementById("cpfPessoa").value,
        "idade" : document.getElementById("idadePessoa").value,
        "cidade" : document.getElementById("selectCidade").value,
        "siglaUf" : document.getElementById("selectEstado").value
    };

    if (camposPreenchidos())
    {
        let options = 
        {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(pessoa),
            redirect: "follow"
        };

        let result = await fetch(apiUrl + url, options);
        let resultJson = await result.json();

        if (resultJson.id && id == null)
        {
            alert("Pessoa cadastrada com sucesso!");
            window.location = "index.html";
        }
        else if (resultJson.id && id != null)
        {
            alert("Pessoa alterada com sucesso!");
            window.location = "index.html";
        }
        else
        {
            alert("Erro ao cadastrar pessoa!");
        }
    }
    else
    {
        alert("Preencha todos os campos!");
    }
}

function atualizarPessoa(id)
{
    alert("Editando ID: " + (id + 1));
    window.location = "alterarPessoa.html?id=" + id; 
}

async function excluirPessoa(id)
{
    const url = ("/persons/deletePerson/" + id)
    const method = 
    {
        method : "DELETE",
        redirect : "follow"
    }

    if (confirm("Deseja realmente excluir essa pessoa?"))
    {
        let result = await fetch(apiUrl + url, method);
        let pessoa = await result.json();
        
        if (pessoa.id)
        {
            alert("Pessoa excluída com sucesso!");
            listarPessoas();
        }
        else
        {
            alert("Houve um erro ao excluir pessoa!");
        }
    }
}

async function pesquisarPorId()
{
    const requestOptions = 
    {
        method : "GET",
        redirect : "follow"
    }

    if (!isNaN(document.getElementById("pesquisaPorIdInput").value) && document.getElementById("pesquisaPorIdInput").value != "")
    {
        let id = (document.getElementById("pesquisaPorIdInput").value - 1);

        let result = await fetch(apiUrl + `/persons/getPersonsById/${id}`);
        let pessoa = await result.json();

        if (pessoa.id)
        {
            let editar = `<button class="btn btn-secondary" onclick="atualizarPessoa(${id})">Editar</button>`
            let excluir = `<button class="btn btn-danger" onclick="excluirPessoa(${id})">Excluir</button>`

            let html = `<tr>
                            <td style="display: flex; gap: 5px; flex-direction: column;">${editar}${excluir}</td>
                            <td>${pessoa.id}</td>
                            <td>${pessoa.nome}</td>
                            <td>${pessoa.cpf}</td>
                            <td>${pessoa.idade}</td>
                            <td>${pessoa.cidade}</td>
                            <td>${pessoa.siglaUf}</td>
                        </tr>`;
            document.getElementById("table-body").innerHTML = html;
        }
        else
        {
            alert("Não há pessoas com esse ID");
            listarPessoas();
        }
    }
    else
    {
        listarPessoas();
    } 
}

function pegarParametro(parametro) //o param. de entrada dessa função é uma string, que na URL recebe um valor, ex: "id" (?id=5)
{
    const queryString = window.location.search; //pega a query string da URL, essa linha retorna tudo após o ? ex: ?id=5
    const urlParams = new URLSearchParams(queryString); //cria um objeto da classe que extrai o valor da query
    return urlParams.get(parametro); //extrai e retorna da query o valor associado ao 'parametro'
}

function camposPreenchidos()
{
    let nome = false, cpf = false, idade = false, cidade = false, siglaUf = false;
    
    let pessoa = 
    {
        "nome" : document.getElementById("nomePessoa").value,
        "cpf" : document.getElementById("cpfPessoa").value,
        "idade" : document.getElementById("idadePessoa").value,
        "cidade" : document.getElementById("selectCidade").value,
        "siglaUf" : document.getElementById("selectEstado").value
    };

    if (pessoa.nome.length > 2)
    {
       nome = true; 
    }

    if (pessoa.cpf.trim().length === 11)
    {
        cpf = true;
    }

    if (pessoa.idade > 0)
    {
        idade = true;
    }

    if (pessoa.cidade != "Escolha uma cidade")
    {
        cidade = true;
    }

    if (pessoa.siglaUf != "Escolha um estado")
    {
        siglaUf = true;
    }

    if (nome && cpf && idade && cidade && siglaUf)
    {
        return true;
    }
    else
    {
        return false;
    }
}