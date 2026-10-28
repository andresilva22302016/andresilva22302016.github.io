// declaração de variaveis
const nodeInputNumero = document.querySelector("#inputNumero")
const nodeInputSubmit = document.querySelector("#submitNumero")
const nodeUlColecao = document.querySelector("#listacolecao")

const colecao =[];

// definicao de funçoes / B. event handlers
function guardaCarta(){
    const numero = +nodeInputNumero.value;
    colecao.push(numero);
    colecao.sort((a,b) => a-b);
    atualizaLista(colecao,nodeUlColecao);


}
function atualizaLista(colecao, nodeUlColecao){
    nodeUlColecao.innerHTML = "";
    colecao.forEach((numero) => {
        const elemento = document.createElement("li");
        elemento.textContent = numero;
        nodeUlColecao.appendChild(elemento);
    });
}


// C. event listeners
form.onsubmit = (event) => {
            event.preventDefault();
            guardaCarta();
}
