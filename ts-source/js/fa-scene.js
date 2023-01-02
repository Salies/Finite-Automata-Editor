
/*
This class handles drawing elements to the canvas and
user input on the canvas.
*/
let FAScene = class {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.font = "20px serif";

        this.mousePressed = false;
        this.ctrlPressed = false;
        this.selected = [];

        //This contains the different types of menus.
        this.menuContainer = null;
        this.menuContainer = document.createElement("div");
        this.menuContainer.classList.add("menu-wrapper");

        const menuOptionsNames = ['Adicionar estado', 'Remover estado', 'Adicionar transição', 'Remover transição', 'Final', 'Definir como inicial'];
        let menuOptions = {};
        menuOptionsNames.forEach((optionName) => {
            menuOptions[optionName] = document.createElement('div');
            menuOptions[optionName].innerText = optionName;
            menuOptions[optionName].classList.add('menuItem');
        });

        // Construindo o menu para clique em um lugar vazio da tela.
        this.defaultMenu = document.createElement('div');
        this.defaultMenu.appendChild(menuOptions['Adicionar estado']);

        // Construindo o menu para clique em um estado.
        this.stateMenu = document.createElement('div');
        this.stateMenu.appendChild(menuOptions['Remover estado']);
        this.stateMenu.appendChild(menuOptions['Adicionar transição']);
        this.stateMenu.appendChild(menuOptions['Final']);
        this.stateMenu.appendChild(menuOptions['Definir como inicial']);

        // Construindo o menu para clique em uma transição.
        this.transitionMenu = document.createElement('div');
        this.transitionMenu.appendChild(menuOptions['Remover transição']);

        this.addStateMenu = document.createElement('div');
        const { stateCreateButton, stateCancelButton } = this.createStateCreationUI();

        this.addTransitionMenu = document.createElement('div');
        const { transitionCreateButton, transitionCancelButton } = this.createTransitionCreationUI();

        //Bind functions
        this.drawAll = this.drawAll.bind(this);
        this.mouseUpHandle = this.mouseUpHandle.bind(this);
        this.mouseDownHandle = this.mouseDownHandle.bind(this);
        this.mouseMoveHandle = this.mouseMoveHandle.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.createState = this.createState.bind(this);
        this.checkForElement = this.checkForElement.bind(this);
        this.openAddStateMenu = this.openAddStateMenu.bind(this);
        this.cancelStateCreate = this.cancelStateCreate.bind(this);
        this.cancelTransitionCreate = this.cancelTransitionCreate.bind(this);
        this.changeAccept = this.changeAccept.bind(this);
        this.makeStart = this.makeStart.bind(this);
        this.openAddTransitionMenu = this.openAddTransitionMenu.bind(this);
        this.createTransition = this.createTransition.bind(this);
        this.deleteState = this.deleteState.bind(this);
        this.deleteTransition = this.deleteTransition.bind(this);
        this.ctrlDown = this.ctrlDown.bind(this);
        this.ctrlUp = this.ctrlUp.bind(this);

        //Register event listeners
        this.canvas.addEventListener("mousemove", this.mouseMoveHandle);
        this.canvas.addEventListener("mousedown", this.mouseDownHandle);
        this.canvas.addEventListener("mouseup", this.mouseUpHandle);
        this.canvas.addEventListener("contextmenu", this.openMenu);
        
        const docHtml = document.getElementsByTagName("html")[0];

        docHtml.addEventListener("keydown", this.ctrlDown);
        docHtml.addEventListener("keyup", this.ctrlUp);

        menuOptions['Adicionar estado'].addEventListener("click", this.openAddStateMenu);
        stateCreateButton.addEventListener("click", this.createState);
        stateCancelButton.addEventListener("click", this.cancelStateCreate);
        menuOptions['Final'].addEventListener("click", this.changeAccept);
        menuOptions['Definir como inicial'].addEventListener("click", this.makeStart);
        menuOptions['Adicionar transição'].addEventListener("click", this.openAddTransitionMenu);
        transitionCreateButton.addEventListener("click", this.createTransition);
        transitionCancelButton.addEventListener("click", this.cancelTransitionCreate);
        menuOptions['Remover estado'].addEventListener("click", this.deleteState);
        menuOptions['Remover transição'].addEventListener("click", this.deleteTransition);
    }

    // Cria a interface de criação de estados.
    createStateCreationUI() {
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
        this.addStateMenu.classList.add('menuItem');
        this.addStateMenu.appendChild(nameDiv);
        this.addStateMenu.appendChild(finalDiv);
        this.addStateMenu.appendChild(initialDiv);
        this.addStateMenu.appendChild(buttonDiv);

        return { stateCreateButton: createButton, stateCancelButton: cancelButton }
    }

    // Cria a interface de criação de transições.
    createTransitionCreationUI() {
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
        this.addTransitionMenu.classList.add('menuItem');
        this.addTransitionMenu.appendChild(toStateDiv);
        this.addTransitionMenu.appendChild(symbolDiv);
        this.addTransitionMenu.appendChild(buttonDiv);

        return { transitionCreateButton: createButton, transitionCancelButton: cancelButton }
    }

    //Checks where the right mouse button was clicked,
    //and opens the appropriate menu.
    openMenu(e) {
        e.preventDefault();
        this.menuContainer.x = e.offsetX;
        this.menuContainer.y = e.offsetY;
        this.menuContainer.selected = this.checkForElement(e.offsetX, e.offsetY);

        if (this.menuContainer.selected == null) {
            this.menuContainer.appendChild(this.defaultMenu);
        }
        else if (this.menuContainer.selected instanceof State) {
            this.menuContainer.appendChild(this.stateMenu);
        }
        else if (this.menuContainer.selected instanceof Transition) {
            this.menuContainer.appendChild(this.transitionMenu);
        }

        this.menuContainer.style.top = String(e.offsetY) + "px";
        this.menuContainer.style.left = String(e.offsetX) + "px";

        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll()
    }

    closeMenu() {
        if (this.menuContainer.parentNode) {
            this.menuContainer.parentNode.removeChild(this.menuContainer);
            this.menuContainer.removeChild(this.menuContainer.firstChild);
        }
    }

    openAddStateMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addStateMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createState() {
        let label = document.getElementById("stateLabelInput").value;
        document.getElementById("stateLabelInput").value = "";
        let accept = false;
        //document.getElementById("stateAcceptInput").checked = false;
        let start = false;
        //document.getElementById("stateStartInput").checked = false;
        let s = FA.findState(label);
        if (label == "") {
            alert("Error: The state label cannot be blank.")
        }
        else if (s != null) {
            alert("Error: A state already exists with label " + label + ".");
        }
        else {
            FA.addState(this.menuContainer.x, this.menuContainer.y, start, accept, label);
        }
        this.drawAll();
        this.closeMenu();
    }

    //Cancels the creation for both the addStateMenu
    cancelStateCreate() {
        //Clear addStateMenu inputs
        document.getElementById("stateLabelInput").value = "";
        this.closeMenu();
    }

    changeAccept() {
        this.menuContainer.selected.accept = !this.menuContainer.selected.accept;
        this.drawAll();
        this.closeMenu();
    }

    makeStart() {
        FA.setStart(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Deletes all transitions connected to the selected state,
    //then deletes the state.
    deleteState() {
        FA.removeState(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    openAddTransitionMenu() {
        this.closeMenu();
        this.menuContainer.appendChild(this.addTransitionMenu);
        document.getElementById("canvasDiv").appendChild(this.menuContainer);
        this.drawAll();
    }

    createTransition() {
        let toStateLabel = document.getElementById("targetInput").value;
        document.getElementById("targetInput").value = "";
        let toState = FA.findState(toStateLabel);
        let symbols = document.getElementById("symbolInput").value;
        document.getElementById("symbolInput").value = "";
        if (toStateLabel == "") {
            alert("Error: The state label cannot be blank.");
        }
        else if (symbols == "") {
            alert("Error: There must be at least one symbol.");
        }
        else if (toState == null) {
            alert("Error: There is no state with label " + toStateLabel + ".");
        }
        else {
            FA.addTransition(this.menuContainer.selected, toState, symbols);
        }
        this.drawAll();
        this.closeMenu();
    }

    cancelTransitionCreate() {
        //Clear addTransitionMenu inputs
        document.getElementById("targetInput").value = "";
        document.getElementById("symbolInput").value = "";
        this.closeMenu();
    }

    //Deletes the selected transition
    deleteTransition() {
        FA.removeTransition(this.menuContainer.selected);
        this.drawAll();
        this.closeMenu();
    }

    //Clears the canvas and draws all components of the FA.
    drawAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let s of FA.states) {
            s.draw(this.ctx);
        }
        for (let t of FA.transitions) {
            t.draw(this.ctx);
        }
        if (this.selectionBoxX != null) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.selectionBoxX, this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX, this.lastY);
            this.ctx.lineTo(this.lastX, this.lastY);
            this.ctx.lineTo(this.lastX, this.selectionBoxY);
            this.ctx.lineTo(this.selectionBoxX, this.selectionBoxY);
            this.ctx.stroke();
        }
    }

    mouseUpHandle(e) {
        if (this.selectionBoxX != null) {
            this.checkForElements(this.selectionBoxX, this.selectionBoxY, this.lastX, this.lastY);
            this.selectionBoxX = null;
            this.selectionBoxY = null;
        }
        else if (!this.ctrlPressed) {
            this.selected.length = 0;
        }
        this.mousePressed = false;
    }

    mouseMoveHandle(e) {
        this.deltaX = e.offsetX - this.lastX;
        this.deltaY = e.offsetY - this.lastY;
        this.lastX = e.offsetX;
        this.lastY = e.offsetY;
        if (this.mousePressed) {
            for (let element of this.selected) {
                element.move(element.x + (this.deltaX), element.y + (this.deltaY));
            }
            this.drawAll();
        }
    }

    mouseDownHandle(e) {
        this.closeMenu();
        if (e.button != 0) { return; }
        this.mousePressed = true;
        let target = this.checkForElement(e.offsetX, e.offsetY);
        if (target != null && !this.selected.includes(target)) {
            this.selected.push(target)
        }
        else if (!this.ctrlPressed) {
            this.selected.length = 0;
            this.selectionBoxX = e.offsetX;
            this.selectionBoxY = e.offsetY;
        }
    }

    ctrlDown(e) {
        if (e.key == "Control") {
            this.ctrlPressed = true;
        }
    }

    ctrlUp(e) {
        if (e.key == "Control") {
            this.selected.length = 0;
            this.ctrlPressed = false;
            this.drawAll();
        }
    }

    checkForElement(x, y) {
        for (let c of FA.states) {
            if (x < (c.x + c.radius) && x > (c.x - c.radius)
                && y < (c.y + c.radius) && y > (c.y - c.radius)) {
                return c;
            }
        }
        for (let t of FA.transitions) {
            if (x < (t.x + (t.symbols.length * 10) / 2) && x > (t.x - (t.symbols.length * 10) / 2)
                && y < (t.y + 6) && y > (t.y - 6)) {
                return t;
            }
        }
        return null;
    }

    checkForElements(x1, y1, x2, y2) {
        let xMin = Math.min(x1, x2);
        let yMin = Math.min(y1, y2);
        let xMax = Math.max(x1, x2);
        let yMax = Math.max(y1, y2);
        for (let c of FA.states) {
            if (xMin < c.x && c.x < xMax
                && yMin < c.y && c.y < yMax) {
                this.selected.push(c);
            }
        }
        for (let t of FA.transitions) {
            if (xMin < t.x && t.x < xMax
                && yMin < t.y && t.y < yMax) {
                this.selected.push(t);
            }
        }
    }
}