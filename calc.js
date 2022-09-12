let buttons = document.querySelectorAll(".normal")
let tela = document.querySelector("#tela")
let buttonClear = document.querySelector(".red")
let buttonEquals = document.querySelector(".blue")

// Variavel auxiliar que guarda o valor que deve estar na tela
let textTela = "0"

let adicionarValorNaTela = (button) => {
    let valorButton = button.path[0].value

    if(isOperator(valorButton) && ultimoValorIsOperator() ) {
        valorButton = ""
    } else if((isOperator(valorButton) || ultimoValorIsOperator()) && textTela != "0" && textTela != "-") {
        valorButton = ` ${valorButton}`
    }

    if(textTela == "0" && valorButton == "-" ) {
        valorButton = "-"
    } else if(textTela == "0" && (valorButton == "X" || valorButton == "/" || valorButton == "+")) {
        valorButton = "0"
    }
    
    
    alterarValorNaTela(valorButton)
}

let ultimoValorIsOperator = () => {
    let valoresDaExpressao = textTela.split(" ")
    let ultimaPosicao = valoresDaExpressao.length - 1

    if(isOperator(valoresDaExpressao[ultimaPosicao])) {
        return true
    }
}

let isOperator = (value) => {
    switch(value) {
        case "+" : return true
        break

        case "-" : return true
        break

        case "X" : return true
        break

        case "/" : return true
        break
        

    }
}

let alterarValorNaTela = (number) => {
    if (textTela == "0") {
        textTela = ""
        textTela += number
    } else {
        textTela += number
    }

    tela.value = textTela
}

let adicionarEventoPadrao = (button) => {
    button.addEventListener('click', adicionarValorNaTela)
}

buttons.forEach(adicionarEventoPadrao)


let apagar = () => {
    textTela = ""
    alterarValorNaTela("0")
}


buttonClear.addEventListener("click", apagar)

let calcular = () => {
    let expressao = textTela.split(" ")
    
    if(!ultimoValorIsOperator()) {

        calcularOperacoesEspeciais(expressao)
        calcularOperacoesBasicas(expressao)
        apagar()

        if(isNaN(expressao[0]) ||expressao[0] == null || expressao[0] == Infinity || expressao[0] == -Infinity || expressao[0] == undefined ) {
            alert("Ops, parece que o valor gerado é invalido!")
            apagar()
        } else {
            alterarValorNaTela(expressao[0])
        }
      
    } else {
        alert("O último valor digitado é um operador termine a expressão com um número!")
    }
}

let calcularOperacaoEntreUmOperadorEmUmaExpressao = (expressao,index) => {
    let resultado = 0
    let indiceDaOperacao1 = index - 1
    let indiceDaOperacao2 = index + 1
    let valorDaOperacao1 = parseFloat(expressao[indiceDaOperacao1])
    let valorDaOperacao2 = parseFloat(expressao[indiceDaOperacao2])

        switch(expressao[index]) {
            case "X" : resultado = valorDaOperacao1 * valorDaOperacao2
            break

            case "/" : resultado = valorDaOperacao1 / valorDaOperacao2
            break

            case "+" : resultado = valorDaOperacao1 + valorDaOperacao2
            break

            case "-" : resultado = valorDaOperacao1 - valorDaOperacao2
            break
        }

        expressao[indiceDaOperacao1] = resultado
        expressao.splice(index,2)
    
}

let calcularOperacoesEspeciais = (expressao) => {

    let existemOperadoresEspeciais = (expressão) => {

        if (expressao.indexOf("X") != -1 || expressao.indexOf("/") != -1 ) {
            return true
        } else {
            return false
        }
    }

    for(let i = 0; existemOperadoresEspeciais(expressao); i++) {

        if(expressao[i] == "X" || expressao[i] == "/" ) {
            calcularOperacaoEntreUmOperadorEmUmaExpressao(expressao,i)
            i = 0
        }
    }
}

let calcularOperacoesBasicas = (expressao) => {

    for(let i = 0; expressao.length != 1; i++) {
        
        if(expressao[i] == "+" || expressao[i] == "-") {
            calcularOperacaoEntreUmOperadorEmUmaExpressao(expressao,i)
            i = 0
        }
    }

}


buttonEquals.addEventListener("click", calcular)