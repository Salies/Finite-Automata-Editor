let cWidth = document.getElementById("controlBar").clientWidth;
let cHeight = document.getElementById("canvasDiv").clientHeight;

let canvas = document.createElement("canvas");
canvas.width = cWidth;
canvas.height = cHeight;
canvas.style.border = "1px solid #000000";
document.getElementById("canvasDiv").appendChild(canvas);

let scene = new FAScene(canvas);
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
    if(FA.startState == null) {
        alert("Error: There is no start state");
        return false;
    }
    setStatus("Start");
    return true;
}

function setInputHandler() {
    if(!verifyStartExists()) {return;}
    let stringInput = document.getElementById("stringInput");
    FA.reset(stringInput.value);
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
    FA.reset();
    scene.redraw();
    let stepDisplay = document.getElementById("stepDisplay");
    while(stepDisplay.firstChild) {
        stepDisplay.removeChild(stepDisplay.firstChild);
    }
    for(let c of FA.input) {
        let characterDiv = document.createElement("div");
        characterDiv.innerHTML = c;
        stepDisplay.appendChild(characterDiv);
    }
}

function stepButtonHandler() {
    let stepDisplay = document.getElementById("stepDisplay");
    if(FA.inputIndex > 0) {
            stepDisplay.childNodes[FA.inputIndex-1].style.color = "black";
    }
    if(FA.inputIndex >= FA.input.length) {
        let accepted = false;
        for(let state of FA.states) {
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
    FA.step();
    scene.redraw()

    stepDisplay.childNodes[FA.inputIndex].style.color = "blue";

    FA.inputIndex++;
    setStatus("Testing...");
}

function newFA() {
    if(confirm("Are you sure you want to start a new FA?\nAny unsaved work will be lost.")) {
        FA.newFA();
        scene.redraw();
    }
}

FA.addState(200,200,"S");
FA.addState(400,100,"A");
FA.addState(600,100,"B");
FA.addState(400,300,"C");
FA.addState(600,300,"D");

FA.addTransition(FA.states[0],FA.states[1],"0");
FA.addTransition(FA.states[0],FA.states[3],"1");

FA.addTransition(FA.states[1],FA.states[1],"0");
FA.addTransition(FA.states[1],FA.states[2],"1");

FA.addTransition(FA.states[2],FA.states[2],"1");
FA.addTransition(FA.states[2],FA.states[1],"0");

FA.addTransition(FA.states[3],FA.states[3],"1");
FA.addTransition(FA.states[3],FA.states[4],"0");

FA.addTransition(FA.states[4],FA.states[4],"0");
FA.addTransition(FA.states[4],FA.states[3],"1");

FA.transitions[0].x = 260;
FA.transitions[0].y = 112;

FA.transitions[1].x = 269;
FA.transitions[1].y = 287;

FA.transitions[2].x = 400;
FA.transitions[2].y = 55;

FA.transitions[3].x = 499;
FA.transitions[3].y = 62;

FA.transitions[4].x = 600;
FA.transitions[4].y = 55;

FA.transitions[5].x = 501;
FA.transitions[5].y = 148;

FA.transitions[6].x = 400;
FA.transitions[6].y = 255;

FA.transitions[7].x = 499;
FA.transitions[7].y = 332;

FA.transitions[8].x = 600;
FA.transitions[8].y = 255;

FA.transitions[9].x = 495;
FA.transitions[9].y = 267;

scene.redraw();