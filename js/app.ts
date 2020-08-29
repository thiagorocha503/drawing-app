
class Paint{

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private drawn: boolean = false;
    private color: String = "black";
    private lineWidth: number = 1;
    

    public constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        let context = this.canvas.getContext("2d");
        if(context==null){
            throw "Canvas null";
        }
        this.context = context;
        let self: Paint =this;
        // set canvas event
        this.canvas.addEventListener("mousedown",function(evt: MouseEvent){
            self.onMouseDown(evt);
        });
        this.canvas.addEventListener("mousemove",function(evt: MouseEvent){
            self.onMouseMove(evt);
        });
        this.canvas.addEventListener("mouseup",function(evt:MouseEvent){
            self.onMouseUp(evt);
        });
    }

    public onMouseDown(evt: MouseEvent){
        this.context?.moveTo(
            evt.clientX-this.canvas.offsetLeft,
            evt.clientY-this.canvas.offsetTop
        );
        this.drawn = true;
    }

    public onMouseMove(evt: MouseEvent){
        if(this.drawn){
            this.context?.lineTo(
                evt.clientX-this.canvas.offsetLeft,
                evt.clientY-this.canvas.offsetTop
            );       
            this.context.strokeStyle = ""+this.color;
            this.context.lineWidth = this.lineWidth;
            this.context?.stroke();
        }
    }
    public onMouseUp(evt: MouseEvent){
        this.drawn = false;
    }

}

let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let app = new Paint(canvas);