//metodos estáticos não podem acessar o 'this'
//por isso, não vamos colocar util no construtor
const util = Util

const ID_CONTEUDO = 'conteudo'
const ID_BTN_JOGAR = 'jogar'
const ID_MENSAGEM = 'mensagem'
const CLASSE_INVISIBLE = 'd-none'
const ID_CARREGANDO = 'carregando'
const ID_CONTADOR = 'contador'
const ID_BTN_MOSTRAR_TUDO = 'mostrarTudo'

const MENSAGENS = {
    sucesso: {
        texto: 'Combinação correta!',
        classe: 'alert-sucess'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    },
}

class Tela {
    //gera o codigo Html para cada heroi
    static obterCodigoHtml(item) {
        return `
            <div class="col-md-3">
                <div class="card mb-3 mx-auto" style="width: 50%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                    <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
                </div>
            </div>
        `
    }

    static configurarBotaoVerificaSelecao(funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick
    }

    //carrega na tela da div #conteudo como parametro o codigoHtml
    //codigoHtml está na const codigoHtml em index.js
    static alterarConteudoHtml(codigoHtml) {
        //div aonde vai ser reenderizado o html
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }

    static gerarStringHtmlPelaImagem(itens) {
        //para cada item da lista, vai executar a function obterCodigoHtml
        //ao final, vai cincatenar tudo em uma unica string
        //muda de Array  para String
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHtmlPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    static exibirHerois(nomeDoHeroi, img) {
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        //para cada elemento ma tela, vamos alterar a imagem
        //para imagem inicial dele
        //com o forEach, p/ cada item, dentro dos () setamos o valor
        //de imagem
        elementosHtml.forEach(item => (item.src = img))
    }

    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if (sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerHTML = MENSAGENS.sucesso.texto
        }
        else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerHTML = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIBLE)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIBLE)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if (mostrar) {
            carregando.classList.remove(CLASSE_INVISIBLE)
            return
        }
        carregando.classList.add(CLASSE_INVISIBLE)
    }

    static iniciarContador() {
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR) 
        //vamos substituir o texo Começando $$contador segundos
        //onde está o $$contador adicionaremos o valor
        const indentificadorNoTexto = '$$contador'
        const textoPadrao = `Começando em ${indentificadorNoTexto} segundos...`

        //vamos criar um funcao em linha para atualizar o texto
        //a cada segundo
        const atualizarTexto = () =>
            (elementoContador.innerHTML = textoPadrao.replace(indentificadorNoTexto, contarAte--))
        
        atualizarTexto()
        //a cada segundo, vai chamar a função atualizarTexto
        //essa função vai substituir o $$contador pelo `contarAte` diminuindo o valor
        //retornamos o idDoIntervalo para parar ele mais tarde
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo
    }

    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnClick) {
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }
}
