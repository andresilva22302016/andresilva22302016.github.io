// script.js — funções para desenhar os produtos e gerir o cesto
// (os produtos chegam da API através do main.js)

const API_URL = "https://deisishop.pw.deisi.ulusofona.pt";

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

const seccaoProdutos = document.getElementById("produtos");
const seccaoCesto = document.getElementById("cesto");

function adicionarAoCesto(produto) {
  const cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados"));
  cestoAtual.push(produto);
  localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));
  atualizaCesto();
}

function removerDoCesto(index) {
  const cestoAtual = JSON.parse(localStorage.getItem("produtos-selecionados"));
  cestoAtual.splice(index, 1);
  localStorage.setItem("produtos-selecionados", JSON.stringify(cestoAtual));
  atualizaCesto();
}

function criaProdutoCesto(produto, index) {
  const artigo = document.createElement("article");
  artigo.classList.add("cartao-produto-cesto");

  const imagem = document.createElement("img");
  imagem.src = API_URL + produto.image; // a API devolve um caminho relativo
  imagem.alt = produto.title;

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.classList.add("preco");
  preco.textContent = `${produto.price} €`;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "- Remover do cesto";
  botaoRemover.classList.add("botao-remover");
  botaoRemover.addEventListener("click", () => removerDoCesto(index));

  artigo.append(imagem, titulo, preco, botaoRemover);
  return artigo;
}

function criarProduto(produto) {
  const artigo = document.createElement("article");
  artigo.classList.add("cartao-produto");

  const imagem = document.createElement("img");
  imagem.src = API_URL + produto.image; // a API devolve um caminho relativo
  imagem.alt = produto.title;

  const titulo = document.createElement("h2");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.classList.add("preco");
  preco.textContent = `${produto.price} €`;

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  descricao.textContent = produto.description;

  const avaliacao = document.createElement("p");
  avaliacao.classList.add("avaliacao");
  avaliacao.textContent = `★ ${produto.rating?.rate ?? "N/A"} (${produto.rating?.count ?? 0} avaliações)`;

  const botaoComprar = document.createElement("button");
  botaoComprar.textContent = "+ Adicionar ao cesto";
  botaoComprar.addEventListener("click", () => adicionarAoCesto(produto));

  artigo.append(imagem, titulo, preco, descricao, avaliacao, botaoComprar);
  return artigo;
}

function renderizarProdutos(listaProdutos) {
  seccaoProdutos.innerHTML = "";

  if (listaProdutos.length === 0) {
    seccaoProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  listaProdutos.forEach((produto) => {
    seccaoProdutos.append(criarProduto(produto));
  });
}

function atualizaCesto() {
  const cesto = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];

  seccaoCesto.innerHTML = "";

  const tituloCesto = document.createElement("h2");
  tituloCesto.textContent = "Cesto de Compras";
  seccaoCesto.append(tituloCesto);

  if (cesto.length === 0) {
    const mensagemVazia = document.createElement("p");
    mensagemVazia.textContent = "O cesto está vazio.";
    seccaoCesto.append(mensagemVazia);
    return;
  }

  const contentorArtigos = document.createElement("div");
  contentorArtigos.classList.add("lista-cesto");

  let precoTotal = 0;
  cesto.forEach((produto, index) => {
    contentorArtigos.append(criaProdutoCesto(produto, index));
    precoTotal += Number(produto.price);
  });

  seccaoCesto.append(contentorArtigos);

  const elementoTotal = document.createElement("div");
  elementoTotal.classList.add("total-cesto");
  elementoTotal.innerHTML = `<h3>Total: <span>${precoTotal.toFixed(2)} €</span></h3>`;
  seccaoCesto.append(elementoTotal);
}
