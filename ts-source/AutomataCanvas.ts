class AutomataCanvas {
    // Base para desenho do autômato.
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    // Variáveis de controle de interface.
    private mousePressed: boolean = false;
    // Menus.

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


    }
}