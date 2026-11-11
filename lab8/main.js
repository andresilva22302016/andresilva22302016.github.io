// main.js — pedidos AJAX à API (produtos, categorias, compra)
// e filtro / ordenação / pesquisa.
// Usa as funções do script.js: renderizarProdutos() e atualizaCesto().
// O script.js tem de ser carregado ANTES deste ficheiro.

let todosProdutos = []; // guarda os produtos vindos da API

document.addEventListener("DOMContentLoaded", () => {
  obterProdutos();
  obterCategorias();
  atualizaCesto();

  // Filtro, ordenação e pesquisa
  document.querySelector("#filtro").addEventListener("change", aplicarFiltros);
  document.querySelector("#ordenar").addEventListener("change", aplicarFiltros);
  document.querySelector("#pesquisa").addEventListener("input", aplicarFiltros);

  // Checkout
  document.querySelector("#comprar").addEventListener("click", comprar);
});

/* ---------- AJAX: produtos ---------- */

function obterProdutos() {
  fetch(`${API_URL}/products`)
    .then((response) => {
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      return response.json();
    })
    .then((produtos) => {
      todosProdutos = produtos;
      aplicarFiltros();
    })
    .catch((erro) => {
      console.error("Erro ao obter produtos:", erro);
      document.querySelector("#produtos").innerHTML =
        "<p>Não foi possível carregar os produtos.</p>";
    });
}

/* ---------- AJAX: categorias (para o filtro) ---------- */

function obterCategorias() {
  fetch(`${API_URL}/categories`)
    .then((response) => {
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      return response.json();
    })
    .then((categorias) => preencherFiltro(categorias))
    .catch((erro) => console.error("Erro ao obter categorias:", erro));
}

function preencherFiltro(categorias) {
  const select = document.querySelector("#filtro");
  select.innerHTML = '<option value="">Todas as categorias</option>';

  categorias.forEach((categoria) => {
    const opcao = document.createElement("option");
    // a API devolve objetos { id, name }
    opcao.value = categoria.name;
    opcao.textContent = categoria.name;
    select.append(opcao);
  });
}

/* ---------- Filtro + Pesquisa + Ordenação ---------- */

function aplicarFiltros() {
  const categoria = document.querySelector("#filtro").value;
  const ordem = document.querySelector("#ordenar").value;
  const texto = document.querySelector("#pesquisa").value.trim().toLowerCase();

  let lista = [...todosProdutos]; // cópia para não alterar o original

  // 1. Filtro por categoria
  if (categoria) {
    lista = lista.filter((p) => p.category === categoria);
  }

  // 2. Pesquisa pelo nome
  if (texto) {
    lista = lista.filter((p) => p.title.toLowerCase().includes(texto));
  }

  // 3. Ordenação por preço
  if (ordem === "asc") {
    lista.sort((a, b) => a.price - b.price);
  } else if (ordem === "desc") {
    lista.sort((a, b) => b.price - a.price);
  }

  renderizarProdutos(lista); // função do script.js
}

/* ---------- AJAX: Checkout (POST /buy) ---------- */

function comprar() {
  const lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || [];
  const resultado = document.querySelector("#resultado-compra");

  if (lista.length === 0) {
    resultado.innerHTML = "<p>O cesto está vazio.</p>";
    return;
  }

  const dados = {
    products: lista.map((p) => p.id), // só os ids
    student: document.querySelector("#estudante").checked,
    coupon: document.querySelector("#cupao").value.trim(),
    name: "", // opcional
  };

  fetch(`${API_URL}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then((response) =>
      response.json().then((json) => ({ ok: response.ok, status: response.status, json }))
    )
    .then(({ ok, status, json }) => {
      if (!ok) {
        // 400 ou 404 → a API devolve { error: "..." }
        throw new Error(json.error || `Erro HTTP ${status}`);
      }

      resultado.innerHTML = `
        <p>Valor final a pagar: <strong>${json.totalCost} €</strong></p>
        <p>Referência de pagamento: <strong>${json.reference}</strong></p>
        ${json.message ? `<p>${json.message}</p>` : ""}
      `;

      // esvazia o cesto depois da compra
      localStorage.setItem("produtos-selecionados", JSON.stringify([]));
      atualizaCesto(); // função do script.js
    })
    .catch((erro) => {
      resultado.innerHTML = `<p style="color:red">Erro na compra: ${erro.message}</p>`;
    });
}
