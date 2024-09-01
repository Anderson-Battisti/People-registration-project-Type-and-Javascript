const linkApiBuscaEstados = "https://brasilapi.com.br/api/ibge/uf/v1";

async function gerarListaDeEstados()
{
    let result = await fetch(linkApiBuscaEstados);
    let estados = await result.json();

    let html = "<option selected>Escolha um estado</option>";

    for (let i = 0; i < estados.length; i++)
    {
        let estado = estados[i];
        html += `<option value=${estado.sigla}>${estado.sigla} - ${estado.nome}</option>`;
    }
    document.getElementById("selectEstado").innerHTML = html;
}

async function gerarListaDeCidades()
{
    const linkApiBuscaCidades = "https://brasilapi.com.br/api/ibge/municipios/v1/";

    let selectedValue = document.getElementById("selectEstado").value;
    let result = await fetch(linkApiBuscaCidades + selectedValue);
    let cidades = await result.json();

    let html = "<option selected>Escolha uma cidade</option>";
    if (selectedValue != null)
    {
        for (let i = 0; i < cidades.length; i++)
            {
                let cidade = cidades[i];
                html += `<option>${cidade.nome}</option>`;
            }
    }
    
    document.getElementById("selectCidade").innerHTML = html;
}



