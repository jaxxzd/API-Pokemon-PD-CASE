const tipoCor = {
    bug: "#A8B820",
    dragon: "#7038F8",
    electric: "#F8D030",
    fairy: "#EE99AC",
    fighting: "#C03028",
    fire: "#F08030",
    flying: "#A890F0",
    grass: "#78C850",
    ground: "#E0C068",
    ghost: "#705898",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
    water: "#6890F0",
    dark: "#705848",
    steel: "#B8B8D0",
};

// Ícones oficiais estilo Pokédex (SVG minimalista)
const tipoIcone = {
    fire: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
    water: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
    grass: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
    bug: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
    dragon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
    electric: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
    fairy: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
    fighting: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
    flying: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
    ghost: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
    ground: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
    ice: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
    normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
    poison: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
    psychic: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
    rock: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
    steel: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
    dark: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg"

};

// função para procurar o icon de acordo com o tipo do pokémon

function pokedexIcon(tipos) {

    // criação da variável container recebendo como valor um documento HTML com classe ID, onde esse documento HTML está localizado dinamicamente no JavaScript

    const container = document.getElementById("tipo-container");

    // Limpeza do container para receber novos icons e spans

    container.innerHTML = "";

    // o parâmetro "tipos" percorre com o "ForEach" usando como parâmetro "tipo"

    tipos.forEach(tipo => {

        // criação da variável constante "span" e recebe como resultado uma criação de um elemento "span" no documento feito pelo JavaScript

        const span = document.createElement("span");

        // esse documento que está armazenado na variável constante "span", recebe uma classe chamada "badge-tipo"

        span.className = "badge-tipo";

        // a variável constante recebe um estilo de background com base no tipo do pokémon que recebeu como valor pelo parãmetro "tipos"

        span.style.background = tipoCor[tipo];

        // a variável faz a transformação no documento HTML criando o icone, seguido por um objeto onde armazena o nome do tipo e a imagem, que faz a busca por um valor, que é o  nome do tipo do pokémon vindo pelo parâmetro "tipo", o alt também recebe o nome do tipo e então cria uma tag "p" para declarar este nome em um formato de texto

        span.innerHTML = `
            <img src="${tipoIcone[tipo]}" alt="${tipo}">
            <p>${tipo}</p>
        `;

        // Aqui, a variável "container" que está armazenando a tag div com a classe "tipo-container", adiciona a variável constante "span" como seu elemento filho

        container.appendChild(span);
    });
}

// Aramazenado a url da api em uma variável constante

const url = "https://pokeapi.co/api/v2/pokemon/";

// Integração de elementos do HTML com o JS

// card onde se encontra as informações do Pokémon

const card = document.querySelector("#card");

// botão para gerar um pokémon aleatório, utilizando a função "addEventListener" para executar uma função ao clicar e "pegarIdPokemon" para receceber um número aleatório do id do pokémon, depois, pega a resposta da requisição com a espera da API "fetch" com a soma da url da PokéAPI com o número aleatório chamado "id", então a variável constante "data" espera a converção da resposta da requisição para json e por fim gera o card

const btnGerar = document.querySelector(".btn-gerar");

// input de busca por nome do pokémon ou id

const input = document.querySelector("#input-buscar-pokemon");

// botão para buscar o pokémon por nome ou id através de um adição de evento

const btnBuscar = document.querySelector(".btn-buscar");

// Gerando um número aleatório entre 1 e 500

async function pegarIdPokemon() {
    let id = Math.floor(Math.random() * 1000) + 1;

    // definindo para a variável "resp" a espera com o fetch somado à url + id, para processar a requisição e id.

    const resp = await fetch(url + id);

    // na variável "data" temos a resposta da requisição que está sendo convertida em JSON

    const data = await resp.json();

    card.style.width = `100%`;

    // Chamando a função "gerarCardPokemon" com os dados do "data" para servir como valor para o parâmetro da função e gerar as características do pokémon.

    gerarCardPokemon(data);
}

//  Botão para executar a ação de busca por um pokémon por nome ou id, que tem uma função de executar um evento de clique, junto a um paraâemtro chamado "e" que seria "erro" com uma arrow function com escopo

btnBuscar.addEventListener("click", (e) => {

    // definimos o valor para a variável "value" como um valor para a variável input com função "trim()" para tirar espaços desnecessários e ".toLowerCase()" para deixar o valor minúsculo (a API precisa que seja assim, porque ela armazena os nomes dos pokémons em letras minúsculas no banco de dados)

    const value = input.value.trim().toLowerCase();

    // Aqui é feito um controle de decisão que faz a seguinte pergunta "se o valor do input sem espaços desnecessários for idêntico a vazio" então coloque uma alerta na tela, pedindo pro usuário colocar um valor válido para o nome e id do pokémon, se cair nessa condição o "return" impede do código continuar.

    if(input.value.trim() === "") {
        alert("Digite um valor válido");
        return
    }

    // a função "buscarPokemon" aguarda por um valor que está dentro da variável "value", que será retirada na digitação do input e do clique do botão para 

    buscarPokemon(value)

})

// Um evento de clique para gerar o card do pokemon

btnGerar.addEventListener("click", pegarIdPokemon);

// Serve pra quando a página carregar totalmente, gerar um pokémon aleatório

window.addEventListener("load", pegarIdPokemon);

// Função para gerar o card do pokemon

function gerarCardPokemon(data) {

    // dados do pokemon, pegos do valor "data" que foi atribuído como parãmetro para a função "gerarCardPokemon"

    const id = data.id
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.versions["generation-v"]["black-white"].animated.front_default || data.sprites.front_default || data.sprites?.other?.["official-artwork"]?.front_default || "";
    const name = data.name;
    const statusAtaque = data.stats[1].base_stat;
    const statusDefesa = data.stats[2].base_stat;
    const statusVelocidade = data.stats[5].base_stat;

    //  cor do card com base no tipo do pokémon, pegando o objeto com as cores "TipoCor" e pegando o array "types" no json da API com o parâmetro "data", pegando o primeiro tipo do pokémon com "[0]", presente no json da API, para definir a cor do círculo do card e por fim pegando o nome do tipo com "type.name"

    const fundoCor = tipoCor[data.types[0].type.name];

    // Criando o card com as informações do pokémon dinamicamente com JavaScript para colocar no HTML

    card.innerHTML = `
        <div class="header-dados">
            <p class="poke-id">
                <span>#</span>
                ${String(id).padStart(4, "0")}
            </p>

            <p class="poke-hp">
                <span>HP</span>
                ${hp}
            </p>
        </div>

        <img class="poke-img" src="${imgSrc}">

        <h2 class="poke-name">${name}</h2>

        <div class="pokedex-icon" id="tipo-container"></div>

        <div class="status">
            <div>
                <h3 class="ataque">${statusAtaque}</h3>
                <p>Ataque</p>
            </div>

            <div>
                <h3 class="defesa">${statusDefesa}</h3>
                <p>Defesa</p>
            </div>

            <div>
                <h3 class="velocidade">${statusVelocidade}</h3>
                <p>Velocidade</p>
            </div>
        </div>
    `;

    // Função chamada para mudar a cor do card e dos tipos do pokémon

    corCard(fundoCor)

    //  mapeamento em busco do tipo do pokémon para receber o valor por parâmetro

    pokedexIcon(data.types.map(t => t.type.name));
};

// função corCard com parâmetro "cor", que faz a alteração do CSS com JavaScript, definindo um círculo central no topo do card, usando o parâmetro "cor" para receber da variável "fundoCor" a cor do fundo do card, então o card pega os elementos ".types" e "span", esse comando pega todos os spans que selecionam os tipos do pokémon e por fim, o "forEach" com o parâmetro "TipoCor" percorre todos os spans e coloca o background color do tipo do pokémon

let corCard = cor => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${cor} 45%, #eeededde 0%)`
    card.querySelectorAll(".types span").forEach((TipoCor) => {
        TipoCor.style.backgroundColor = cor;
    })
}

// função assíncrona com parâmetro "value", que busca o pokémon pelo input de texto (forma de busca pelos pokémons padronizadas pela API)

async function buscarPokemon(value) {

    // temos uma função de controle de fluxo pra evitar problemas no código, usado somente o try e catch

    try {

        // recebendo como resposta a requisição da PokéAPI para a função "buscarPokemon", onde usa uma palavra-chave das funções async, chamado "await", seguindo pela API do JavaScript chamada "fetch", para lidar com as requisições

        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);

        // Uma condição simples perguntando "se a reposta não for ok" então estilize o background do card para a cor "eeededde 0%", em sequência transforme o card no documento HTML criando uma div, img e um texto para representar erro ao usuário, fazer a limpeza do input e retornar esse valor para a função

        if (!resp.ok) {

            // estiliza o background do card para a cor "eeededde 0%"

            card.style.background = `#eeededde 0%`;

            // transforma o card no documento HTML criando uma tag "div", "img" e um "p" para representar erro ao usuário

            card.innerHTML =
                `<div id="erro-content">
                    <img src="img/erro.png" class="erro-img">
                    <p class="no-found-pokemon"> Pokémon não identificado ⛌
                </div>`;

            // faz a limpeza do input

            input.value = "";

            // retorna os valores para a função

            return
        }

        // armazena na variável constante "data" a resposta da requisição convertida em json, tendo um "await" para esperar essa convernção ser realizada

        const data = await resp.json();

        // função "gerarCardPokemon" recebe como parâmetro o valor de "data"

        gerarCardPokemon(data);

        // limpeza do input

        input.value = "";

    }


    // função com controle de fluxo  para "pegar" o erro, se cair nessa função ela executa:

    catch (error) {

        // estliza o background do card com a cor "#eeededde 0%"

        card.style.background = `#eeededde 0%`;

        // estiliza a largura do card para "250px"

        card.style.width = `250px`;

        // Cria tag "div", "img" e "p" para o card no documento HTML, para representar erro ao usuário

        card.innerHTML =
            `<div id="erro-content">
                <img src="img/erro.png" class="erro-img">
                <p class="no-found-pokemon"> Não encontrado :(
                </div>`;

        // limpeza do input

        input.value = "";

    }

}



