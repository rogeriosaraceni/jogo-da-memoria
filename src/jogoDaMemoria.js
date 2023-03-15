class JogoDaMemoria {
    //o que precisa para rodar
    //se mandar um obj = { tela: 1, idade: 2, etc: 3}
    //tela 
    constructor({ tela, util }) {
        this.tela = tela
        this.util = util

        //array com herois Iniciais
        this.heroisIniciais = [
            { img: './src/assets/images/batman.png', nome: 'batman'},
            { img: './src/assets/images/frank.png', nome: 'frank'},
            { img: './src/assets/images/groot.png', nome: 'groot'},
            { img: './src/assets/images/mulher-maravilha.png', nome: 'mulher-maravilha'}
        ]
        this.iconePadrao = './src/assets/images/padrao.png'
        this.heroisEscondidos = [] 
        this.heroisSelecionados = [] 
    }

    //para usar o this, não precisamos usar static!
    inicializar() {
       //vai pegar todas as functions da class Tela! 
        //coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)

        //força a tela a usar o THIS de jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificaSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))
    }

    async embaralhar() {
        const copias = this.heroisIniciais
        //duplicar itens
        .concat(this.heroisIniciais)
        
        //entrar em cada item e criar um id aleatorio
        .map(item => {
            return Object.assign({}, item, {
                id: Math.random() / 0.5
            })
        })

        //ordenar aletoriamente
        .sort(() => Math.random() - 0.5)
        
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()

        const idDoIntervalo = this.tela.iniciarContador()

        //vamos esperar 3 segundo p/ atualizar a tela
        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
    }

    esconderHerois(herois) {
        //vamos tracar a imagem de todos os herois existentes
        //pelo icone padrao
        //como fizemos no construtor, vamos estrai somente o necessario
        //usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
        //o que tiver dentro dos parenteses
        //quando não usamos: (exemplo do id), o JS entende que o nome
        //é o mesmo do valor. Ex. id: id, vira id,
        const heroisOcultos = herois.map(({ nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        //atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)

        //guardar os herois para trabalhar com ele depois
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeDoHeroi) {
        //vamos procurar esse heroi pelo nome em nossos heroisIniciais
        //vamos obter os herois p/ trabalhar com eles depois
        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        //vamos criar a funcao na tela, p/ exibir só o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome }
        //vamos ver a qtd. de herois selecionados
        //e tomar ação se escolheu certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length
        switch (heroisSelecionados) {
            case 0:
                //adiciona e escolha na lista, esperando pela proxima
                //clica
                this.heroisSelecionados.push(item)
                break;
        
            case 1:
                //se a qtd. de escolhidos for 1, significa
                //que o usuario só pode escolher mais um
                //e vamos obter o primeiro item da lista
                const [opcao1] = this.heroisSelecionados

                //zerar itens para noa selecionar mais de 2
                this.heroisSelecionados = []

                //conferimos se os nomes e ids batem conforme
                //o esperado
                if (opcao1.nome === item.nome &&
                //aqui verificamos se são ids diferentes para
                //o usuario não clicar 2 vezes no mesmo
                opcao1.id !== item.id    
                ) { 
                    this.exibirHerois(item.nome)
                    //como padrão e true, não precisa nada
                    this.tela.exibirMensagem()
                    //para a execução
                    return
                }

                this.tela.exibirMensagem(false)
                //fim do case
                break;
        }
    }

    mostrarHeroisEscondidos() {
        //pegar todos os herois da tela
        //respectivo valor correto
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar() {
        this.embaralhar()
    }
}