// class AutomataState {
class State {
    private _x: number;
    private _y: number;
    private name: string;
    private isFinal: boolean;
    private isInitial: boolean;
    // é o passo atual da execução?
    private isStep: boolean;

    public constructor(name: string, x: number, y: number) {
        this._x = x;
        this._y = y;
        this.name = name;
        this.isFinal = false;
        this.isInitial = false;
        this.isStep = false;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }
    
    private generalDraw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        // TODO: mudar pra outro estilo
        if(this.isStep) {
            ctx.strokeStyle = "blue";
            ctx.fillStyle = "blue";
        }

        ctx.beginPath();
        // Desenha um círculo
        ctx.arc(this._x, this._y, 20, 0, 2 * Math.PI);
        ctx.stroke();

        // Coloco o nome do estado
        ctx.fillText(this.name, this._x - 5, this._y + 5);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.generalDraw(ctx);
        ctx.restore();
    }

    public redrawAsInitial(ctx: CanvasRenderingContext2D) {
        this.generalDraw(ctx);
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.beginPath();
        // Desenha um triângulo apontando para a esquerda do círculo
        ctx.moveTo(this._x - 20, this._y - 10);
        ctx.lineTo(this._x - 20, this._y + 10);
        ctx.lineTo(this._x - 30, this._y);
        ctx.fill();
        ctx.restore();
    }

    public redrawAsFinal(ctx: CanvasRenderingContext2D) {
        this.generalDraw(ctx);
        ctx.beginPath();
        // Desenha um círculo dentro do círculo
        ctx.arc(this._x, this._y, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    public move(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
}