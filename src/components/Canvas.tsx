import {
    RefObject,
    MouseEvent,
    useState,
    useRef,
    Dispatch,
    SetStateAction,
} from "react";
import { rgbToDec } from "../util/convertion";
import { Position } from "../types/position";
import "./Canvas.css";
import { tool } from "../types/tool";
import { LineDraw, LineStyle, Shapes } from "../types/shapes";

type CanvasProps = {
    currentHistory: number;
    histories: Shapes[];
    mode: tool;
    opacity: number;
    drawing: boolean;
    color: string;
    lineWidth: number;
    canvasRef: RefObject<HTMLCanvasElement>;
    setCurrentHistory: Dispatch<SetStateAction<number>>;
    setHistories: Dispatch<SetStateAction<Shapes[]>>;
    handleDrawing: (b: boolean) => void;
};

const lineCap: "butt" | "round" | "square" = "round";
const lineJoin: "bevel" | "miter" | "round" = "round";
export default function Canvas({
    mode,
    opacity,
    color,
    lineWidth,
    currentHistory,
    histories,
    drawing,
    canvasRef: paperRef,
    setCurrentHistory,
    handleDrawing,
    setHistories,
}: CanvasProps) {
    const offScreenRef: RefObject<HTMLCanvasElement> =
        useRef<HTMLCanvasElement>(null);
    const [paths, setPaths] = useState<Position[]>([]);

    const handleMouseDown = (evt: MouseEvent) => {
        const canvas = offScreenRef.current as HTMLCanvasElement;

        if (mode === tool.Paint || mode === tool.Eraser) {
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx?.beginPath();
            const { red, green, blue } = rgbToDec(color);
            ctx.strokeStyle =
                mode === tool.Paint
                    ? `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
                    : "white";
            ctx.lineCap = lineCap;
            ctx.lineJoin = lineJoin;
            ctx.lineWidth = lineWidth;
            const { x, y } = currentPosition(evt);
            ctx?.moveTo(x, y);
            setPaths((paths) => [...paths, { x, y }]);
            handleDrawing(true);
        }
    };

    const currentPosition = (evt: MouseEvent): Position => {
        return {
            x: evt.clientX - offScreenRef.current!.offsetLeft,
            y: evt.clientY - offScreenRef.current!.offsetTop,
        };
    };

    const handleMouseMove = (evt: MouseEvent) => {
        const canvas = offScreenRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!drawing) {
            return;
        }
        clean();
        if (mode === tool.Paint || mode === tool.Eraser) {
            const { x, y } = currentPosition(evt);
            ctx.lineTo(x, y);
            ctx.stroke();
            setPaths((paths) => [...paths, { x, y }]);
        }
    };

    const drawLine = (ctx: CanvasRenderingContext2D) => {
        if (paths.length === 1) {
            return;
        }
        const { red, green, blue } = rgbToDec(color);
        ctx.beginPath();
        ctx.strokeStyle =
            mode === tool.Paint
                ? `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
                : "white";
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        ctx.lineWidth = lineWidth;
        for (let i = 0; i < paths.length; i++) {
            ctx.lineTo(paths[i].x, paths[i].y);
            ctx.moveTo(paths[i].x, paths[i].y);
        }
        ctx.stroke();
    };

    const clean = () => {
        const canvas = offScreenRef.current as HTMLCanvasElement;
        const ctx = canvas!.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleMouseUp = (_: MouseEvent) => {
        // path only begin
        if (paths.length===1) {        
            clean();
            handleDrawing(false);
            setPaths([]);
            return;
        }
        let new_shapes: Shapes | null = null;
        if (mode === tool.Paint || mode === tool.Eraser) {
            // draw line
            drawLine(paperRef.current?.getContext("2d")!);
            // shapes history
            const { red, green, blue } = rgbToDec(color);
            const style: LineStyle = {
                lineCap: "round",
                lineJoin: "round",
                lineWidth: lineWidth,
                strokeColor:
                    mode === tool.Paint
                        ? `rgba(${red}, ${green}, ${blue}, ${opacity / 100})`
                        : "white",
            };
            new_shapes = new LineDraw(paths, style);
        }
        // save shapes
        if (new_shapes != null) {
            setHistories((current_list) => {
                // if current history index not equal  histories lenght -1, remove different
                let new_list: Shapes[];
                if (currentHistory === histories.length - 1) {
                    new_list = [...current_list, new_shapes!];
                } else {
                    let sub_histories: Shapes[] = current_list.slice(
                        0,
                        currentHistory + 1
                    );
                    new_list = [...sub_histories, new_shapes!];
                }
                setCurrentHistory(new_list.length - 1);
                return new_list;
            });
        }
        clean();
        handleDrawing(false);
        setPaths([]);
    };

    return (
        <div className="canva-wrapper">
            <canvas
                className="offscreen"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                width={window.innerWidth}
                height={window.innerHeight}
                ref={offScreenRef}
            ></canvas>
            <canvas
                width={window.innerWidth}
                height={window.innerHeight}
                ref={paperRef}
            ></canvas>
        </div>
    );
}
