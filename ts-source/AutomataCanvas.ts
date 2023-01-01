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
    private menuTransition: HTMLDivElement;

    constructor(canvas: HTMLCanvasElement) {
        // Pegando o canvas e seu contexto, para podermos desenhar
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        // Criando um container para os menus de criação e modificação do autômato.
        // Trata-se de um container "coringa" para os diferentes tipos de menu.
        this.wrapperMenu = document.createElement("div");
        this.wrapperMenu.classList.add("wrapper-menu");
        // Criando as diferentes opções pros menus.
        let optionsMenus: { [name: string]: HTMLDivElement } = {};
        // Nomes das opções dos menus.
        let menuNames: string[] = [
            "Adicionar estado", "Remover estado", "Adicionar transição", "Marcar/desmarcar como final", 
            "Marcar/desmarcar como inicial", "Remover transição"
        ];

        // Criando as opções dos menus.
        menuNames.forEach(menuName => {
            optionsMenus[menuName] = document.createElement("div");
            optionsMenus[menuName].innerText = menuName;
            optionsMenus[menuName].classList.add("option-menu");
        });

        // Adicionar estado - menu padrão para clique direito no canvas, em uma área vazia.
        this.menuAddState = document.createElement("div");
        this.menuAddState.appendChild(optionsMenus["Adicionar estado"]);

        // Menu de estado - para quando o clique direito é em cima de um estado.
        this.menuState = document.createElement("div");
        // Adicionando as opções ao menu.
        this.menuState.appendChild(optionsMenus["Remover estado"]);
        this.menuState.appendChild(optionsMenus["Adicionar transição"]);
        this.menuState.appendChild(optionsMenus["Marcar/desmarcar como final"]);
        this.menuState.appendChild(optionsMenus["Marcar/desmarcar como inicial"]);

        // Menu para transições - para quando o clique direito é em cima de uma transição.
        this.menuTransition = document.createElement("div");
        this.menuTransition.appendChild(optionsMenus["Remover transição"]);

    }
}