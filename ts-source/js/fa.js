
let FA = class {
    static startState = null;
    static states = [];
    static transitions = [];
    static input = "";
    static inputIndex = 0;

    static addState(x, y,label) {
        const state = new State(x, y, 15, false, label);
        FA.states.push(state);
    }

    static addTransition(from, to, symbols, x = null, y = null) {
        const transition = new Transition(from, to, symbols, x, y);
        FA.transitions.push(transition);
    }

    static removeState(state) {
        const stateTransitions = FA.transitions.filter(t => t.fromState == state || t.toState == state);
        stateTransitions.forEach(t => FA.removeTransition(t));

        FA.states = FA.states.filter(s => s != state);

        if(state.start) FA.startState = null;
    }

    static removeTransition(transition) {
        FA.transitions = FA.transitions.filter(t => t != transition);
    }

    static setStart(state) {
        // Se já existe um estado inicial...
        if(FA.startState != null) FA.startState.start = false;
        FA.startState = state;
        state.start = true;
    }

    static reset(input = null) {
        if(input != null)
            FA.input = input;
        FA.inputIndex = 0;

        const elements = FA.states.concat(FA.transitions);
        elements.forEach(e => e.current = false);
        
        FA.startState.current = true;
        FA.processEpsilons();
    }

    static step() {
        let symbol = FA.input.charAt(FA.inputIndex);
        let currentTransitions = [];
        let excludeStates = [];
        //Find all transitions that will be traveled with this step
        for(let transition of FA.transitions) {
            if(transition.symbols.includes(symbol) && transition.fromState.current) {
                currentTransitions.push(transition);
                transition.current = true;
            }
            else {
                transition.current = false;
            }
        }
        //Remove previous states first...
        for(let state of FA.states) {
            state.current=false;
        }
        //Then set the new current states
        for(let transition of currentTransitions) {
            transition.toState.current = true;
        }
        FA.processEpsilons();
    }

    //Processes epsilon transitions without consuming the next symbol.
    static processEpsilons() {
        let epsilonTransitions = [];
        for(let transition of FA.transitions) {
            console.log();
            if(transition.symbols.includes("e")) {
                epsilonTransitions.push(transition);
            }
        }
        let updated = true;
        while(updated) {
            updated = false;
            for(let transition of epsilonTransitions) {
                if(transition.fromState.current) {
                    transition.current = true;
                    if(!transition.toState.current) {
                        transition.toState.current = true;
                        updated = true;
                    }
                }
            }
        }
    }

    //Returns the state of this FA with the given label,
    //or null if such a state does not exist.
    static findState(label) {
        for(let state of FA.states) {
            if(state.label == label) {
                return state;
            }
        }
        return null;
    }

    //Deletes all states and transitions, leaving a blank canvas.
    static newFA() {
        FA.startState = null;
        FA.states.length = 0;
        FA.transitions.length = 0;
        FA.input = "";
        FA.inputIndex = 0;
    }

    //Returns a string representation of the current FA
    static toString() {
        let out = [];
        out.push("States");
        for(let s of FA.states) {
            let line = [];
            line.push(s.x,s.y,s.start,s.accept,s.label);
            out.push(line.join());
        }
        out.push("Transitions");
        for(let t of FA.transitions) {
            let line = [];
            line.push(t.fromState.label,t.toState.label,t.symbols,t.x,t.y);
            out.push(line.join());
        }
        return out.join("\n");
    }
}

