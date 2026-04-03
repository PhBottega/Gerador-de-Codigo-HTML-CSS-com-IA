let botao = document.querySelector(".botao-de-gerar")

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-de-entrada").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    blocoCodigo.textContent = "Gerando código..."

    if (!textoUsuario) {
        blocoCodigo.textContent = "Digite algo primeiro 👀"
        return
    }


    let resposta = await fetch("http://localhost:3000/gerar-css", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: textoUsuario
        })
    })

    let dados = await resposta.json()

    if (!dados.choices) {
        blocoCodigo.textContent = "Erro ao gerar código 😢"
        return
    }

    let resultado = dados.choices[0].message.content

    blocoCodigo.textContent = resultado
    resultadoCodigo.srcdoc = resultado

}

botao.addEventListener("click", gerarCodigo)