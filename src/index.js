function onLoad() {
    const dependencias = {
      tela: Tela, //a class Tela é global
      util: Util
  }

  //inicializamos o jogo da memoria
  const jogoDaMemoria = new JogoDaMemoria(dependencias)
  jogoDaMemoria.inicializar()
}

window.onload = onLoad
