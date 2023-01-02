// class AutomataTransition {
class Transition {
    private to: State;
    private from: State;
    private symbols: string[];
    private x: number | null = null;
    private y: number | null = null;
    private isStep: boolean = false;

    public constructor(from: State, to: State, symbols: string[], x?: number, y?: number) {
        this.to = to;
        this.from = from;
        this.symbols = symbols;

        if(x && y) {
            this.x = x;
            this.y = y;
            return;
        }

        if(to != from) {
            this.x = (from.x + to.x) / 2;
            this.y = (from.y + to.y) / 2;
            return;
        }

        this.x = from.x;
        this.y = from.y - 30;
    }

    public move(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        if(this.isStep) {
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
        }

        
    }
}