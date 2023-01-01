/*
    Principal classe da interface.
    Lida com o desenho, possíveis movimentos, e entrada de dados no canvas.
*/
class AutomataCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private mousePressed: boolean = false;
    private wrapperMenu: HTMLDivElement;
    private menuAddState: HTMLDivElement;
    private menuState: HTMLDivElement;

    constructor(canvas: HTMLCanvasElement) {
        // Pegando o canvas e seu contexto, para podermos desenhar
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        // Criando um container para os menus de criação e modificação do autômato.
        // Trata-se de um container "coringa" para os diferentes tipos de menu.
        this.wrapperMenu = document.createElement("div");
        this.wrapperMenu.classList.add("wrapper-menu");

        // Criando os diferentes menus.
        // Adicionar estado - menu padrão para clique direito no canvas, em uma área vazia.
        this.menuAddState = document.createElement("div");
        // Criando a opção para adicionar ao menu.
        let optionAddState = document.createElement("div");
        optionAddState.classList.add("option-menu");
        optionAddState.innerText = "Adicionar estado";
        // Adicionando a opção ao menu.
        this.menuAddState.appendChild(optionAddState);

        // Menu de estado - para quando o clique direito é em cima de um estado.
        this.menuState = document.createElement("div");
    }
}