document.addEventListener("DOMContentLoaded", function() {
    console.log("O DOM foi carregado com sucesso!");

    // ==========================================
    // LAB 4 (MANTIDO INTACTO)
    // ==========================================
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

    // ==========================================
    // LAB 5 (NOVAS ADIÇÕES COM ARROW FUNCTIONS)
    // ==========================================

    // Bloco 6: querySelectorAll e dataset
    document.querySelectorAll("button.color").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            document.body.style.backgroundColor = e.target.dataset.color;
        });
    });

    // Bloco 7: Select com utilização do 'this' (requer function tradicional para o this funcionar)
    const selectCorPage = document.getElementById("selectCorPage");
    if (selectCorPage) {
        selectCorPage.addEventListener("change", function() {
            document.body.style.backgroundColor = this.value;
        });
    }



    // Bloco 8: Formulário com onsubmit
    const formNomeIdade = document.getElementById("formNomeIdade");
    if (formNomeIdade) {
        formNomeIdade.onsubmit = (e) => {
            e.preventDefault();
            const nome = document.getElementById("inputNome").value;
            const idade = document.getElementById("inputIdade").value;
            document.getElementById("outputForm").textContent = `Olá, o ${nome} tem ${idade}!`;
        };
    }

    // Bloco 9: Contador com Local Storage
    const btnInc = document.getElementById("btnInc");
    const btnDec = document.getElementById("btnDec");
    const btnReset = document.getElementById("btnReset");
    const spanContadorLS = document.getElementById("spanContadorLS");

    let cliquesLS = localStorage.getItem("contadorLS") ? parseInt(localStorage.getItem("contadorLS")) : 0;

    const atualizarContadorLS = () => {
        if (spanContadorLS) spanContadorLS.textContent = cliquesLS;
        localStorage.setItem("contadorLS", cliquesLS);
    };
    atualizarContadorLS();

    if (btnInc) btnInc.addEventListener("click", () => { cliquesLS++; atualizarContadorLS(); });
    if (btnDec) btnDec.addEventListener("click", () => { cliquesLS--; atualizarContadorLS(); });
    if (btnReset) btnReset.addEventListener("click", () => { cliquesLS = 0; atualizarContadorLS(); });

    // Bloco 10: Temporizador com setInterval
    let tempo = 0;
    const spanTimer = document.getElementById("spanTimer");

    const count = () => {
        tempo++;
        if (spanTimer) spanTimer.textContent = tempo;
    };

    setInterval(count, 1000);
});
