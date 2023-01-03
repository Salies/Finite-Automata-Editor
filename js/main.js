const fa = new Automata();

let cWidth = document.getElementById("controlBar").clientWidth;
let cHeight = document.getElementById("canvasDiv").clientHeight;

let canvas = document.createElement("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
canvas.style.border = "1px solid #000000";
document.getElementById("canvasDiv").appendChild(canvas);

let scene = new CanvasController(canvas, fa);
let autoTimer = null;

let stepButton = document.getElementById("step");
stepButton.addEventListener("click",stepButtonHandler);

let setInputButton = document.getElementById("set");
setInputButton.addEventListener("click",setInputHandler);

let resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click",reset);

function setStatus(statusMessage) {
    let statusDisplay = document.getElementById("statusDisplay");
    statusDisplay.innerHTML = statusMessage;
}

function verifyStartExists() {
    if(fa.startState == null) {
        alert("Error: There is no start state");
        return false;
    }
    setStatus("Start");
    return true;
}

function setInputHandler() {
    if(!verifyStartExists()) {return;}
    let stringInput = document.getElementById("stringInput");
    fa.reset(stringInput.value);
    scene.redraw();
    let stepDisplay = document.getElementById("stepDisplay");

    while(stepDisplay.firstChild) {
        stepDisplay.removeChild(stepDisplay.firstChild);
    }

    for(let c of stringInput.value) {
        let characterDiv = document.createElement("div");
        characterDiv.innerHTML = c;
        stepDisplay.appendChild(characterDiv);
    }
    stringInput.value = "";
}

function reset() {
    if(!verifyStartExists()) {return;}
    fa.reset();
    scene.redraw();
    let stepDisplay = document.getElementById("stepDisplay");
    while(stepDisplay.firstChild) {
        stepDisplay.removeChild(stepDisplay.firstChild);
    }
    for(let c of fa.input) {
        let characterDiv = document.createElement("div");
        characterDiv.innerHTML = c;
        stepDisplay.appendChild(characterDiv);
    }
}

function stepButtonHandler() {
    let stepDisplay = document.getElementById("stepDisplay");
    if(fa.inputIndex > 0) {
            stepDisplay.childNodes[fa.inputIndex-1].style.color = "black";
    }
    if(fa.inputIndex >= fa.input.length) {
        let accepted = false;
        for(let state of fa.states) {
            if(state.current && state.accept) {
                accepted = true;
                break;
            }
        }
        if(accepted) {
            setStatus("String Accepted")
        }
        else {
            setStatus("String Rejected")
        }
        return;
    }
    fa.step();
    scene.redraw()

    stepDisplay.childNodes[fa.inputIndex].style.color = "blue";

    fa.inputIndex++;
    setStatus("Testing...");
}

function newFA() {
    if(confirm("Are you sure you want to start a new FA?\nAny unsaved work will be lost.")) {
        fa.newFA();
        scene.redraw();
    }
}

fa.addState(200,200,"S");
fa.addState(400,100,"A");
fa.addState(600,100,"B");
fa.addState(400,300,"C");
fa.addState(600,300,"D");

fa.addTransition(fa.states[0],fa.states[1],"0");
fa.addTransition(fa.states[0],fa.states[3],"1");

fa.addTransition(fa.states[1],fa.states[1],"0");
fa.addTransition(fa.states[1],fa.states[2],"1");

fa.addTransition(fa.states[2],fa.states[2],"1");
fa.addTransition(fa.states[2],fa.states[1],"0");

fa.addTransition(fa.states[3],fa.states[3],"1");
fa.addTransition(fa.states[3],fa.states[4],"0");

fa.addTransition(fa.states[4],fa.states[4],"0");
fa.addTransition(fa.states[4],fa.states[3],"1");

fa.transitions[0].x = 260;
fa.transitions[0].y = 112;

fa.transitions[1].x = 269;
fa.transitions[1].y = 287;

fa.transitions[2].x = 400;
fa.transitions[2].y = 55;

fa.transitions[3].x = 499;
fa.transitions[3].y = 62;

fa.transitions[4].x = 600;
fa.transitions[4].y = 55;

fa.transitions[5].x = 501;
fa.transitions[5].y = 148;

fa.transitions[6].x = 400;
fa.transitions[6].y = 255;

fa.transitions[7].x = 499;
fa.transitions[7].y = 332;

fa.transitions[8].x = 600;
fa.transitions[8].y = 255;

fa.transitions[9].x = 495;
fa.transitions[9].y = 267;

scene.redraw();