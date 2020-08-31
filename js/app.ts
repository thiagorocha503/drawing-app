
class Paint {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawn: boolean = false;
    private color: String = "black";
    private lineWidth: number = 1;
    private colorPalette: HTMLCollection;
    private lines: HTMLCollection;


    public constructor(canvas: HTMLCanvasElement, colorPalette: HTMLCollectionOf<HTMLDivElement>, lines: HTMLCollectionOf<HTMLLIElement>) {
        this.canvas = canvas;
        this.colorPalette = colorPalette;
        this.lines = lines;
        let context = this.canvas.getContext("2d");

        if (context == null) {
            throw "Canvas null";
        }
        this.context = context;
        let self: Paint = this;
        // set canvas event
        this.canvas.addEventListener("mousedown", function (evt: MouseEvent) {
            self.onMouseDown(evt);
        });
        this.canvas.addEventListener("mousemove", function (evt: MouseEvent) {
            self.onMouseMove(evt);
        });
        this.canvas.addEventListener("mouseup", function (evt: MouseEvent) {
            self.onMouseUp(evt);
        });
        for (let i = 0; i < this.colorPalette.length; i++) {
            colorPalette[i].addEventListener("click", function (evt) {
                let color = colorPalette[i].style.backgroundColor;
                if (color != null) {
                    self.changeCurrentColor(color);
                }
            });
        }
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].addEventListener("click", function (evt: Event) {
                let lineWidth = lines[i].getAttribute("lineWidth");
                if (lineWidth != null) {
                    self.changeWithLine(parseInt(lineWidth));
                }
                // set selection
                for (let j = 0; j < lines.length; j++) {
                    lines[j].classList.remove("active-line")
                }
                lines[i].classList.add("active-line");
            });
        }
    }

    public changeWithLine(lineWidth: number) {
        this.lineWidth = lineWidth;
    }

    public changeCurrentColor(color: string) {
        let primaryColor = document.getElementById("primary-color");
        if (primaryColor != null) {
            primaryColor.style.backgroundColor = color;
        }
        this.color = color;
    }

    public onMouseDown(evt: MouseEvent) {
        this.context?.beginPath();
        this.context?.moveTo(
            evt.clientX - this.canvas.offsetLeft,
            evt.clientY - this.canvas.offsetTop
        );
        this.drawn = true;
    }

    public onMouseMove(evt: MouseEvent) {
        if (this.drawn) {
            this.context?.lineTo(
                evt.clientX - this.canvas.offsetLeft,
                evt.clientY - this.canvas.offsetTop
            );
            this.context.strokeStyle = "" + this.color;
            this.context.lineWidth = this.lineWidth;
            this.context?.stroke();
        }
    }
    public onMouseUp(evt: MouseEvent) {
        this.drawn = false;
    }

}
let lines: HTMLCollectionOf<HTMLLIElement> = document.getElementById("line-option")?.children as HTMLCollectionOf<HTMLLIElement>;
let colorPick = document.getElementsByClassName("color") as HTMLCollectionOf<HTMLDivElement>;
let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let app = new Paint(canvas, colorPick, lines);