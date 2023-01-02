/*
    Principal classe da interface.
    Lida com o desenho, possíveis movimentos, e entrada de dados no canvas passado a ela.

    Mesmo não sendo o jeito mais limpo e atual de ser fazer uma interface JS,
    tomei a abordagem tradicional (como em Qt, por exemplo) de criar uma classe
    e ir instanciando nela os elementos da interface.

    Sinceramente, a melhor abordagem seria usar algo como React, mas dado o escopo do projeto,
    não vimos necessidade.
*/

//class CanvasController {
class FAScene {
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
        const menuOptionsNames = ['Adicionar estado', 'Remover estado', 'Adicionar transição', 'Final', 'Inicial'];
        let menuOptions: {[key: string]: HTMLDivElement} = {};
        // Criando as opções de menu propriamente ditas.
        menuOptionsNames.forEach((optionName) => {
            menuOptions[optionName] = document.createElement('div');
            menuOptions[optionName].innerText = optionName;
            menuOptions[optionName].classList.add('menuItem');
        });

        // Inicializando o wrapper de menus.
        this.menuWrapper = document.createElement('div');
        this.menuWrapper.classList.add('menu-wrapper');

        // Construindo o menu para clique em um lugar vazio da tela.
        this.emptyClickMenu = document.createElement('div');
        this.emptyClickMenu.appendChild(menuOptions['Adicionar estado']);

        // Construindo o menu para clique em um estado.
        this.stateClickMenu = document.createElement('div');
        this.stateClickMenu.appendChild(menuOptions['Remover estado']);
        this.stateClickMenu.appendChild(menuOptions['Adicionar transição']);
        this.stateClickMenu.appendChild(menuOptions['Final']);
        this.stateClickMenu.appendChild(menuOptions['Inicial']);

        // Construindo o menu para clique em uma transição.
        this.transitionClickMenu = document.createElement('div');
        this.transitionClickMenu.appendChild(menuOptions['Remover transição']);

        this.stateCreationUI = document.createElement('div');
        this.createStateCreationUI();

        this.transitionCreationUI = document.createElement('div');
        this.createTransitionCreationUI();
    }

    // Cria a interface de criação de estados.
    private createStateCreationUI() {
        // Marcação de estado final
        const finalDiv = document.createElement('div');
        const finalLabel = document.createElement('label');
        finalLabel.innerText = 'Final';
        const finalInput = document.createElement('input');
        finalInput.id = 'stateAcceptInput';
        finalInput.type = 'checkbox';
        finalDiv.appendChild(finalInput);
        finalDiv.appendChild(finalLabel);

        // Marcação de estado inicial
        const initialDiv = document.createElement('div');
        const initialLabel = document.createElement('label');
        initialLabel.innerText = 'Inicial';
        const initialInput = document.createElement('input');
        initialInput.id = 'stateStartInput';
        initialInput.type = 'checkbox';
        initialDiv.appendChild(initialInput);
        initialDiv.appendChild(initialLabel);

        // Nome do estado
        const nameDiv = document.createElement('div');
        const nameLabel = document.createElement('label');
        nameLabel.innerText = 'Nome do estado:';
        const nameInput = document.createElement('input');
        nameInput.id = 'stateLabelInput';
        nameInput.type = 'text';
        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameInput);
        
        // Botão de criação
        const createButton = document.createElement('button');
        createButton.innerText = 'Criar';
        createButton.id = 'stateCreateButton';

        // Botão de cancelamento
        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancelar';
        cancelButton.id = 'stateCancelButton';

        // Div para os botões
        const buttonDiv = document.createElement('div');
        buttonDiv.appendChild(createButton);
        buttonDiv.appendChild(cancelButton);

        // Montando a interface
        this.stateCreationUI.classList.add('menuItem');
        this.stateCreationUI.appendChild(nameDiv);
        this.stateCreationUI.appendChild(finalDiv);
        this.stateCreationUI.appendChild(initialDiv);
        this.stateCreationUI.appendChild(buttonDiv);
    }

    // Cria a interface de criação de transições.
    private createTransitionCreationUI() {
        // Para qual estado?
        const toStateDiv = document.createElement('div');
        const toStateLabel = document.createElement('label');
        toStateLabel.innerText = 'Para:';
        const toStateInput = document.createElement('input');
        toStateInput.id = 'targetInput';
        toStateInput.type = 'text';
        toStateDiv.appendChild(toStateLabel);
        toStateDiv.appendChild(toStateInput);

        // Qual símbolo?
        const symbolDiv = document.createElement('div');
        const symbolLabel = document.createElement('label');
        symbolLabel.innerText = 'Símbolo:';
        const symbolInput = document.createElement('input');
        symbolInput.id = 'symbolInput';
        symbolInput.type = 'text';
        symbolDiv.appendChild(symbolLabel);
        symbolDiv.appendChild(symbolInput);

        // Div dos botões
        const buttonDiv = document.createElement('div');

        // Botão de criação
        const createButton = document.createElement('button');
        createButton.innerText = 'Criar';
        createButton.id = 'transitionCreateButton';

        // Botão de cancelamento
        const cancelButton = document.createElement('button');
        cancelButton.innerText = 'Cancelar';
        cancelButton.id = 'transitionCancelButton';

        // Adicionando os botões à div
        buttonDiv.appendChild(createButton);
        buttonDiv.appendChild(cancelButton);

        // Montando a interface
        this.transitionCreationUI.classList.add('menuItem');
        this.transitionCreationUI.appendChild(toStateDiv);
        this.transitionCreationUI.appendChild(symbolDiv);
        this.transitionCreationUI.appendChild(buttonDiv);
    }
}