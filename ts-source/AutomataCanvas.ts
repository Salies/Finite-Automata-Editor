class AutomataCanvas {
    // Base para desenho do autômato.
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    // Variáveis de controle de interface.
    private mousePressed: boolean = false;
    // Menus.
    // Container "coringa" para todos os menus.
    // O programa vai trocar o conteúdo desse container para exibir o menu correto.
    private menuWrapper: HTMLDivElement;
    // Cada um para um tipo diferente de clique com o botão direito do mouse.
    private emptyClickMenu: HTMLDivElement;
    private stateClickMenu: HTMLDivElement;
    private transitionClickMenu: HTMLDivElement;
    // Interface de criação de estados.
    private stateCreationUI: HTMLDivElement;
    // Tela de criação de transições.
    private transitionCreationUI: HTMLDivElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        // Criando as estruturas de dados base para criação dos elementos da tela.
        const menuOptionsNames = ['Adicionar estado', 'Remover estado', 'Adicionar transição', 'Marcar/desmarcar como final', 'Marcar/desmarcar como inicial'];
        let menuOptions: {[key: string]: HTMLDivElement} = {};
        // Criando as opções de menu propriamente ditas.
        menuOptionsNames.forEach((optionName) => {
            menuOptions[optionName] = document.createElement('div');
            menuOptions[optionName].innerText = optionName;
            menuOptions[optionName].classList.add('menu-option');
        });

        // Inicializando o wrapper de menus.
        this.menuWrapper = document.createElement('div');
        this.menuWrapper.classList.add('menu-wrapper');

        // Construindo o menu para clique em um lugar vazio da tela.
        this.emptyClickMenu = document.createElement('div');
        this.emptyClickMenu.appendChild(menuOptions['Adicionar estado']);

        // Construindo o menu para clique em um estado.
        this.stateClickMenu = document.createElement('div');
        this.stateClickMenu.append(
            menuOptions['Remover estado'], menuOptions['Adicionar transição'], 
            menuOptions['Marcar/desmarcar como final'], menuOptions['Marcar/desmarcar como inicial']
        );
    }

    // Cria e retorna a interface de criação de estados.
    createStateCreationUI() {

    }
}