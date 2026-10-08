document.addEventListener("DOMContentLoaded", function() {
    console.log("O DOM foi carregado com sucesso!");

    const exercicio1 = document.getElementById("elem1");
    if (exercicio1) {
        exercicio1.addEventListener("mouseenter", function() {
            exercicio1.textContent = "Obrigado por passares!";
        });
        exercicio1.addEventListener("mouseleave", function() {
            exercicio1.textContent = "Passa aqui o rato";
        });
    }


    const btnRed = document.getElementById("btnRed");
    const btnGreen = document.getElementById("btnGreen");
    const btnBlue = document.getElementById("btnBlue");
    const alvoPintar = document.getElementById("alvoPintar");

    if (btnRed && alvoPintar) {
        btnRed.addEventListener("click", function() {
            alvoPintar.style.backgroundColor = "red";
        });
    }
    if (btnGreen && alvoPintar) {
        btnGreen.addEventListener("click", function() {
            alvoPintar.style.backgroundColor = "green";
        });
    }
    if (btnBlue && alvoPintar) {
        btnBlue.addEventListener("click", function() {
            alvoPintar.style.backgroundColor = "blue";
        });
    }


    const inputEscreve = document.getElementById("inputEscreve");
    const outputEscreve = document.getElementById("outputEscreve");

    if (inputEscreve && outputEscreve) {
        inputEscreve.addEventListener("input", function(e) {
            outputEscreve.textContent = e.target.value;
        });
    }


    const inputCor = document.getElementById("inputCor");
    const btnSubmeterCor = document.getElementById("btnSubmeterCor");

    if (btnSubmeterCor && inputCor) {
        btnSubmeterCor.addEventListener("click", function() {
            let corEscolhida = inputCor.value.trim().toLowerCase();
            if (corEscolhida !== "") {
                document.body.style.backgroundColor = corEscolhida;
            }
        });
    }


    const btnConta = document.getElementById("btnConta");
    const spanContador = document.getElementById("spanContador");
    let cliques = 0;

    if (btnConta && spanContador) {
        btnConta.addEventListener("click", function() {
            cliques++;
            spanContador.textContent = cliques;
        });
    }
});
